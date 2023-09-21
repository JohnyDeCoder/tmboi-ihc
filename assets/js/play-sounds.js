// PAPER SOUNDS!

function paperInSound() {
    var audio = new Audio('/assets/sounds/menu/paper_in.wav');
    audio.play();
    audio.volume = 0.1;
}

function paperOutSound() {
    var audio = new Audio('/assets/sounds/menu/paper_out.wav');
    audio.play();
    audio.volume = 0.1;
}

// Easter Zone Sounds?

var audio1 = new Audio('/assets/sounds/easter/1.ogg');
var audio2 = new Audio('/assets/sounds/easter/2.ogg');
var audio3 = new Audio('/assets/sounds/easter/3.ogg');
var audio4 = new Audio('/assets/sounds/easter/4.ogg');

setTimeout(function() { audio1.play(); audio1.volume = 0.2 }, 300000); // Reproduce el primer audio después de 5 minutos
setTimeout(function() { audio2.play(); audio2.volume = 0.2 }, 600000); // Reproduce el segundo audio después de 10 minutos
setTimeout(function() { audio3.play(); audio3.volume = 0.2 }, 900000); // Reproduce el tercer audio después de 15 minutos
setTimeout(function() { audio4.play(); audio4.volume = 0.2 }, 1200000); // Reproduce el cuarto audio después de 20 minutos

audio1.onplay = function() {
    let fadeOut = setInterval(function() {
        if (intro.volume > 0.1) {
            intro.volume -= 0.01;
            loop.volume -= 0.01;
        } else {
            clearInterval(fadeOut);
        }
    }, 600);
};

audio1.onended = function() {
    let fadeIn = setInterval(function() {
        if (intro.volume < 0.3) {
            intro.volume += 0.01;
            loop.volume += 0.01;
        } else {
            clearInterval(fadeIn);
        }
    }, 600);
};

audio2.onplay = function() {
    let fadeOut = setInterval(function() {
        if (intro.volume > 0.1) {
            intro.volume -= 0.01;
            loop.volume -= 0.01;
        } else {
            clearInterval(fadeOut);
        }
    }, 600);
};

audio2.onended = function() {
    let fadeIn = setInterval(function() {
        if (intro.volume < 0.3) {
            intro.volume += 0.01;
            loop.volume += 0.01;
        } else {
            clearInterval(fadeIn);
        }
    }, 600);
};

audio3.onplay = function() {
    let fadeOut = setInterval(function() {
        if (intro.volume > 0.1) {
            intro.volume -= 0.01;
            loop.volume -= 0.01;
        } else {
            clearInterval(fadeOut);
        }
    }, 600);
};

audio3.onended = function() {
    let fadeIn = setInterval(function() {
        if (intro.volume < 0.3) {
            intro.volume += 0.01;
            loop.volume += 0.01;
        } else {
            clearInterval(fadeIn);
        }
    }, 600);
};

audio4.onplay = function() {
    let fadeOut = setInterval(function() {
        if (intro.volume > 0.1) {
            intro.volume -= 0.01;
            loop.volume -= 0.01;
        } else {
            clearInterval(fadeOut);
        }
    }, 600);
};

audio4.onended = function() {
    let fadeIn = setInterval(function() {
        if (intro.volume < 0.3) {
            intro.volume += 0.01;
            loop.volume += 0.01;
        } else {
            clearInterval(fadeIn);
        }
    }, 600);
};

// Music Zone

let intro = new Audio('/assets/sounds/music/genesis-intro.ogg');
let loop = new Audio('/assets/sounds/music/genesis-loop.ogg');

loop.load();
loop.loop = true;
loop.volume = 0.3;

intro.onended = function() {
    loop.play();
};

intro.play();
intro.volume = 0.3;
