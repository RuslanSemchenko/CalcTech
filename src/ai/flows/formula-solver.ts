'use server';

/**
 * @fileOverview An AI-powered formula solver that provides step-by-step solutions.
 * 
 * - solveFormula - Solves a given mathematical formula with provided variables.
 * - FormulaSolverInput - The input type for the solveFormula function.
 * - FormulaSolverOutput - The return type for the solveFormula function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FormulaSolverInputSchema = z.object({
  formulaName: z.string().describe('The name of the formula to solve (e.g., "Quadratic Formula").'),
  variables: z.record(z.number()).describe('An object containing the variables for the formula.'),
});
export type FormulaSolverInput = z.infer<typeof FormulaSolverInputSchema>;

const FormulaSolverOutputSchema = z.object({
  result: z.string().describe('The final result of the calculation.'),
  steps: z.array(z.object({
    title: z.string().describe('The title of the solution step.'),
    explanation: z.string().describe('The detailed explanation for this step.'),
  })).describe('A step-by-step breakdown of the solution.'),
});
export type FormulaSolverOutput = z.infer<typeof FormulaSolverOutputSchema>;

export async function solveFormula(input: FormulaSolverInput): Promise<FormulaSolverOutput> {
  return formulaSolverFlow(input);
}

const prompt = ai.definePrompt({
  name: 'formulaSolverPrompt',
  input: {schema: FormulaSolverInputSchema},
  output: {schema: FormulaSolverOutputSchema},
  prompt: `You are a mathematics expert. Your task is to solve the given formula with the provided variables and provide a clear, step-by-step explanation of the solution.

Formula to solve: {{{formulaName}}}
Variables:
{{#each variables}}
- {{ @key }}: {{ this }}
{{/each}}

Please provide the final result and a detailed breakdown of each step in the calculation.
For the quadratic formula, first calculate the discriminant, explain its meaning (two real roots, one real root, or two complex roots), and then find the roots x1 and x2.
`,
});

const formulaSolverFlow = ai.defineFlow(
  {
    name: 'formulaSolverFlow',
    inputSchema: FormulaSolverInputSchema,
    outputSchema: FormulaSolverOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
