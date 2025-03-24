var topicOperacionesPAT = "";
var topicOperacionesBombas = "";
var topicAlarmas = "";
var topicListAlarmas = "";
const dataN = "---------";
var server = "http://localhost:3000/api/";
$(document).ready(function () {
  createTopic();
});

$("#signOut").click(function () {
  localStorage.clear();
});

function generarNumeroAleatorio(min, max) {
  if (min >= max) {
    return null;
  }

  let numero = Math.floor(Math.random() * (max - min)) + min;
  return numero;
}

// Función para construir los tópicos
function createTopic() {
  let client = localStorage.getItem("client");
  let proyect = localStorage.getItem("idProyect");

  if ((client == "" && proyect == "") || (client == null && proyect == null)) {
    window.location.href = "../pages/dashboard.html";
    return;
  }
  topicOperacionesPAT = `asb/telemetia/client${client}/proyect${proyect}/operaciones/pat/data`;
  topicOperacionesBombas = `asb/telemetia/client${client}/proyect${proyect}/operaciones/bombas/data`;
  topicListAlarmas = `asb/telemetia/client${client}/proyect${proyect}/list/alarmas/data`;
  topicAlarmas = `asb/telemetia/client${client}/proyect${proyect}/alarmas/data`;
}

// Ejecutar la función al cargar el archivo
createTopic();

// Hacer accesibles las variables en otros scripts
window.topicOperacionesPAT = topicOperacionesPAT;
window.topicOperacionesBombas = topicOperacionesBombas;
window.topicListAlarmas = topicListAlarmas;
window.topicAlarmas = topicAlarmas;
