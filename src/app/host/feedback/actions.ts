
'use server';

import { generateImprovementSuggestions } from '@/ai/flows/feedback-analysis-flow';
import type { FeedbackAnalysisInput, FeedbackAnalysisOutput } from '@/ai/flows/feedback-analysis-flow';

export async function getImprovementSuggestionsAction(
  input: FeedbackAnalysisInput
): Promise<{ success: true; data: FeedbackAnalysisOutput } | { success: false; error: string }> {
  try {
    const result = await generateImprovementSuggestions(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    return { success: false, error: 'Failed to generate AI suggestions. Please try again.' };
  }
}
