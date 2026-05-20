import { ArrowDown, ArrowUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: string;
  change?: string;
  changeTone?: "up" | "down" | "neutral";
  highlight?: boolean;
};

export function StatCard({
  label,
  value,
  change,
  changeTone = "neutral",
  highlight = false,
}: StatCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-0.75 bg-border",
          highlight && "bg-bountti-cyan",
        )}
      />

      <CardContent className="p-5">
        <p className="text-muted-foreground text-xs font-medium tracking-wide">
          {label}
        </p>

        <div className="mt-2 font-mono text-[26px] font-bold tracking-tight">
          {value}
        </div>

        {change ? (
          <p
            className={cn(
              "mt-3 flex items-center gap-1 text-xs font-medium",
              changeTone === "up" && "text-bountti-green",
              changeTone === "down" && "text-bountti-red",
              changeTone === "neutral" && "text-muted-foreground",
            )}
          >
            {changeTone === "up" ? <ArrowUp className="size-3" /> : null}
            {changeTone === "down" ? <ArrowDown className="size-3" /> : null}
            {change}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
