$(document).ready(function () {
  localStorage.clear();
  $("#form-singIn").on("submit", function (e) {
    sendData(e);
  });
});

let sendData = (e) => {
  e.preventDefault();

  // Obtener los datos del formulario
  let data = {
    userName: $("#userName").val(),
    pass: $("#pass").val(),
  };

  console.log(data);

  $("#spinner").show();

  $.ajax({
    type: "POST",
    url: "http://asbombeo.ddns.net:3000/api/auth/login",
    data: JSON.stringify(data), // Convertir el objeto en JSON
    contentType: "application/json", // Indicar que estamos enviando JSON
    processData: false,
    success: function (response) {
      console.log(response);
      localStorage.setItem("client", response.idCliente);
      localStorage.setItem("token", response.token);
      window.location.href = "../pages/dashboard.html";
      $("#spinner").hide();
    },
    error: function (err) {
      Swal.fire({
        title: "Error",
        text: "Usuario o contraseña incorrectos",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      // Ocultar el spinner en caso de error también
      $("#spinner").hide();
    },
  });
};
