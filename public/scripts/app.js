window.onload = function () {
    var url = '/data';
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () {
        if (request.status === 200) {
            var data = JSON.parse(request.responseText)
            
            data.results.forEach(function(item){

            });

            var first = data.results[0].dataPoints;

            var values = first.map(function (obj) {
                return obj.value;
            });

            var keys = first.map(function (obj) {
                return obj.key;
            });

            //title, type, container, data, categories
            var container = document.getElementById("chart");

            var series = [];

            var data = {
              name: "Avengers",
              color: "#73b7ff",
              data: values
            };

            series.push(data);

            var categories = {
              categories: keys
            }
            new Chart("Film Grosses","line", container,series,categories);
        }
    }
    request.send(null);

}

 
           