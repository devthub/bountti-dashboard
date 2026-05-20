import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { commissionRows } from "@/lib/bountti-dashboard-data";

import { BounttiTable } from "./bountti-table";
import { StatCard } from "./stat-card";
import { StatusBadge } from "./status-badge";

export function ReportsPage() {
  const months = [55, 45, 60, 70, 65, 88];
  const labels = ["Dec", "Jan", "Feb", "Mar", "Apr", "May"];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Platform analytics · Commissions · Settlements
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">This Month</Button>
          <Button variant="outline">
            <Download className="size-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Total Commissions Paid"
          value="$84,200"
          change="+22% MTD"
          highlight
        />
        <StatCard label="RP+ Network Earnings" value="$58,100" />
        <StatCard label="RP1 Network Earnings" value="$26,100" />
      </div>

      <Card className="ring-border rounded-xl">
        <CardHeader className="border-b">
          <CardTitle>Monthly Transaction Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-40 items-end justify-around gap-4">
            {months.map((height, index) => {
              const label = labels[index] ?? String(index + 1);
              const isCurrent = label === "May";
              return (
                <div
                  key={label}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <div
                    className={
                      isCurrent
                        ? "bg-bountti-cyan w-9 rounded-t"
                        : "bg-muted hover:bg-bountti-cyan w-9 rounded-t"
                    }
                    style={{ height: `${height}%` }}
                  />
                  <div
                    className={
                      isCurrent
                        ? "text-bountti-cyan text-xs font-semibold"
                        : "text-muted-foreground text-xs"
                    }
                  >
                    {label}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <BounttiTable
        headers={[
          "Affiliate",
          "Level",
          "Model",
          "Linked Merchants",
          "Volume",
          "Commission",
        ]}
      >
        {commissionRows.map((row) => (
          <tr
            key={`${row.affiliate}-${row.level}`}
            className="hover:bg-muted/40"
          >
            <td className="px-5 py-3">{row.affiliate}</td>
            <td className="px-5 py-3">
              <StatusBadge tone={row.level === "L1" ? "enabled" : "neutral"}>
                {row.level}
              </StatusBadge>
            </td>
            <td className="px-5 py-3">{row.model}</td>
            <td className="px-5 py-3">{row.merchants}</td>
            <td className="px-5 py-3 font-mono text-xs">{row.volume}</td>
            <td className="text-bountti-green px-5 py-3 font-mono text-xs font-semibold">
              {row.commission}
            </td>
          </tr>
        ))}
      </BounttiTable>
    </div>
  );
}
