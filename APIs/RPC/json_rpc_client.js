const jayson = require('jayson');
const client = jayson.client.http({ port: 3000 });

console.log("--- Starting Polling (Standard RPC) ---");

// setInterval(() => {
//   client.request('getCurrentTemperature', [], (err, response) => {
//     if (err) return console.error(err);
//     const res = response.result;
//     console.log(`Polling Update: ${res.value} ${res.unit} [${res.timestamp}]`);
//   });
// }, 1000);

client.request('toggleSmartLight', {rooms: "Livingroom", brightness: 50}, (err, response) => {
  if(err) return console.log(err);

  if (response.error) {
    console.error(`[RPC ${response.error.code}] ${response.error.message}`);
    return null;
  }

  const {messages} = response.result;
  console.log(messages)
})

client.request('toggleSmartLight', {rooms: "Bathroom", brightness: -20}, (err, response) => {
  if(err) return console.log(err);

  if (response.error) {
    console.error(`[RPC ${response.error.code}] ${response.error.message}`);
    return null;
  }

  const {messages} = response.result;
  console.log(messages)
})

client.request('toggleSmartLight', {rooms: "bedroom", brightness: 200}, (err, response) => {
  if(err) return console.log(err);

  if (response.error) {
    console.error(`[RPC ${response.error.code}] ${response.error.message}`);
    return null;
  }

  const {messages} = response.result;
  console.log(messages)
})