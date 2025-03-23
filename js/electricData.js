$(document).ready(function () {
  let nameProyect = localStorage.getItem("nameProyect");
  if (nameProyect != "") {
    $("#nameProyect").text(nameProyect);
  }
});

MQTTClient.subscribe(topicOperacionesBombas, function (msg) {
  try {
    let data = JSON.parse(msg);
    var tbody = "";
    data.forEach((element) => {
      tbody += `<tr>
                    <td>${element.id}</td>
                    <td>${element.name}</td>
                    <td>${element.data.voltaje}</td>
                    <td>${element.data.corriente}</td>
                    <td>${element.data.frecuencia}</td>
                    <td>${element.data.fecha}</td>
                </tr>`;
    });

    $("#dataElectri tbody").html(tbody);
  } catch (error) {
    $("#dataElectri tbody").html("");
  }
});

// Suscribirse a las alarmas
MQTTClient.subscribe(topicAlarmas, function (msg) {
  try {
    let data = JSON.parse(msg);
    mostrarNotificacion(data.sms, data.fecha);
  } catch (error) {
    console.log("Error al mostrar la notificación");
  }
});
