"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Minus, X, Divide, Percent, SquareRadical, Baseline, History } from "lucide-react";

type KeypadProps = {
  actions: any;
  scientificMode: boolean;
};

const CalculatorButton = ({ children, onClick, className, ...props }: React.ComponentProps<typeof Button>) => (
  <Button
    variant="outline"
    className={cn("h-16 text-2xl font-semibold rounded-md transition-all duration-150 ease-in-out active:scale-95 focus:ring-2 focus:ring-primary/50 shadow-sm hover:shadow-md", className)}
    onClick={onClick}
    {...props}
  >
    {children}
  </Button>
);

export const Keypad = ({ actions, scientificMode }: KeypadProps) => {
  const { clear, inputDigit, inputDecimal, performOperation, handleEquals, handleFunction, handleConstant, handleMemory } = actions;

  return (
    <div className="grid grid-cols-4 gap-2">
      {/* Scientific Mode Buttons */}
      {scientificMode && (
        <>
          <CalculatorButton onClick={() => handleFunction('sin')} className="bg-secondary">sin</CalculatorButton>
          <CalculatorButton onClick={() => handleFunction('cos')} className="bg-secondary">cos</CalculatorButton>
          <CalculatorButton onClick={() => handleFunction('tan')} className="bg-secondary">tan</CalculatorButton>
          <CalculatorButton onClick={() => handleMemory('MC')} className="text-accent">MC</CalculatorButton>
          <CalculatorButton onClick={() => handleFunction('log')} className="bg-secondary">log</CalculatorButton>
          <CalculatorButton onClick={() => handleFunction('ln')} className="bg-secondary">ln</CalculatorButton>
          <CalculatorButton onClick={() => performOperation('^')} className="bg-secondary">xʸ</CalculatorButton>
          <CalculatorButton onClick={() => handleMemory('MR')} className="text-accent">MR</CalculatorButton>
          <CalculatorButton onClick={() => handleConstant('e')} className="bg-secondary">e</CalculatorButton>
          <CalculatorButton onClick={() => handleConstant('π')} className="bg-secondary">π</CalculatorButton>
          <CalculatorButton onClick={() => handleMemory('M+')} className="text-accent">M+</CalculatorButton>
          <CalculatorButton onClick={() => handleMemory('M-')} className="text-accent">M-</CalculatorButton>
        </>
      )}

      {/* Basic Buttons */}
      <CalculatorButton onClick={clear} className="bg-secondary">AC</CalculatorButton>
      <CalculatorButton onClick={() => handleFunction('+/-')} className="bg-secondary"><Baseline size={24} /></CalculatorButton>
      <CalculatorButton onClick={() => handleFunction('%')} className="bg-secondary"><Percent size={24} /></CalculatorButton>
      <CalculatorButton onClick={() => performOperation('/')} className="bg-accent text-accent-foreground"><Divide size={24} /></CalculatorButton>

      <CalculatorButton onClick={() => inputDigit('7')}>7</CalculatorButton>
      <CalculatorButton onClick={() => inputDigit('8')}>8</CalculatorButton>
      <CalculatorButton onClick={() => inputDigit('9')}>9</CalculatorButton>
      <CalculatorButton onClick={() => performOperation('*')} className="bg-accent text-accent-foreground"><X size={24} /></CalculatorButton>

      <CalculatorButton onClick={() => inputDigit('4')}>4</CalculatorButton>
      <CalculatorButton onClick={() => inputDigit('5')}>5</CalculatorButton>
      <CalculatorButton onClick={() => inputDigit('6')}>6</CalculatorButton>
      <CalculatorButton onClick={() => performOperation('-')} className="bg-accent text-accent-foreground"><Minus size={24} /></CalculatorButton>

      <CalculatorButton onClick={() => inputDigit('1')}>1</CalculatorButton>
      <CalculatorButton onClick={() => inputDigit('2')}>2</CalculatorButton>
      <CalculatorButton onClick={() => inputDigit('3')}>3</CalculatorButton>
      <CalculatorButton onClick={() => performOperation('+')} className="bg-accent text-accent-foreground"><Plus size={24} /></CalculatorButton>

      <CalculatorButton onClick={() => handleFunction('sqrt')} className="bg-secondary"><SquareRadical size={24} /></CalculatorButton>
      <CalculatorButton onClick={() => inputDigit('0')}>0</CalculatorButton>
      <CalculatorButton onClick={inputDecimal}>.</CalculatorButton>
      <CalculatorButton onClick={handleEquals} className="bg-primary text-primary-foreground text-3xl">=</CalculatorButton>
    </div>
  );
};
