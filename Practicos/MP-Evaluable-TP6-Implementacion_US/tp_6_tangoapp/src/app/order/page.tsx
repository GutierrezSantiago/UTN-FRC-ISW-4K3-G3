"use client";
import OrderList from "@/components/OrderList";
import useOrder from "@/components/hooks/useOrder";
import LoadingModal from "@/components/modals/LoadingModal";
import React from "react";

const Order = () => {
  const { actions, system } = useOrder();

  return (
    <div className="px-[20px] md:px-[30px] xl:px-[50px] 2xl:px-[60px] w-full py-5">
      <LoadingModal open={system.modals.loading.show}>
        Cargando Listado de Pedidos
      </LoadingModal>
      <div className="flex flex-col gap-10 h-full">
        <span className="font-bold text-2xl md:text-3xl lg:text-5xl">
          Pedidos
        </span>
        <OrderList />
      </div>
    </div>
  );
};

export default Order;
