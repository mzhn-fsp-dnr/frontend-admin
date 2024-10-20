"use client";

import { DepartmentServices } from "@/api/query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";
import { MAIN_COLOR } from "./daya-diagram";

const chartConfig = {
  service_name: {
    label: "Название услуги",
    color: "#fff",
  },
  percent: {
    label: "%",
    color: "#fff",
  },
} satisfies ChartConfig;

export type Props = {
  data: DepartmentServices[];
};

export function ServiceDiagram({ data }: Props) {
  console.log(data[0]);
  return (
    <Card className="flex flex-col">
      <CardHeader className="mx-10">
        <CardTitle>Распределение талонов по разным услугам (%)</CardTitle>
        <CardDescription>
          Распределение выражается в процентах от общего количества талонов
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data.map((item, i) => ({
                ...item,
                fill: `#${MAIN_COLOR + i * 700}`,
              }))}
              dataKey="percent"
              label
              nameKey="service_name"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
