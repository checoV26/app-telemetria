$(document).ready(function () {
  let nameProyect = localStorage.getItem("nameProyect");
  if (nameProyect != "") {
    $("#spinner").show();
    setTimeout(function () {
      $("#nameProyect").text(nameProyect);
      $("#spinner").hide();
    }, 500);
  }
  omPresionT = new JustGage({
    id: "omPresionT",
    value: 0,
    min: 0,
    max: 7,
    title: "",
    label: "",
    pointer: true,
  });

  omPresionA = new JustGage({
    id: "omPresionA",
    value: 0,
    min: 0,
    max: 7,
    title: "",
    label: "",
    pointer: true,
  });

  // Suscribirse a un tópico para obtener Presión de ajuste y de trabajo
  MQTTClient.subscribe(topicOperacionesPAT, function (msg) {
    try {
      let data = JSON.parse(msg);
      /*
      $("#omPresionA").text(data.presionA);
      $("#omPresionT").text(data.presionT);
      */
      omPresionT.refresh(data.presionT);
      omPresionA.refresh(data.presionA);
    } catch (error) {
      omPresionT.refresh(0);
      omPresionA.refresh(0);
    }
  });

  // Suscribirse a otro tópico
  MQTTClient.subscribe(topicOperacionesBombas, function (msg) {
    try {
      let data = JSON.parse(msg);
      var num = 1;
      var perfil = localStorage.getItem("perfil");
      for (let i = 6; i > data.length; i--) {
        $(`#dataBomba${i}`).prop("hidden", true);
        $(`#imgData${i}`).prop("hidden", true);
      }

      data.forEach((element) => {
        var nameB = `statusB${num}`;
        var voltaje = `omVoltaje${num}`;
        var corriente = `omCorriente${num}`;
        var frecuencia = `omFrecuencia${num}`;
        var checkB = `checkB${num}`;
        // que si viene como false oculte
        if (perfil == "A") {
          $(`#${checkB}`).prop("disabled", false);
        }
        if (element.status) {
          $(`#${nameB}`).removeClass("rojo");
          $(`#${nameB}`).addClass("verde");
          $(`#${voltaje}`).text(element.data.voltaje);
          $(`#${corriente}`).text(element.data.corriente);
          $(`#${frecuencia}`).text(element.data.frecuencia);
          //$(`#${checkB}`).prop("disabled", true);
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

  // Suscribirse a las alarmas
  MQTTClient.subscribe(topicAlarmas, function (msg) {
    try {
      let data = JSON.parse(msg);
      mostrarNotificacion(data.sms, data.fecha);
    } catch (error) {
      console.log("Error al mostrar la notificación");
    }
  });

  MQTTClient.subscribe(topicApagarAcction, function (msg) {
    console.log("Mandar accines a las bombas", msg);
  });

  $("#checkB1").on("change", async function () {
    if ($(this).is(":checked")) {
      const exito = await manejarActivacion("¿Activar bomba?", true, "1");
      if (!exito) {
        $(this).prop("checked", false); // Desmarca si cancela
      }
    } else {
      const exito = await manejarActivacion("¿Apagar bomba?", false, "1");
      if (!exito) {
        $(this).prop("checked", true); // Desmarca si cancela
      }
    }
  });

  $("#checkB2").on("change", async function () {
    if ($(this).is(":checked")) {
      const exito = await manejarActivacion("¿Activar bomba?", true, "2");
      if (!exito) {
        $(this).prop("checked", false); // Desmarca si cancela
      }
    } else {
      const exito = await manejarActivacion("¿Apagar bomba?", false, "2");
      if (!exito) {
        $(this).prop("checked", true); // Desmarca si cancela
      }
    }
  });

  $("#checkB3").on("change", async function () {
    if ($(this).is(":checked")) {
      const exito = await manejarActivacion("¿Activar bomba?", true, "3");
      if (!exito) {
        $(this).prop("checked", false); // Desmarca si cancela
      }
    } else {
      const exito = await manejarActivacion("¿Apagar bomba?", false, "3");
      if (!exito) {
        $(this).prop("checked", true); // Desmarca si cancela
      }
    }
  });

  $("#checkB4").on("change", async function () {
    if ($(this).is(":checked")) {
      const exito = await manejarActivacion("¿Activar bomba?", true, "4");
      if (!exito) {
        $(this).prop("checked", false); // Desmarca si cancela
      }
    } else {
      const exito = await manejarActivacion("¿Apagar bomba?", false, "4");
      if (!exito) {
        $(this).prop("checked", true); // Desmarca si cancela
      }
    }
  });

  $("#checkB5").on("change", async function () {
    if ($(this).is(":checked")) {
      const exito = await manejarActivacion("¿Activar bomba?", true, "5");
      if (!exito) {
        $(this).prop("checked", false); // Desmarca si cancela
      }
    } else {
      const exito = await manejarActivacion("¿Apagar bomba?", false, "5");
      if (!exito) {
        $(this).prop("checked", true); // Desmarca si cancela
      }
    }
  });

  $("#checkB6").on("change", async function () {
    if ($(this).is(":checked")) {
      const exito = await manejarActivacion("¿Activar bomba?", true, "6");
      if (!exito) {
        $(this).prop("checked", false); // Desmarca si cancela
      }
    } else {
      const exito = await manejarActivacion("¿Apagar bomba?", false, "6");
      if (!exito) {
        $(this).prop("checked", true); // Desmarca si cancela
      }
    }
  });
});

async function manejarActivacion(title, action, idBomba) {
  let token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "../pages/sign-in.html";
    return false;
  }

  // 1. Confirmación inicial
  const confirmacion = await Swal.fire({
    title: title,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí",
    cancelButtonText: "Cancelar",
  });

  if (!confirmacion.isConfirmed) return false;

  // 2. Solicitar contraseña
  const { value: password } = await Swal.fire({
    title: "Autenticación requerida",
    input: "password",
    inputLabel: "Contraseña de seguridad",
    inputPlaceholder: "Ingresa la contraseña",
    showCancelButton: true,
    inputValidator: (value) => !value && "¡Debes ingresar una contraseña!",
  });

  if (!password) return false;

  // 3. Validar con el servidor
  try {
    const response = await $.ajax({
      type: "POST",
      url: `${server}action/bomba`,
      data: JSON.stringify({
        userId: localStorage.getItem("usuario"),
        pass: password,
        acction: action,
        idBomba: idBomba,
      }),
      contentType: "application/json",
      headers: { Authorization: `Bearer ${token}` },
    });

    // **Imprimir respuesta en consola**
    //console.log("Respuesta del servidor:", response);

    await Swal.fire({
      icon: "success",
      title: "Operación exitosa",
      showConfirmButton: false,
      timer: 1500,
    });

    MQTTClient.publish(
      topicApagarAcction,
      JSON.stringify({ id: idBomba, acction: action })
    );

    return true;
  } catch (err) {
    console.log("Error en la solicitud:", err); // **Imprimir error en consola**
    let mensaje = "¡Ocurrió un error inesperado!";
    if (err.status === 409) mensaje = "¡Contraseña incorrecta!";
    if (err.status === 401 || err.status === 403) {
      window.location.href = "../pages/sign-in.html";
      return false;
    }

    await Swal.fire({
      icon: "error",
      title: "Error",
      text: mensaje,
    });
    return false;
  }
}
