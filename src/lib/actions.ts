"use server";

import { convertUnits as convertUnitsFlow, type ConvertUnitsInput } from '@/ai/flows/unit-converter';
import { solveFormula as solveFormulaFlow, type FormulaSolverInput, type FormulaSolverOutput } from '@/ai/flows/formula-solver';
import { z } from 'zod';

export type { FormulaSolverOutput };

const ConvertUnitsSchema = z.object({
  value: z.number(),
  fromUnit: z.string(),
  toUnit: z.string(),
});

const FormulaSolverSchema = z.object({
    formulaName: z.string(),
    variables: z.record(z.number()),
});

export async function handleUnitConversion(input: ConvertUnitsInput) {
  const parsedInput = ConvertUnitsSchema.safeParse(input);

  if (!parsedInput.success) {
    throw new Error('Invalid input for unit conversion.');
  }

  const result = await convertUnitsFlow(parsedInput.data);
  return result;
}

export async function handleFormulaSolve(input: FormulaSolverInput) {
    const parsedInput = FormulaSolverSchema.safeParse(input);

    if (!parsedInput.success) {
        throw new Error('Invalid input for formula solver.');
    }

    const result = await solveFormulaFlow(parsedInput.data);
    return result;
}
