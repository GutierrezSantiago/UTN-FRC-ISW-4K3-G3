import React, { useEffect, useState } from "react";

const useOrder = () => {
  const [orderList, setOrderList] = useState<IOrderData[] | null>(null);
  const [modals, setModals] = useState({
    loading: { show: true },
  });

  useEffect(() => {
    let parsedData;

    const storedData = localStorage.getItem("orderList");

    if (!storedData || storedData.length === 0) {
      const orderList = [
        {
          id: "7d271fef-8ab4-4f7d-933f-7b4c6b6b8554",
          serie: "AE118TU",
          status: "Registrado",
        },
        {
          id: "6a0c06b8-eae5-44cc-97e4-2aa35bb1cb0f",
          serie: "AA131AK",
          status: "Registrado",
        },
        {
          id: "4b5f8f21-fb6f-4941-bc0f-fa1fcf8a25a6",
          serie: "AE861QY",
          status: "Registrado",
        },
      ];
      setOrderList(orderList);
      localStorage.setItem("orderList", JSON.stringify(orderList));
    } else {
      parsedData = JSON.parse(storedData);
      setOrderList(parsedData);
    }
    setTimeout(() => {
      setModals({
        ...modals,
        loading: {
          show: false,
        },
      });
    }, 1000);
  }, []);

  const actions = {};
  const system = { orderList, modals };

  return { actions, system };
};

export default useOrder;

interface IOrderData {
  id: string;
  serie: string;
  status: string;
}
