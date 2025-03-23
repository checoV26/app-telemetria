// Suscribirse a diferentes tópicos
MQTTClient.subscribe(topicOperacionesPAT, function (msg) {
  console.log("📩 Mensaje recibido en:" + topicOperacionesPAT, msg);
});

MQTTClient.subscribe(topicOperacionesBombas, function (msg) {
  console.log("Data bombas", msg);
});

MQTTClient.subscribe(topicListAlarmas, function (msg) {
  console.log("Lista de alarmas", msg);
});

// Publicar un mensaje en "prueba/mensaje"
function enviarMensaje() {
  const data = {
    presionA: generarNumeroAleatorio(100, 120),
    presionT: generarNumeroAleatorio(100, 120),
  };
  if (topicOperacionesPAT == "") {
    console.log("No se ha creado el tópico");
    return;
  }
  MQTTClient.publish(topicOperacionesPAT, JSON.stringify(data));
}

// Publicar una acción de control en "dispositivos/control"
function encenderDispositivo() {
  const data = [
    {
      name: "Bomba 1",
      status: true,
      id: 1,
      data: {
        voltaje: generarNumeroAleatorio(100, 130),
        corriente: generarNumeroAleatorio(100, 120),
        frecuencia: generarNumeroAleatorio(60, 80),
        fecha: "21/03/2025",
      },
    },
    {
      name: "Bomba 2",
      status: true,
      id: 2,
      data: {
        voltaje: generarNumeroAleatorio(100, 130),
        corriente: generarNumeroAleatorio(100, 120),
        frecuencia: generarNumeroAleatorio(60, 80),
        fecha: "21/03/2025",
      },
    },
    {
      name: "Bomba 3",
      status: true,
      id: 3,
      data: {
        voltaje: generarNumeroAleatorio(100, 130),
        corriente: generarNumeroAleatorio(100, 120),
        frecuencia: generarNumeroAleatorio(60, 80),
        fecha: "21/03/2025",
      },
    },
  ];

  if (topicOperacionesPAT == "") {
    console.log("No se ha creado el tópico");
    return;
  }
  MQTTClient.publish(topicOperacionesBombas, JSON.stringify(data));
}

function enviarAlarmas() {
  const data = [
    {
      id: 1,
      desc: "Pruebas 1",
      fecha: "21/03/2025",
    },
    {
      id: 2,
      desc: "Demo 1",
      fecha: "21/03/2025",
    },
    {
      id: 3,
      desc: "ASB",
      fecha: "21/03/2025",
    },
  ];
  if (topicOperacionesPAT == "") {
    console.log("No se ha creado el tópico");
    return;
  }
  MQTTClient.publish(topicListAlarmas, JSON.stringify(data));
}

function enviarAlertar() {
  const data = {
    id: 1,
    tipo: "danger",
    sms: "Paro de emergencia en bomba 1",
    fecha: "21/03/2025",
  };
  if (topicOperacionesPAT == "") {
    console.log("No se ha creado el tópico");
    return;
  }
  MQTTClient.publish(topicAlarmas, JSON.stringify(data));
}

setInterval(() => {
  enviarMensaje();
  encenderDispositivo();
  enviarAlarmas();
}, 5000);

setInterval(() => {
  enviarAlertar();
}, 10000);
