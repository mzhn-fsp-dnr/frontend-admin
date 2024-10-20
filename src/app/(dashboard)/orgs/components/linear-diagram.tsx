"use client";

import { DepartmentTime } from "@/api/query";
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
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const chartConfig = {
  awg_wait_time: {
    label: "Среднее время ожидания (Мин)",
    color: "#fff",
  },
} satisfies ChartConfig;

export type Props = {
  data: DepartmentTime[];
};

export function LinearDiagram({ data }: Props) {
  function fillHours(data: DepartmentTime[]) {
    const startHour = 8;
    const endHour = 19;
    const existingHours = data.map((item) => item.hour);

    for (let hour = startHour; hour <= endHour; hour++) {
      const formattedHour = String(hour).padStart(2, "0") + ":00";
      if (!existingHours.includes(formattedHour)) {
        data.push({
          awg_wait_time: 0,
          hour: formattedHour,
        });
      }
    }
  }

  fillHours(data);
  data.sort((a: any, b: any) => a.hour.localeCompare(b.hour));

  return (
    <Card>
      <CardHeader className="mx-10">
        <CardTitle>Среднее время ожидания вызова</CardTitle>
        <CardDescription>
          Время ожидания от момента получения талона до вызова оператором.{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              dataKey="awg_wait_time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="awg_wait_time"
              type="linear"
              stroke="#000"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
