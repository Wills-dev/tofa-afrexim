"use client";

import Card from "@/components/atoms/Card/Card";

import { AdminChartProps } from "@/lib/types";
import { ChartConfig } from "@/components/ui/chart";
import { ResponsiveContainer } from "recharts";

import LineCharts from "../Charts/LineChart";
import Button from "@/components/atoms/Button/Button";
import ChartLoader from "@/components/molecules/skeletonLoaders/ChartLoader";

const chartConfig = {
  value: {
    label: "Company",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const AdminLineChart = ({
  data,
  isFetching,
  setSortBy,
  sortBy,
}: AdminChartProps) => {
  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Company Onboarding Trends
          </h3>
        </div>
        <div className="flex gap-2">
          <Button
            variant={sortBy === "monthly" ? "primary" : "outline"}
            size="sm"
            onClick={() => setSortBy("monthly")}
          >
            monthly
          </Button>
          <Button
            variant={sortBy === "weekly" ? "primary" : "outline"}
            size="sm"
            onClick={() => setSortBy("weekly")}
          >
            Weekly
          </Button>
        </div>
      </div>
      {isFetching ? (
        <ChartLoader />
      ) : (
        <div className="">
          <ResponsiveContainer width="100%" height="100%">
            <LineCharts
              chartData={data}
              chartConfig={chartConfig}
              dataKey="period"
              dataKey2="value"
            />
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
};

export default AdminLineChart;
