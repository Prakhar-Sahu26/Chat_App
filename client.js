const socket = io('http://localhost:8000');

const form = document.getElementById('sndcont')
const msgInp = document.getElementById('inpmsg')
const msgBox = document.querySelector('.msgbox')
const welMsg = document.querySelector('.nav')
const usernameInput = document.getElementById('username-input');
const joinBtn = document.getElementById('join-btn');
const header = document.querySelector('.header');

let userName = '';

window.onload = () => {
    modal.style.display = 'flex'; // Show the modal
};

// Handle 'Join' button click
joinBtn.addEventListener('click', () => {
    userName = usernameInput.value.trim();

    if (userName) {
        socket.emit('new-user-joined', userName);
        modal.style.display = 'none'; // Hide the modal after name is entered
        welcome(); // Display the welcome message
    } else {
        alert('Please enter a valid name');
    }
});

const appendmsg = (msg , postn) =>{
    const msgElmt = document.createElement('div');
    msgElmt.innerText = msg;
    msgElmt.classList.add('msg');
    msgElmt.classList.add(postn);
    msgBox.append(msgElmt);
}
// const name = prompt('Enter your name to join');

socket.emit('new-user-joined', userName);
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const mesg = msgInp.value.trim();
    if (!mesg) return;
    appendmsg(`You: ${mesg}`,'right');
    socket.emit('send',mesg);
    msgInp.value = '';
})


socket.on('user-joined', name =>{
    appendmsg(`${name} joined the chat`,'center')
})

socket.on('receive',data =>{
    appendmsg(`${data.name}: ${data.message}`, 'left')
})
const welcome = ()=>{
    const welmsg = document.createElement('div')
    welmsg.classList.add('welmsg');
    welmsg.innerHTML = `<h2>Welcome <b>${userName}</b> to the ChatPage</h2>`
    header.append(welmsg);
}
// welcome();