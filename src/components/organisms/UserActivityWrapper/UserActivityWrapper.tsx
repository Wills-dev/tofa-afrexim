import UserRecentActivities from "@/components/molecules/UserRecentActivities/UserRecentActivities";
import UserLineChart from "../UserLineChart/UserLineChart";

const UserActivityWrapper = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <UserLineChart />
      <UserRecentActivities />
    </div>
  );
};

export default UserActivityWrapper;
