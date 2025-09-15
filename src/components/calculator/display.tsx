import { cn } from "@/lib/utils";

type DisplayProps = {
  value: string;
  expression?: string;
};

export const Display = ({ value, expression }: DisplayProps) => {
  const getFontSize = (length: number) => {
    if (length > 14) return 'text-2xl';
    if (length > 10) return 'text-3xl';
    if (length > 7) return 'text-4xl';
    return 'text-5xl';
  };

  return (
    <div className="bg-muted rounded-md p-4 text-right overflow-hidden break-all h-28 flex flex-col justify-end">
      <p className="text-muted-foreground text-lg h-6 mb-1 truncate">
        {expression || ''}
      </p>
      <p 
        className={cn(
          "font-sans font-bold text-foreground transition-all duration-200",
          getFontSize(value.length)
        )}
      >
        {value}
      </p>
    </div>
  );
};
