
"use server";

import { 
  generateSkillAssessmentQuiz,
  getRecommendationsFromSkillQuiz
} from "@/ai/flows/skill-gap-flow";
import type { SkillQuiz, SkillQuizAnswers, SkillGapRecommendationOutput } from "@/ai/flows/skill-gap-flow";

export async function generateSkillQuizAction(desiredJob: string) {
  try {
    const result = await generateSkillAssessmentQuiz(desiredJob);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error generating skill assessment quiz:", error);
    return { success: false, error: "Failed to generate quiz. Please try again." };
  }
}

export async function getRecommendationsFromSkillQuizAction(quiz: SkillQuiz, answers: SkillQuizAnswers, desiredJob: string): Promise<{ success: boolean; data?: SkillGapRecommendationOutput; error?: string }> {
    try {
      const result = await getRecommendationsFromSkillQuiz({ quiz, answers, desiredJob });
      return { success: true, data: result };
    } catch (error) {
      console.error("Error getting recommendations from skill quiz:", error);
      return { success: false, error: "Failed to get recommendations. Please try again." };
    }
}

/**
 * MOCK ACTION: In a real application, this would save the quiz results to the database.
 */
export async function saveSkillQuizResultAction(data: {
    quiz: SkillQuiz;
    answers: SkillQuizAnswers;
    recommendations: SkillGapRecommendationOutput;
    desiredJob: string;
    userId: string; // In a real app, you'd get this from the session
}) {
    try {
        // Simulate saving to a database
        console.log("Backend-ready: Saving skill quiz result for user:", data.userId);
        console.log("Data:", JSON.stringify(data, null, 2));
        // Here you would interact with your database (e.g., Supabase)
        // await db.from('skill_quiz_attempts').insert({ ... });
        return { success: true, attemptId: `attempt-${new Date().getTime()}` };
    } catch (error) {
        console.error("Error saving skill quiz result:", error);
        return { success: false, error: "Failed to save quiz results." };
    }
}
