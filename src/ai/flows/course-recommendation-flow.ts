
'use server';
/**
 * @fileOverview Generates course recommendations based on skill gaps between a student's profile and their desired internships.
 *
 * - getCourseRecommendationsForInternships - Analyzes skill gaps and suggests courses.
 * - CourseRecommendationForInternshipsInput - The input type for the function.
 * - CourseRecommendationForInternshipsOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import type {Course} from '@/lib/types';
import {z} from 'zod';

const InternshipRequirementSchema = z.object({
  title: z.string().describe('The title of the internship.'),
  requiredSkills: z.array(z.string()).describe('A list of skills required for the internship.'),
});

const CourseSchema = z.object({
  id: z.string().describe('The unique identifier for the course.'),
  title: z.string().describe('The title of the course.'),
  tags: z.array(z.string()).optional().describe('A list of technical tags or skills covered in the course.'),
});

const CourseRecommendationForInternshipsInputSchema = z.object({
  studentSkills: z.array(z.string()).describe("The student's current skills."),
  internshipRequirements: z
    .array(InternshipRequirementSchema)
    .describe('A list of internships the student is interested in, with their required skills.'),
  availableCourses: z.array(CourseSchema).describe('A list of all available courses the student can choose from.'),
});
export type CourseRecommendationForInternshipsInput = z.infer<
  typeof CourseRecommendationForInternshipsInputSchema
>;

const CourseRecommendationForInternshipsOutputSchema = z.object({
  recommendedCourseIds: z.array(z.string()).describe('A list of 3-5 course IDs from the available courses that would help the student fill their skill gaps for the desired internships.'),
  reasoning: z.string().describe("The reasoning behind the course recommendations, explaining how each course addresses specific skill gaps based on the student's ranked internships."),
});
export type CourseRecommendationForInternshipsOutput = z.infer<
  typeof CourseRecommendationForInternshipsOutputSchema
>;

export async function getCourseRecommendationsForInternships(
  input: CourseRecommendationForInternshipsInput
): Promise<CourseRecommendationForInternshipsOutput> {
  return courseRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'courseRecommendationForInternshipsPrompt',
  input: {schema: CourseRecommendationForInternshipsInputSchema},
  output: {schema: CourseRecommendationForInternshipsOutputSchema},
  prompt: `You are an expert career advisor. A student has provided their current skills, a list of internships they are interested in, and a catalog of available courses. 
  
  Your task is to:
  1.  Identify the key skill gaps between the student's profile and the requirements of their chosen internships. A skill gap is a skill required by an internship that the student does not possess.
  2.  From the list of available courses, recommend 3-5 specific courses that will help them fill these gaps. Match the skill gaps to the tags and titles of the available courses. Return the IDs of these courses.
  3.  Provide a brief reasoning for your recommendations, explaining which skill gaps the courses will address.
  
  Student's Current Skills:
  {{#each studentSkills}}
  - {{this}}
  {{/each}}
  
  Ranked Internships and Their Requirements:
  {{#each internshipRequirements}}
  - **{{this.title}}**: Requires {{#each this.requiredSkills}}{{#if @last}} and {{/if}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}.
  {{/each}}

  Available Courses (with their IDs, titles, and tags):
  {{#each availableCourses}}
  - ID: {{this.id}}, Title: {{this.title}}, Tags: {{#if this.tags}}{{#each this.tags}}{{#if @last}} and {{/if}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}N/A{{/if}}
  {{/each}}
  
  Analyze the skill gaps and recommend the most relevant course IDs from the provided list.`,
});

const courseRecommendationFlow = ai.defineFlow(
  {
    name: 'courseRecommendationForInternshipsFlow',
    inputSchema: CourseRecommendationForInternshipsInputSchema,
    outputSchema: CourseRecommendationForInternshipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
