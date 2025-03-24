$(document).ready(function () {
  // Eventos de los botones
  getDataProyect();
  $("#om").click(function () {
    let idProyect = $("#listProyect").val();
    console.log(idProyect);
    if (idProyect == "" || idProyect == null) {
      Swal.fire({
        title: "Error!",
        text: "Selecciona un proyecto",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      return;
    }

    window.location.href = "../pages/manual-operations.html";
  });
  $("#oa").click(function () {
    let idProyect = $("#listProyect").val();
    if (idProyect == "" || idProyect == null) {
      Swal.fire({
        title: "Error!",
        text: "Selecciona un proyecto",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      return;
    }

    window.location.href = "../pages/automatic-operation.html";
  });
  $("#de").click(function () {
    let idProyect = $("#listProyect").val();
    if (idProyect == "" || idProyect == null) {
      Swal.fire({
        title: "Error!",
        text: "Selecciona un proyecto",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      return;
    }

    window.location.href = "../pages/electrical-data.html";
  });
  $("#al").click(function () {
    let idProyect = $("#listProyect").val();
    if (idProyect == "" || idProyect == null) {
      Swal.fire({
        title: "Error!",
        text: "Selecciona un proyecto",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      return;
    }

    window.location.href = "../pages/alarms.html";
  });
  $("#be").click(function () {
    let idProyect = $("#listProyect").val();
    if (idProyect == "" && idProyect == null) {
      Swal.fire({
        title: "Error!",
        text: "Selecciona un proyecto",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      return;
    }
    window.location.href = "../pages/event-log.html";
  });
});

$("#listProyect").change(function () {
  let idProyect = $(this).val();
  let nameProyect = $("#listProyect option:selected").text();
  if (idProyect == "" && idProyect == null) {
    console.log("Selecciona un proyecto");
    return;
  }

  localStorage.setItem("idProyect", idProyect);
  localStorage.setItem("nameProyect", nameProyect);
  localStorage.setItem("client", 1);
  disableBtn();
});

let getDataProyect = () => {
  getProyect();
  let idProyect = localStorage.getItem("idProyect");
  if (idProyect != "") {
    $("#listProyect").val(idProyect);
    disableBtn();
  }
};

let disableBtn = () => {
  $("#om").attr("disabled", false);
  $("#oa").attr("disabled", false);
  $("#de").attr("disabled", false);
  $("#al").attr("disabled", false);
  $("#be").attr("disabled", false);
};
let getProyect = () => {
  // Listar proyectos
};
