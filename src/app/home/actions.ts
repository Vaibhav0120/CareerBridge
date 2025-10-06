
"use server";

import { getCourseRecommendationsForInternships } from "@/ai/flows/course-recommendation-flow";
import type { CourseRecommendationForInternshipsInput } from "@/ai/flows/course-recommendation-flow";

export async function getCourseRecommendationsForInternshipsAction(input: CourseRecommendationForInternshipsInput) {
  try {
    const result = await getCourseRecommendationsForInternships(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error getting course recommendations:", error);
    return { success: false, error: "Failed to get recommendations. Please try again." };
  }
}
