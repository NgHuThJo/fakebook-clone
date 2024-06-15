import { WebSocket, WebSocketServer } from "ws";

const webSocketPort = process.env.WEBSOCKET_PORT || 8080;

// WebSocket setup
const wss = new WebSocketServer({ port: webSocketPort });
const onlineUsers = new Map();

function getKey<K, V>(map: Map<K, V>, mapValue: V) {
  for (let [key, value] of map.entries()) {
    if (value === mapValue) {
      return key;
    }
  }
}

wss.on("connection", (ws) => {
  console.log("connected");

  ws.on("message", (payload: string) => {
    const data = JSON.parse(payload);
    console.log("received: ", data);

    switch (data.type) {
      case "addUser": {
        onlineUsers.set(data.id, ws);

        const stringifiedData = JSON.stringify({
          type: "getUsers",
          data: {
            users: [...onlineUsers.keys()],
          },
        });

        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(stringifiedData);
          }
        });

        break;
      }
      case "sendMessage": {
        const { receivers, type, ...rest } = data;
        const stringifiedData = JSON.stringify({
          type: "getMessage",
          data: rest,
        });

        for (let receiverId of receivers) {
          const receiverSocket = onlineUsers.get(receiverId._id);

          if (receiverSocket) {
            receiverSocket.send(stringifiedData);
          }
        }

        break;
      }
      default: {
        throw Error("Unknown type: ".concat(data.type));
      }
    }
  });

  ws.on("close", () => {
    onlineUsers.delete(getKey(onlineUsers, ws));

    const data = JSON.stringify({
      type: "getUsers",
      data: {
        users: [...onlineUsers.keys()],
      },
    });

    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });

    console.log("disconnected");
  });

  ws.on("error", console.error);
});
