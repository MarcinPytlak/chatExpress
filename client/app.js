const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

loginForm.addEventListener('submit', function login(event){
    event.preventDefault();
    if(userNameInput.value.length == 0){
        alert('Enter correct user name');
    } else {
        userName = userNameInput.value;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    };
});

function addMessage(author, content){
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if(author === userName){
        message.classList.add('message--self');
        message.innerHTML = `
        <h3 class="message_author">${userName === author ? 'You': author}</h3>
        <div class="message__content">
        ${content}
        </div>`;
        messagesList.appendChild(message);
    }
}

addMessageForm.addEventListener('submit', function sendMessage(event){
    event.preventDefault();
    if(messageContentInput.value.length == 0){
        alert('Enter message');
    } else {
        addMessage(userName, messageContentInput.value);
        messageContentInput.value = '';
    };
});