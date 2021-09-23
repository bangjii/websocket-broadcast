const WebSocket = require('ws');
const wss = new WebSocket.Server({port:8788});

wss.on('connection', function connection(ws, req){
  console.log("Websocket ready!");
  const ip = req.socket.remoteAddress;
  console.log(ip);
	ws.on('message', function incoming(message, isBinary){
    console.log('received: %s', message);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message, { binary: isBinary });
      }
    });
	});	
});
