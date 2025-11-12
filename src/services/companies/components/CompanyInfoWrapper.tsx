"use client";

import { useCallback, useContext } from "react";

import ActivityLog from "./ActivityLog";
import Alert from "@/components/atoms/Alert/Alert";
import Container from "@/components/atoms/Container/Container";
import LoadState from "@/components/atoms/LoadState/LoadState";
import EmptyState from "@/components/atoms/EmptyState/EmptyState";
import BackButton from "@/components/atoms/BackButton/BackButton";
import CompanyHeader from "./CompanyHeader";
import AdminContactInfo from "./AdminContactInfo";
import BusinessLicensing from "./BusinessLicensing";
import CompanyOverview from "./CompanyOverview";
import FinancialInformation from "./FinancialInformation";
import DocumentsSection from "./DocumentsSection";

import { useGetCompanyInfo } from "../hooks/useGetCompanyInfo";
import { useUpdateCompanyStatus } from "../hooks/useUpdateCompanyStatus";
import { StatusType } from "@/lib/types";
import { AuthContext } from "@/contexts/AuthState";

const CompanyInfoWrapper = ({ companyId }: { companyId: string }) => {
  const { currentUser } = useContext(AuthContext);
  const role = currentUser?.role;
  const isAdmin = role === "superadmin" || role === "admin";

  const { companyInfo, isLoading, getCompanyInfo } =
    useGetCompanyInfo(companyId);
  const {
    updateStatus,
    alert,
    updating,
    setAlert,
    setDeclineReason,
    declineReason,
  } = useUpdateCompanyStatus(companyId);

  const handleStatusUpdate = useCallback(
    (status: StatusType) => {
      updateStatus(status, () => {
        getCompanyInfo();
      });
    },
    [getCompanyInfo]
  );

  if (isLoading) {
    return <LoadState message="Loading company information..." />;
  }

  if (!companyInfo) {
    return (
      <EmptyState
        title="Company Not Found"
        description="The requested company information could not be found."
      />
    );
  }
  return (
    <Container>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Company Information
          </h1>
          <p className="text-sm text-gray-600">
            Review and manage company application details
          </p>
        </div>
        <BackButton />
      </div>
      <div className="space-y-8">
        <CompanyHeader
          companyData={companyInfo}
          onStatusUpdate={handleStatusUpdate}
          loading={updating}
          setDeclineReason={setDeclineReason}
          declineReason={declineReason}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <AdminContactInfo companyData={companyInfo} />
            <BusinessLicensing companyData={companyInfo} />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <CompanyOverview companyData={companyInfo} />
            <FinancialInformation companyData={companyInfo} />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {isAdmin && <ActivityLog activityLog={companyInfo?.activity} />}
          <div className="lg:col-span-2">
            <DocumentsSection companyData={companyInfo} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CompanyInfoWrapper;
