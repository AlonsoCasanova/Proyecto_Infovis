import "https://cdn.plot.ly/plotly-2.34.0.min.js"; // Importa la librería Plotly para gráficos
import Protobject from './js/protobject.js'; // Importa el objeto Protobject para la comunicación

document.body.innerHTML = `<div id='myDiv' style="width: 850px; height=600px"></div>`;

var layout = {
    title: 'Gasto Acumulado de Electrodomésticos',
    height: 500,  
    width: 750,   
    xaxis: {
        title: 'Tiempo',
      	showgrid: false
    },
    yaxis: {
        title: 'Gasto acumulado(pesos)',
      	tick0: 0,  
      	range: [0, 1],  
        zeroline: true,  
        showgrid: false,
    },
  	line: {
        color: 'blue',      
        dash: '',       
        width: 4   
  	},
};

let startTime = Date.now();

var xData = [0];
var yData = [0];
var time;
var diff = false;
var prev = 0;

// Escucha los datos recibidos desde Protobject
Protobject.onReceived((data) => {
  time = (Date.now() - startTime) / 1000;
  xData.push(time);
  if (data.show=="1") {
    yData.push(yData.at(-1) + 0.015)
    if (prev != 1){
    	diff = true;
      	prev = 1
    }
  } else if (data.show=="2") {
	yData.push(yData.at(-1) + 0.005);
    if (prev != 2){
    	diff = true;
      	prev = 2;
    }
  } else {
    yData.push(yData.at(-1))
    prev = 0;
  }
  
  if (xData.length > 24){
  	xData = xData.slice(-24);	
    yData = yData.slice(-24);
  }
  
  if (diff == true){
      Plotly.relayout('myDiv', {
      shapes: [
          ...layout.shapes || [],
          {
              type: 'line',
              x0: xData.at(-2),
              y0: 0.1,
              x1: xData.at(-2),
              y1: 10,
              line: { color: 'rgb(37, 150, 190)', width: 1 }
          }
      ]
  	});
    diff = false;
  }
  
  var datos = [
      {
        x: xData,
        y: yData,
        type: 'lines'
      }
    ];
  
  Plotly.newPlot('myDiv', datos, layout);
});
