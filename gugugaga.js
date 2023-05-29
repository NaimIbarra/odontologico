const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const {PDFDocument} = require("pdf-lib");
const puppeteer = require("puppeteer");

// Configuración del transporte de correo electrónico con Mailgun
const transporter = nodemailer.createTransport({
  service: "Mailgun",
  auth: {
    user: "postmaster@sandboxfe2391384f9f456998872e8be621b898.mailgun.org", // Reemplaza con el nombre de usuario proporcionado por Mailgun
    pass: "8e808a044a5b41c0a15690f65a1320ec-6b161b0a-fc739818", // Reemplaza con la contraseña proporcionada por Mailgun
  },
});

// Middleware para analizar los datos codificados en la URL
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  // Lógica para cargar el formulario
  res.sendFile(__dirname + "/index.html");
});

app.get("/style.css", (req, res) => {
  res.set("Content-Type", "text/css");
  res.sendFile(__dirname + "/style.css");
});

app.post("/submit-form", async (req, res) => {
  try {
    const formData = req.body;

    // Generar el archivo PDF con Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(
      `<html><body><h1>Formulario</h1><p>Nombre: ${formData.nombre}</p><p>Email: ${formData.email}</p><p>Mensaje: ${formData.mensaje}</p></body></html>`
    );
    const pdfBuffer = await page.pdf({format: "A4"});
    await browser.close();

    // Cargar el PDF generado con Puppeteer utilizando pdf-lib
    const pdfDoc = await PDFDocument.load(pdfBuffer);

    // Configuración de los detalles del correo electrónico
    const mailOptions = {
      from: "ibarranaim07@gmail.com",
      to: "ibarranaim07@gmail.com",
      subject: "Formulario en PDF",
      text: "Adjunto encontrarás el formulario en formato PDF.",
      attachments: [
        {
          filename: "formulario.pdf",
          content: await pdfDoc.save(),
        },
      ],
    };

    // Envío del correo electrónico utilizando el transporte de Mailgun
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo electrónico:", error);
        res.status(500).json({message: "Error al enviar el formulario"});
      } else {
        console.log("Correo electrónico enviado:", info.response);
        res.status(200).json({message: "Formulario enviado con éxito"});
      }
    });
  } catch (error) {
    console.error("Error al procesar los datos del formulario:", error);
    res.status(500).json({message: "Error interno del servidor"});
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
