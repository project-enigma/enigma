// import ChatEngineCore from '../../node_modules/chat-engine/dist/chat-engine';
// import ChatEngineCore from '../../node_modules/chat-engine';

const now = new Date().getTime();
// const username = ['user', now].join('-');
const username = user;
const textInput = document.getElementById('chat-input');
const textOutput = document.getElementById('chat-output');

let sendChat = function () {}; // will be filled in when ChatEngine connects

const ChatEngine = ChatEngineCore.create({
  publishKey: key1,
  subscribeKey: key2,
}, {
  globalChannel: 'chat-engine-demo-js',
  debug: true,
});

ChatEngine.onAny((a) => {
  // console.log(a)
});

ChatEngine.connect(username, {
  signedOnTime: now,
}, `auth-key${new Date().getTime()}`);

ChatEngine.on('$.ready', (data) => {
  data.me.direct.onAny((a) => {
    console.log(a);
  });

  sendChat = function (e) {
    ChatEngine.global.emit('message', {
      text: textInput.value,
    });

    textInput.value = '';

    return false;
  };

  checkSubmit = function (e) {
    if (e.keyCode === 13) {
      sendChat();
    }
  };

  ChatEngine.global.on('message', (payload) => {
    const div = document.createElement('p');
    div.innerHTML = `${payload.sender.uuid}: ${payload.data.text}`;
    textOutput.appendChild(div);
  });
});
