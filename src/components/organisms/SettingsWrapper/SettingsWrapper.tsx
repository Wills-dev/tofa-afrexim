import Container from "@/components/atoms/Container/Container";
import EmptyState from "@/components/atoms/EmptyState/EmptyState";
import LoadState from "@/components/atoms/LoadState/LoadState";
import AccountStatusCard from "@/services/users/components/AccountStatusCard/AccountStatusCard";
import BanksSection from "@/services/users/components/BankSection/BankSection";
import CompaniesSection from "@/services/users/components/CompaniesSection/CompaniesSection";
import UserProfileHeader from "@/services/users/components/UserProfileHeader/UserProfileHeader";
import { useGetProfile } from "@/services/users/hooks/useGetProfile";

const SettingsWrapper = () => {
  const {
    profile,
    loading,
    getProfileInfo,
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
  } = useGetProfile();

  if (loading) {
    return <LoadState message="Loading your information..." />;
  }

  if (!profile) {
    return (
      <EmptyState
        title="Not Found"
        description="Your requested information could not be found."
      />
    );
  }

  return (
    <Container>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Profile Information
        </h1>
      </div>
      <div className="space-y-8">
        <UserProfileHeader isSameUser={true} userData={profile} />
        <AccountStatusCard userData={profile} />
        <CompaniesSection
          companies={profile?.companies || []}
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
          isSameUser={true}
        />
        <BanksSection
          userData={profile}
          isSameUser={true}
          refreshUser={getProfileInfo}
        />
      </div>
    </Container>
  );
};

export default SettingsWrapper;
