$(document).ready(function () {
  sendProject();
});

let sendProject = () => {
  let id = localStorage.getItem("client");
  let token = localStorage.getItem("token");
  let listProyects = `<option value="" selected disabled>-----------------------------------------------------</option>`;
  if (id == null || id == "") {
    window.location.href = "../pages/sign-in.html";
    return;
  }

  $.get({
    url: `${server}proyect/listProyects`,
    data: { id: id },
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      let array = response.data;
      array.forEach((element) => {
        listProyects += `<option value="${element.Id}">${element.Nombre_Obra}</option>`;
      });
      $("#listProyect").html(listProyects);
      let idProyect = localStorage.getItem("idProyect");
      if (idProyect != "") {
        $("#listProyect").val(idProyect);
        disableBtn();
      }
    },
    error: function (err) {
      // Si el token ha expirado (401 Unauthorized), redirigir al login
      if (err.status === 401) {
        alert("Tu sesión ha expirado. Inicia sesión nuevamente.");
        localStorage.removeItem("token"); // Eliminar el token almacenado
        window.location.href = "../pages/sign-in.html"; // Redirigir a la página de login
      } else if (err.status == 404) {
        $("#listProyect").html(listProyects);
      }
    },
  });
};

$("#listProyect").change(function () {
  let idProyect = $(this).val();
  let nameProyect = $("#listProyect option:selected").text();
  if (idProyect == "" && idProyect == null) {
    console.log("Selecciona un proyecto");
    return;
  }

  localStorage.setItem("idProyect", idProyect);
  localStorage.setItem("nameProyect", nameProyect);
  disableBtn();
});

let disableBtn = () => {
  $("#om").attr("disabled", false);
  $("#de").attr("disabled", false);
  $("#al").attr("disabled", false);
  $("#be").attr("disabled", false);
};

$("#om").click(function () {
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

  window.location.href = "../pages/manual-operations.html";
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
  window.location.href = "../pages/event-log.html";
});
