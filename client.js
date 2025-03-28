const socket = io('http://localhost:8000');

const form = document.getElementById('sndcont')
const msgInp = document.getElementById('inpmsg')
const msgBox = document.querySelector('.msgbox')
const welMsg = document.querySelector('.nav')

const appendmsg = (msg , postn) =>{
    const msgElmt = document.createElement('div');
    msgElmt.innerText = msg;
    msgElmt.classList.add('msg');
    msgElmt.classList.add(postn);
    msgBox.append(msgElmt);
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const mesg = msgInp.value;
    appendmsg(`You: ${mesg}`,'right');
    socket.emit('send',mesg);
    msgInp.value = '';
})

const name = prompt('Enter your name to join');

socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    appendmsg(`${name} joined the chat`,'right')
})

socket.on('receive',data =>{
    appendmsg(`${data.name}: ${data.message}`, 'left')
})
const welcome = ()=>{
    const welmsg = document.createElement('div')
    welmsg.classList.add('welmsg');
    welmsg.innerHTML = `<h2>Welcome <b>${name}</b> to the ChatPage</h2>`
    welMsg.append(welmsg);
}
welcome();