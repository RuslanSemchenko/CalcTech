import { CalculatorApp } from '@/components/calculator-app';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background p-2 sm:p-4">
      <CalculatorApp />
    </main>
  );
}
