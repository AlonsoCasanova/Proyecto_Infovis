import "https://cdn.plot.ly/plotly-2.34.0.min.js"; // Importa la librería Plotly para gráficos
import Protobject from './js/protobject.js'; // Importa el objeto Protobject para la comunicación

document.body.innerHTML = `<div id='myDiv' style="width: 850px; height=600px"></div>`;

var layout = {
    title: 'Gasto Monetario de Electrodomésticos en el tiempo',
    height: 500,  
    width: 750,   
    xaxis: {
        title: 'Electrodomésticos'
    },
    yaxis: {
        title: 'Tiempo'
    },
  	line: {
        color: 'blue',      
        dash: 'dot',       
        width: 4   
  	},
};

let startTime = Date.now();

var xData = ["1", "2"];
var yData = [0, 0];
var time;

// Escucha los datos recibidos desde Protobject
Protobject.onReceived((data) => {
  time = (Date.now() - startTime) / 1000;
  // xData.push(time);
  if (data.show=="1") {
	yData[0] = 0.5 * time;
  } else if (data.show=="2") {
    yData[1] = 0.75 * time;
  } else {
    yData.push(0)
  }
  
  //if (xData.length > 60){
  	//xData = xData.slice(-60);	
    //yData = yData.slice(-60);
  //}
  var datos = [
      {
        x: xData,
        y: yData,
        type: 'bar'
      }
    ];
  Plotly.newPlot('myDiv', datos, layout);
});
