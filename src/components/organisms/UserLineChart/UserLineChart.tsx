"use client";

import { useState } from "react";

import Button from "@/components/atoms/Button/Button";
import Card from "@/components/atoms/Card/Card";
import LineCharts from "../Charts/LineChart";
import DateRangePicker from "@/components/molecules/DateRangePicker/DateRangePicker";
import ChartLoader from "@/components/molecules/skeletonLoaders/ChartLoader";

import { ChartConfig } from "@/components/ui/chart";
import { ResponsiveContainer } from "recharts";
import { useUserComapnyChart } from "@/services/auth/hooks/useUserComapnyChart";
import { DateRange } from "@/lib/types";

const chartConfig = {
  value: {
    label: "Company",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const UserLineChart = () => {
  const { getComanyChart, isFetching, companyChart, sortBy, setSortBy } =
    useUserComapnyChart();

  const [currentRange, setCurrentRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const onDateRangeChange = (range: DateRange) => {
    setCurrentRange(range);
    if (range.startDate && range.endDate) {
      getComanyChart(range || currentRange);
    }
  };

  return (
    <Card className="lg:col-span-2 p-6 space-y-2">
      <div className="flex justify-end">
        <DateRangePicker onDateRangeChange={onDateRangeChange} />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Onboarding Progress
          </h3>
          <p className="text-sm text-gray-500">Companies onboarded over time</p>
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
      <div className="space-y-2">
        {isFetching ? (
          <ChartLoader />
        ) : (
          <div className="">
            <ResponsiveContainer width="100%" height="100%">
              <LineCharts
                chartData={companyChart}
                chartConfig={chartConfig}
                dataKey="period"
                dataKey2="value"
              />
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </Card>
  );
};

export default UserLineChart;
