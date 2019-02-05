const stockInfo = axios.create({
  baseURL: 'https://api.iextrading.com/1.0/stock/',
});

const stockTicket = "amzn";

stockInfo.get(`${stockTicket}/chart`)
  .then(response => {
    printTheChart(response.data, stockTicket);
  })
  .catch(error => {
    console.log(error);
  });

let datasets = []

function printTheChart(stockData, stockTicket) {
  const stockLabels = stockData.map(element => element.date);
  const stockPrice = stockData.map(element => element.close);
  datasets.push({
    label: stockTicket,
    backgroundColor: 'rgba(255, 99, 132, 0)',
    borderColor: 'rgb(255, 99, 132)',
    data: stockPrice, // [1629.51, 1656.58, ...]
    // data: stockPrice.map(val => val/stockPrice[0]), // easier solution to compare
  })
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockLabels, // ["2019-01-07", "2019-01-08", ...]
      datasets: datasets
    }
  });
};

document.getElementById('update-1').onclick = function () {
  let stockTicket1 = document.getElementById('stock-ticket-1').value
  stockInfo.get(`${stockTicket1}/chart`)
    .then(response => {
      printTheChart(response.data, stockTicket1);
    })
    .catch(error => {
      console.log(error);
    });
}