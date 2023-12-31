import { gestures } from "./gestures.js";
const config = {
  video: { width: 640, height: 480, fps: 60 },
};

// colors for debug information
const landmarkColors = {
  thumb: "red",
  index: "blue",
  middle: "yellow",
  ring: "green",
  pinky: "pink",
  wrist: "white",
};

// emoji for debug information
const gestureStrings = {
  up: "👆",
  down: "👇",
  left: "👈",
  right: "👉",
};

async function createDetector() {
  // load handpose model
  return window.handPoseDetection.createDetector(
    window.handPoseDetection.SupportedModels.MediaPipeHands,
    {
      runtime: "mediapipe",
      modelType: "full",
      maxHands: 2,
      solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915`,
    }
  );
}

async function main() {
  // get video element that will capture the video stream
  const video = document.querySelector("#pose-video");
  const canvas = document.querySelector("#pose-canvas");
  const ctx = canvas.getContext("2d");

  // result layer for gesture estimation
  const resultLayer = {
    right: document.querySelector("#pose-result-right"),
    left: document.querySelector("#pose-result-left"),
  };

  // configure gesture estimator
  const knownGestures = [...gestures];

  // initialize gesture estimator
  const GE = new fp.GestureEstimator(knownGestures);

  // load handpose model
  const detector = await createDetector();
  console.log("mediaPose model loaded");

  // main estimation loop
  const estimateHands = async () => {
    // clear canvas overlay
    ctx.clearRect(0, 0, config.video.width, config.video.height);
    resultLayer.right.innerText = "";
    resultLayer.left.innerText = "";

    // get hand landmarks from video
    const hands = await detector.estimateHands(video, {
      flipHorizontal: true,
    });

    // draw debug information
    for (const hand of hands) {
      for (const keypoint of hand.keypoints) {
        const name = keypoint.name.split("_")[0].toString().toLowerCase();
        const color = landmarkColors[name];
        drawPoint(ctx, keypoint.x, keypoint.y, 3, color);
      }

      // estimate gestures
      const keypoints3D = hand.keypoints3D.map((keypoint) => [
        keypoint.x,
        keypoint.y,
        keypoint.z,
      ]);
      const predictions = GE.estimate(keypoints3D, 9);
      // find gesture with highest confidence
      if (predictions.gestures.length > 0) {
        // find gesture with highest confidence
        const result = predictions.gestures.reduce((p, c) =>
          p.score > c.score ? p : c
        );
        const found = gestureStrings[result.name];
        const chosenHand = hand.handedness.toLowerCase();

        // move Isaac
        if (result.name === "up") {
          if (isaacY - velocity >= 50) {
            isaacY -= velocity;

            if (intro.paused) {
              layer.play();
              layer.currentTime = loop.currentTime;
              layer.volume = 0.2;
            }
          }
        } else if (result.name === "down") {
          if (isaacY + velocity <= heightLimit - 70) {
            isaacY += velocity;

            if (intro.paused) {
              layer.play();
              layer.currentTime = loop.currentTime;
              layer.volume = 0.2;
            }
          }
        } else if (result.name === "left") {
          if (isaacX - velocity >= 50) {
            isaacX -= velocity;

            if (intro.paused) {
              layer.play();
              layer.currentTime = loop.currentTime;
              layer.volume = 0.2;
            }
          }
        } else if (result.name === "right") {
          if (isaacX + velocity <= widthLimit - 56) {
            isaacX += velocity;

            if (intro.paused) {
              layer.play();
              layer.currentTime = loop.currentTime;
              layer.volume = 0.2;
            }
          }
        }
        resultLayer[chosenHand].innerText = found;
        continue;
      }
    }
    // schedule next loop
    setTimeout(() => {
      estimateHands();
    }, 1000 / config.video.fps);
  };

  // start estimation
  estimateHands();
  console.log("Starting predictions");
}

// initialize camera
async function initCamera(width, height, fps) {
  // get media stream
  const constraints = {
    audio: false,
    video: {
      facingMode: "user",
      width: width,
      height: height,
      frameRate: { max: fps },
    },
  };

  // setup camera
  const video = document.querySelector("#pose-video");
  video.width = width;
  video.height = height;

  // get video stream
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

// draw point on canvas
function drawPoint(ctx, x, y, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

// on page loaded
window.addEventListener("DOMContentLoaded", () => {
  initCamera(config.video.width, config.video.height, config.video.fps).then(
    (video) => {
      video.play();
      video.addEventListener("loadeddata", (event) => {
        console.log("Camera is ready");
        main();
      });
    }
  );

  const canvas = document.querySelector("#pose-canvas");
  canvas.width = config.video.width;
  canvas.height = config.video.height;
  console.log("Canvas initialized");
});

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
let velocity = 5; // Velocidad de movimiento

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

let intro = new Audio("/assets/sounds/music/burning basement intro.ogg");
let loop = new Audio("/assets/sounds/music/burning basement loop.ogg");
let layer = new Audio(
  "/assets/sounds/music/burning basement guitar layer_04.ogg"
);

loop.load();
loop.loop = true;
loop.volume = 0.2;

intro.onended = function () {
  layer.currentTime = 0;
  loop.play();
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

// End Music Zone
