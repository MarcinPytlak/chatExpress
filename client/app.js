const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

const socket = io();
socket.on('message', ({ author, content }) => addMessage(author, content))

let userName = '';


loginForm.addEventListener('submit', function login(event){
    event.preventDefault();
    if(userNameInput.value.length == 0){
        alert('Enter correct user name');
    } else {
        userName = userNameInput.value;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
        socket.emit('join', {name : userName});
        console.log(userName);
    }
});

addMessageForm.addEventListener('submit', function sendMessage(event){
    event.preventDefault();
    let messageContent = messageContentInput.value;
    if(!messageContent.length){
        alert('Enter message');
    } else {
        addMessage(userName, messageContent);
        socket.emit('message', { author: userName, content: messageContent});
        messageContentInput.value = '';
    }
});


const addMessage = function(author, content){
    const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if(author === userName) message.classList.add('message--self');
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
}