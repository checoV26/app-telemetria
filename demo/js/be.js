$(document).ready(function () {
  let nameProyect = localStorage.getItem("nameProyect");
  if (nameProyect != "") {
    $("#nameProyect").text(nameProyect);
  }
  setInterval(() => {
    getDataTable();
  }, 1000);
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
