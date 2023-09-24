let recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition ||
  window.mozSpeechRecognition ||
  window.msSpeechRecognition)();

recognition.lang = "es-MX";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onend = () => {
  recognition.start();
};

recognition.onresult = (event) => {
  const last = event.results.length - 1;
  const command = event.results[last][0].transcript;
  console.log("Result received: " + command + ".");
  if (command.toLowerCase().includes("arriba")) {
    if (isaacY - velocity >= 50) {
      isaacY -= velocity;
    }
    let audio = new Audio("/assets/sounds/menu/thumbsup.mp3");
    audio.play();
    audio.volume = 0.4;
  } else if (command.toLowerCase().includes("abajo")) {
    if (isaacY + velocity <= heightLimit - player.height) {
      isaacY += velocity;
    }
    let audio = new Audio("/assets/sounds/menu/thumbsup.mp3");
    audio.play();
    audio.volume = 0.4;
  } else if (command.toLowerCase().includes("izquierda")) {
    if (isaacX - velocity >= 50) {
      isaacX -= velocity;
    }
    let audio = new Audio("/assets/sounds/menu/thumbsup.mp3");
    audio.play();
    audio.volume = 0.4;
  } else if (command.toLowerCase().includes("derecha")) {
    if (isaacX + velocity <= widthLimit - player.width) {
      isaacX += velocity;
    }
    let audio = new Audio("/assets/sounds/menu/thumbsup.mp3");
    audio.play();
    audio.volume = 0.4;
  } else {
    console.log("That is not a valid direction command.");
    let audio = new Audio("/assets/sounds/menu/thumbsdown.mp3");
    audio.play();
    audio.volume = 0.4;
  }
};

recognition.onerror = function (event) {
  console.log("Error occurred in recognition: " + event.error);
};

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const widthLimit = canvas.width - 50;
const heightLimit = canvas.height - 50;

let isaacX = widthLimit / 2;
let isaacY = heightLimit / 2;
let velocity = 10;

let player = new Image();

player.src = "/assets/img/the_lost.png";

function drawIsaac(x, y) {
  ctx.clearRect(0, 0, widthLimit, heightLimit);
  ctx.drawImage(player, x, y, 50, 64);
}

function update() {
  drawIsaac(isaacX, isaacY);
  requestAnimationFrame(update);
}

document.onload = update();

// Music Zone

let intro = new Audio("/assets/sounds/music/diptera sonata intro.ogg");
let loop = new Audio("/assets/sounds/music/diptera sonata(basement).ogg");
let layer = new Audio("/assets/sounds/music/diptera layer.ogg");

loop.load();
loop.loop = true;
loop.volume = 0.2;

intro.onended = function () {
  loop.play();
  playLayer();
};

intro.play();
intro.volume = 0;
let fadeIn = setInterval(function () {
  if (intro.volume < 0.2) {
    intro.volume += 0.1;
  } else {
    clearInterval(fadeIn);
  }
}, 100);

layer.load();
layer.loop = true;
layer.volume = 0;

function startRecognition() {
  let startSound = new Audio(
    "/assets/sounds/easter/isaacxpsecretroomreveal2.mp3"
  );
  startSound.play();
  startSound.volume = 0.2;
  document.getElementById("start_button").remove();
  playLayer();
  recognition.start();
  console.log("Speech recognition started");
}

function playLayer() {
  if (intro.paused && !document.getElementById("start_button")) {
    layer.play();
    let fadeIn = setInterval(function () {
      if (layer.volume < 0.2) {
        layer.volume += 0.1;
      } else {
        clearInterval(fadeIn);
      }
    }, 100);
    layer.currentTime = loop.currentTime;
  }
}
