import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { utils } from "../utils/utils";

const useCardPayment = ({ budgetData, orderData }: ICardPayment) => {
  const [documentType, setDocumentType] = useState("dni");
  const [modals, setModals] = useState({
    success: { show: false, payNumber: 0 },
    loading: { show: false },
    error: { show: false, message: "" },
  });

  const [cardType, setCardType] = useState<string>("");
  const [isCredit, setIsCredit] = useState(false);

  const router = useRouter();

  const actions = {
    handleToggleChange: (e: ChangeEvent<HTMLInputElement>) => {
      setIsCredit(e.target.checked);
    },
    setCardType,
    detectCardType: (number: string) => {
      const cleaned = number.replace(/\s/g, "");

      if (/^4/.test(cleaned)) {
        return "Visa";
      } else if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) {
        return "MasterCard";
      } else if (/^3[47]/.test(cleaned)) {
        return "Amex";
      } else {
        return "";
      }
    },
    setDocumentType,
    handleSendMail: async () => {
      try {
        const response = await fetch("http://localhost:3001/api/sendmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: budgetData?.email,
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
                                                  budgetData?.name
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
                                                    budgetData!.pickUpDate
                                                  )}</div>
                                                <div style="font-family: inherit; text-align: inherit"><strong>Forma de Pago:
                                                  </strong>Tarjeta ${
                                                    isCredit
                                                      ? "Crédito"
                                                      : "Débito"
                                                  }</div>
                                                <div style="font-family: inherit; text-align: inherit"><strong>Monto:
                                                  </strong>$ ${
                                                    budgetData?.budget
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
          let orders;
          let orderToUpdateIndex;
          const orderList = localStorage.getItem("orderList");
          if (orderList) {
            orders = JSON.parse(orderList);

            orderToUpdateIndex = orders.findIndex(
              (order: IOrderData) => order.id === orderData?.id
            );

            if (orderToUpdateIndex !== -1) {
              orders[orderToUpdateIndex].status = "Confirmado";
              localStorage.setItem("orderList", JSON.stringify(orders));
            }
          }

          const paymentNumber = actions.generatePaymentNumber();

          setModals({
            ...modals,
            success: {
              show: true,
              payNumber: paymentNumber,
            },
            loading: { show: false },
          });
        } else {
          setModals({
            ...modals,
            error: {
              show: true,
              message: "Error al enviar el Mail",
            },
          });
        }
      } catch (error) {
        console.error("Error al enviar correo", error);
      }
    },
    onSubmit: (e: FormEvent) => {
      e.preventDefault();

      const form = new FormData(e.target as HTMLFormElement);

      const name = form.get("name")?.toString();
      if (name) {
        if (name.length < 3) {
          setModals({
            ...modals,
            error: {
              show: true,
              message: "Debe completar todos los campos (Nombre Completo)",
            },
          });
          return;
        }
      } else {
        setModals({
          ...modals,
          error: {
            show: true,
            message: "Debe completar todos los campos (Nombre Completo)",
          },
        });
        return;
      }

      const number = form.get("number")?.toString();
      if (number) {
        if (number.length !== 19) {
          setModals({
            ...modals,
            error: {
              show: true,
              message: "Debe completar todos los campos (Numero de Tarjeta)",
            },
          });
          return;
        }
      } else {
        setModals({
          ...modals,
          error: {
            show: true,
            message: "Debe completar todos los campos (Numero de Tarjeta)",
          },
        });
        return;
      }

      if (
        cardType !== "Visa" &&
        cardType !== "MasterCard" &&
        cardType !== "Amex"
      ) {
        setModals({
          ...modals,
          error: {
            show: true,
            message: "El tipo de tarjeta no es válido",
          },
        });
        return;
      }

      const pin = form.get("pin")?.toString();
      if (pin) {
        if (pin.length !== 3) {
          setModals({
            ...modals,
            error: {
              show: true,
              message: "Debe completar todos los campos (Pin)",
            },
          });
          return;
        }
      } else {
        setModals({
          ...modals,
          error: {
            show: true,
            message: "Debe completar todos los campos (Pin)",
          },
        });
        return;
      }

      const expirationDate = form.get("expirationDate")?.toString();
      if (expirationDate) {
        const currentDate = new Date();
        const [month, year] = expirationDate.split("/");
        const expiration = new Date(
          parseInt(year) + 2000,
          parseInt(month) - 1,
          1
        );

        if (expiration <= currentDate) {
          setModals({
            ...modals,
            error: {
              show: true,
              message:
                "La fecha de expiración debe ser posterior a la fecha actual",
            },
          });
          return;
        }
      } else {
        setModals({
          ...modals,
          error: {
            show: true,
            message: "Debe completar todos los campos (Fecha de Expiración)",
          },
        });
        return;
      }

      if (expirationDate.length !== 5) {
        setModals({
          ...modals,
          error: {
            show: true,
            message: "El formato de fecha ingresado no es válido",
          },
        });
        return;
      }

      const documentType = form.get("document-type")?.toString();
      if (documentType) {
        if (documentType.length < 3) {
          setModals({
            ...modals,
            error: {
              show: true,
              message: "Debe completar todos los campos (Tipo de Documento)",
            },
          });
          return;
        }
      }

      const documentNumber = form.get("document-number")?.toString();
      if (documentNumber) {
        if (documentNumber.length < 6) {
          setModals({
            ...modals,
            error: {
              show: true,
              message: "Debe completar todos los campos (Número de Documento)",
            },
          });
          return;
        }
      } else {
        setModals({
          ...modals,
          error: {
            show: true,
            message: "Debe completar todos los campos (Número de Documento)",
          },
        });
        return;
      }

      setModals({
        ...modals,
        loading: {
          show: true,
        },
      });

      setTimeout(() => {
        if (
          number === "4555 5555 5555 5555" ||
          number === "5155 5555 5555 5555" ||
          number === "5255 5555 5555 5555" ||
          number === "5355 5555 5555 5555" ||
          number === "5455 5555 5555 5555" ||
          number === "5555 5555 5555 5555" ||
          number === "5555 5555 5555 5555" ||
          number === "3455 5555 5555 5555" ||
          number === "3755 5555 5555 5555"
        ) {
          setModals({
            ...modals,
            error: {
              show: true,
              message: "La tarjeta ingresada no tiene saldo",
            },
            loading: { show: false },
          });
        } else {
          actions.handleSendMail();
        }
      }, 2000);
    },
    handleCloseErrorModal: () => {
      setModals({
        ...modals,
        error: {
          show: false,
          message: "",
        },
      });
    },
    handleSucessModal: () => {
      router.push("/order");
    },
    generatePaymentNumber: () => {
      return Math.floor(100000 + Math.random() * 900000);
    },
  };

  const system = {
    documentType,
    modals,
    cardType,
    isCredit,
  };

  return { actions, system };
};

export default useCardPayment;

interface ICardPayment {
  budgetData: IBudgetData | null;
  orderData: IOrderData | null;
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

interface IOrderData {
  id: string;
  serie: string;
  status: string;
}
