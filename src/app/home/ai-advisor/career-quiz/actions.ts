
"use server";

import { 
  generateCareerInterestQuiz,
  getRecommendationsFromQuizResults
} from "@/ai/flows/career-interest-flow";
import type { Quiz, QuizAnswers, CareerRecommendationOutput } from "@/ai/flows/career-interest-types";

export async function generateQuizAction() {
  try {
    const result = await generateCareerInterestQuiz();
    return { success: true, data: result };
  } catch (error) {
    console.error("Error generating career interest quiz:", error);
    return { success: false, error: "Failed to generate quiz. Please try again." };
  }
}

export async function getRecommendationsFromQuizAction(quiz: Quiz, answers: QuizAnswers): Promise<{ success: boolean; data?: CareerRecommendationOutput; error?: string }> {
    try {
      const result = await getRecommendationsFromQuizResults({ quiz, answers });
      return { success: true, data: result };
    } catch (error) {
      console.error("Error getting recommendations from quiz:", error);
      return { success: false, error: "Failed to get recommendations. Please try again." };
    }
  }

/**
 * MOCK ACTION: In a real application, this would save the quiz results to the database.
 */
export async function saveCareerQuizResultAction(data: {
    quiz: Quiz;
    answers: QuizAnswers;
    recommendations: CareerRecommendationOutput;
    userId: string; // In a real app, you'd get this from the session
}) {
    try {
        // Simulate saving to a database
        console.log("Backend-ready: Saving career quiz result for user:", data.userId);
        console.log("Data:", JSON.stringify(data, null, 2));
        // Here you would interact with your database (e.g., Supabase)
        // await db.from('career_quiz_attempts').insert({ ... });
        return { success: true, attemptId: `attempt-${new Date().getTime()}` };
    } catch (error) {
        console.error("Error saving career quiz result:", error);
        return { success: false, error: "Failed to save quiz results." };
    }
}
