"use client";

import { useState, useTransition } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { handleUnitConversion } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"

const unitCategories = {
  Length: ['meters', 'kilometers', 'miles', 'feet', 'inches'],
  Weight: ['grams', 'kilograms', 'pounds', 'ounces'],
  Temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
};

const formSchema = z.object({
  value: z.coerce.number({ invalid_type_error: 'Please enter a number' }),
  fromUnit: z.string().min(1, 'Please select a unit'),
  toUnit: z.string().min(1, 'Please select a unit'),
});

type FormValues = z.infer<typeof formSchema>;

export function UnitConverterView() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ convertedValue: number; unit: string } | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: 1,
      fromUnit: '',
      toUnit: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    setResult(null);
    startTransition(async () => {
      try {
        const res = await handleUnitConversion(data);
        setResult(res);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Conversion Failed",
          description: "Could not perform the unit conversion. Please try again.",
        })
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unit Converter</CardTitle>
        <CardDescription>Convert between various units of measurement.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter value" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between gap-2">
              <FormField
                control={form.control}
                name="fromUnit"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>From</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select unit" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(unitCategories).map(([category, units]) => (
                          <div key={category}>
                            <p className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">{category}</p>
                            {units.map(unit => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ArrowRight className="mt-8 size-5 text-muted-foreground" />
              <FormField
                control={form.control}
                name="toUnit"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>To</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select unit" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(unitCategories).map(([category, units]) => (
                          <div key={category}>
                            <p className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">{category}</p>
                            {units.map(unit => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-4">
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Convert
            </Button>
            {result && (
              <div className="text-center p-4 bg-muted rounded-md">
                <p className="text-lg font-bold text-primary">
                  {result.convertedValue.toFixed(4)} {result.unit}
                </p>
              </div>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
