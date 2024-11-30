import PresenceSensor from './js/presenceSensor.js';
import Protobject from './js/protobject.js';

PresenceSensor.setBaselineAndStartMonitoring(5400, 0); //5400 is the frequency of detection; 0 is the webcam id
											// 5400=5 seg aprox 
PresenceSensor.showPreview({ top: 50, left: 50, width: 640, height: 480 });

let prev = 0;

PresenceSensor.onData((similarity) => {
  console.log("Image similarity:" + similarity);
  if (similarity<0.7)  {
  	Protobject.send({ show: '2' }).to('graph.js');
    if (prev != 2){
    	Protobject.send({ play: '2' }).to('sound.js');
      	prev = 2;
    }
  } else if (similarity<0.85) {
    Protobject.send({ show: '1' }).to('graph.js');
    if (prev != 1){
    	Protobject.send({ play: '1' }).to('sound.js');
      prev = 1;
    }
  } else {
    Protobject.send({ show: 'off' }).to('graph.js');
  }

});
