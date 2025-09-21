"use client";

import Container from "@/components/atoms/Container/Container";
import EmptyState from "@/components/atoms/EmptyState/EmptyState";
import LoadState from "@/components/atoms/LoadState/LoadState";
import AdminDashboardCardWrapper from "@/components/molecules/AdminDashboardCardWrapper/AdminDashboardCardWrapper";
import DashboardHeader from "@/components/molecules/DashboardHeader/DashboardHeader";
import { AuthContext } from "@/contexts/AuthState";
import { useUserStat } from "@/lib/hooks/useUserStat";
import CompaniesSection from "@/services/users/components/CompaniesSection/CompaniesSection";
import { useGetProfile } from "@/services/users/hooks/useGetProfile";
import { useContext } from "react";

const UserCompanyWrapper = () => {
  const { currentUser } = useContext(AuthContext);
  const {
    isFetching,
    userStats,
    currentRange,
    handleDateRangeChange,
    getUserStats,
  } = useUserStat(currentUser?.id);
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
    totalItems,
  } = useGetProfile();

  if (loading) {
    return <LoadState message="Loading your information..." />;
  }

  if (!profile) {
    return (
      <EmptyState
        title="Not Found"
        description="The requested user information could not be found."
      />
    );
  }

  return (
    <Container>
      <div className="space-y-8">
        <DashboardHeader
          title="Companies"
          description="Monitor your registered companies on the platform"
        />
        <AdminDashboardCardWrapper
          handleDateRangeChange={handleDateRangeChange}
          loading={isFetching}
        />
        <CompaniesSection
          companies={profile.companies}
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
      </div>
    </Container>
  );
};

export default UserCompanyWrapper;
