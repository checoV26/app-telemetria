var topicOperacionesPAT = "";
var topicOperacionesBombas = "";
var topicAlarmas = "";
var topicListAlarmas = "";
var topicApagarAcction = "";
//var server = "http://localhost:3000/api/";
var server = "http://asbombeo.ddns.net:3000/api/";
const dataN = "---------";

$(document).ready(function () {});

$("#signOut").click(function () {
  localStorage.clear();
});

// Función para construir los tópicos
function createTopic() {
  let client = localStorage.getItem("client");
  let proyect = localStorage.getItem("idProyect");

  if ((client == "" && proyect == "") || (client == null && proyect == null)) {
    window.location.href = "../pages/sign-in.html";
    return;
  }
  topicOperacionesPAT = `asb/telemetia/client${client}/proyect${proyect}/operaciones/pat/data`;
  topicOperacionesBombas = `asb/telemetia/client${client}/proyect${proyect}/operaciones/bombas/data`;
  topicListAlarmas = `asb/telemetia/client${client}/proyect${proyect}/list/alarmas/data`;
  topicAlarmas = `asb/telemetia/client${client}/proyect${proyect}/alarmas/data`;
  topicApagarAcction = `asb/telemetia/client${client}/proyect${proyect}/bomba/data/acction`;
}

function mostrarNotificacion(mensaje, tiempo) {
  const toastElement = document.getElementById("dangerToast");
  const toastBody = toastElement.querySelector(".toast-body");
  const toastTime = toastElement.querySelector(".toast-header small");

  // Cambiar el mensaje dinámicamente
  toastBody.textContent = mensaje;

  // Cambiar el tiempo de la notificación
  toastTime.textContent = tiempo;

  // Mostrar la notificación
  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}

createTopic();
// Hacer accesibles las variables en otros scripts
window.topicOperacionesPAT = topicOperacionesPAT;
window.topicOperacionesBombas = topicOperacionesBombas;
window.topicListAlarmas = topicListAlarmas;
window.topicAlarmas = topicAlarmas;
window.topicApagarAcction = topicApagarAcction;
window.server = server;
