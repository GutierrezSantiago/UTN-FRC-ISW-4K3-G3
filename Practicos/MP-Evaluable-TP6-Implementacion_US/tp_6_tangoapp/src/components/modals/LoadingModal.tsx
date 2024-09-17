"use client";

import React from "react";
import BasicModal from "../BasicModal";
import Spinner from "../Spinner";

const LoadingModal = ({ open, children }: ISuccessModal) => {
  return (
    <BasicModal size="sm" open={open}>
      <div className="mb-[20px] flex w-full flex-col items-center justify-center gap-10">
        <Spinner className="size-[80px] text-[#214e34]" />

        {children}
      </div>
    </BasicModal>
  );
};

export default LoadingModal;

interface ISuccessModal {
  open: boolean;
  children: React.ReactNode;
}
