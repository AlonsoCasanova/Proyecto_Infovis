import PresenceSensor from './js/presenceSensor.js';
import Protobject from './js/protobject.js';

PresenceSensor.setBaselineAndStartMonitoring(2000, 1); //5400 is the frequency of detection; 0 is the webcam id
											// 5400=5 seg aprox 
PresenceSensor.showPreview({ top: 0, left: 0, width: 640, height: 480 });

let prev = 0;

PresenceSensor.onData((similarity) => {
  console.log("Image similarity:" + similarity);

  if (similarity < 0.65) {
    Protobject.send({ show: '1' }).to('graph.js');
    Protobject.send({ play: '1' }).to('sound.js');
  } else if (similarity < 0.9) {
    Protobject.send({ show: '2' }).to('graph.js');
    Protobject.send({ play: '2' }).to('sound.js');
  } else {
    Protobject.send({ show: 'off' }).to('graph.js');
  }
});
