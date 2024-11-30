import "https://cdn.plot.ly/plotly-2.34.0.min.js"; // Importa la librería Plotly para gráficos
import Protobject from './js/protobject.js'; // Importa el objeto Protobject para la comunicación

document.body.innerHTML = `<div id='myDiv' style="width: 850px; height=600px"></div>`;

var layout = {
    title: 'Gasto Acumulado de Electrodomésticos',
    height: 500,  
    width: 750,   
    xaxis: {
        title: 'Tiempo'
    },
    yaxis: {
        title: 'Gasto acumulado(pesos)',
      	tick0: 0,  
      	range: [0, 10],  // Fixed scale: the y-axis will go from 0 to 60
        zeroline: true,  // Show the zero line
        showgrid: true,  // Show gridlines
    },
  	line: {
        color: 'blue',      
        dash: 'dot',       
        width: 4   
  	},
};

let startTime = Date.now();

var xData = [0];
var yData = [0];
var time;

// Escucha los datos recibidos desde Protobject
Protobject.onReceived((data) => {
  time = (Date.now() - startTime) / 1000;
  xData.push(time);
  console.log(time)
  if (data.show=="1") {
	yData.push(yData.at(-1) + 0.5)
  } else if (data.show=="2") {
	yData.push(yData.at(-1) + 1)    
  } 
  else {
    yData.push(yData.at(-1))
  }
  
  if (xData.length > 12){
  	xData = xData.slice(-12);	
    yData = yData.slice(-12);
  }
  var datos = [
      {
        x: xData,
        y: yData,
        type: 'scatter'
      }
    ];
  Plotly.newPlot('myDiv', datos, layout);
});
