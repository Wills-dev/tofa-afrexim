import { useState } from "react";

import { DateRange } from "@/lib/types";
import { useSupervisorUserChart } from "@/services/auth/hooks/useSupervisorUserChart";
import { useSupervisorCompannyChart } from "@/services/auth/hooks/useSupervisorCompannyChart";

import DateRangePicker from "@/components/molecules/DateRangePicker/DateRangePicker";
import AdminLineChart from "../AdminLineChart/AdminLineChart";
import AdminAreaChart from "../AdminAreaChart/AdminAreaChart";

const SupervisorChartWrapper = () => {
  const [currentRange, setCurrentRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const {
    getComanyChart,
    isFetching: isLoading,
    companyChart,
    sortBy,
    setSortBy,
  } = useSupervisorCompannyChart();

  const {
    getUserCharts,
    isFetching,
    userChart,
    sortBy: sort,
    setSortBy: setSort,
  } = useSupervisorUserChart();

  const onDateRangeChange = (range: DateRange) => {
    setCurrentRange(range);
    if (range.startDate && range.endDate) {
      getComanyChart(range || currentRange);
      getUserCharts(range || currentRange);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <DateRangePicker onDateRangeChange={onDateRangeChange} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminLineChart
          isFetching={isLoading}
          data={companyChart}
          setSortBy={setSortBy}
          sortBy={sortBy}
        />
        <AdminAreaChart
          isFetching={isFetching}
          data={userChart}
          setSortBy={setSort}
          sortBy={sort}
        />
      </div>
    </div>
  );
};

export default SupervisorChartWrapper;
