import NotePlayer from './js/notePlayer.js';
import Protobject from './js/protobject.js'; // Importa el objeto Protobject para la comunicación

const options = {
    C2: "https://tonejs.github.io/audio/casio/C2.mp3",
    G2: "https://tonejs.github.io/audio/casio/G2.mp3"
    // Add more notes as needed
};
const player = new NotePlayer(options);

player.onInstrumentLoaded(() => {
    console.log("Instrument loaded successfully.");
});

Protobject.onReceived((data) => {
	if (data.play=="1") {
		player.play("C2");
    }
  	if (data.play=="2") {
    	player.play("G2")	
    }
});
