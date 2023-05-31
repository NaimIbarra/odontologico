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

// Obtener el formulario
const form = document.getElementById("myForm");

// Agregar el evento submit al formulario
form.addEventListener("submit", (event) => {
  // Obtener todos los conjuntos de preguntas
  const questionSets = document.querySelectorAll(".table-row");

  // Bandera para controlar si se ha mostrado la alerta
  let alertShown = false;

  // Iterar sobre los conjuntos de preguntas
  questionSets.forEach((questionSet) => {
    // Obtener los radio buttons de la pregunta actual
    const radioButtons = questionSet.querySelectorAll('input[type="radio"]');

    // Obtener el input oculto de la pregunta actual
    const hiddenInput = questionSet.querySelector(".hidden-input");

    // Verificar si al menos un radio button está seleccionado
    if (!isChecked(radioButtons)) {
      // Mostrar una alerta al usuario si no se ha mostrado previamente
      if (!alertShown) {
        alert("Por favor, seleccione una opción.");
        alertShown = true;
      }
      // Prevenir el envío del formulario
      event.preventDefault();
    }
  });
});

// Función para verificar si al menos un radio button está seleccionado
function isChecked(radioButtons) {
  return Array.from(radioButtons).some((radioButton) => radioButton.checked);
}

//Selects

// Lista de nacionalidades
const nacionalidades = [
  "Afganistán",
  "Albania",
  "Alemania",
  "Andorra",
  "Angola",
  "Antigua y Barbuda",
  "Arabia Saudita",
  "Argelia",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaiyán",
  "Bahamas",
  "Bangladés",
  "Barbados",
  "Baréin",
  "Bélgica",
  "Belice",
  "Benín",
  "Bielorrusia",
  "Birmania",
  "Bolivia",
  "Bosnia y Herzegovina",
  "Botsuana",
  "Brasil",
  "Brunéi",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Bután",
  "Cabo Verde",
  "Camboya",
  "Camerún",
  "Canadá",
  "Catar",
  "Chad",
  "Chile",
  "China",
  "Chipre",
  "Ciudad del Vaticano",
  "Colombia",
  "Comoras",
  "Corea del Norte",
  "Corea del Sur",
  "Costa de Marfil",
  "Costa Rica",
  "Croacia",
  "Cuba",
  "Dinamarca",
  "Dominica",
  "Ecuador",
  "Egipto",
  "El Salvador",
  "Emiratos Árabes Unidos",
  "Eritrea",
  "Eslovaquia",
  "Eslovenia",
  "España",
  "Estados Unidos",
  "Estonia",
  "Etiopía",
  "Filipinas",
  "Finlandia",
  "Fiyi",
  "Francia",
  "Gabón",
  "Gambia",
  "Georgia",
  "Ghana",
  "Granada",
  "Grecia",
  "Guatemala",
  "Guyana",
  "Guinea",
  "Guinea ecuatorial",
  "Guinea-Bisáu",
  "Haití",
  "Honduras",
  "Hungría",
  "India",
  "Indonesia",
  "Irak",
  "Irán",
  "Irlanda",
  "Islandia",
  "Islas Marshall",
  "Islas Salomón",
  "Israel",
  "Italia",
  "Jamaica",
  "Japón",
  "Jordania",
  "Kazajistán",
  "Kenia",
  "Kirguistán",
  "Kiribati",
  "Kuwait",
  "Laos",
  "Lesoto",
  "Letonia",
  "Líbano",
  "Liberia",
  "Libia",
  "Liechtenstein",
  "Lituania",
  "Luxemburgo",
  "Madagascar",
  "Malasia",
  "Malaui",
  "Maldivas",
  "Malí",
  "Malta",
  "Marruecos",
  "Mauricio",
  "Mauritania",
  "México",
  "Micronesia",
  "Moldavia",
  "Mónaco",
  "Mongolia",
  "Montenegro",
  "Mozambique",
  "Namibia",
  "Nauru",
  "Nepal",
  "Nicaragua",
  "Níger",
  "Nigeria",
  "Noruega",
  "Nueva Zelanda",
  "Omán",
  "Países Bajos",
  "Pakistán",
  "Palaos",
  "Palestina",
  "Panamá",
  "Papúa Nueva Guinea",
  "Paraguay",
  "Perú",
  "Polonia",
  "Portugal",
  "Reino Unido",
  "República Centroafricana",
  "República Checa",
  "República de Macedonia",
  "República del Congo",
  "República Democrática del Congo",
  "República Dominicana",
  "República Sudafricana",
  "Ruanda",
  "Rumanía",
  "Rusia",
  "Samoa",
  "San Cristóbal y Nieves",
  "San Marino",
  "San Vicente y las Granadinas",
  "Santa Lucía",
  "Santo Tomé y Príncipe",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leona",
  "Singapur",
  "Siria",
  "Somalia",
  "Sri Lanka",
  "Suazilandia",
  "Sudán",
  "Sudán del Sur",
  "Suecia",
  "Suiza",
  "Surinam",
  "Tailandia",
  "Tanzania",
  "Tayikistán",
  "Timor Oriental",
  "Togo",
  "Tonga",
  "Trinidad y Tobago",
  "Túnez",
  "Turkmenistán",
  "Turquía",
  "Tuvalu",
  "Ucrania",
  "Uganda",
  "Uruguay",
  "Uzbekistán",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Yibuti",
  "Zambia",
  "Zimbabue",
];
// Array de provincias de Argentina
const provinciasArgentina = [
  "Buenos Aires",
  "Ciudad Autónoma de Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
  "Tucumán",
];
const opcionesSexo = [
  {value: "opcion1", label: "Masculino"},
  {value: "opcion2", label: "Femenino"},
  {value: "opcion3", label: "Otro"},
];
const opcionesObraSocial = [
  {value: "opcion1", label: "Medife"},
  {value: "opcion2", label: "Galeno"},
  {value: "opcion3", label: "OSDE"},
  {value: "opcion4", label: "Medicus"},
  {value: "opcion5", label: "Sancor Salud"},
  {value: "opcion6", label: "Swiss Medical"},
];
const opcionesParentezco = [
  {value: "opcion1", label: "Padre"},
  {value: "opcion2", label: "Madre"},
  {value: "opcion3", label: "Familiar"},
  {value: "opcion4", label: "Tutor Legal"},
  {value: "opcion5", label: "Otro"},
];

// Función para generar las opciones del select
function generarOpcionesSelect() {
  // Generar opciones para el selector de nacionalidades
  const selectNacionalidades = document.getElementById("nacionalidad-select");

  const placeholderOptionNacionalidades = document.createElement("option");
  placeholderOptionNacionalidades.value = "";
  placeholderOptionNacionalidades.textContent = "Seleccionar:";
  placeholderOptionNacionalidades.selected = true; // Marcar como opción seleccionada por defecto
  placeholderOptionNacionalidades.disabled = true; // Deshabilitar la opción "Seleccionar:"
  selectNacionalidades.appendChild(placeholderOptionNacionalidades);

  nacionalidades.forEach((nacionalidad) => {
    const optionElement = document.createElement("option");
    optionElement.value = nacionalidad;
    optionElement.textContent = nacionalidad;
    selectNacionalidades.appendChild(optionElement);
  });

  // Generar opciones para el selector de provincias de Argentina
  const selectProvincias = document.getElementById("select-provincias");

  const placeholderOptionProvincias = document.createElement("option");
  placeholderOptionProvincias.value = "";
  placeholderOptionProvincias.textContent = "Seleccionar:";
  placeholderOptionProvincias.selected = true; // Marcar como opción seleccionada por defecto
  placeholderOptionProvincias.disabled = true; // Deshabilitar la opción "Seleccionar:"
  selectProvincias.appendChild(placeholderOptionProvincias);

  provinciasArgentina.forEach((provincia) => {
    const optionElement = document.createElement("option");
    optionElement.value = provincia;
    optionElement.textContent = provincia;
    selectProvincias.appendChild(optionElement);
  });

  // Generar opciones para el selector de sexo
  const selectSexo = document.getElementById("select-sexo");

  const placeholderOptionSexo = document.createElement("option");
  placeholderOptionSexo.value = "";
  placeholderOptionSexo.textContent = "Seleccionar:";
  placeholderOptionSexo.selected = true; // Marcar como opción seleccionada por defecto
  placeholderOptionSexo.disabled = true; // Deshabilitar la opción "Seleccionar:"
  selectSexo.appendChild(placeholderOptionSexo);

  opcionesSexo.forEach((opcion) => {
    const optionElement = document.createElement("option");
    optionElement.value = opcion.value;
    optionElement.textContent = opcion.label;
    selectSexo.appendChild(optionElement);
  });

  // Generar opciones para el selector de obra social
  const selectObraSocial = document.getElementById("select-obra-social");

  const placeholderOptionObraSocial = document.createElement("option");
  placeholderOptionObraSocial.value = "";
  placeholderOptionObraSocial.textContent = "Seleccionar:";
  placeholderOptionObraSocial.selected = true; // Marcar como opción seleccionada por defecto
  placeholderOptionObraSocial.disabled = true; // Deshabilitar la opción "Seleccionar:"
  selectObraSocial.appendChild(placeholderOptionObraSocial);

  opcionesObraSocial.forEach((opcion) => {
    const optionElement = document.createElement("option");
    optionElement.value = opcion.value;
    optionElement.textContent = opcion.label;
    selectObraSocial.appendChild(optionElement);
  });
  // Generar opciones para el selector de parentezco del responsable
  const selectParentezco = document.getElementById("select-parentezco");

  const placeholderOptionParentezco = document.createElement("option");
  placeholderOptionParentezco.value = "";
  placeholderOptionParentezco.textContent = "Seleccionar:";
  placeholderOptionParentezco.selected = true; // Marcar como opción seleccionada por defecto
  placeholderOptionParentezco.disabled = true; // Deshabilitar la opción "Seleccionar:"
  selectParentezco.appendChild(placeholderOptionParentezco);

  opcionesParentezco.forEach((opcion) => {
    const optionElement = document.createElement("option");
    optionElement.value = opcion.value;
    optionElement.textContent = opcion.label;
    selectParentezco.appendChild(optionElement);
  });
}

generarOpcionesSelect();
/*
// Función para verificar si al menos un radio button está seleccionado
function isChecked(radioButtons) {
  return Array.from(radioButtons).some((radioButton) => radioButton.checked);
}

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
});*/
