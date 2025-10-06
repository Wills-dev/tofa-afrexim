import Card from "@/components/atoms/Card/Card";

import { ActivityLogType } from "../types";
import { convertDateFormat } from "@/lib/helpers/dateFormats";

interface ActivityLogProps {
  activityLog: ActivityLogType[];
}

const ActivityLog = ({ activityLog }: ActivityLogProps) => {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Activity Log</h3>

      <div className="space-y-4">
        {activityLog?.map((activity: ActivityLogType, i: number) => (
          <div className="" key={i}>
            <h6 className="font-light">{activity?.userName}</h6>
            <p className="text-sm text-gray-500">{activity?.activity}</p>
            <p className="text-xs">
              {activity?.timestamp && convertDateFormat(activity?.timestamp)}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ActivityLog;
