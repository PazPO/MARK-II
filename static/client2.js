'use strict';

// создать подключение
var socket = new WebSocket("ws://localhost:8081");

// отправить сообщение из формы publish
document.forms.publish.onsubmit = function() {
  var outgoingMessage = this.message.value;

  socket.send(outgoingMessage);
  return false;
};

// обработчик входящих сообщений
socket.onmessage = function(event) {
  var incomingMessage = event.data;
  showMessage(incomingMessage); 
};

// показать сообщение в div#subscribe
function showMessage(message) {
  var messageElem = document.createElement('div');
  messageElem.appendChild(document.createTextNode(message));
  document.getElementById('subscribe').appendChild(messageElem);
  document.getElementById('myTextarea').innerHTML=message;
  
;
}















// //let formData = new FormData(document.forms.params);

// const buildAPI = methods => {
//   const api = {};
//   for (const method of methods) {
//     api[method] = (...args) => new Promise((resolve, reject) => {
//       const url = `/api/${method}`;
//       console.log(url, args);
//       fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(args),
//       }).then(res => {
//         const { status } = res;
//         if (status !== 200) {
//           reject(new Error(`Status Code: ${status}`));
//           return;
//         }
//         resolve(res.json());
//       });
//     });
//   }
//   return api;
// };

// const api = buildAPI(['application']);

// // const show = async () => {
// //   const svg = await api.render('Rect1');
// //   const output = document.getElementById('output');
// //   output.innerHTML = svg;
// // };

// const scenario = async () => {
//   //const name='Select';
//   //const data = await api.sql('Select');
//   //console.dir({ data });
//   //const output = document.getElementById('output');
  
  

// };

// scenario();
