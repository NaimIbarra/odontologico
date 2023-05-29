const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
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

app.get("/preview", async (req, res) => {
  try {
    const formData = {
      nombre: "Nombre de ejemplo",
      email: "ejemplo@example.com",
      mensaje: "Este es un mensaje de ejemplo",
    };

    // Iniciar una instancia de Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Cargar la página web con el formulario
    await page.goto("http://localhost:3000", {waitUntil: "networkidle0"});

    // Rellenar el formulario con los datos
    await page.type('input[name="nombre"]', formData.nombre);
    await page.type('input[name="email"]', formData.email);
    await page.type('textarea[name="mensaje"]', formData.mensaje);

    // Generar la vista previa del PDF
    const pdfBuffer = await page.pdf({format: "A4"});

    // Cerrar el navegador
    await browser.close();

    // Configurar los detalles del correo electrónico
    const mailOptions = {
      from: "ibarranaim07@gmail.com",
      to: "ibarranaim07@gmail.com",
      subject: "Formulario en PDF",
      text: "Adjunto encontrarás el formulario en formato PDF.",
      attachments: [
        {
          filename: "formulario.pdf",
          content: pdfBuffer,
        },
      ],
    };

    // Renderizar la vista previa del PDF en el navegador
    res.type("application/pdf");
    res.send(pdfBuffer);

    // Enviar el correo electrónico utilizando el transporte de Mailgun
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

app.post("/submit-form", async (req, res) => {
  try {
    const formData = req.body;

    // Iniciar una instancia de Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Cargar la página web con el formulario
    await page.goto("http://localhost:3000", {waitUntil: "networkidle0"});

    // Rellenar el formulario con los datos recibidos
    await page.type('input[name="nombre"]', formData.nombre);
    await page.type('input[name="email"]', formData.email);
    await page.type('textarea[name="mensaje"]', formData.mensaje);

    // Generar la vista previa del PDF
    const pdfBuffer = await page.pdf({format: "A4"});

    // Cerrar el navegador
    await browser.close();

    // Configuración de los detalles del correo electrónico
    const mailOptions = {
      from: "ibarranaim07@gmail.com",
      to: "ibarranaim07@gmail.com",
      subject: "Formulario en PDF",
      text: "Adjunto encontrarás el formulario en formato PDF.",
      attachments: [
        {
          filename: "formulario.pdf",
          content: pdfBuffer,
        },
      ],
    };

    // Enviar el correo electrónico utilizando el transporte de Mailgun
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
