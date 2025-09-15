"use client";

import { useState } from 'react';
import { useCalculator } from '@/hooks/use-calculator';
import { Display } from './display';
import { Keypad } from './keypad';
import { HistorySheet } from './history-sheet';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const CalculatorView = () => {
  const { display, expression, history, actions } = useCalculator();
  const [scientificMode, setScientificMode] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Display value={display} expression={expression} />
      <div className="flex items-center justify-between px-1">
        <HistorySheet history={history} />
        <div className="flex items-center space-x-2">
          <Switch 
            id="scientific-mode" 
            checked={scientificMode} 
            onCheckedChange={setScientificMode}
          />
          <Label htmlFor="scientific-mode">Sci</Label>
        </div>
      </div>
      <Keypad actions={actions} scientificMode={scientificMode} />
    </div>
  );
};
