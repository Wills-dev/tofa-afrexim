import {
  Building2,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  GoalIcon,
} from "lucide-react";

import DashboardCard from "../DashboardCard/DashboardCard";
import StatCardSkeleton from "../skeletonLoaders/StatCardSkeleton";
import { DateRange } from "@/lib/types";
import DateRangePicker from "../DateRangePicker/DateRangePicker";

interface AdminDashboardCardWrapperProps {
  isPage?: "companies" | "users";
  isAdmin?: boolean;
  loading: boolean;
  totalCompanies?: number;
  totalPendingCompanies?: number;
  totalProcessingCompanies?: number;
  totalAcceptedCompanies?: number;
  totalDeclinedCompanies?: number;
  totalUsers?: number;
  totalActiveUsers?: number;
  totalBlockedUsers?: number;
  handleDateRangeChange: (dateRange: DateRange) => void;
}

const AdminDashboardCardWrapper = ({
  isPage,
  loading,
  totalUsers,
  totalCompanies,
  totalPendingCompanies,
  totalProcessingCompanies,
  totalAcceptedCompanies,
  totalDeclinedCompanies,
  handleDateRangeChange,
  totalBlockedUsers,
  totalActiveUsers,
}: AdminDashboardCardWrapperProps) => {
  const showTotalUsers = totalUsers !== undefined;

  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <DateRangePicker onDateRangeChange={handleDateRangeChange} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6">
        {loading ? (
          <>
            {" "}
            {["", "", "", ""].map((skeleton, index) => (
              <StatCardSkeleton key={index} />
            ))}
          </>
        ) : (
          <>
            {showTotalUsers && (
              <DashboardCard
                title="Total Users"
                value={totalUsers}
                icon={Users}
                color="blue"
                trend="+8 this week"
              />
            )}

            {totalActiveUsers !== undefined && (
              <DashboardCard
                title="Total Active Users"
                value={totalActiveUsers}
                icon={GoalIcon}
                color="green"
                trend="+8 this week"
              />
            )}
            {totalBlockedUsers !== undefined && (
              <DashboardCard
                title="Total Blocked Users"
                value={totalBlockedUsers}
                icon={XCircle}
                color="red"
                trend="+8 this week"
              />
            )}

            {totalCompanies !== undefined && (
              <DashboardCard
                title="Total Companies"
                value={totalCompanies}
                icon={Building2}
                color="green"
                trend="+23 this month"
              />
            )}
            {totalPendingCompanies !== undefined && (
              <DashboardCard
                title="Pending"
                value={totalPendingCompanies}
                icon={Clock}
                color="orange"
                trend="Avg. 2.3 days"
              />
            )}
            {totalAcceptedCompanies !== undefined && (
              <DashboardCard
                title="Accepted"
                value={totalAcceptedCompanies}
                icon={CheckCircle}
                color="green"
                trend="82.7% rate"
              />
            )}
            {totalProcessingCompanies !== undefined && (
              <DashboardCard
                title="Processing"
                value={totalProcessingCompanies}
                icon={Clock}
                color="blue"
                trend="Avg. 2.3 days"
              />
            )}
            {totalDeclinedCompanies !== undefined && (
              <DashboardCard
                title="Declined"
                value={totalDeclinedCompanies}
                icon={XCircle}
                color="red"
                trend="4.3% rate"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardCardWrapper;
