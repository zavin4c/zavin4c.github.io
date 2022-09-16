function createSequence(startValue, stopValue, step) {
	var array = [];
  var numSteps = (stopValue - startValue) / step + 1;
  for (var i = 0; i < numSteps; i++) {
  	array.push(Math.round((startValue + (step * i)) * 10000) / 10000);
    
  } 
  return array
}
const data = {
  //labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  labels: createSequence(1,10,0.1),
  datasets: [{
    label: 'f(x) = sin(x)',
    backgroundColor: 'rgb(255, 0, 0)',
    borderColor: 'rgb(255, 0, 0)',
    function: function(x) {
      return Math.sin(x)
    },
    data: [],
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {}
};

Chart.register({
  id: 'plugin1',
  beforeInit: function(chart) {
    var data = chart.config.data;
    for (var i = 0; i < data.datasets.length; i++) {
      for (var j = 0; j < data.labels.length; j++) {
        var fct = data.datasets[i].function,
          x = data.labels[j],
          y = fct(x);
        data.datasets[i].data.push(y);
      }
    }
  }
});
const ctx = document.getElementById('mainChart').getContext('2d');
const myChart = new Chart(
  document.getElementById('mainChart'),
  config
);
