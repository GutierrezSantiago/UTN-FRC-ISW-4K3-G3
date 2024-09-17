const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
});

app.post("/api/sendmail", (req, res) => {
  const { to, subject, html } = req.body;
  const mailOptions = {
    from: "dealessandris.01@gmail.com",
    to,
    subject,
    html,
  };

  smtpTransport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res
        .status(500)
        .send({ success: false, message: "Error al enviar correo" });
    } else {
      console.log("Email enviado: " + info.response);
      res.send({ success: true, message: "Correo enviado con éxito" });
    }
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
