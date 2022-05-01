import WebSocket from "ws";

useEffect(() => {
  const WebSocket = require("ws");

  const client = new WebSocket("ws://local:8880");
  client.on("message", function (data) {
    console.log("서버에서 클라로 보낸것");
  });
}, []);

const ws = new WebSocket("ws://local:8880", {});

ws.on("open", function open() {
  ws.send("클라에서 서버로 보낸것");
});

ws.on("message", function message(data) {
  console.log("서버에서 클라로 보낸것", data);
});
