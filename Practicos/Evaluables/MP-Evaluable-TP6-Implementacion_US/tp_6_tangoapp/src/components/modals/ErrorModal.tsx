import React from "react";
import { MdCancel } from "react-icons/md";
import BasicModal from "../BasicModal";

const ErrorModal = ({ open, onClose, message }: IErrorModal) => {
  return (
    <BasicModal size="sm" open={open} onClose={onClose}>
      <div className="flex w-full flex-col items-center gap-8 py-4">
        <MdCancel size={160} className="text-red-500" />
        <span className="text-center text-xl font-semibold">{message}</span>
      </div>
    </BasicModal>
  );
};

export default ErrorModal;

interface IErrorModal {
  open: boolean;
  onClose: () => void;
  message: string;
}
