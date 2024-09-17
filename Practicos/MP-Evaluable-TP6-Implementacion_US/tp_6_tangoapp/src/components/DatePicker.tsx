import React, { useRef } from "react";

const DatePicker = ({ id, register, errors }: IDatePicker) => {
  const dateRef = useRef<HTMLInputElement>(null);

  // Obtener el año y mes actual en el formato requerido por el input month
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = String(today.getMonth() + 1).padStart(2, "0"); // Asegurar dos dígitos
  const minMonth = `${currentYear}-${currentMonth}`;

  return (
    <div className="relative flex flex-col cursor-pointer items-center">
      <input
        className="primary-input"
        type="month"
        name={id}
        ref={dateRef}
        min={minMonth}
        {...register(id, { required: true })}
      />

      {errors[id]?.type === "required" && (
        <p className="text-sm text-[red] text-start w-full">
          El campo de fecha de expiración es requerido
        </p>
      )}
    </div>
  );
};

export default DatePicker;

interface IDatePicker {
  id: string;
  register: any;
  errors: any;
}
