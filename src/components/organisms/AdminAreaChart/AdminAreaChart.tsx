"use client";

import Card from "@/components/atoms/Card/Card";
import AreaCharts from "../Charts/AreaChart";
import Button from "@/components/atoms/Button/Button";

import { ChartConfig } from "@/components/ui/chart";
import { ResponsiveContainer } from "recharts";
import { AdminChartProps } from "@/lib/types";
import ChartLoader from "@/components/molecules/skeletonLoaders/ChartLoader";

const chartConfig = {
  value: {
    label: "User",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const AdminAreaChart = ({
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
            User Growth
          </h3>
        </div>
        <div className="flex gap-2">
          <Button
            variant={sortBy === "monthly" ? "primary" : "outline"}
            size="sm"
            onClick={() => setSortBy("monthly")}
          >
            Monthly
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
        <div>
          <ResponsiveContainer width="100%" height="100%">
            <AreaCharts
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

export default AdminAreaChart;
