import DashboardCard from "../DashboardCard/DashboardCard";

import { Building2, CheckCircle, Clock, XCircle } from "lucide-react";

const UserDashboardCardWrapper = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <DashboardCard
        title="Total Companies"
        value="24"
        icon={Building2}
        color="green"
        trend="+12% from last month"
      />
      <DashboardCard
        title="Approved"
        value="18"
        icon={CheckCircle}
        color="green"
        trend="75% success rate"
      />
      <DashboardCard
        title="Pending Review"
        value="4"
        icon={Clock}
        color="orange"
        trend="Avg. 3 days review"
      />
      <DashboardCard
        title="Declined"
        value="2"
        icon={XCircle}
        color="red"
        trend="8% decline rate"
      />
    </div>
  );
};

export default UserDashboardCardWrapper;
