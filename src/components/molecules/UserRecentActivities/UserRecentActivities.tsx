import Card from "@/components/atoms/Card/Card";
import React from "react";

const UserRecentActivities = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {[
          {
            company: "Acme Corp",
            status: "approved",
            time: "2 hours ago",
            color: "green",
          },
          {
            company: "Tech Solutions",
            status: "pending",
            time: "4 hours ago",
            color: "orange",
          },
          {
            company: "Global Traders",
            status: "under review",
            time: "6 hours ago",
            color: "blue",
          },
          {
            company: "Export Ltd",
            status: "approved",
            time: "1 day ago",
            color: "green",
          },
        ].map((activity, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
          >
            <div
              className={`w-2 h-2 rounded-full mt-2 ${
                activity.color === "green"
                  ? "bg-green-500"
                  : activity.color === "orange"
                  ? "bg-orange-500"
                  : "bg-blue-500"
              }`}
            ></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {activity.company}
              </p>
              <p className="text-sm text-gray-500 capitalize">
                {activity.status}
              </p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UserRecentActivities;
