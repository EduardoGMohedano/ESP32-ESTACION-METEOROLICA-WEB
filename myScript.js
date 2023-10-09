const numberPoints = 10;
const updateTime = 1000;
let TmpChart;

function loadGraph(datatype){
    if(TmpChart){
        TmpChart.destroy();
    }

    let graphtitle;

    switch(datatype){
        case 'Humedad':
            graphtitle = 'Humedad %';
        break;

        case 'Temperatura':
            graphtitle = 'Temperatura °C';
        break;

        case 'Presion atmosferica':
            graphtitle = 'Presion atmosferica (hPA)';
        break;

        default:
            return;
    }

    function fetchData() {
        return Math.random() * 25;
    }
    
    function updateChart() {
        // Genera nuevos datos
        let newData = fetchData();
    
        // Añade nuevos datos a nuestro chart de temperatura
        TmpChart.data.labels.push(new Date().toLocaleTimeString()); // Usa el tiempo actual como nombre del eje x
        TmpChart.data.datasets[0].data.push(newData);
    
        // Quita los puntos mas viejos para mostrar solo la info mas nueva
        if (TmpChart.data.labels.length > numberPoints) { // muestra solo los ultimos 10 data puntos
            TmpChart.data.labels.shift();
            TmpChart.data.datasets[0].data.shift();
        }
    
        // Aplica los cambios al chart o renderiza de nuevo
        TmpChart.update();
    }
    
    const data = {
        labels: [],
            datasets: [
            {
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                data: []
            }
        ]
    };

    TmpChart = new Chart("myChart", {
        type: "line",
        data: data,
        options: {
          title: {
              display: true,
              text: graphtitle
          },
          responsive: true,
          legend: {display: false},
          scales: {
              yAxes: [{ticks: {min: 0, max:30}}],
          }
        }
      });

    // Actualiza el grafico cada seg
    setInterval(updateChart, updateTime);
      
}