var LineChart = function (points, keys) {
    Chart.types.Line.extend({
        name: "AltLine",

        initialize: function (data) {
            Chart.types.Line.prototype.initialize.apply(this, arguments);
            this.scale.draw = function () {
                if (this.display && (this.xLabelRotation > 90)) {
                    this.endPoint = this.height - 5;
                }
                Chart.Scale.prototype.draw.apply(this, arguments);
            };
        }
    });

    var ctx = document.getElementById("myChart").getContext("2d");
    var data = {
        labels: keys,
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: points
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
         
            var filter = 4;
            var values = data.results[0].dataPoints.filter(function (obj) {
                return obj.key % filter == 0;
            });

            values = values.map(function (obj) {
                return obj.value;
            });

            var keys = data.results[0].dataPoints.filter(function (obj) {
                return obj.key % filter == 0;
            });
            keys = keys.map(function (obj) {
                return obj.key;
            });
            new LineChart(values, keys);
        }
    }
    request.send(null);

}

 
           