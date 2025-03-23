$(document).ready(function () {
  let nameProyect = localStorage.getItem("nameProyect");
  if (nameProyect != "") {
    $("#nameProyect").text(nameProyect);
  }
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
  $("#tableAlarmas tbody").html(data); // Agrega la fila al tbody
};

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
