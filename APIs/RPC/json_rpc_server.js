const jayson = require('jayson');

const server = jayson.server({
  getCurrentTemperature: function(args, callback) {
    const temp = (Math.random() * (30 - 20) + 20).toFixed(2);
    callback(null, { value: temp, unit: "Celsius", timestamp: new Date().toLocaleTimeString() });
  },
  toggleSmartLight: function(args, callback) {
    const {rooms, brightness} = args;
    if (rooms === undefined) {
      return callback({
        code: -32602,
        message: "Rooms is required"
      });
    }

    if (brightness === undefined) {
      return callback({
        code: -32602,
        message: "Light level is required"
      });
    }

    if (brightness < 0 || brightness > 100) {
      return callback({
        code: -32001, 
        message: "Invalid input."
      })
    }

    respondMessage = "Light in room " + rooms + " set to " + brightness + "%";
    callback(null, {messages: respondMessage});
  }
});

server.http().listen(3000, () => {
  console.log("JSON-RPC Server running on port 3000");
});