"use client";

import Modal from "../Modal/Modal";
import Badge from "@/components/atoms/Badge/Badge";

import { Dispatch, SetStateAction } from "react";
import { getStatusVariant } from "@/lib/helpers";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

import { StatusType } from "@/lib/types";

interface ConfirmModalProps {
  confirmModal: { isOpen: boolean; newStatus: null | StatusType };
  setConfirmModal: Dispatch<
    SetStateAction<{ isOpen: boolean; newStatus: null | StatusType }>
  >;
  currentStatus: StatusType;
  handleConfirmUpdate: () => void;
  declineReason: string;
  setDeclineReason: (reason: string) => void;
}

const ConfirmModal = ({
  confirmModal,
  setConfirmModal,
  currentStatus,
  handleConfirmUpdate,
  declineReason,
  setDeclineReason,
}: ConfirmModalProps) => {
  const isDeclineStatus = confirmModal.newStatus === "Declined";

  const handleClose = () => {
    setConfirmModal({ isOpen: false, newStatus: null });
    setDeclineReason("");
  };

  const handleSubmit = () => {
    if (isDeclineStatus && !declineReason.trim()) {
      return;
    }
    handleConfirmUpdate();
    setDeclineReason("");
  };

  return (
    <Modal
      isOpen={confirmModal.isOpen}
      onClose={() => setConfirmModal({ isOpen: false, newStatus: null })}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {isDeclineStatus ? "Decline Company" : "Confirm Status Update"}
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            {isDeclineStatus ? (
              <>
                You are about to decline this company. Please provide a reason
                for the decline.
              </>
            ) : (
              <>
                Are you sure you want to change the status from{" "}
                <Badge variant={getStatusVariant(currentStatus)}>
                  {currentStatus}
                </Badge>{" "}
                to{" "}
                <Badge variant={getStatusVariant(confirmModal.newStatus!)}>
                  {confirmModal.newStatus}
                </Badge>
                ?
              </>
            )}
          </p>
        </div>

        {isDeclineStatus && (
          <div>
            <label
              htmlFor="decline-reason"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Reason for Decline <span className="text-red-500">*</span>
            </label>
            <textarea
              id="decline-reason"
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              placeholder="Enter the reason why this company is being declined..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              rows={4}
            />
            {!declineReason.trim() && (
              <p className="text-xs text-gray-500 mt-1">
                This field is required
              </p>
            )}
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                Important Notice
              </p>
              <p className="text-sm text-yellow-700 mt-1">
                This action will notify the agent that onboarded the company via
                email.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isDeclineStatus && !declineReason.trim()}
          >
            {isDeclineStatus ? "Decline Company" : "Confirm Change"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
