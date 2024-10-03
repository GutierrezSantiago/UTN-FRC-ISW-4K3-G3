import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const useHome = () => {
  const [budgetList, setBudgetList] = useState<IBudgetData[] | null>(null);
  const router = useRouter();

  function randomDate(start: Date, end: Date) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  function randomPickUpDate() {
    const currentDate = new Date();
    const randomDays = Math.floor(Math.random() * 4) + 1;
    const pickUpDate = new Date(currentDate);
    pickUpDate.setDate(currentDate.getDate() + randomDays);
    return pickUpDate;
  }

  useEffect(() => {
    router.push("/order");
    const storedData = localStorage.getItem("budgetList");
    const status = localStorage.getItem("status");

    if (!storedData || storedData.length === 0) {
      const budgetlist = [
        {
          id: "381c668b-47aa-465a-91fb-d375b146f68e",
          name: "Nicolás Surghy",
          rating: 3.6,
          budget: 200000,
          pickUpDate: randomPickUpDate(),
          deliveryDate: new Date(),
          idOrder: "7d271fef-8ab4-4f7d-933f-7b4c6b6b8554",
          email: "nsurghy@gmail.com",
        },
        {
          id: "d9ee6a90-37b5-4f88-82eb-177a300a7d5b",
          name: "Iván Ambrosino",
          rating: 2.3,
          budget: 80000,
          pickUpDate: randomPickUpDate(),
          deliveryDate: new Date(),
          idOrder: "7d271fef-8ab4-4f7d-933f-7b4c6b6b8554",
          email: "ambrosino.ivan@gmail.com",
        },
        {
          id: "e84b6b9d-3d8c-4d34-8d8b-8a3b7450f571",
          name: "Jérémie De Philippis",
          rating: 5.0,
          budget: 10000,
          pickUpDate: randomPickUpDate(),
          deliveryDate: new Date(),
          idOrder: "7d271fef-8ab4-4f7d-933f-7b4c6b6b8554",
          email: "jeremiedephilippis@gmail.com",
        },
        {
          id: "e84b6b9d-3d8c-4d34-8d8b-8a3ef50f571",
          name: "Juan Capdevila",
          rating: 1.4,
          budget: 9000,
          pickUpDate: randomPickUpDate(),
          deliveryDate: new Date(),
          idOrder: "7d271fef-8ab4-4f7d-933f-7b4c6b6b8554",
          email: "jmacapdevila@gmail.com",
        },
        {
          id: "381c668b-47aa-465a-91fb-d375b146f68e",
          name: "Nicolás Surghy",
          rating: 3.6,
          budget: 300000,
          pickUpDate: randomPickUpDate(),
          deliveryDate: new Date(),
          idOrder: "6a0c06b8-eae5-44cc-97e4-2aa35bb1cb0f",
          email: "nsurghy@gmail.com",
        },
        {
          id: "d9ee6a90-37b5-4f88-82eb-177a300a7d5b",
          name: "Iván Ambrosino",
          rating: 2.3,
          budget: 100000,
          pickUpDate: randomPickUpDate(),
          deliveryDate: new Date(),
          idOrder: "6a0c06b8-eae5-44cc-97e4-2aa35bb1cb0f",
          email: "ambrosino.ivan@gmail.com",
        },
        {
          id: "e84b6b9d-3d8c-4d34-8d8b-8a3b7450f571",
          name: "Jérémie De Philippis",
          rating: 5.0,
          budget: 30000,
          pickUpDate: randomPickUpDate(),
          deliveryDate: new Date(),
          idOrder: "6a0c06b8-eae5-44cc-97e4-2aa35bb1cb0f",
          email: "jeremiedephilippis@gmail.com",
        },
        {
          id: "e84b6b9d-3d8c-4d34-8d8b-8a3ef50f571",
          name: "Juan Capdevila",
          rating: 1.4,
          budget: 27000,
          pickUpDate: randomPickUpDate(),
          deliveryDate: new Date(),
          idOrder: "6a0c06b8-eae5-44cc-97e4-2aa35bb1cb0f",
          email: "jmacapdevila@gmail.com",
        },
        {
          id: "381c668b-47aa-465a-91fb-d375b146f68e",
          name: "Nicolás Surghy",
          rating: 3.6,
          budget: 1000,
          pickUpDate: randomPickUpDate(),
          deliveryDate: new Date(),
          idOrder: "4b5f8f21-fb6f-4941-bc0f-fa1fcf8a25a6",
          email: "nsurghy@gmail.com",
        },
        {
          id: "d9ee6a90-37b5-4f88-82eb-177a300a7d5b",
          name: "Iván Ambrosino",
          rating: 2.3,
          budget: 2000,
          pickUpDate: randomPickUpDate(),
          deliveryDate: new Date(),
          idOrder: "4b5f8f21-fb6f-4941-bc0f-fa1fcf8a25a6",
          email: "ambrosino.ivan@gmail.com",
        },
        {
          id: "e84b6b9d-3d8c-4d34-8d8b-8a3b7450f571",
          name: "Jérémie De Philippis",
          rating: 5.0,
          budget: 200,
          pickUpDate: randomPickUpDate(),
          deliveryDate: new Date(),
          idOrder: "4b5f8f21-fb6f-4941-bc0f-fa1fcf8a25a6",
          email: "jeremiedephilippis@gmail.com",
        },
        {
          id: "e84b6b9d-3d8c-4d34-8d8b-8a3ef50f571",
          name: "Juan Capdevila",
          rating: 1.4,
          budget: 5000,
          pickUpDate: randomPickUpDate(),
          deliveryDate: new Date(),
          idOrder: "4b5f8f21-fb6f-4941-bc0f-fa1fcf8a25a6",
          email: "jmacapdevila@gmail.com",
        },
      ];

      budgetlist.forEach((item) => {
        const pickUpDate = item.pickUpDate;

        const deliveryDate = new Date(pickUpDate);
        deliveryDate.setDate(deliveryDate.getDate() + 7);

        item.pickUpDate = pickUpDate;
        item.deliveryDate = randomDate(
          deliveryDate,
          new Date(deliveryDate.getTime() + 7 * 24 * 60 * 60 * 1000)
        );
      });

      if (!status) {
        const statusData = { value: "Registrado", id: "" };
        localStorage.setItem("status", JSON.stringify(statusData));
      }

      setBudgetList(budgetlist);
      localStorage.setItem("budgetList", JSON.stringify(budgetlist));
    }
  }, []);

  const system = { budgetList };

  return { system };
};

interface IBudgetData {
  id: string;
  name: string;
  rating: number;
  budget: number;
  pickUpDate: Date;
  deliveryDate: Date;
  email: string;
}

export default useHome;
