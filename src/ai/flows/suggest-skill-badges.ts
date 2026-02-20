'use server';
/**
 * @fileOverview A Genkit flow for recommending skill badges to users.
 *
 * - suggestSkillBadges - A function that handles the skill badge suggestion process.
 * - SuggestSkillBadgesInput - The input type for the suggestSkillBadges function.
 * - SuggestSkillBadgesOutput - The return type for the suggestSkillBadges function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillBadgeSchema = z.object({
  name: z.string().describe('The name of the skill badge.'),
  level: z
    .enum(['Beginner', 'Intermediate', 'Advanced'])
    .optional()
    .describe('Optional skill level.'),
});

const SuggestSkillBadgesInputSchema = z.object({
  existingSkills: z
    .array(SkillBadgeSchema)
    .describe('A list of the user\'s current skill badges.'),
  interests: z
    .object({
      hackathons: z.boolean().optional(),
      research: z.boolean().optional(),
      startup: z.boolean().optional(),
      openSource: z.boolean().optional(),
      competitions: z.boolean().optional(),
      preferredRole: z.string().optional(),
      availability: z.string().optional(),
    })
    .describe('The user\'s stated interests and preferences.'),
  projectHistory: z
    .array(z.string())
    .describe(
      'A list of project titles or brief descriptions the user has participated in.'
    ),
});
export type SuggestSkillBadgesInput = z.infer<
  typeof SuggestSkillBadgesInputSchema
>;

const SuggestSkillBadgesOutputSchema = z.object({
  suggestedBadges: z
    .array(z.string())
    .describe('A list of recommended skill badges.'),
  reasoning: z
    .string()
    .describe('A brief explanation for the suggested badges.'),
});
export type SuggestSkillBadgesOutput = z.infer<
  typeof SuggestSkillBadgesOutputSchema
>;

export async function suggestSkillBadges(
  input: SuggestSkillBadgesInput
): Promise<SuggestSkillBadgesOutput> {
  return suggestSkillBadgesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSkillBadgesPrompt',
  input: {schema: SuggestSkillBadgesInputSchema},
  output: {schema: SuggestSkillBadgesOutputSchema},
  prompt: `You are an expert career and collaboration advisor for a campus platform called CampusConnect.
Your task is to recommend new skill badges for a user to add to their profile, based on their existing information, interests, project history, and current community trends.
The goal is to help the user discover relevant collaboration opportunities and better represent their capabilities.

Consider the following user data:

Existing Skills (badges):
{{#if existingSkills}}
{{#each existingSkills}}- {{this.name}}{{#if this.level}} ({{this.level}}){{/if}}
{{/each}}
{{else}}
No existing skills provided.
{{/if}}

Interests:
{{#if interests}}
{{#each interests as |value key|}}
{{#if value}}
- {{key}}: {{value}}
{{/if}}
{{/each}}
{{else}}
No specific interests provided.
{{/if}}

Project History:
{{#if projectHistory}}
{{#each projectHistory}}- {{this}}
{{/each}}
{{else}}
No project history provided.
{{/if}}

Based on this information and general trends in campus collaboration, suggest 3-5 new, relevant skill badges that would enhance the user's profile.
For each suggestion, consider its potential to unlock new collaboration opportunities (e.g., hackathons, research, startups) and improve the user's discoverability.
Provide a brief reasoning for your suggestions. Output only the JSON according to the schema.
`,
});

const suggestSkillBadgesFlow = ai.defineFlow(
  {
    name: 'suggestSkillBadgesFlow',
    inputSchema: SuggestSkillBadgesInputSchema,
    outputSchema: SuggestSkillBadgesOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
