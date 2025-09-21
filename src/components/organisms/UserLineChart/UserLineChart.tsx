"use client";

import Button from "@/components/atoms/Button/Button";
import Card from "@/components/atoms/Card/Card";
import LineCharts from "../Charts/LineChart";

import { ChartConfig } from "@/components/ui/chart";
import { ResponsiveContainer } from "recharts";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const UserLineChart = () => {
  return (
    <Card className="lg:col-span-2 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Onboarding Progress
          </h3>
          <p className="text-sm text-gray-500">Companies onboarded over time</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Monthly
          </Button>
          <Button variant="outline" size="sm">
            Weekly
          </Button>
        </div>
      </div>
      <div>
        <ResponsiveContainer width="100%" height="100%">
          <LineCharts
            chartData={chartData}
            chartConfig={chartConfig}
            dataKey="month"
            dataKey2="desktop"
          />
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default UserLineChart;
