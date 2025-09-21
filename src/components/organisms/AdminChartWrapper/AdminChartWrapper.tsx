import { useState } from "react";
import AdminAreaChart from "../AdminAreaChart/AdminAreaChart";
import AdminLineChart from "../AdminLineChart/AdminLineChart";
import { DateRange } from "@/lib/types";
import { useAdminCompanyChart } from "@/services/auth/hooks/useAdminCompanyChart";
import DateRangePicker from "@/components/molecules/DateRangePicker/DateRangePicker";
import { useAdminUserChart } from "@/services/auth/hooks/useAdminUserChart";

const AdminChartWrapper = () => {
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
  } = useAdminCompanyChart();
  const {
    getUserCharts,
    isFetching,
    userChart,
    sortBy: sort,
    setSortBy: setSort,
  } = useAdminUserChart();

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

export default AdminChartWrapper;
