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
}

const ConfirmModal = ({
  confirmModal,
  setConfirmModal,
  currentStatus,
  handleConfirmUpdate,
}: ConfirmModalProps) => {
  return (
    <Modal
      isOpen={confirmModal.isOpen}
      onClose={() => setConfirmModal({ isOpen: false, newStatus: null })}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Confirm Status Update
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            Are you sure you want to change the status from{" "}
            <Badge variant={getStatusVariant(currentStatus)}>
              {currentStatus}
            </Badge>{" "}
            to{" "}
            <Badge variant={getStatusVariant(confirmModal.newStatus!)}>
              {confirmModal.newStatus}
            </Badge>
            ?
          </p>
        </div>

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
          <Button
            variant="outline"
            onClick={() => setConfirmModal({ isOpen: false, newStatus: null })}
          >
            Cancel
          </Button>
          <Button onClick={handleConfirmUpdate}>Confirm Change</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
