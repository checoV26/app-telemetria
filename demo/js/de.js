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
    data += "<td>" + generarNumeroAleatorio(120, 200) + "</td>";
    data += "<td>" + generarNumeroAleatorio(125, 127) + "</td>";
    data += "<td>" + generarNumeroAleatorio(60, 61) + "</td>";
    data +=
      "<td>" +
      generarNumeroAleatorio(1, 30) +
      "/" +
      generarNumeroAleatorio(1, 12) +
      "/2024</td>";
    data += "</tr>";
  }
  $("#dataElectri tbody").html(data);
};

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
