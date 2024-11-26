import PresenceSensor from './js/presenceSensor.js';
import Protobject from './js/protobject.js';

PresenceSensor.setBaselineAndStartMonitoring(800, 0); //200 is the frequency of detection; 0 is the webcam id
PresenceSensor.showPreview({ top: 50, left: 50, width: 640, height: 480 });

PresenceSensor.onData((similarity) => {
  console.log("Image similarity:" + similarity);
  if (similarity<0.6)  {
  	Protobject.send({ show: '2' }).to('graph.js');
  } else if (similarity<0.80) {
    Protobject.send({ show: '1' }).to('graph.js');
  } else {
    Protobject.send({ show: 'off' }).to('graph.js');
  }

});
