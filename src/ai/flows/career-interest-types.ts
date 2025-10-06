
import {z} from 'zod';

// Schema for a single question in the quiz
const QuestionSchema = z.object({
  questionText: z.string().describe('The text of the quiz question.'),
  options: z.array(z.string()).describe('A list of 2 to 4 possible answers.'),
  allowMultiple: z.boolean().describe('Whether the user can select multiple options.'),
  // Note: correctOptionIndex is no longer relevant for a personality quiz,
  // but we'll keep the field in the schema to avoid breaking other parts of the app for now.
  // It won't be used in the new logic.
  correctOptionIndex: z.number().describe('The index of the correct option in the options array. Not used for this quiz type.'),
});

// Schema for the entire quiz
export const QuizSchema = z.object({
  questions: z.array(QuestionSchema).describe('A list of 15 personality and interest-based quiz questions.'),
});
export type Quiz = z.infer<typeof QuizSchema>;

// Schema for the user's answers
export const QuizAnswersSchema = z.object({
    answers: z.array(z.object({
        questionText: z.string(),
        selectedAnswers: z.array(z.string()),
    })).describe("The user's selected answers for each question."),
});
export type QuizAnswers = z.infer<typeof QuizAnswersSchema>;


// Schema for the final course recommendations
export const CareerRecommendationOutputSchema = z.object({
  personalityAnalysis: z.object({
    summary: z.string().describe('An analysis of the user\'s personality and interests based on their answers, and how the recommendations align with them.'),
    traits: z.array(z.object({
      trait: z.string().describe('A personality trait, e.g., "Analytical", "Creative", "Structured".'),
      score: z.number().min(0).max(100).describe('A score from 0 to 100 for this trait.'),
    })).describe('An array of personality traits and their estimated scores.'),
  }),
  careerFit: z.array(z.object({
    career: z.string().describe('A tech career field, e.g., "Full-Stack Development", "UI/UX Design", "Data Science".'),
    score: z.number().min(0).max(100).describe('A suitability score from 0 to 100 for this career field.'),
  })).describe('An array of career fields and the user\'s suitability score for each.'),
  recommendedJobs: z.array(z.string()).describe('A list of 2-3 specific job roles that would be a good fit.'),
  recommendedCourses: z.array(z.string()).describe('A list of 3-5 foundational course names to help the user get started.'),
});
export type CareerRecommendationOutput = z.infer<typeof CareerRecommendationOutputSchema>;
