$(document).ready(function () {
  let nameProyect = localStorage.getItem("nameProyect");
  if (nameProyect != "") {
    $("#nameProyect").text(nameProyect);
  }
});

MQTTClient.subscribe(topicListAlarmas, function (msg) {
  try {
    let data = JSON.parse(msg);
    var tbody = "";
    data.forEach((element) => {
      tbody += `<tr>
                      <td>${element.id}</td>
                      <td>${element.desc}</td>
                      <td>${element.fecha}</td>
                  </tr>`;
    });
    $("#tableAlarmas tbody").html(tbody); // Agrega la fila al tbody
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
