const WebSocket = require("ws");
// Port
const port = 8080
const server = new WebSocket.Server({ port: port });
// Shipment updates
const shipments = [
  { id: "SHIP001", status: "In Transit" },
  { id: "SHIP002", status: "Out for Delivery" },
  { id: "SHIP003", status: "Delivered" },
  { id: "SHIP004", status: "Pending" },
];

server.on("connection", (socket) => {
  console.log("Client connected");

  // Send shipment updates every 5 seconds
  const sendUpdates = () => {
    const randomShipment =
      shipments[Math.floor(Math.random() * shipments.length)];
    randomShipment.status = getRandomStatus();
    socket.send(JSON.stringify(randomShipment));
  };

  const interval = setInterval(sendUpdates, 5000);

  socket.on("close", () => {
    clearInterval(interval);
    console.log("Client disconnected");
  });
});

//  function to randomize shipment status
function getRandomStatus() {
  const statuses = ["In Transit", "Out for Delivery", "Delivered", "Pending"];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

console.log("WebSocket server running on ws://localhost:8080");
