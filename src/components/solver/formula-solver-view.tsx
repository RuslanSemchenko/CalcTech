"use client";

import { useState, useTransition, useEffect } from 'react';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { handleFormulaSolve, FormulaSolverOutput } from '@/lib/actions';
import { useToast } from "@/hooks/use-toast"

const formulas = {
  quadratic: {
    name: 'Quadratic Formula',
    equation: 'ax² + bx + c = 0',
    variables: [
      { key: 'a', label: 'Value a' },
      { key: 'b', label: 'Value b' },
      { key: 'c', label: 'Value c' }
    ],
  },
  pythagorean: {
    name: 'Pythagorean Theorem',
    equation: 'a² + b² = c²',
     variables: [
      { key: 'a', label: 'Value a' },
      { key: 'b', label: 'Value b' }
    ],
    solveFor: 'c',
  },
  circleArea: {
    name: 'Area of a Circle',
    equation: 'A = πr²',
    variables: [
      { key: 'radius', label: 'Radius (r)' }
    ],
    solveFor: 'Area',
  },
  simpleInterest: {
    name: 'Simple Interest',
    equation: 'I = Prt',
    variables: [
      { key: 'principal', label: 'Principal (P)' },
      { key: 'rate', label: 'Rate (r, as a decimal)' },
      { key: 'time', label: 'Time (t)' }
    ],
    solveFor: 'Interest',
  },
};

const formSchema = z.object({
  formulaName: z.string().min(1, "Please select a formula"),
  variables: z.record(z.coerce.number({ invalid_type_error: "Must be a number" })),
});

type FormValues = z.infer<typeof formSchema>;

export function FormulaSolverView() {
  const [selectedFormulaKey, setSelectedFormulaKey] = useState<keyof typeof formulas>('quadratic');
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<FormulaSolverOutput | null>(null);
  const { toast } = useToast();

  const currentFormula = formulas[selectedFormulaKey];
  const initialVariables = currentFormula.variables.reduce((acc, v) => ({ ...acc, [v.key]: 0 }), {});

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      formulaName: currentFormula.name,
      variables: initialVariables
    },
  });

  useEffect(() => {
    const newFormula = formulas[selectedFormulaKey];
    const newInitialVariables = newFormula.variables.reduce((acc, v) => ({ ...acc, [v.key]: 0 }), {});
    form.reset({
      formulaName: newFormula.name,
      variables: newInitialVariables,
    });
    setResult(null);
  }, [selectedFormulaKey, form]);


  const handleFormulaChange = (value: string) => {
    const formulaKey = Object.keys(formulas).find(key => formulas[key as keyof typeof formulas].name === value) as keyof typeof formulas;
    if (formulaKey) {
      setSelectedFormulaKey(formulaKey);
    }
  };
  
  const onSubmit = (data: FormValues) => {
    setResult(null);
    startTransition(async () => {
      try {
        const res = await handleFormulaSolve({ formulaName: data.formulaName, variables: data.variables });
        setResult(res);
      } catch (error) {
         toast({
          variant: "destructive",
          title: "Calculation Failed",
          description: "Could not solve the formula. Please check your inputs.",
        })
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Formula Solver</CardTitle>
        <CardDescription>{currentFormula.equation}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="formulaName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Formula</FormLabel>
                   <Select onValueChange={handleFormulaChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a formula" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(formulas).map(f => <SelectItem key={f.name} value={f.name}>{f.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-4">
              {currentFormula.variables.map(variable => (
                  <FormField
                    key={variable.key}
                    control={form.control}
                    name={`variables.${variable.key}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{variable.label}</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder={`Enter value for ${variable.key}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              ))}
            </div>
            
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-4">
             <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Solve with AI
            </Button>
            {result && (
              <div className="space-y-4">
                <div className="text-center p-4 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">Result</p>
                  <p className="text-lg font-bold text-primary">{result.result}</p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>View detailed steps</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        {result.steps.map((step, index) => (
                          <div key={index} className="p-3 bg-muted/50 rounded-md">
                            <p className="font-semibold">{step.title}</p>
                            <p className="text-sm text-muted-foreground mt-1">{step.explanation}</p>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
