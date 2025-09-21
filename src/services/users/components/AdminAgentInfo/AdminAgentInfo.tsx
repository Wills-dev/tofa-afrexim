import Container from "@/components/atoms/Container/Container";
import EmptyState from "@/components/atoms/EmptyState/EmptyState";
import LoadState from "@/components/atoms/LoadState/LoadState";
import UserProfileHeader from "../UserProfileHeader/UserProfileHeader";
import AccountStatusCard from "../AccountStatusCard/AccountStatusCard";
import CompaniesSection from "../CompaniesSection/CompaniesSection";
import BanksSection from "../BankSection/BankSection";
import BackButton from "@/components/atoms/BackButton/BackButton";

import { useGetAgentInfo } from "../../hooks/useGetAgentInfo";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthState";

const AdminAgentInfo = ({ userId }: { userId: string }) => {
  const { currentUser } = useContext(AuthContext);
  const {
    agentInfo,
    loading,
    getAgentInfo,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    isFirstPage,
    isLastPage,
    limit,
    setLimit,
  } = useGetAgentInfo(userId);

  const isSameUser = currentUser?.id === agentInfo?.id;

  if (loading) {
    return <LoadState message="Loading user information..." />;
  }

  if (!agentInfo) {
    return (
      <EmptyState
        title="User Not Found"
        description="The requested user information could not be found."
      />
    );
  }

  return (
    <Container>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            User Information
          </h1>
          <p className="text-sm text-gray-600">View and manage user details</p>
        </div>
        <BackButton />
      </div>
      <div className="space-y-8">
        <UserProfileHeader
          isSameUser={isSameUser}
          userData={agentInfo && agentInfo}
        />
        <AccountStatusCard userData={agentInfo && agentInfo} />
        <CompaniesSection
          companies={agentInfo.companies}
          totalPages={totalPages}
          currentPage={currentPage}
          prevPage={prevPage}
          nextPage={nextPage}
          goToLastPage={goToLastPage}
          goToFirstPage={goToFirstPage}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          limit={limit}
          setLimit={setLimit}
          isSameUser={isSameUser}
        />
        <BanksSection
          userData={agentInfo && agentInfo}
          isSameUser={isSameUser}
          refreshUser={getAgentInfo}
        />
      </div>
    </Container>
  );
};

export default AdminAgentInfo;
