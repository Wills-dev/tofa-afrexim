import {
  CheckCircle,
  Mail,
  RefreshCw,
  Shield,
  User,
  XCircle,
} from "lucide-react";
import { UserData } from "../../types";
import { getAccountStatus } from "@/lib/helpers";
import Card from "@/components/atoms/Card/Card";
import Button from "@/components/atoms/Button/Button";
import Badge from "@/components/atoms/Badge/Badge";

const AccountStatusCard = ({ userData }: { userData: UserData }) => {
  const accountStatus = getAccountStatus(userData.isEmailVerified);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Account Status</h3>
        <Button variant="ghost" size="sm">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex sm:items-center justify-between max-sm:flex-col py-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">
              Account Status
            </span>
          </div>
          <Badge variant={accountStatus?.variant}>
            <accountStatus.icon className="h-3 w-3 mr-1" />
            {accountStatus?.status}
          </Badge>
        </div>

        <div className="flex sm:items-center justify-between max-sm:flex-col py-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">
              Email Verification
            </span>
          </div>
          <Badge variant={userData?.isEmailVerified ? "success" : "danger"}>
            {userData?.isEmailVerified ? (
              <>
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified
              </>
            ) : (
              <>
                <XCircle className="h-3 w-3 mr-1" />
                Unverified
              </>
            )}
          </Badge>
        </div>

        <div className="flex sm:items-center justify-between max-sm:flex-col py-3">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Role</span>
          </div>
          <Badge variant="info">
            {userData?.role &&
              userData?.role.charAt(0).toUpperCase() + userData?.role.slice(1)}
          </Badge>
        </div>
      </div>

      {!userData?.isEmailVerified && (
        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-800">
            Email verification is pending. The user should check their email and
            click the verification link.
          </p>
        </div>
      )}
    </Card>
  );
};

export default AccountStatusCard;
