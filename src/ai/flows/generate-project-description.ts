'use server';
/**
 * @fileOverview An AI assistant to help project creators generate a compelling project summary and detailed description.
 *
 * - generateProjectDescription - A function that handles the project description generation process.
 * - GenerateProjectDescriptionInput - The input type for the generateProjectDescription function.
 * - GenerateProjectDescriptionOutput - The return type for the generateProjectDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectDescriptionInputSchema = z.object({
  projectTitle: z.string().describe('The title of the project.'),
  projectType: z
    .enum([
      'Hackathon',
      'Research',
      'Startup',
      'Competition',
      'General Collaboration',
    ])
    .describe('The type of the project.'),
  requiredSkills: z
    .array(z.string())
    .describe('A list of required skill badges for the project.'),
});
export type GenerateProjectDescriptionInput = z.infer<
  typeof GenerateProjectDescriptionInputSchema
>;

const GenerateProjectDescriptionOutputSchema = z.object({
  summary: z.string().describe('A short, compelling summary of the project.'),
  detailedDescription: z
    .string()
    .describe(
      'A detailed description of the project, including a confidentiality notice section.'
    ),
});
export type GenerateProjectDescriptionOutput = z.infer<
  typeof GenerateProjectDescriptionOutputSchema
>;

export async function generateProjectDescription(
  input: GenerateProjectDescriptionInput
): Promise<GenerateProjectDescriptionOutput> {
  return generateProjectDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectDescriptionPrompt',
  input: {schema: GenerateProjectDescriptionInputSchema},
  output: {schema: GenerateProjectDescriptionOutputSchema},
  prompt: `You are an AI assistant specialized in creating compelling project descriptions for collaboration platforms.
Your goal is to help project creators generate a project summary and a detailed description that attracts suitable collaborators.

Use the following information to generate the output:

Project Title: {{{projectTitle}}}
Project Type: {{{projectType}}}
Required Skills: {{#each requiredSkills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Generate a short, compelling summary and a detailed description for the project. The detailed description must include a confidentiality notice section at the end.

Example Confidentiality Notice:
---
Confidentiality Notice: This project involves sensitive information. Further details will be disclosed to approved team members under an NDA.
`,
});

const generateProjectDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProjectDescriptionFlow',
    inputSchema: GenerateProjectDescriptionInputSchema,
    outputSchema: GenerateProjectDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
