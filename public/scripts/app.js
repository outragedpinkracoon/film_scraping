var LineChart = function (points) {
    var ctx = document.getElementById("myChart").getContext("2d");
    var data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
        ]
    };
    var myLineChart = new Chart(ctx).Line(data);
}

window.onload = function () {
    var url = '/data';
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () {
        if (request.status === 200) {
            var data = JSON.parse(request.responseText)
            new LineChart(data.data[0].dataPoints);
        }
    }
    request.send(null);
   
}

 
           