import { useState } from "react";

import { statusOptions } from "@/lib/constants";
import { StatusType } from "@/lib/types";
import { Check, ChevronDown, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import ConfirmModal from "../ConfirmModal/ConfirmModal";

const StatusUpdateDropdown: React.FC<{
  currentStatus: StatusType;
  onStatusUpdate: (newStatus: StatusType) => void;
  disabled?: boolean;
  loading?: boolean;
}> = ({ currentStatus, onStatusUpdate, disabled = false, loading = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    newStatus: StatusType | null;
  }>({ isOpen: false, newStatus: null });

  const handleStatusClick = (newStatus: StatusType) => {
    if (newStatus === currentStatus) {
      setIsOpen(false);
      return;
    }

    setConfirmModal({ isOpen: true, newStatus });
    setIsOpen(false);
  };

  const handleConfirmUpdate = () => {
    if (confirmModal.newStatus) {
      onStatusUpdate(confirmModal.newStatus);
    }
    setConfirmModal({ isOpen: false, newStatus: null });
  };

  const currentStatusOption = statusOptions.find(
    (opt) => opt.value === currentStatus
  );
  const StatusIcon = currentStatusOption?.icon || Clock;

  return (
    <>
      <div className="relative">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled || loading}
          className="justify-between min-w-[160px]"
        >
          <div className="flex items-center gap-2">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <StatusIcon className="h-4 w-4" />
            )}
            <span>Change Status</span>
          </div>
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>

        {isOpen && (
          <>
            <div className="absolute top-full mt-1 right-0 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
              <div className="p-2">
                <div className="mb-2 px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Change Status To
                </div>
                {statusOptions.map((option) => {
                  const OptionIcon = option.icon;
                  const isCurrentStatus = option.value === currentStatus;

                  return (
                    <button
                      key={option.value}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                        isCurrentStatus
                          ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                          : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                      }`}
                      onClick={() => handleStatusClick(option.value)}
                      disabled={isCurrentStatus}
                    >
                      <div className="flex items-center gap-3">
                        <OptionIcon
                          className={`h-4 w-4 ${
                            isCurrentStatus ? "text-gray-400" : option.color
                          }`}
                        />
                        <span>{option.label}</span>
                      </div>
                      {isCurrentStatus && (
                        <Check className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </div>
      <ConfirmModal
        currentStatus={currentStatus}
        confirmModal={confirmModal}
        setConfirmModal={setConfirmModal}
        handleConfirmUpdate={handleConfirmUpdate}
      />
      {/* Confirmation Modal */}
    </>
  );
};

export default StatusUpdateDropdown;
