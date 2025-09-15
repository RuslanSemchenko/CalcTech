'use server';

/**
 * @fileOverview Converts between different units of measurement.
 *
 * - convertUnits - A function that handles the unit conversion process.
 * - ConvertUnitsInput - The input type for the convertUnits function.
 * - ConvertUnitsOutput - The return type for the convertUnits function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConvertUnitsInputSchema = z.object({
  value: z.number().describe('The numerical value to convert.'),
  fromUnit: z.string().describe('The unit to convert from.'),
  toUnit: z.string().describe('The unit to convert to.'),
});
export type ConvertUnitsInput = z.infer<typeof ConvertUnitsInputSchema>;

const ConvertUnitsOutputSchema = z.object({
  convertedValue: z.number().describe('The converted numerical value.'),
  unit: z.string().describe('The unit the value was converted to.'),
});
export type ConvertUnitsOutput = z.infer<typeof ConvertUnitsOutputSchema>;

export async function convertUnits(input: ConvertUnitsInput): Promise<ConvertUnitsOutput> {
  return convertUnitsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'unitConverterPrompt',
  input: {schema: ConvertUnitsInputSchema},
  output: {schema: ConvertUnitsOutputSchema},
  prompt: `You are a unit conversion expert.

Convert the given value from the specified unit to the target unit.

Value: {{{value}}}
From Unit: {{{fromUnit}}}
To Unit: {{{toUnit}}}

Return the converted value and the unit it was converted to. Be as precise as possible.
`,
});

const convertUnitsFlow = ai.defineFlow(
  {
    name: 'convertUnitsFlow',
    inputSchema: ConvertUnitsInputSchema,
    outputSchema: ConvertUnitsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
