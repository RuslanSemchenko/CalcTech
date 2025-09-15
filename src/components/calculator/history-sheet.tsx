import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type HistoryItem = {
  expression: string;
  result: string;
};

type HistorySheetProps = {
  history: HistoryItem[];
};

export const HistorySheet = ({ history }: HistorySheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <History className="h-5 w-5" />
          <span className="sr-only">View Calculation History</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Calculation History</SheetTitle>
          <SheetDescription>
            Here are your recent calculations.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100%-4rem)] mt-4 pr-4">
          <div className="flex flex-col gap-4">
            {history.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center mt-8">No history yet.</p>
            ) : (
              history.map((item, index) => (
                <div key={index} className="text-right">
                  <p className="text-muted-foreground text-sm">{item.expression}</p>
                  <p className="font-semibold text-lg">{item.result}</p>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
