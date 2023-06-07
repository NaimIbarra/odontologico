function applyMaxLengthValidation(inputElement, maxLength) {
  inputElement.maxLength = maxLength;
  inputElement.addEventListener("input", function () {
    var value = this.value;
    if (value.length > maxLength) {
      this.value = value.slice(0, maxLength);
    }
  });
}

// Ejemplo de uso:
var codigoPostalElement = document.getElementById("codigo_postal");
applyMaxLengthValidation(codigoPostalElement, 4);

var edadElement = document.getElementById("edad");
applyMaxLengthValidation(edadElement, 2);

var documentoElement = document.getElementById("documento");
applyMaxLengthValidation(documentoElement, 8);

// Obtener todos los conjuntos de preguntas de la primera tabla
const firstTableQuestionSets = document.querySelectorAll(".table .table-row");

// Iterar sobre los conjuntos de preguntas de la primera tabla
firstTableQuestionSets.forEach((questionSet) => {
  // Obtener los radio buttons "SI" y "NO" de la pregunta actual
  const siRadio = questionSet.querySelector('input[type="radio"][value="si"]');
  const noRadio = questionSet.querySelector('input[type="radio"][value="no"]');

  // Obtener los elementos ocultos de la pregunta actual
  const hiddenLabel = questionSet.querySelector(".hidden-label");
  const hiddenInput = questionSet.querySelector(".hidden-input");

  // Manejar el cambio de selección en los radio buttons
  const handleRadioChange = () => {
    // Si se selecciona "SI", mostrar los elementos ocultos
    if (siRadio.checked) {
      if (hiddenLabel && hiddenInput) {
        hiddenLabel.style.display = "block";
        hiddenInput.style.display = "block";
        hiddenInput.required = true; // Hacer el campo oculto obligatorio
      }
    } else if (noRadio.checked) {
      // Si se selecciona "NO", ocultar los elementos y quitar la obligatoriedad del campo
      if (hiddenLabel && hiddenInput) {
        hiddenLabel.style.display = "none";
        hiddenInput.style.display = "none";
        hiddenInput.required = false; // Quitar la obligatoriedad del campo oculto
        hiddenInput.value = ""; // Limpiar el valor del campo oculto
      }
    }
  };

  // Manejar el cambio de selección en el radio button "SI" de la pregunta actual
  if (siRadio) {
    siRadio.addEventListener("change", handleRadioChange);
  }

  // Manejar el cambio de selección en el radio button "NO" de la pregunta actual
  if (noRadio) {
    noRadio.addEventListener("change", handleRadioChange);
  }
});

// Obtener el formulario
const form = document.getElementById("myForm");

// Obtener todos los conjuntos de preguntas
const questionSets = document.querySelectorAll(".table-row");

// Obtener todos los checkboxes del formulario
const checkboxes = form.querySelectorAll('input[type="checkbox"]');

// Bandera para controlar si se ha mostrado la alerta
let alertShown = false;

// Agregar el evento submit al formulario
form.addEventListener("submit", (event) => {
  // Verificar si al menos un checkbox está seleccionado
  if (!isChecked(checkboxes)) {
    // Mostrar una alerta al usuario
    alert("Por favor, seleccione al menos una opción.");
    // Prevenir el envío del formulario
    event.preventDefault();
  }

  let radioChecked = false;

  // Iterar sobre los conjuntos de preguntas
  questionSets.forEach((questionSet) => {
    // Obtener los radio buttons de la pregunta actual
    const radioButtons = questionSet.querySelectorAll('input[type="radio"]');

    // Verificar si al menos un radio button está seleccionado
    if (isChecked(radioButtons)) {
      radioChecked = true;
    }
  });

  // Si no se seleccionó ningún radio button, mostrar la alerta y prevenir el envío del formulario
  if (!radioChecked) {
    alert("Por favor, seleccione una opción.");
    event.preventDefault();
  }
});

function isChecked(inputs) {
  return Array.from(inputs).some((input) => input.checked);
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
const opcionesSexo = [
  {value: "opcion1", label: "Masculino"},
  {value: "opcion2", label: "Femenino"},
  {value: "opcion3", label: "Otro"},
];
const opcionesParticular = [
  {value: "opcion1", label: "Si"},
  {value: "opcion2", label: "No"},
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
//Selects de Provincia y su localidad correspondiente a partir de una API
const $d = document;
const $selectProvincias = $d.getElementById("selectProvincias");
const $selectLocalidades = $d.getElementById("selectLocalidades");

function provincia() {
  fetch("https://apis.datos.gob.ar/georef/api/provincias")
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      let provincias = json.provincias.map((el) => el.nombre);
      provincias.sort(); // Ordenar alfabéticamente

      let $options = `<option value="Elige una provincia">Elige una provincia:</option>`;
      provincias.forEach((nombre) => {
        $options += `<option value="${nombre}">${nombre}</option>`;
      });

      $selectProvincias.innerHTML = $options;
    })
    .catch((error) => {
      let message = error.statusText || "Ocurrió un error";

      $selectProvincias.nextElementSibling.innerHTML = `Error: ${error.status}: ${message}`;
    });
}

$d.addEventListener("DOMContentLoaded", provincia);

function localidadesPorProvincia(provincia) {
  fetch(
    `https://apis.datos.gob.ar/georef/api/localidades?provincia=${provincia}&campos=id,nombre&max=5000`
  )
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      let localidades = json.localidades.map((el) => el.nombre);
      localidades.sort(); // Ordenar alfabéticamente

      let $options = `<option value="Elige una localidad">Elige una localidad:</option>`;
      localidades.forEach((nombre) => {
        $options += `<option value="${nombre}">${nombre}</option>`;
      });

      $selectLocalidades.innerHTML = $options;
    })
    .catch((error) => {
      let message = error.statusText || "Ocurrió un error";

      $selectLocalidades.nextElementSibling.innerHTML = `Error: ${error.status}: ${message}`;
    });
}

$selectProvincias.addEventListener("change", (e) => {
  const provinciaSeleccionada = e.target.value;
  if (provinciaSeleccionada !== "Elige una provincia:") {
    localidadesPorProvincia(provinciaSeleccionada);
  } else {
    $selectLocalidades.innerHTML =
      '<option value="">Selecciona una provincia primero</option>';
  }
});

// Función para generar las opciones de los select
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

  /* // Generar opciones para el selector de provincias de Argentina
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
  });*/

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
  // Generar opciones para el selector de particular
  const selectParticular = document.getElementById("select-particular");

  const placeholderOptionParticular = document.createElement("option");
  placeholderOptionParticular.value = "";
  placeholderOptionParticular.textContent = "Seleccionar:";
  placeholderOptionParticular.selected = true; // Marcar como opción seleccionada por defecto
  placeholderOptionParticular.disabled = true; // Deshabilitar la opción "Seleccionar:"
  selectParticular.appendChild(placeholderOptionParticular);

  opcionesParticular.forEach((opcion) => {
    const optionElement = document.createElement("option");
    optionElement.value = opcion.value;
    optionElement.textContent = opcion.label;
    selectParticular.appendChild(optionElement);
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

//Funcion para deshabilitar el select de Obra Social al seleccionar "SI" en Particular
const selectParticular = document.getElementById("select-particular");
const selectObraSocial = document.getElementById("select-obra-social");

selectParticular.addEventListener("change", function () {
  if (selectParticular.value === "opcion1") {
    selectObraSocial.disabled = true;
  } else {
    selectObraSocial.disabled = false;
  }
});

// Verificar el estado inicial del select de particular al cargar la página
if (selectParticular.value === "opcion1") {
  selectObraSocial.disabled = true;
}

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
