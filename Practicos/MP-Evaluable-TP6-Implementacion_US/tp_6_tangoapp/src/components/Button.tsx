import React, { ReactNode } from "react";
import Spinner from "./Spinner";

const Button = ({
  className,
  onClick,
  type,
  children,
  loading,
  disabled,
}: IButton) => {
  return (
    <button
      onClick={onClick}
      className={`${className} flex gap-[8px]`}
      type={type}
      disabled={disabled ? disabled : loading}
    >
      {children}
      {loading && <Spinner className="size-[18px]" />}
    </button>
  );
};

export default Button;

interface IButton {
  onClick?: () => void;
  className: string;
  type: "submit" | "reset" | "button" | undefined;
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
}
