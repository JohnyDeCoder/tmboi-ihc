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
    if (isaacY + velocity <= heightLimit - 70) {
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
    if (isaacX + velocity <= widthLimit - 56) {
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

// Canvas

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let theLostSprites = [];

for (let i = 1; i < 6; i++) {
  const img = new Image();
  img.src = `/assets/img/the-lost-sprites/${i}.png`;
  theLostSprites.push(img);
}

// Estado inicial
const widthLimit = canvas.width - 50; // Límite del ancho del canvas
const heightLimit = canvas.height - 50; // Límite del alto del canvas

let isaacX = widthLimit / 2; // Posición inicial X
let isaacY = heightLimit / 2; // Posición inicial Y
let velocity = 15; // Velocidad de movimiento

const frameRate = 10; // Fotogramas por segundo
let lastFrameTime = 0; // Tiempo del último frame
let frame = 0; // Frame actual

function animate(timestamp) {
  // Calcular el tiempo transcurrido desde el último frame
  const deltaTime = timestamp - lastFrameTime;

  // Si ya pasó el tiempo suficiente para mostrar el siguiente frame
  if (deltaTime >= 1000 / frameRate) {
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar a Isaac
    ctx.drawImage(theLostSprites[frame], isaacX, isaacY, 56, 70);

    // Avanzar al siguiente frame del cuerpo
    frame = (frame + 1) % 5;

    // Actualizar el tiempo del último frame
    lastFrameTime = timestamp;
  }

  // Pedir al navegador que ejecute la función animate en el siguiente frame
  requestAnimationFrame(animate);
}

animate(); // Iniciar la animación

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

  const element = document.getElementById("listening-text");
  element.innerHTML =
    '<i class="fa-solid fa-microphone fa-xs"></i> ' + "escuchando...";
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
