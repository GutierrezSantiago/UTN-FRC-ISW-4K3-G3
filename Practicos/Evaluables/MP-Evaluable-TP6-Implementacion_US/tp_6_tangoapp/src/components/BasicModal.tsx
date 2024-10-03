import React, { useEffect, useState, useRef } from "react";
import { MdClose } from "react-icons/md";

/**
 * @description You need to provide "xs" | "sm" | "md" | "lg" | "xl" to set the size of the modal
 */
const BasicModal = ({
  open,
  onClose,
  size,
  children,
  loadingModal,
}: IBasicModal) => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  let responsiveSize = "";

  switch (size) {
    case "xs":
      responsiveSize =
        "sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%]";
      break;

    case "sm":
      responsiveSize =
        "sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]";
      break;

    case "md":
      responsiveSize =
        "sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]";
      break;

    case "lg":
      responsiveSize =
        "sm:w-[90%] md:w-[85%] lg:w-[75%] xl:w-[65%] 2xl:w-[60%]";
      break;

    case "xl":
      responsiveSize =
        "sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] 2xl:w-[75%]";
      break;

    default:
      responsiveSize =
        "sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]";
      break;
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
      setTimeout(() => {
        setShowModal(true);
      }, 10);
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [open]); // eslint-disable-line

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (showModal && !loadingModal) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  const handleClose = () => {
    setShowModal(false);

    if (onClose) {
      setTimeout(() => {
        onClose();
      }, 250);
    }
  };

  return (
    <div
      className={`${open ? "fixed" : "hidden"} ${
        showModal ? "opacity-100" : "opacity-0"
      } inset-0 flex items-center justify-center backdrop-blur-sm transition-opacity duration-[350ms] z-[100]`}
    >
      <div className="absolute left-0 top-0 h-screen w-screen bg-gray-900 opacity-50" />

      <div
        ref={modalRef}
        className={`z-50 m-auto flex max-h-[95%] w-[95%] flex-col overflow-y-auto rounded-md bg-white shadow-lg ${responsiveSize}`}
      >
        {onClose && (
          <div
            className={`fixed flex h-[55px] w-[95%] items-center justify-end rounded-t-md bg-[#FFFFFF] px-[10px] ${responsiveSize}`}
          >
            <MdClose
              className="text-[25px] md:text-[30px]"
              onClick={handleClose}
            />
          </div>
        )}

        <div className="mt-[55px] flex max-h-full w-full flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BasicModal;

interface IBasicModal {
  open: boolean;
  onClose?: () => void;
  size: "xs" | "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
  loadingModal?: boolean;
}
