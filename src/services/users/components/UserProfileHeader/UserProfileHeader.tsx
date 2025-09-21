import Card from "@/components/atoms/Card/Card";
import Button from "@/components/atoms/Button/Button";

import { UserData } from "../../types";
import { getInitials } from "@/lib/helpers";
import {
  Calendar,
  CheckCircle,
  Edit,
  Mail,
  MapPin,
  Phone,
  XCircle,
} from "lucide-react";
import { convertDateFormat } from "@/lib/helpers/dateFormats";

const UserProfileHeader = ({
  userData,
  isSameUser,
}: {
  userData: UserData;
  isSameUser: boolean;
}) => {
  return (
    <Card className="p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">
                {userData?.firstName &&
                  getInitials(userData?.firstName, userData?.lastName)}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {userData?.firstName} {userData?.lastName}
              </h1>
              <p className="text-gray-600 capitalize">
                {userData?.role} • ID: {userData?.id}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{userData?.email}</span>
                {userData?.isEmailVerified ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{userData?.phoneNumber}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{userData?.country}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  Joined{" "}
                  {userData?.createdAt &&
                    convertDateFormat(userData?.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {isSameUser && (
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" icon={<Edit className="h-4 w-4 mr-2" />}>
              Edit Profile
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default UserProfileHeader;
