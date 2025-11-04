"use client";

import { FormEvent } from "react";

import { CreditCard, Edit, Plus } from "lucide-react";

import Card from "@/components/atoms/Card/Card";
import Button from "@/components/atoms/Button/Button";
import BankModal from "@/components/molecules/BankModal/BankModal";

import { UserData } from "../../types";
import { usePostBankInfo } from "@/services/auth/hooks/usePostBankInfo";

const BanksSection = ({
  userData,
  isSameUser,
  refreshUser,
}: {
  userData: UserData;
  isSameUser: boolean;
  refreshUser: () => void;
}) => {
  const {
    alert,
    setAlert,
    bankInfo,
    handleChange,
    toggleModal,
    errs,
    isLoading,
    isOpen,
    handleSubmit,
  } = usePostBankInfo();

  const isBank =
    userData?.bankName && userData?.accountName && userData?.accountNumber;

  const showEditButton = isBank && isSameUser;
  const showAddBankButton = !isBank && isSameUser;

  const onSubmit = (e: FormEvent) => {
    handleSubmit(e, () => {
      refreshUser();
    });
  };

  return (
    <Card>
      <BankModal
        bankInfo={bankInfo}
        isLoading={isLoading}
        onSubmit={onSubmit}
        toggleModal={toggleModal}
        isOpen={isOpen}
        handleChange={handleChange}
        errs={errs}
        alert={alert}
        setAlert={setAlert}
      />
      <div className="flex sm:items-center justify-between max-sm:flex-col gap-2 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Bank Details</h3>
        </div>
        {showAddBankButton && (
          <Button
            variant="outline"
            size="sm"
            className="w-fit"
            icon={<Plus className="h-4 w-4 mr-2" />}
            onClick={toggleModal}
          >
            Add Bank
          </Button>
        )}
        {showEditButton && (
          <Button
            variant="outline"
            size="sm"
            className="w-fit"
            icon={<Edit className="h-4 w-4 mr-2" />}
            onClick={toggleModal}
          >
            Edit Bank
          </Button>
        )}
      </div>

      {!isBank ? (
        <div className="text-center py-12 flex flex-col justify-center items-center">
          <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            No Bank Details
          </h4>
          <p className="text-gray-600 mb-4">
            This user hasn't added any bank details yet.
          </p>
          {isSameUser && (
            <Button
              icon={<Plus className="h-4 w-4 mr-2" />}
              onClick={toggleModal}
            >
              Add Bank Details
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">
                  {userData?.bankName}
                </h4>
                <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600 mt-1">
                  <span>{userData?.accountName}</span>
                  <span>•</span>
                  <span>{userData?.accountNumber}</span>
                  <span>•</span>
                </div>
              </div>
            </div>
            {/* 
            <div className="flex items-center gap-3">
              <Badge variant={bank.isVerified ? "success" : "warning"}>
                {bank.isVerified ? (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </>
                ) : (
                  <>
                    <Clock className="h-3 w-3 mr-1" />
                    Pending
                  </>
                )}
              </Badge>
              <div className="flex gap-1">
                <Button variant="ghost">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </Card>
  );
};

export default BanksSection;
