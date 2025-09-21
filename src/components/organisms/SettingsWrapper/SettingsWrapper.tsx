import Container from "@/components/atoms/Container/Container";
import AccountStatusCard from "@/services/users/components/AccountStatusCard/AccountStatusCard";
import BanksSection from "@/services/users/components/BankSection/BankSection";
import UserProfileHeader from "@/services/users/components/UserProfileHeader/UserProfileHeader";

import { UserData } from "@/services/users/types";

const SettingsWrapper = ({
  currentUser,
  refreshUser,
}: {
  currentUser: UserData;
  refreshUser: () => void;
}) => {
  return (
    <Container>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Profile Information
        </h1>
      </div>
      <div className="space-y-8">
        <UserProfileHeader isSameUser={true} userData={currentUser} />
        <AccountStatusCard userData={currentUser} />
        <BanksSection
          userData={currentUser}
          isSameUser={true}
          refreshUser={refreshUser}
        />
      </div>
    </Container>
  );
};

export default SettingsWrapper;
