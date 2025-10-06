
'use server';
/**
 * @fileOverview Generates a career interest quiz and provides job and course recommendations.
 *
 * - generateCareerInterestQuiz - Creates a quiz to assess personality and tech interests.
 * - getRecommendationsFromQuizResults - Analyzes quiz answers to recommend job roles and courses.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import {
    QuizSchema,
    QuizAnswersSchema,
    CareerRecommendationOutputSchema,
    type Quiz,
    type QuizAnswers,
    type CareerRecommendationOutput
} from './career-interest-types';


/**
 * Generates a career interest and personality quiz.
 */
export async function generateCareerInterestQuiz(): Promise<Quiz> {
  return generateQuizFlow({});
}

const generateQuizPrompt = ai.definePrompt({
    name: 'generateCareerInterestQuizPrompt',
    input: { schema: z.object({}) },
    output: { schema: QuizSchema },
    prompt: `You are a helpful assistant for creating career interest and personality assessments. 
    
    Generate a multiple-choice quiz with 15 questions to help a person understand what kind of tech field they might enjoy. 
    
    The questions should explore their personality, work style, and preferences. For example:
    - Problem-solving style (e.g., "When facing a complex problem, do you prefer to A) Dive deep into data and analysis, or B) Brainstorm creative, out-of-the-box solutions?").
    - Work environment preference (e.g., "Would you rather A) Work on a single, long-term project, or B) Juggle multiple exciting projects at once?").
    - Interests (e.g., "Which of these topics fascinate you? (Select all that apply) A) How things work internally (backend systems), B) How things look and feel to the user (frontend design), C) Finding patterns in large datasets.").

    - For each question, provide between 2 to 4 plausible options.
    - For most questions, set 'allowMultiple' to false for single-choice answers.
    - For a few questions (3-5) where multiple interests or traits could apply, set 'allowMultiple' to true.
    - For every question, set 'correctOptionIndex' to 0, as there is no single correct answer.
    The goal is to gather insights into whether they are more analytical, creative, structured, user-focused, data-driven, etc.`
});

const generateQuizFlow = ai.defineFlow(
    {
        name: 'generateQuizFlow',
        inputSchema: z.object({}),
        outputSchema: QuizSchema,
    },
    async (input) => {
        const { output } = await generateQuizPrompt(input);
        return output!;
    }
);


/**
 * Provides job and course recommendations based on the user's answers to the interest quiz.
 */
export async function getRecommendationsFromQuizResults({ answers }: { quiz: Quiz; answers: QuizAnswers }): Promise<CareerRecommendationOutput> {
    return recommendCareersFromQuizFlow({ answers });
}

const recommendationsFromQuizPrompt = ai.definePrompt({
    name: 'recommendationsFromQuizPrompt',
    input: { schema: z.object({ answers: QuizAnswersSchema }) },
    output: { schema: CareerRecommendationOutputSchema },
    prompt: `You are an expert career advisor specializing in the tech industry. A student has taken a personality and interest quiz.
    
    Your task is to analyze their answers to create a detailed personality profile and recommend suitable career paths and foundational courses.
    
    1.  **Analyze the Answers & Create a Personality Profile**: 
        - Based on the user's choices, write a summary of their personality and interests as they relate to a tech career. For example: "Your answers suggest you are a highly analytical and structured thinker who enjoys deep problem-solving. You seem motivated by data and logic."
        - Provide a score (0-100) for each of the following personality traits based on their answers: Analytical, Creative, Structured, Collaborative, Independent, User-Focused, and Data-Driven.
        
    2.  **Determine Career Fit**: 
        - Based on the personality profile, provide a suitability score (0-100) for each of the following career fields: Full-Stack Development, Backend Development, Frontend Development, UI/UX Design, Data Science, Product Management, and Marketing.
        
    3.  **Recommend Job Roles**: 
        - Based on the highest career fit scores, suggest 2-3 specific tech job roles. Examples: "Software Engineer (Backend)", "Data Scientist", "UX/UI Designer", "Product Manager".
        
    4.  **Recommend Courses**: 
        - Recommend 3-5 foundational courses that would help them get started in these recommended fields.
    
    Here are the student's answers:
    {{#each answers.answers}}
    Question: {{this.questionText}}
    Answer(s): {{#each this.selectedAnswers}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
    ---
    {{/each}}
    
    Based on your analysis, provide the personality analysis (summary and trait scores), the career fit scores, job recommendations, and course recommendations.`,
  });
  

const recommendCareersFromQuizFlow = ai.defineFlow(
    {
        name: 'recommendCareersFromQuizFlow',
        inputSchema: z.object({ answers: QuizAnswersSchema }),
        outputSchema: CareerRecommendationOutputSchema,
    },
    async (input) => {
        const { output } = await recommendationsFromQuizPrompt(input);
        return output!;
    }
);
