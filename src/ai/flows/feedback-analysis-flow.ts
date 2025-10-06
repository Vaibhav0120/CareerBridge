
'use server';
/**
 * @fileOverview Analyzes student feedback to generate actionable improvement suggestions.
 *
 * - generateImprovementSuggestions - Analyzes feedback and provides suggestions.
 * - FeedbackAnalysisInput - The input type for the function.
 * - FeedbackAnalysisOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const FeedbackItemSchema = z.object({
  targetType: z.enum(['internship', 'course']),
  targetName: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
});

const FeedbackAnalysisInputSchema = z.object({
  feedbackItems: z.array(FeedbackItemSchema).describe("A list of feedback items from students, including ratings and comments for internships and courses."),
});
export type FeedbackAnalysisInput = z.infer<typeof FeedbackAnalysisInputSchema>;

const ImprovementSuggestionSchema = z.object({
    theme: z.string().describe("A high-level theme for the suggestion, e.g., 'Course Content Clarity', 'Internship Mentorship'."),
    suggestion: z.string().describe("A specific, actionable suggestion for improvement."),
    supportingEvidence: z.array(z.string()).describe("A list of 1-3 direct quotes or paraphrased comments from the feedback that support this suggestion."),
});

const FeedbackAnalysisOutputSchema = z.object({
  overallSummary: z.string().describe("A brief, one-paragraph summary of the key positive and negative themes found in the feedback."),
  suggestions: z.array(ImprovementSuggestionSchema).describe("A list of 3-5 concrete suggestions for improvement based on the feedback analysis."),
});
export type FeedbackAnalysisOutput = z.infer<typeof FeedbackAnalysisOutputSchema>;

export async function generateImprovementSuggestions(
  input: FeedbackAnalysisInput
): Promise<FeedbackAnalysisOutput> {
  return feedbackAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'feedbackAnalysisPrompt',
  input: {schema: FeedbackAnalysisInputSchema},
  output: {schema: FeedbackAnalysisOutputSchema},
  prompt: `You are an expert educational consultant and program analyst. You have been provided with a collection of feedback from students regarding various internships and courses.

Your task is to analyze this feedback to identify recurring themes, actionable insights, and areas for improvement.

Based on the provided feedback:
1.  **Write a concise summary**: Synthesize the overall sentiment and the most prominent positive and negative themes from the feedback.
2.  **Generate actionable suggestions**: Identify 3-5 key areas for improvement. For each area, provide a clear theme, a specific suggestion, and 1-3 pieces of supporting evidence (quotes or paraphrased comments) from the feedback. Focus on suggestions that are concrete and actionable for the host organization.

Here is the student feedback:
{{#each feedbackItems}}
- **{{this.targetName}} ({{this.targetType}})**
  - Rating: {{this.rating}}/5
  - Comment: "{{this.comment}}"
---
{{/each}}

Please provide your analysis in the specified output format.`,
});

const feedbackAnalysisFlow = ai.defineFlow(
  {
    name: 'feedbackAnalysisFlow',
    inputSchema: FeedbackAnalysisInputSchema,
    outputSchema: FeedbackAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
