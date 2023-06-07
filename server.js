const express = require("express");
const app = express();
const PDFDocument = require("pdfkit");
const path = require("path");
const nodemailer = require("nodemailer");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ibarranaim07@gmail.com",
    pass: "minecraft07",
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use("/img", express.static(path.join(__dirname, "img")));

app.get("/style.css", (req, res) => {
  res.set("Content-Type", "text/css");
  res.sendFile(__dirname + "/style.css");
});

app.get("/script.js", (req, res) => {
  res.sendFile(__dirname + "/script.js");
});

app.get("/preview", (req, res) => {
  try {
    const formData = {
      nombre: req.query.nombre || "",
      edad: req.query.edad || "",
      documento: req.query.documento || "",
      email: req.query.email || "",
      nacionalidad: req.query.nacionalidad || "",
      sexo: req.query.sexo || "",
      domicilio: req.query.domicilio || "",
      provincia: req.query.provincia || "",
      localidad: req.query.localidad || "",
      codigo_postal: req.query.codigo_postal || "",
      particular: req.query.particular || "",
      ObraSocial: req.query.ObraSocial || "",
      plan: req.query.plan || "",
      num_afiliado: req.query.num_afiliado || "",
      telefono: req.query.telefono || "",
      celular: req.query.celular || "",
    };

    const pdfData = generatePDF(formData);

    const pdfBase64 = pdfData.toString("base64");
    const pdfDataURL = "data:application/pdf;base64," + pdfBase64;

    res.send(`
      <embed src="${pdfDataURL}" type="application/pdf" width="100%" height="600px" />
    `);
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    res.status(500).json({message: "Error al generar el PDF"});
  }
});

app.get("/generar-pdf", (req, res) => {
  try {
    const formData = {
      nombre: req.query.nombre || "",
      edad: req.query.edad || "",
      documento: req.query.documento || "",
      email: req.query.email || "",
      nacionalidad: req.query.nacionalidad || "",
      sexo: req.query.sexo || "",
    };

    const pdfData = generatePDF(formData);

    const pdfPath = __dirname + "/formulario.pdf";
    fs.writeFileSync(pdfPath, pdfData);

    const mailOptions = {
      from: "ibarranaim07@gmail.com",
      to: "ibarranaim07@gmail.com",
      subject: "Respuestas del formulario",
      text: "Adjunto encontrarás las respuestas del formulario en formato PDF.",
      attachments: [
        {
          path: pdfPath,
          filename: "formulario.pdf",
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error al enviar el correo electrónico.");
      } else {
        console.log("Correo electrónico enviado: " + info.response);
        res.send("Correo electrónico enviado con éxito.");
      }
    });
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    res.status(500).json({message: "Error al generar el PDF"});
  }
});

const stream = require("stream");

function generatePDF(formData) {
  const pdfDoc = new PDFDocument();

  pdfDoc.text("Respuestas del formulario:", {underline: true});
  pdfDoc.moveDown();

  pdfDoc.text("Nombre Completo: " + formData.nombre);
  pdfDoc.text("Edad: " + formData.edad);
  pdfDoc.text("Documento: " + formData.documento);
  pdfDoc.text("Email: " + formData.email);
  pdfDoc.text("Nacionalidad: " + formData.nacionalidad);
  pdfDoc.text("Sexo: " + formData.sexo);

  // Crea un nuevo stream de escritura (WritableStream)
  const chunks = [];
  const bufferStream = new stream.Writable({
    write(chunk, encoding, next) {
      chunks.push(chunk);
      next();
    },
  });

  // Redirige la salida del documento PDF al bufferStream
  pdfDoc.pipe(bufferStream);

  // Finaliza el documento PDF y termina de escribir en el bufferStream
  pdfDoc.end();

  // Crea un Buffer a partir de los datos capturados en el bufferStream
  const buffer = Buffer.concat(chunks);

  // Devuelve el Buffer
  return buffer;
}

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
