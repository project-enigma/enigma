// import ChatEngineCore from '../../node_modules/chat-engine/dist/chat-engine';
// import ChatEngineCore from '../../node_modules/chat-engine';

const nowDate = new Date();
const now = `${nowDate.getMinutes()}:${nowDate.getSeconds()}:${nowDate.getMilliseconds()} ;`;
// const username = ['user', now].join('-');
const username = user;
const textInput = document.getElementById('chat-input');
const textOutput = document.getElementById('chat-output');

let sendChat = function () { }; // will be filled in when ChatEngine connects

const ChatEngine = ChatEngineCore.create({
  publishKey: key1,
  subscribeKey: key2,
}, {
  globalChannel: 'chat-engine-demo-js',
  debug: false,
});

ChatEngine.onAny((a) => {
  // console.log(a)
});


ChatEngine.connect(username, {
  signedOnTime: nowDate,
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

  const myProm = new Promise((res, rej) => {
    res(new ChatEngine.Chat('tutorial-chat'));
  })
    .then((myChat) => {
      const appendMessage = (username, text) => {
        const message = $('<div class="list-group-item" />')
          .append($('<strong>').text(`${username}: `))
          .append($('<span>').text(text));

        $('.log').append(message);

        $('.log').animate({ scrollTop: $('#log').prop('scrollHeight') }, 'slow');
      };

      myChat.on('$.online.join', (newUser) => {
        const statusElem = document.querySelector(`#${newUser.user.uuid} .status`);
        statusElem.style.display = 'block';
      });

      myChat.on('$.connected', (payload) => {
        appendMessage('Status', 'Connected to chat!');
      });
    });


  ChatEngine.global.on('message', (payload) => {
    const divCont = document.createElement('div');
    divCont.className = 'div-cont';
    const div = document.createElement('p');
    div.className = 'p-message';
    const div2 = document.createElement('p');
    div2.className = 'p-time';
    div.innerHTML = `${payload.sender.uuid}: ${payload.data.text}`;
    div2.innerHTML = `${now}`;
    divCont.appendChild(div);
    divCont.appendChild(div2);
    textOutput.appendChild(divCont);
  });
});
