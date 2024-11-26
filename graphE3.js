import "https://cdn.plot.ly/plotly-2.34.0.min.js"; // Importa la librería Plotly para gráficos
import Protobject from './js/protobject.js'; // Importa el objeto Protobject para la comunicación

document.body.innerHTML = `<div id='myDiv' style="width: 1200px; height=600px"></div>`;

var layout = {
    title: 'Gasto por uso de Electrodomésticos',
    height: 600,  
    width: 1000,   
    xaxis: {
        title: 'Artefacto'
    },
    yaxis: {
        title: 'Gasto(pesos/seg)'
    }
};

let startTime = Date.now();

var xData = [0];
var yData = [0];
var time;

// Escucha los datos recibidos desde Protobject
Protobject.onReceived((data) => {
  time = (Date.now() - startTime) / 1000;
  xData.push(time);
  let array = new Array(xData.length).fill(0.5);
  if (data.show=="1") {
	yData.push(0.5)
  	// Plotly.newPlot('myDiv', datos);
  } else if (data.show=="2") {
	yData.push(1)    
  	// Plotly.newPlot('myDiv', datos);
  } 
  else {
    yData.push(0)
    // Plotly.newPlot('myDiv', dataOff);
  }
  var datos = [
      {
        x: xData,
        y: yData,
        type: 'scatter'
      }
    ];
  Plotly.newPlot('myDiv', datos);
});




