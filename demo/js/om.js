$(document).ready(function () {
  let nameProyect = localStorage.getItem("nameProyect");
  if (nameProyect != "") {
    $("#spinner").show();
    setTimeout(function () {
      $("#nameProyect").text(nameProyect);
      $("#spinner").hide();
    }, 500);
  }
});

// Suscribirse a un tópico para obtener Presión de ajuste y de trabajo
MQTTClient.subscribe(topicOperacionesPAT, function (msg) {
  try {
    let data = JSON.parse(msg);
    $("#omPresionA").text(data.presionA);
    $("#omPresionT").text(data.presionT);
  } catch (error) {
    $("#omPresionA").text(dataN);
    $("#omPresionT").text(dataN);
  }
});

// Suscribirse a otro tópico
MQTTClient.subscribe(topicOperacionesBombas, function (msg) {
  try {
    let data = JSON.parse(msg);
    var num = 1;
    data.forEach((element) => {
      var nameB = `statusB${num}`;
      var voltaje = `omVoltaje${num}`;
      var corriente = `omCorriente${num}`;
      var frecuencia = `omFrecuencia${num}`;
      var checkB = `checkB${num}`;
      if (element.status) {
        $(`#${nameB}`).removeClass("rojo");
        $(`#${nameB}`).addClass("verde");

        $(`#${voltaje}`).text(element.data.voltaje);
        $(`#${corriente}`).text(element.data.corriente);
        $(`#${frecuencia}`).text(element.data.frecuencia);

        $(`#${checkB}`).prop("disabled", true);
        $(`#${checkB}`).prop("checked", true);
      } else {
        $(`#${nameB}`).removeClass("verde");
        $(`#${nameB}`).addClass("rojo");

        $(`#${voltaje}`).text(dataN);
        $(`#${corriente}`).text(dataN);
        $(`#${frecuencia}`).text(dataN);
        $(`#${checkB}`).prop("checked", true);
      }

      num++;
    });
  } catch (error) {
    for (let index = 1; index < 7; index++) {
      var nameB = `statusB${index}`;
      $(`#${nameB}`).removeClass("verde");
      $(`#${nameB}`).addClass("rojo");
    }
  }
});
