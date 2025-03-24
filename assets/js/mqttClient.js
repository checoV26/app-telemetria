const MQTTClient = (function () {
  const brokerUrl = "ws://asbombeo.ddns.net:8083/mqtt";

  const options = {
    keepalive: 60, // Mantiene la conexión activa
    reconnectPeriod: 3000, // Tiempo antes de reconectar (3s)
    clientId: "cliente_" + Math.random().toString(16).substr(2, 8), // ID único
    //username: "asbPruebas", // Reemplázalo con tu usuario de HiveMQ Cloud
    //password: "17Zp0050", // Reemplázalo con tu contraseña de HiveMQ Cloud
  };

  const client = mqtt.connect(brokerUrl, options);
  const subscriptions = {}; // Almacena los callbacks por tópico

  // Evento de conexión exitosa
  client.on("connect", function () {
    console.log("✅ Conectado a ASB Cloud");
  });

  // Manejo de mensajes recibidos
  client.on("message", function (topic, message) {
    const msg = message.toString();
    console.log(`📩 Mensaje recibido en ${topic}: ${msg}`);

    // Llamar al callback si existe para el tópico
    if (subscriptions[topic]) {
      subscriptions[topic](msg);
    }
  });

  // Manejo de errores
  client.on("error", function (err) {
    console.error("❌ Error en MQTT:", err);
  });

  // Función para suscribirse a un tópico
  function subscribe(topic, callback) {
    client.subscribe(topic, function (err) {
      if (!err) {
        console.log(`📡 Suscrito a: ${topic}`);
        subscriptions[topic] = callback; // Guardar callback
      } else {
        console.error("❌ Error al suscribirse:", err);
      }
    });
  }

  // Función para publicar un mensaje
  function publish(topic, message) {
    console.log(topic);
    client.publish(topic, message, function (err) {
      if (err) {
        console.error("❌ Error al publicar:", err);
      } else {
        console.log(`📤 Mensaje enviado a ${topic}: ${message}`);
      }
    });
  }

  return {
    subscribe,
    publish,
  };
})();
