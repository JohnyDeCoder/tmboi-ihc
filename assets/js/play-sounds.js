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

// Easter Zone (Easter Egg)

var audio1 = new Audio('/assets/sounds/easter/1.ogg');
var audio2 = new Audio('/assets/sounds/easter/2.ogg');
var audio3 = new Audio('/assets/sounds/easter/3.ogg');
var audio4 = new Audio('/assets/sounds/easter/4.ogg');

setTimeout(function() { audio1.play(); audio1.volume = 0.2 }, 300000); // Reproduce el primer audio después de 1 minuto
setTimeout(function() { audio2.play(); audio2.volume = 0.2 }, 600000); // Reproduce el segundo audio después de 2 minutos adicionales (3 minutos en total)
setTimeout(function() { audio3.play(); audio3.volume = 0.2 }, 900000); // Reproduce el tercer audio después de 2 minutos adicionales (5 minutos en total)
setTimeout(function() { audio4.play(); audio4.volume = 0.2 }, 1200000); // Reproduce el cuarto audio después de 2 minutos adicionales (7 minutos en total)