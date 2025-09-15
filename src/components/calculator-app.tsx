"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Beaker, BrainCircuit } from 'lucide-react';
import { CalculatorView } from './calculator/calculator-view';
import { UnitConverterView } from './converters/unit-converter-view';
import { FormulaSolverView } from './solver/formula-solver-view';
import { ThemeToggle } from './theme-toggle';

export function CalculatorApp() {
  return (
    <div className="w-full max-w-sm rounded-lg bg-card p-4 shadow-lg border">
      <div className="flex justify-between items-center mb-4 px-2">
        <h1 className="text-2xl font-bold text-primary font-headline">CalcTech</h1>
        <ThemeToggle />
      </div>
      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-12">
          <TabsTrigger value="calculator" className="flex-1" aria-label="Calculator"><Calculator className="size-5" /></TabsTrigger>
          <TabsTrigger value="unit-converter" className="flex-1" aria-label="Unit Converter"><Beaker className="size-5" /></TabsTrigger>
          <TabsTrigger value="formula-solver" className="flex-1" aria-label="Formula Solver"><BrainCircuit className="size-5" /></TabsTrigger>
        </TabsList>
        <TabsContent value="calculator" className="mt-4">
          <CalculatorView />
        </TabsContent>
        <TabsContent value="unit-converter" className="mt-4">
          <UnitConverterView />
        </TabsContent>
        <TabsContent value="formula-solver" className="mt-4">
          <FormulaSolverView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
