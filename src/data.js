
//window.onload = function () {
    console.log(window.dataPacket)
    window.options = {
        chart: {
            width: 800,
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: [5, 7, 5],
            curve: 'straight',
            dashArray: [0, 8, 5]
        },
        series: [{
                name: "Creature Count",
                data: [...window.dataPacket.creatures]
            },
            {
                name: "Average Vision",
                data: [...window.dataPacket.avgVision]
            },
            {
                name: 'Average Speed',
                data: [...window.dataPacket.avgSpeed]
            }
        ],
        title: {
            text: 'Simulation Statistics',
            align: 'left'
        },
        markers: {
            size: 0,

            hover: {
                sizeOffset: 6
            }
        },
        xaxis: {
            categories: [...PlayScene.dataPacket.time], // Every 100 seconds
        },
        tooltip: {
        y: [{
        title: {
            formatter: function (val) {
            return val + " (mins)"
            }
        }
        }, {
        title: {
            formatter: function (val) {
            return val + " per session"
            }
        }
        }, {
        title: {
            formatter: function (val) {
            return val;
            }
        }
        }]
        },
        grid: {
            borderColor: '#f1f1f1',
        }
    }

    const chart = new ApexCharts(
        document.querySelector("#chart"), window.options
    );

  chart.render();
//}

