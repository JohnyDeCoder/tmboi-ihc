let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

recognition.lang = 'es-MX';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onend = () => {
    startRecognition();
}

recognition.onresult = (event) => {
    const last = event.results.length - 1;
    const command = event.results[last][0].transcript;
    console.log('Result received: ' + command + '.');
    if (command.toLowerCase().contains('arriba')) {
        if (isaacY - velocity >= 50) {
            isaacY -= velocity;
        }
        var audio = new Audio('/assets/sounds/menu/thumbsup.mp3');
            audio.play();
            audio.volume = 0.2;
    } else if (command.toLowerCase().contains('abajo')) {
        if (isaacY + velocity <= heightLimit - player.height) {
            isaacY += velocity;
        }
        var audio = new Audio('/assets/sounds/menu/thumbsup.mp3');
            audio.play();
            audio.volume = 0.2;
    } else if (command.toLowerCase().contains('izquierda')) {
        if (isaacX - velocity >= 50) {
            isaacX -= velocity;
        }
        var audio = new Audio('/assets/sounds/menu/thumbsup.mp3');
            audio.play();
            audio.volume = 0.2;
    } else if (command.toLowerCase().contains('derecha')) {
        if (isaacX + velocity <= widthLimit - player.width) {
            isaacX += velocity;
        }
        var audio = new Audio('/assets/sounds/menu/thumbsup.mp3');
            audio.play();
            audio.volume = 0.2;
    }
    else {
        console.log('That is not a valid direction command.');
        var audio = new Audio('/assets/sounds/menu/thumbsdown.mp3');
        audio.play();
        audio.volume = 0.2;
    }
}

recognition.onerror = function(event) {
    console.log('Error occurred in recognition: ' + event.error);
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const widthLimit = canvas.width - 50;
const heightLimit = canvas.height - 50;

let isaacX = widthLimit / 2;
let isaacY = heightLimit / 2;
let velocity = 10;

let player = new Image();

player.src = '/assets/img/the_lost.png';

function drawIsaac(x, y) {
    ctx.clearRect(0, 0, widthLimit, heightLimit);
    ctx.drawImage(player, x, y, 50, 64);
}

function update() {
  drawIsaac(isaacX, isaacY);
  requestAnimationFrame(update);
}

function startRecognition() {
    recognition.start();
    console.log('Ready to receive a direction command.');
}

document.onload = update();
