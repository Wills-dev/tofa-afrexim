import { useGetAgentInfo } from "@/services/users/hooks/useGetAgentInfo";

import LoadState from "@/components/atoms/LoadState/LoadState";
import EmptyState from "@/components/atoms/EmptyState/EmptyState";
import Container from "@/components/atoms/Container/Container";
import BackButton from "@/components/atoms/BackButton/BackButton";
import UserProfileHeader from "@/services/users/components/UserProfileHeader/UserProfileHeader";
import AccountStatusCard from "@/services/users/components/AccountStatusCard/AccountStatusCard";
import CompaniesSection from "@/services/users/components/CompaniesSection/CompaniesSection";
import BanksSection from "@/services/users/components/BankSection/BankSection";
import AdminSupervisorAgents from "../AdminSupervisorAgents/AdminSupervisorAgents";

const AdminSupervisorInfo = ({ userId }: { userId: string }) => {
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

  if (loading) {
    return <LoadState message="Loading supervisor information..." />;
  }

  if (!agentInfo) {
    return (
      <EmptyState
        title="Supervisor Not Found"
        description="The requested supervisor information could not be found."
      />
    );
  }

  return (
    <Container>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Super Information
          </h1>
          <p className="text-sm text-gray-600">View and manage user details</p>
        </div>
        <BackButton />
      </div>
      <div className="space-y-8">
        <UserProfileHeader
          isSameUser={false}
          userData={agentInfo && agentInfo}
        />
        <AccountStatusCard userData={agentInfo && agentInfo} />
        <AdminSupervisorAgents userId={userId} />
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
          isSameUser={false}
        />
        <BanksSection
          userData={agentInfo && agentInfo}
          isSameUser={false}
          refreshUser={getAgentInfo}
        />
      </div>
    </Container>
  );
};

export default AdminSupervisorInfo;
