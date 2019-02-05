const stockInfo = axios.create({
  baseURL: 'https://api.iextrading.com/1.0/stock/',
});

const stockTicket = "amzn";

stockInfo.get(`${stockTicket}/chart`)
  .then(response => {
    printTheChart(response.data);
  })
  .catch(error => {
    console.log(error);
  });

function printTheChart(stockData){
  const stockLabels = stockData.map(element => element.date);
  const stockPrice = stockData.map(element => element.close);
	console.log('TCL: printTheChart -> stockLabels', stockLabels)
	console.log('TCL: printTheChart -> stockPrice', stockPrice)
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockLabels, // ["2019-01-07", "2019-01-08", ...]
      datasets: [{
        label: "Stock Chart",
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        data: stockPrice, // [1629.51, 1656.58, ...]
      }]
    }
  });
};