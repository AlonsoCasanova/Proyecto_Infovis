import PresenceSensor from './js/presenceSensor.js';
import Protobject from './js/protobject.js';

PresenceSensor.setBaselineAndStartMonitoring(2500, 0); //200 is the frequency of detection; 0 is the webcam id
PresenceSensor.showPreview({ top: 50, left: 50, width: 640, height: 480 });

PresenceSensor.onData((similarity) => {
  console.log("Image similarity:" + similarity);
  if (similarity<0.35)  {
  	Protobject.send({ show: '2' }).to('graph.js');
    Protobject.send({ play: '2' }).to('sound.js');
  } else if (similarity<0.5) {
    Protobject.send({ show: '1' }).to('graph.js');
    Protobject.send({ play: '1' }).to('sound.js');
  } else {
    Protobject.send({ show: 'off' }).to('graph.js');
  }

});
