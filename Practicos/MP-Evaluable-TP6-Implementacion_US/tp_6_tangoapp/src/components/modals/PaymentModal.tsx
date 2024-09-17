import React, { ChangeEvent, useState } from "react";
import BasicModal from "../BasicModal";
import Button from "../Button";
import { useForm } from "react-hook-form";
import DatePicker from "../DatePicker";
import useCardPayment from "../hooks/useCardPayment";
import ErrorModal from "./ErrorModal";
import LoadingModal from "./LoadingModal";
import SuccessModal from "./SuccessModal";

const PaymentModal = ({
  open,
  onClose,
  budgetData,
  orderData,
}: IPaymentModal) => {
  const {
    register,
    formState: { errors },
  } = useForm({ mode: "all" });

  const { actions, system } = useCardPayment({ budgetData, orderData });

  return (
    <BasicModal open={open} size="md" onClose={onClose}>
      <ErrorModal
        open={system.modals.error.show}
        message={system.modals.error.message}
        onClose={actions.handleCloseErrorModal}
      />

      <LoadingModal open={system.modals.loading.show}>
        <span className="font-semibold text-2xl">
          Verificando datos de tarjeta...
        </span>
      </LoadingModal>

      <SuccessModal
        open={system.modals.success.show}
        onClose={actions.handleSucessModal}
        onClickButton={actions.handleSucessModal}
        paymentNumber={system.modals.success.payNumber}
        textButton="Finalizar"
      >
        Pago registrado correctamente!
      </SuccessModal>

      <form className="px-[40px] mb-[5%]" onSubmit={actions.onSubmit}>
        <div className="flex justify-between items-center">
          <span className="font-bold text-xl md:text-2xl">
            Detalle de Pago con Tarjeta
          </span>
          {system.cardType && (
            <p className="text-2xl font-bold">{system.cardType}</p>
          )}
        </div>
        <div className="flex gap-4 mt-5 items-center">
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={system.isCredit}
              onChange={actions.handleToggleChange}
            />
            <div className="toggle-switch-background">
              <div className="toggle-switch-handle"></div>
            </div>
          </label>
          <span className="font-semibold text-lg">
            {system.isCredit ? "Crédito" : "Débito"}
          </span>
        </div>
        <div className="flex flex-col mt-5 gap-4 text-sm md:text-base">
          <div className="flex flex-col">
            <span>Nombre Completo*</span>
            <input
              className="primary-input"
              placeholder="Juan Perez..."
              type="text"
              onInput={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
              }}
              {...register("name", {
                required: true,
                minLength: 3,
              })}
            />
            {errors["name"]?.type === "required" && (
              <p className="text-sm text-[red]">
                El campo del nombre es requerido
              </p>
            )}
            {errors["name"]?.type === "minLength" && (
              <p className="text-sm text-[red]">
                El nombre debe tener un mínimo de 3 caracteres
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <span>Número de Tarjeta*</span>
            <input
              className="primary-input"
              placeholder="4444 4444 4444 4444"
              type="text"
              maxLength={19}
              onInput={(event: ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value.replace(/\D/g, "");
                const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
                event.target.value = formattedValue;

                actions.setCardType(actions.detectCardType(value));
              }}
              {...register("number", {
                required: true,
                minLength: 19,
              })}
            />

            {errors["number"]?.type === "required" && (
              <p className="text-sm text-[red]">
                El campo del número de tarjeta es requerido
              </p>
            )}
            {errors["number"]?.type === "minLength" && (
              <p className="text-sm text-[red]">
                El número de la tarjeta debe tener una longitud de 16 números
              </p>
            )}
          </div>
          <div className="flex justify-between w-full">
            <div className="flex flex-col w-[45%]">
              <span>Pin de Seguridad*</span>
              <input
                className="primary-input"
                placeholder="XXX"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={3}
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const inputValue = event.target.value;
                  const numericValue = inputValue.replace(/\D/g, "");
                  event.target.value = numericValue;
                }}
                {...register("pin", {
                  required: true,
                  minLength: 3,
                })}
              />

              {errors["pin"]?.type === "required" && (
                <p className="text-sm text-[red]">El campo pin es requerido</p>
              )}
              {errors["pin"]?.type === "minLength" && (
                <p className="text-sm text-[red]">
                  El pin debe tener 3 números
                </p>
              )}
            </div>
            <div className="flex flex-col w-[45%]">
              <span>Fecha de Expiración*</span>
              <input
                className="primary-input"
                placeholder="MM/YY"
                maxLength={5}
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const input = event.target as HTMLInputElement;
                  let trimmedValue = input.value.replace(/\s/g, "");
                  let numericValue = trimmedValue.replace(/\D/g, "");

                  // Validar y formatear el mes para que no sea mayor a 12
                  if (numericValue.length >= 2) {
                    let month = parseInt(numericValue.substring(0, 2));
                    if (month > 12) {
                      month = 12;
                    }
                    numericValue =
                      month.toString().padStart(2, "0") +
                      numericValue.substring(2);
                  }

                  const formattedValue = numericValue.replace(
                    /(\d{2})(\d{1,2})/,
                    "$1/$2"
                  );
                  input.value = formattedValue;
                }}
                {...register("expirationDate", {
                  required: true,
                  pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
                })}
              />
              {errors["expirationDate"]?.type === "required" && (
                <p className="text-sm text-[red]">
                  La fecha de expiración es requerida
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between w-full">
            <div className="flex flex-col md:w-[30%] w-full">
              <span>Tipo de Documento*</span>
              <select
                className="primary-input"
                value={system.documentType}
                onChange={(e) => actions.setDocumentType(e.target.value)}
                name="document-type"
                disabled={true}
              >
                <option value="dni">DNI</option>
              </select>
            </div>
            <div className="flex flex-col w-full md:w-[60%]">
              <span>Número de Documento*</span>

              <input
                className="primary-input"
                placeholder="Número de DNI"
                type="text"
                pattern="[0-9]*"
                maxLength={10}
                {...register("document-number", {
                  required: true,
                  minLength: 6,
                })}
                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
              />
              {errors["document-number"]?.type === "required" && (
                <p className="text-sm text-[red]">
                  El campo número de documento es requerido
                </p>
              )}
              {errors["document-number"]?.type === "minLength" && (
                <p className="text-sm text-[red]">
                  El campo número de documento debe tener al menos 6 carácteres
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-5">
          <Button className="primary-button" type="submit">
            Confirmar
          </Button>
        </div>
      </form>
    </BasicModal>
  );
};

export default PaymentModal;

interface IPaymentModal {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  budgetData: IBudgetData | null;
  orderData: IOrderData | null;
}

interface IOrderData {
  id: string;
  serie: string;
  status: string;
}

interface IBudgetData {
  id: string;
  name: string;
  rating: number;
  budget: number;
  pickUpDate: Date;
  deliveryDate: Date;
  idOrder: string;
  email: string;
}
