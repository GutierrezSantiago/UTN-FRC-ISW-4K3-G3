import React from "react";

/**
 * @description You need to provide the width and height with tailwind syntax
 */
const Spinner = ({ className }: ISpinner) => {
  return (
    <div className={`${className ? className : ""}`}>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;

interface ISpinner {
  className?: string;
  size?: number;
}
