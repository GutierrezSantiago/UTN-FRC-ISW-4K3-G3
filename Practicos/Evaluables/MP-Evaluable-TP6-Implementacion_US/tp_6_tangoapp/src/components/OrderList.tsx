"use client";
import React from "react";
import useBudgets from "./hooks/useBudgets";
import Button from "./Button";
import { useRouter } from "next/navigation";
import RatingStars from "./RatingStars";
import Spinner from "./Spinner";
import useOrder from "./hooks/useOrder";

const OrderList = () => {
  const { actions, system } = useOrder();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5 h-full">
      {system.orderList?.map((order: IOrderData, index: number) => (
        <div
          key={index}
          className="border-[1px] md:border-[2px] lg:border-[3px] rounded-lg w-full p-4 flex items-center justify-between border-[#03045E] cursor-pointer"
          onClick={() => router.push(`/order/${order.id}`)}
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg md:text-2xl">
              Serie del Pedido:
            </span>
            <span>{order.serie}</span>
          </div>
          <span>{order.status}</span>
        </div>
      ))}
    </div>
  );
};

export default OrderList;

interface IOrderData {
  id: string;
  serie: string;
  status: string;
}
