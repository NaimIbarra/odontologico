// Obtener el elemento de entrada
var inputElement = document.getElementById("codigo_postal");

// Establecer la longitud máxima permitida
inputElement.maxLength = 4;

// Agregar un controlador de eventos para validar la entrada
inputElement.addEventListener("input", function () {
  var value = this.value;
  if (value.length > 4) {
    this.value = value.slice(0, 4);
  }
});
var inputElement = document.getElementById("edad");

// Establecer la longitud máxima permitida
inputElement.maxLength = 2;

// Agregar un controlador de eventos para validar la entrada
inputElement.addEventListener("input", function () {
  var value = this.value;
  if (value.length > 2) {
    this.value = value.slice(0, 2);
  }
});
var inputElement = document.getElementById("documento");

// Establecer la longitud máxima permitida
inputElement.maxLength = 8;

// Agregar un controlador de eventos para validar la entrada
inputElement.addEventListener("input", function () {
  var value = this.value;
  if (value.length > 8) {
    this.value = value.slice(0, 8);
  }
});

function mostrarCampoAdicional() {
  var checkbox = document.getElementsByName("si-opcion1");
  var campoAdicional = document.getElementsByClassName("campo-adicional");

  for (var i = 0; i < camposAdicionales.length; i++) {
    if (checkbox.checked) {
      camposAdicionales[i].style.display = "block";
    } else {
      camposAdicionales[i].style.display = "none";
    }
  }
}
// Obtener todos los radio buttons con valor "si"
const siRadios = document.querySelectorAll('input[type="radio"][value="si"]');

// Iterar sobre los radio buttons
siRadios.forEach((radio) => {
  // Obtener el contenedor padre de la fila
  const row = radio.closest(".table-row");

  // Obtener los elementos relevantes de la fila
  const hiddenLabel = row.querySelector(".hidden-label");
  const hiddenInput = row.querySelector(".hidden-input");

  // Manejar el cambio de selección en el radio button "SI"
  radio.addEventListener("change", () => {
    // Si se selecciona "SI", mostrar los elementos ocultos
    if (radio.checked) {
      hiddenLabel.style.display = "block";
      hiddenInput.style.display = "block";
    } else {
      // Si no se selecciona "SI", ocultar los elementos
      hiddenLabel.style.display = "none";
      hiddenInput.style.display = "none";
    }
  });

  // Obtener el radio button "NO" correspondiente
  const noRadio = row.querySelector('input[type="radio"][value="no"]');

  // Manejar el cambio de selección en el radio button "NO"
  noRadio.addEventListener("change", () => {
    // Si se selecciona "NO", ocultar los elementos
    if (noRadio.checked) {
      hiddenLabel.style.display = "none";
      hiddenInput.style.display = "none";
    }
  });
});

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();

  var nombre = document.getElementById("nombre").value;
  var email = document.getElementById("email").value;
  var mensaje = document.getElementById("mensaje").value;

  var formData = {
    nombre: nombre,
    email: email,
    mensaje: mensaje,
  };

  fetch("/generate-pdf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then(function (response) {
      if (response.ok) {
        return response.arrayBuffer();
      } else {
        throw new Error("Error al generar el PDF");
      }
    })
    .then(function (arrayBuffer) {
      // Renderizar el PDF en el elemento canvas
      PDFJS.getDocument(arrayBuffer).promise.then(function (pdf) {
        pdf.getPage(1).then(function (page) {
          var canvas = document.getElementById("pdfPreview");
          var context = canvas.getContext("2d");
          var viewport = page.getViewport({scale: 1});
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          page.render({
            canvasContext: context,
            viewport: viewport,
          });
        });
      });

      // Restablecer el formulario
      document.getElementById("myForm").reset();
      alert("Formulario enviado y PDF generado con éxito");
    })
    .catch(function (error) {
      console.log(error);
      alert("Error al enviar el formulario");
    });
});
