"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

type ApmMethod = {
  name:
    | "Card Processing"
    | "Open Banking"
    | "Apple Pay"
    | "Google Pay"
    | "Crypto Rail"
    | "BNPL";
  type: string;
  icon: string;
  status: "live" | "disabled";
};

const apmMethods = [
  {
    name: "Card Processing",
    type: "Visa · Mastercard · Amex",
    icon: "💳",
    status: "live",
  },
  {
    name: "Open Banking",
    type: "PSD2 · SEPA · Faster Pay",
    icon: "🏦",
    status: "live",
  },
  {
    name: "Apple Pay",
    type: "Wallet · NFC",
    icon: "📱",
    status: "live",
  },
  {
    name: "Google Pay",
    type: "Wallet · Tap to Pay",
    icon: "🔵",
    status: "live",
  },
  {
    name: "Crypto Rail",
    type: "BTC · ETH · USDC",
    icon: "₿",
    status: "disabled",
  },
  {
    name: "BNPL",
    type: "Klarna · Afterpay",
    icon: "🧾",
    status: "disabled",
  },
] satisfies ApmMethod[];

type ApmMethodName = (typeof apmMethods)[number]["name"];

const defaultEnabledMethods: ApmMethodName[] = [
  "Card Processing",
  "Open Banking",
  "Apple Pay",
  "Google Pay",
];

export function ApmControls() {
  const [enabledMethods, setEnabledMethods] = useState<ApmMethodName[]>(
    defaultEnabledMethods,
  );

  const enabledMethodSet = useMemo(
    () => new Set<ApmMethodName>(enabledMethods),
    [enabledMethods],
  );

  const toggleMethod = (methodName: ApmMethodName) => {
    setEnabledMethods((currentMethods) => {
      if (currentMethods.includes(methodName)) {
        return currentMethods.filter((item) => item !== methodName);
      }

      return [...currentMethods, methodName];
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-[22px] font-bold tracking-tight">
            APM API Controls
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage alternative payment method integrations and API keys.
          </p>
        </div>

        <Button
          size="sm"
          className="h-9 bg-bountti-cyan px-4 text-bountti-dark hover:bg-bountti-cyan/90"
        >
          Add APM
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4 px-5 py-4">
          <div>
            <CardTitle className="text-base">API Credentials</CardTitle>
            <CardDescription>Live environment</CardDescription>
          </div>

          <Button variant="outline" size="sm">
            Rotate Keys
          </Button>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-5 p-5">
          <div className="space-y-2">
            <p className="text-sm font-medium">Live API Key</p>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="min-w-0 flex-1 rounded-md border bg-muted px-3 py-2 font-mono text-sm text-muted-foreground">
                bnt_live_••••••••••••••••••••••••••••••••••
              </div>

              <Button variant="outline" size="sm">
                Copy
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Webhook Endpoint</p>

            <div className="overflow-x-auto rounded-md border bg-muted px-3 py-2 font-mono text-sm">
              https://api.bountti.io/webhooks/v2/events
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-5 py-4">
          <CardTitle className="text-base">Payment Methods</CardTitle>
          <CardDescription>
            Toggle to enable or disable per merchant group.
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="p-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {apmMethods.map((method) => {
              const isEnabled = enabledMethodSet.has(method.name);

              return (
                <Card
                  key={method.name}
                  className={isEnabled ? "border-ring bg-accent/70" : undefined}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted text-xl">
                      {method.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium leading-none">
                          {method.name}
                        </p>
                        <Badge variant={isEnabled ? "default" : "secondary"}>
                          {isEnabled ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>

                      <p className="mt-1.5 text-sm text-muted-foreground">
                        {method.type}
                      </p>
                    </div>

                    <Switch
                      checked={isEnabled}
                      onCheckedChange={() => toggleMethod(method.name)}
                      aria-label={`Toggle ${method.name}`}
                    />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
