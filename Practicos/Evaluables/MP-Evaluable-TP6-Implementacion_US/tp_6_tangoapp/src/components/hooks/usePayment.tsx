import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { utils } from "../utils/utils";

const usePayment = () => {
  const [actualBudget, setActualBudget] = useState<IBudgetData | null>(null);
  const [actualOrder, setActualOrder] = useState<IOrderData | null>(null);
  const [paymentOption, setPaymentOption] = useState("cash_pickup");
  const [transporterId, setTransporterId] = useState("");
  const [modals, setModals] = useState({
    success: { show: false },
    error: { show: false, message: "" },
    loading: { show: true },
    payment: { show: false },
  });
  const router = useRouter();

  useEffect(() => {
    const currentUrl = window.location.href;
    const segments = currentUrl.split("/");

    const orderId = segments[segments.length - 1];

    const budgetId = segments[segments.length - 2];
    setTransporterId(orderId);

    setTimeout(() => {
      let parsedData;

      const storedDataBudget = localStorage.getItem("budgetList");
      if (storedDataBudget) {
        parsedData = JSON.parse(storedDataBudget);
        const filteredBudgetList = parsedData.filter(
          (budget: IBudgetData) =>
            budget.idOrder === orderId && budget.id === budgetId
        );

        setActualBudget(filteredBudgetList[0]);
      }

      const storedDataOrder = localStorage.getItem("orderList");
      if (storedDataOrder) {
        parsedData = JSON.parse(storedDataOrder);

        const filteredOrderList = parsedData.filter(
          (order: IOrderData) => order.id === orderId
        );

        setActualOrder(filteredOrderList[0]);
      }

      setModals({
        ...modals,
        loading: { show: false },
      });
    }, 1000);
  }, []);

  const actions = {
    handleCloseModalPayment: () => {
      setModals({
        ...modals,
        payment: { show: false },
      });
    },
    handleCloseModalError: () => {
      setModals({
        ...modals,
        error: { show: false, message: "" },
      });
    },
    handlePaymentOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setPaymentOption(event.target.value);
    },
    handleConfirmPayment: () => {
      let orders;
      let orderToUpdateIndex;
      const orderList = localStorage.getItem("orderList");
      if (orderList) {
        orders = JSON.parse(orderList);

        orderToUpdateIndex = orders.findIndex(
          (order: IOrderData) => order.id === actualOrder?.id
        );

        if (orderToUpdateIndex !== -1) {
          if (orders[orderToUpdateIndex].status === "Confirmado") {
            setModals({
              ...modals,
              error: {
                show: true,
                message: "No se puede aceptar otra cotización",
              },
            });
            return;
          }
        }
      }

      if (system.paymentOption === "credit") {
        setModals({
          ...modals,
          payment: { show: true },
        });
      } else {
        actions.enviarEmail();

        orders[orderToUpdateIndex].status = "Confirmado";
        localStorage.setItem("orderList", JSON.stringify(orders));

        setModals({
          ...modals,
          success: { show: true },
        });
      }
    },
    enviarEmail: async () => {
      try {
        const response = await fetch("http://localhost:3001/api/sendmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: actualBudget?.email,
            subject: "Confirmación de Cotización - TANGO APP",
            html: `<body>

            <div class="webkit">
              <table cellpadding="0" cellspacing="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
                <tr>
                  <td valign="top" bgcolor="#FFFFFF" width="100%">
                    <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="100%">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td>
                                <table width="100%" cellpadding="0" cellspacing="0" style="width:100%; max-width:600px;"
                                  align="center">
                                  <tr>
                                    <td role="modules-container"
                                      style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF"
                                      width="100%" align="left">
                                      <table class="module preheader preheader-hide" role="module" data-type="preheader"
                                        cellpadding="0" cellspacing="0" width="100%"
                                        style="display: none !important; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
                                        <tr>
                                          <td role="module-content">
                                            <p></p>
                                          </td>
                                        </tr>
                                      </table>
                                      <table class="wrapper" role="module" data-type="image" cellpadding="0" cellspacing="0"
                                        width="100%" style="table-layout: fixed;"
                                        data-muid="7fd7dbef-9297-4929-8b1e-cc31f0219766">
                                        <tbody>
                                          <tr>
                                            <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top"
                                              align="center">
                                              <img class="max-width"
                                                style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;"
                                                width="600" alt="" data-proportionally-constrained="true" data-responsive="true"
                                                src="http://cdn.mcauto-images-production.sendgrid.net/c6b2a8f3dda587ed/39ac461e-692b-4e7f-b300-f0e05fa78e29/348x96.png">
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <table class="module" role="module" data-type="text" cellpadding="0" cellspacing="0"
                                        width="100%" style="table-layout: fixed;"
                                        data-muid="4e3dd911-5e09-407c-9d48-349e932fb59e" data-mc-module-version="2019-10-22">
                                        <tbody>
                                          <tr>
                                            <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;"
                                              height="100%" valign="top" role="module-content">
                                              <div>
                                                <div style="font-family: inherit; text-align: inherit">Buenos Días,
                                                  <strong>${
                                                    actualBudget?.name
                                                  }</strong>.</div>
                                                <div style="font-family: inherit; text-align: inherit"><br></div>
                                                <div style="font-family: inherit; text-align: inherit">Se ha registrado
                                                correctamente un pago por parte de <strong>Santiago</strong> de su cotización para transportar el pedido. A
                                                continuación, se le pasará un resumen de los datos.</div>
                                                <div style="font-family: inherit; text-align: inherit"><br></div>
                                                <div style="font-family: inherit; text-align: inherit"><strong>Nombre del
                                                    Dador de Carga: </strong>Santiago Dealessandris</div>
                                                <div style="font-family: inherit; text-align: inherit"><strong>Fecha de Entrega:
                                                  </strong>${utils.formatDateToString(
                                                    actualBudget!.pickUpDate
                                                  )}
                                                    
                                                  </div>
                                                <div style="font-family: inherit; text-align: inherit"><strong>Forma de Pago:
                                                  </strong>${
                                                    paymentOption ===
                                                    "cash_pickup"
                                                      ? "Efectivo al Retirar"
                                                      : "Efectivo contra Entrega"
                                                  }</div>
                                                <div style="font-family: inherit; text-align: inherit"><strong>Monto:
                                                  </strong>$ ${
                                                    actualBudget?.budget
                                                  }</div>
                                                <div style="font-family: inherit; text-align: inherit"><br></div>
                                                <div style="font-family: inherit; text-align: inherit">Saludos,&nbsp;</div>
                                                <div style="font-family: inherit; text-align: inherit">Atte. Equipo de Tango
                                                  App.</div>
                                                <div></div>
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
        
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
        </body>`,
          }),
        });

        const result = await response.json();
        if (result.success) {
          console.log("Correo enviado con éxito");
        } else {
          console.log("Error al enviar correo");
        }
      } catch (error) {
        console.error("Error al enviar correo", error);
      }
    },
  };

  const system = { modals, actualBudget, actualOrder, paymentOption };

  return { actions, system };
};

export default usePayment;

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

interface IOrderData {
  id: string;
  serie: string;
  status: string;
}
