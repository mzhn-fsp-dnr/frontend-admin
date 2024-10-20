"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { DepartmentDays } from "@/api/query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple bar chart";

const chartConfig = {
  day: {
    label: "День недели",
    color: "#2563eb",
  },
  visit_count: {
    label: "Кол-во посетителей",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export type Props = {
  data: DepartmentDays[];
};

export function DaysDiagram({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Кол-во посетителей в среднем по дням недели</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="visit_count" fill="var(--color-desktop)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
