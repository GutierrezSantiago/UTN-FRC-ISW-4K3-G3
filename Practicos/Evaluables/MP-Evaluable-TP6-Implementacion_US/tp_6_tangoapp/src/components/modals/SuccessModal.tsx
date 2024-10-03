"use client";

import React from "react";
import BasicModal from "../BasicModal";
import Button from "../Button";

const SuccessModal = ({
  open,
  onClose,
  children,
  textButton,
  onClickButton,
  paymentNumber,
}: ISuccessModal) => {
  return (
    <BasicModal size="sm" onClose={onClose} open={open}>
      <div className="mb-[20px] flex w-full flex-col items-center justify-center">
        <img
          src={"/Check-Circle.png"}
          className="h-auto w-[100px]"
          alt="close"
        />

        {children}

        {paymentNumber && (
          <span className="font-semibold mt-4">{`N° de pago: ${paymentNumber}`}</span>
        )}

        <div>
          <Button
            className="primary-button mt-[10px]"
            type={undefined}
            onClick={onClickButton}
          >
            {textButton}
          </Button>
        </div>
      </div>
    </BasicModal>
  );
};

export default SuccessModal;

interface ISuccessModal {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  textButton: string;
  onClickButton: () => void;
  paymentNumber?: number;
}
