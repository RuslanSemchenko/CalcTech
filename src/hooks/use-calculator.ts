"use client";
import { useState, useCallback } from 'react';

type HistoryItem = {
  expression: string;
  result: string;
};

type CalculatorState = {
  display: string;
  operation: string | null;
  currentValue: string | null;
  previousValue: string | null;
  isNewEntry: boolean;
  expression: string;
};

const initialState: CalculatorState = {
  display: '0',
  operation: null,
  currentValue: '0',
  previousValue: null,
  isNewEntry: true,
  expression: '',
};

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>(initialState);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [memory, setMemory] = useState<number>(0);

  const calculate = (val1: number, val2: number, op: string): number => {
    switch (op) {
      case '+': return val1 + val2;
      case '-': return val1 - val2;
      case '*': return val1 * val2;
      case '/': return val1 / val2;
      case '^': return Math.pow(val1, val2);
      default: return val2;
    }
  };

  const clear = useCallback(() => {
    setState(initialState);
  }, []);

  const inputDigit = useCallback((digit: string) => {
    setState(prevState => {
      if (prevState.isNewEntry) {
        return { ...prevState, display: digit, currentValue: digit, isNewEntry: false };
      }
      if (prevState.display === '0' && digit === '0') return prevState;
      if (prevState.display.length > 15) return prevState;

      const newDisplay = prevState.display === '0' ? digit : prevState.display + digit;
      return { ...prevState, display: newDisplay, currentValue: newDisplay };
    });
  }, []);

  const inputDecimal = useCallback(() => {
    setState(prevState => {
      if (prevState.isNewEntry) {
        return { ...prevState, display: '0.', currentValue: '0.', isNewEntry: false };
      }
      if (!prevState.display.includes('.')) {
        const newDisplay = prevState.display + '.';
        return { ...prevState, display: newDisplay, currentValue: newDisplay };
      }
      return prevState;
    });
  }, []);

  const performOperation = useCallback((nextOperation: string) => {
    setState(prevState => {
      const { previousValue, currentValue, operation } = prevState;
      const current = parseFloat(currentValue || '0');

      if (previousValue === null) {
        return { 
          ...prevState, 
          operation: nextOperation, 
          previousValue: String(current), 
          isNewEntry: true,
          expression: `${current} ${nextOperation}`
        };
      }

      if (operation) {
        if (prevState.isNewEntry) {
          return { 
            ...prevState, 
            operation: nextOperation,
            expression: `${prevState.previousValue} ${nextOperation}`
          };
        }
        const previous = parseFloat(previousValue);
        const result = calculate(previous, current, operation);
        const resultString = String(result);
        const newHistoryItem = { expression: `${previous} ${operation} ${current} =`, result: resultString };
        setHistory(prevHistory => [newHistoryItem, ...prevHistory]);

        return {
          ...prevState,
          display: resultString,
          previousValue: resultString,
          currentValue: resultString,
          operation: nextOperation,
          isNewEntry: true,
          expression: `${resultString} ${nextOperation}`
        };
      }
      
      return { 
        ...prevState, 
        operation: nextOperation, 
        isNewEntry: true,
        expression: `${prevState.display} ${nextOperation}`
      };
    });
  }, []);

  const handleEquals = useCallback(() => {
    setState(prevState => {
      const { operation, previousValue, currentValue } = prevState;
      if (!operation || previousValue === null || currentValue === null) {
        return prevState;
      }

      const previous = parseFloat(previousValue);
      const current = parseFloat(currentValue);
      const result = calculate(previous, current, operation);
      const resultString = String(result).slice(0, 16);

      const fullExpression = `${previousValue} ${operation} ${currentValue} =`;
      const newHistoryItem = { expression: fullExpression, result: resultString };
      setHistory(prevHistory => [newHistoryItem, ...prevHistory]);

      return {
        ...initialState,
        display: resultString,
        currentValue: resultString,
        expression: fullExpression,
      };
    });
  }, []);
  
  const handleFunction = useCallback((func: string) => {
    setState(prevState => {
      const current = parseFloat(prevState.display);
      let result = 0;
      let expression = '';

      switch (func) {
        case '+/-':
          result = current * -1;
          break;
        case '%':
          result = current / 100;
          expression = `${current}%`;
          break;
        case 'sqrt':
          result = Math.sqrt(current);
          expression = `√(${current})`;
          break;
        case 'sin':
          result = Math.sin(current * (Math.PI / 180));
          expression = `sin(${current}°)`;
          break;
        case 'cos':
          result = Math.cos(current * (Math.PI / 180));
          expression = `cos(${current}°)`;
          break;
        case 'tan':
          result = Math.tan(current * (Math.PI / 180));
          expression = `tan(${current}°)`;
          break;
        case 'log':
          result = Math.log10(current);
          expression = `log(${current})`;
          break;
        case 'ln':
          result = Math.log(current);
          expression = `ln(${current})`;
          break;
      }
      
      const resultString = String(result).slice(0, 16);
      if (expression) {
        setHistory(prevHistory => [{ expression: `${expression} =`, result: resultString }, ...prevHistory]);
      }
      
      return { ...prevState, display: resultString, currentValue: resultString, isNewEntry: true, expression };
    });
  }, []);

  const handleConstant = useCallback((constant: string) => {
    const value = constant === 'π' ? Math.PI : Math.E;
    const valueString = String(value).slice(0, 16);
    setState({ ...initialState, display: valueString, currentValue: valueString, isNewEntry: false, expression: '' });
  }, []);

  const handleMemory = useCallback((memOp: 'M+' | 'M-' | 'MR' | 'MC') => {
    const currentDisplay = parseFloat(state.display);
    switch (memOp) {
      case 'M+':
        setMemory(prevMem => prevMem + currentDisplay);
        break;
      case 'M-':
        setMemory(prevMem => prevMem - currentDisplay);
        break;
      case 'MR':
        const memString = String(memory).slice(0, 16);
        setState(prevState => ({ ...prevState, display: memString, currentValue: memString, isNewEntry: true }));
        break;
      case 'MC':
        setMemory(0);
        break;
    }
    setState(prevState => ({ ...prevState, isNewEntry: true }));
  }, [state.display, memory]);

  return {
    display: state.display,
    expression: state.expression,
    history,
    actions: {
      clear,
      inputDigit,
      inputDecimal,
      performOperation,
      handleEquals,
      handleFunction,
      handleConstant,
      handleMemory,
    }
  };
};
