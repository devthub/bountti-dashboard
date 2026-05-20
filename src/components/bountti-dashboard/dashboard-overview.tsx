import { Download, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  apmVolume,
  dashboardStats,
  recentTransactions,
} from "@/lib/bountti-dashboard-data";

import { StatCard } from "./stat-card";
import { StatusBadge } from "./status-badge";

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-[22px] font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Monday, 19 May 2026 · All systems operational
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-2 px-4">
            <Download className="size-4" />
            Export
          </Button>

          <Button
            size="sm"
            className="h-9 gap-2 bg-bountti-cyan px-4 text-bountti-dark hover:bg-bountti-cyan/90"
          >
            <Plus className="size-4" />
            New Merchant
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between gap-4 border-b px-5 py-4">
            <div>
              <CardTitle className="text-base">Recent Transactions</CardTitle>
              <CardDescription>Last 24 hours</CardDescription>
            </div>

            <Button variant="outline" size="sm">
              View all
            </Button>
          </CardHeader>

          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/60 hover:bg-muted/60">
                  <TableHead className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Transaction
                  </TableHead>
                  <TableHead className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Merchant
                  </TableHead>
                  <TableHead className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Amount
                  </TableHead>
                  <TableHead className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="px-5 py-3 font-mono text-xs">
                      {transaction.id}
                    </TableCell>
                    <TableCell className="px-5 py-3 text-[13.5px]">
                      {transaction.merchant}
                    </TableCell>
                    <TableCell className="px-5 py-3 font-mono text-xs">
                      {transaction.amount}
                    </TableCell>
                    <TableCell className="px-5 py-3">
                      <StatusBadge tone={transaction.status}>
                        {transaction.status}
                      </StatusBadge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b px-5 py-4">
            <CardTitle className="text-base">Volume by APM</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 p-5">
            {apmVolume.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="font-medium">{item.name}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {item.amount}
                  </span>
                </div>

                <Progress value={item.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
