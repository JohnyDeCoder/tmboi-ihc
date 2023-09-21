const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});

hands.setOptions({
  maxNumHands: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

hands.onResults(onResults);

// Auxiliar para almacenar la última posición de la mano
let lastHandPosition = null;

function onResults(results) {
  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      // Tomamos como referencia el punto central de la mano (punto 9)
      const currentHandPosition = landmarks[9];
      if (lastHandPosition) {
        const dx = currentHandPosition.x - lastHandPosition.x;
        const dy = currentHandPosition.y - lastHandPosition.y;
        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx > 0) console.log('Movimiento a la derecha');
          else console.log('Movimiento a la izquierda');
        } else {
          if (dy > 0) console.log('Movimiento hacia abajo');
          else console.log('Movimiento hacia arriba');
        }
      }
      lastHandPosition = currentHandPosition;
    }
  }
}

// Iniciar el procesamiento de video
const videoElement = document.getElementsByTagName('video')[0];
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: 640,
  height: 480
});
camera.start();
