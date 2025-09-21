"use client";

import { FormEvent, useContext } from "react";

import Container from "@/components/atoms/Container/Container";
import EmptyState from "@/components/atoms/EmptyState/EmptyState";
import LoadState from "@/components/atoms/LoadState/LoadState";
import AdminDashboardCardWrapper from "@/components/molecules/AdminDashboardCardWrapper/AdminDashboardCardWrapper";
import DashboardHeader from "@/components/molecules/DashboardHeader/DashboardHeader";
import CompaniesSection from "@/services/users/components/CompaniesSection/CompaniesSection";

import { AuthContext } from "@/contexts/AuthState";
import { useUserStat } from "@/lib/hooks/useUserStat";
import { useGetProfile } from "@/services/users/hooks/useGetProfile";

const UserCompanyWrapper = () => {
  const { currentUser } = useContext(AuthContext);
  const { isFetching, userStats, handleDateRangeChange } = useUserStat(
    currentUser?.id
  );

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
          totalCompanies={userStats?.totalCompanies || 0}
          totalPendingCompanies={userStats?.totalPendingCompanies || 0}
          totalProcessingCompanies={userStats?.totalProcessingCompanies || 0}
          totalAcceptedCompanies={userStats?.totalAcceptedCompanies || 0}
          totalDeclinedCompanies={userStats?.totalDeclinedCompanies || 0}
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
