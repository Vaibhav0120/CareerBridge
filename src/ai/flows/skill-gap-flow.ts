
'use server';
/**
 * @fileOverview Generates a technical skill assessment quiz and provides course recommendations.
 *
 * - generateSkillAssessmentQuiz - Creates a quiz based on a desired job role.
 * - getRecommendationsFromSkillQuiz - Analyzes quiz answers to identify skill gaps and recommend courses.
 * - SkillQuiz - The type for the generated technical quiz.
 * - SkillQuizAnswers - The type for the user's submitted answers for the skill quiz.
 * - SkillGapRecommendationOutput - The return type for the recommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Schema for a single question in the skill quiz
const SkillQuestionSchema = z.object({
  questionText: z.string().describe('The text of the quiz question.'),
  options: z.array(z.string()).describe('A list of 2 to 4 possible answers.'),
  allowMultiple: z.boolean().describe('Whether the user can select multiple options.'),
  correctOptionIndex: z.number().optional().describe('The index of the correct option for single-answer questions.'),
  correctOptionIndices: z.array(z.number()).optional().describe('The indices of the correct options for multiple-answer questions.'),
  explanation: z.string().describe('A brief explanation for the correct answer(s).')
});

// Schema for the entire skill quiz
const SkillQuizSchema = z.object({
  questions: z.array(SkillQuestionSchema).describe('A list of 15 technical questions related to the job role.'),
});
export type SkillQuiz = z.infer<typeof SkillQuizSchema>;

// Schema for the user's answers to the skill quiz
const SkillQuizAnswersSchema = z.object({
    answers: z.array(z.object({
        questionText: z.string(),
        selectedAnswers: z.array(z.string()),
        correctAnswers: z.array(z.string()),
    })).describe("The user's selected answers for each question, along with the correct answers."),
});
export type SkillQuizAnswers = z.infer<typeof SkillQuizAnswersSchema>;


// Schema for the final course recommendations based on skill gaps
const SkillGapRecommendationOutputSchema = z.object({
  identifiedGaps: z.array(z.string()).describe("A list of 2-3 high-level skill gaps identified from the user's incorrect answers."),
  recommendedCourses: z.array(z.object({
    id: z.string().describe('The unique ID of the recommended course.'),
    name: z.string().describe('The name/title of the recommended course.')
  })).describe('A list of 3-5 specific courses to help the user fill their identified knowledge gaps.'),
  analysisSummary: z.string().describe('A brief, one-paragraph summary of the analysis.'),
  analysisBullets: z.array(z.string()).describe('A list of bullet points detailing the analysis of the skill gaps.'),
  skillProficiency: z.array(z.object({
    skillArea: z.string().describe('A high-level skill area, e.g., "Frontend", "Backend", "DevOps".'),
    proficiency: z.number().min(0).max(100).describe('A proficiency score from 0 to 100 for this area, based on the quiz answers.')
  })).describe('An array of skill areas and their estimated proficiency scores.'),
});
export type SkillGapRecommendationOutput = z.infer<typeof SkillGapRecommendationOutputSchema>;


/**
 * Generates a technical skill assessment quiz based on a job role.
 */
export async function generateSkillAssessmentQuiz(desiredJob: string): Promise<SkillQuiz> {
  return generateSkillQuizFlow({desiredJob});
}

const generateSkillQuizPrompt = ai.definePrompt({
    name: 'generateSkillAssessmentQuizPrompt',
    input: { schema: z.object({ desiredJob: z.string() }) },
    output: { schema: SkillQuizSchema },
    prompt: `You are an expert in creating technical skill assessments for software and tech jobs.
    
    Generate a multiple-choice quiz with 15 questions to assess a candidate's foundational knowledge for a "{{desiredJob}}" role.
    
    - The questions should be technical and relevant to the core skills required for the role.
    - Cover fundamental concepts, tools, and technologies.
    - For each question, provide 2 to 4 plausible options.
    - For most questions, set 'allowMultiple' to false and provide a single 'correctOptionIndex'.
    - For a few (2-3) questions where multiple options could be correct (e.g., "Which of the following are valid React hooks?"), set 'allowMultiple' to true and provide an array of 'correctOptionIndices'.
    - For each question, provide a concise explanation for why the answer(s) are correct.
    `
});

const generateSkillQuizFlow = ai.defineFlow(
    {
        name: 'generateSkillQuizFlow',
        inputSchema: z.object({ desiredJob: z.string() }),
        outputSchema: SkillQuizSchema,
    },
    async (input) => {
        const { output } = await generateSkillQuizPrompt(input);
        return output!;
    }
);


/**
 * Provides course recommendations based on the user's answers to the skill quiz.
 */
export async function getRecommendationsFromSkillQuiz({ answers, desiredJob }: { quiz: SkillQuiz; answers: SkillQuizAnswers, desiredJob: string }): Promise<SkillGapRecommendationOutput> {
    return recommendCoursesFromSkillQuizFlow({ answers, desiredJob });
}

const recommendationsFromSkillQuizPrompt = ai.definePrompt({
    name: 'recommendationsFromSkillQuizPrompt',
    input: { schema: z.object({ answers: SkillQuizAnswersSchema, desiredJob: z.string() }) },
    output: { schema: SkillGapRecommendationOutputSchema },
    prompt: `You are an expert career advisor and tech educator. A student has taken a technical skill assessment for a "{{desiredJob}}" role.
    
    Your task is to analyze their incorrect answers to identify knowledge gaps and recommend specific courses to fill those gaps.
    
    1.  **Analyze Incorrect Answers**: Look at the questions where the student's selected answers do not match the correct answers. 
    2.  **Identify High-Level Gaps**: Based on the incorrect answers, identify 2-3 high-level skill gaps. For example, if they missed questions on React hooks and state management, a gap is "Advanced React Concepts".
    3.  **Create Skill Proficiency Scores**: Categorize the questions into 3-5 high-level skill areas (e.g., "Frontend", "Backend", "Databases", "DevOps"). For each area, calculate a proficiency score from 0 to 100 based on the percentage of correct answers in that category. 
    4.  **Write Analysis**: Provide a brief summary paragraph of the analysis. Then, provide a bulleted list detailing the specific gaps identified.
    5.  **Recommend Courses**: Recommend 3-5 specific, real-sounding course titles (along with their fictional IDs like 'course-xx') to address these gaps.
    
    Here is the student's quiz data:
    {{#each answers.answers}}
    Question: {{this.questionText}}
    Student's Answer(s): {{#each this.selectedAnswers}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
    Correct Answer(s): {{#each this.correctAnswers}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
    ---
    {{/each}}
    
    Based on your analysis, provide the identified skill gaps, skill proficiency scores, the summary and bulleted analysis, and specific course recommendations (with IDs and names).`,
  });
  

const recommendCoursesFromSkillQuizFlow = ai.defineFlow(
    {
        name: 'recommendCoursesFromSkillQuizFlow',
        inputSchema: z.object({ answers: SkillQuizAnswersSchema, desiredJob: z.string() }),
        outputSchema: SkillGapRecommendationOutputSchema,
    },
    async (input) => {
        const { output } = await recommendationsFromSkillQuizPrompt(input);
        return output!;
    }
);
