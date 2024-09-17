"use client";
import Button from "@/components/Button";
import RatingStars from "@/components/RatingStars";
import useBudgets from "@/components/hooks/useBudgets";
import usePayment from "@/components/hooks/usePayment";
import ErrorModal from "@/components/modals/ErrorModal";
import LoadingModal from "@/components/modals/LoadingModal";
import PaymentModal from "@/components/modals/PaymentModal";
import SuccessModal from "@/components/modals/SuccessModal";
import { utils } from "@/components/utils/utils";
import { useRouter } from "next/navigation";
import React from "react";

const BudgetSelected = () => {
  const { actions, system } = usePayment();
  const router = useRouter();

  return (
    <div className="px-[20px] md:px-[30px] xl:px-[50px] 2xl:px-[60px] w-full py-5">
      <PaymentModal
        open={system.modals.payment.show}
        onClose={() => actions.handleCloseModalPayment()}
        budgetData={system.actualBudget}
        orderData={system.actualOrder}
      >
        ¡Se ha registrado el pago correctamente!
      </PaymentModal>
      <LoadingModal open={system.modals.loading.show}>
        Cargando datos del transportista...
      </LoadingModal>
      <SuccessModal
        open={system.modals.success.show}
        onClose={() => router.push("/order")}
        onClickButton={() => router.push("/order")}
        textButton="Finalizar"
      >
        Se ha registrado el pedido correctamente!
      </SuccessModal>
      <ErrorModal
        open={system.modals.error.show}
        message={system.modals.error.message}
        onClose={actions.handleCloseModalError}
      />
      {system.actualBudget ? (
        <div className="flex flex-col">
          <div className="flex justify-between">
            <span className="text-xl md:text-2xl lg:text-4xl font-semibold">
              {system.actualBudget.name}
            </span>
            <div className="flex gap-1 items-center">
              <RatingStars rating={system.actualBudget.rating} />
              <span>{system.actualBudget.rating}</span>
            </div>
          </div>

          <div className="flex gap-4 mt-10 text-base md:text-lg font-semibold">
            <span className="w-[15rem]">Fecha de Retiro: </span>
            <span>
              {utils.formatDateToString(system.actualBudget.pickUpDate)}
            </span>
          </div>
          <div className="flex gap-4 mt-5 text-base md:text-lg font-semibold">
            <span className="w-[15rem]">Entrega del Traslado: </span>
            <span>
              {utils.formatDateToString(system.actualBudget.deliveryDate)}
            </span>
          </div>

          <div className="flex flex-col mt-10 gap-4">
            <span className="text-xl md:text-2xl font-semibold">Importe</span>
            <div className="flex gap-20">
              <span className="text-base md:text-lg font-semibold">
                $ {system.actualBudget.budget}
              </span>
              <div className="flex flex-col gap-2 text-sm md:text-base">
                <div className="flex flex-col">
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="credit"
                      checked={system.paymentOption === "credit"}
                      onChange={actions.handlePaymentOptionChange}
                    />
                    Tarjeta Crédito/Débito
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="cash_pickup"
                      checked={system.paymentOption === "cash_pickup"}
                      onChange={actions.handlePaymentOptionChange}
                    />
                    Efectivo al Retirar
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="cash_delivery"
                      checked={system.paymentOption === "cash_delivery"}
                      onChange={actions.handlePaymentOptionChange}
                    />
                    Efectivo contra Entrega
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-10">
            <Button
              className="primary-button w-fit"
              type="button"
              onClick={() => actions.handleConfirmPayment()}
            >
              {system.paymentOption === "credit" ? "Pagar" : "Confirmar"}
            </Button>
          </div>
        </div>
      ) : (
        !system.modals.loading.show && (
          <div>NO SE HA ENCONTRADO NINGUN PEDIDO CON ESE ID</div>
        )
      )}
    </div>
  );
};

export default BudgetSelected;
