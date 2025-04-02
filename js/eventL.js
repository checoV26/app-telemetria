$(document).ready(function () {
  let nameProyect = localStorage.getItem("nameProyect");
  if (nameProyect != "") {
    $("#nameProyect").text(nameProyect);
  }
  getLogs();
});

let getDataTable = () => {
  var data = "";
  for (let i = 1; i < 10; i++) {
    data += "<tr>";
    data += "<td>" + i + "</td>";
    data += "<td>BOMBA " + generarNumeroAleatorio(1, 6) + "</td>";
    data +=
      "<td>" +
      generarNumeroAleatorio(1, 30) +
      "/" +
      generarNumeroAleatorio(1, 12) +
      "/2024</td>";
    data += "</tr>";
  }
  $("#tableData tbody").html(data); // Agrega la fila al tbody
};

let getLogs = () => {
  let id = localStorage.getItem("usuario");
  let token = localStorage.getItem("token");
  var data = "";
  if (id == null || id == "") {
    window.location.href = "../pages/sign-in.html";
    return;
  }

  $.get({
    url: `${server}log/listLogs`,
    data: { id: id },
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      let data = response.data;
      var i = 1;
      data.forEach((element) => {
        console.log();
        let fecha = element.fecha;

        data += `
                  <tr>
                    <td>${i}</td>
                    <td class="text-start"> ${element.descripcion}</td>
                    <td>${formatearFecha(fecha)}</td>
                  </tr>`;
        i++;
      });
      $("#tableData tbody").html(data);
    },
    error: function (err) {
      if (err.status === 401) {
        window.location.href = "../pages/sign-in.html";
      }
    },
  });
};

// Suscribirse a las alarmas
MQTTClient.subscribe(topicAlarmas, function (msg) {
  try {
    let data = JSON.parse(msg);
    mostrarNotificacion(data.sms, data.fecha);
  } catch (error) {
    console.log("Error al mostrar la notificación");
  }
});

function formatearFecha(fecha) {
  // Verificar si la fecha es válida
  if (isNaN(new Date(fecha))) {
    throw new Error("La fecha proporcionada no es válida.");
  }

  // Configuración para formatear la fecha
  const opciones = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const fechaFormateada = new Intl.DateTimeFormat("es-ES", opciones).format(
    new Date(fecha)
  );
  return fechaFormateada;
}
