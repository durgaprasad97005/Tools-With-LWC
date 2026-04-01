import { LightningElement, track, wire } from 'lwc';
import getCryptoData from '@salesforce/apex/CryptoUtility.getCryptoData';
import CHARTJS from '@salesforce/resourceUrl/chartJs';
import { loadScript } from 'lightning/platformResourceLoader';
import getCoinPrice from '@salesforce/apex/CryptoUtility.getCoinPrice';

export default class CryptoDashboard extends LightningElement {
    // Tiles in the dashboard
    @track top5Cryptos;

    @wire(getCryptoData)
        handleCryptoData({data, error}) {
            if(data) {
                this.top5Cryptos = data;
                this.tryRenderChart();
            }
            else 
                console.error('Error getting top 5 cryptos: ', error);
        }
    
    // Charts in the dashboard
    lineChart;
    barChart;
    chartjsInitialized = false;
    bitcoinPriceList;
    ethereumPriceList;

    // Bitcoin Prices List
    @wire(getCoinPrice, {coin: 'bitcoin'}) 
        handleBitcoinCoinPrice({data, error}) {
            if(data) {
                this.bitcoinPriceList = data;
                this.tryRenderChart();
            } else {
                console.error('Bitcoin error: ', error);
            }
        }

    // Ethereum Prices List
    @wire(getCoinPrice, {coin: 'ethereum'}) 
        handleEthereumCoinPrice({data, error}) {
            if(data) {
                this.ethereumPriceList = data;
                this.tryRenderChart();
            } else {
                console.error('Ethereum error: ', error);
            }
        }

    tryRenderChart() {
        // Line Chart
        if(
            this.lineChart && 
            this.bitcoinPriceList &&
            Array.isArray(this.bitcoinPriceList.prices) && 
            this.ethereumPriceList &&
            Array.isArray(this.ethereumPriceList?.prices)
        ) {
            this.updateLineChart();
        }

        // Bar Chart
        if(this.barChart && this.top5Cryptos) {
            this.updateBarChart();
        }
    }

    // Updates Line Chart
    updateLineChart() {
        // Line Chart
        const lineLabels = this.bitcoinPriceList.prices.map(item => new Date(item[0]).toLocaleDateString('en-GB', {
            month: 'short', 
            day: '2-digit'
        }));

        const btcPrices = this.bitcoinPriceList.prices.map(item => item[1]);
        const ethPrices = this.ethereumPriceList.prices.map(item => item[1]);

        this.lineChart.data.labels = lineLabels;
        this.lineChart.data.datasets[0].data = btcPrices;
        this.lineChart.data.datasets[1].data = ethPrices;

        this.lineChart.update();
    }

    // Update Bar Chart
    updateBarChart() {
        // Bar Chart
        const barLabels = this.top5Cryptos.map(item => item.name);
        const top5CoinsMarketCapPrices = this.top5Cryptos.map(item => item.market_cap);

        this.barChart.data.labels = barLabels;
        this.barChart.data.datasets[0].data = top5CoinsMarketCapPrices;
        
        this.barChart.update();
    }

    // Line Chart config object
    @track lineConfig = {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Bitcoin',
                    data: [],
                    borderColor: "orange",
                    backgroundColor: "white"
                },
                {
                    label: 'Ethereum',
                    data: [],
                    borderColor: "black",
                    backgroundColor: "lightgrey"
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    ticks: {
                        callback: function(value) {
                            return "$" + value.toFixed(2);
                        }
                    }
                }
            }
        }
    };

    // Bar Chart config object
    @track barConfig = {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor: ['blue', 'green', 'skyblue', 'yellow', 'red']
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    ticks: {
                        // stepSize: 500*1e9,
                        callback: function(value) {
                            return '$' + (value/1e9).toFixed(1) + 'B';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        },
    };

    async renderedCallback() {
        if(this.chartjsInitialized) return;

        try {
            await loadScript(this, CHARTJS);
            this.chartjsInitialized = true;
            this.initializeChart();
            this.tryRenderChart();
        } catch(error) {
            console.error("Error loading ChartJs", error);
        }
    }

    initializeChart() {
        // Line Chart
        const lineCtx = this.template.querySelector(".line-chart>canvas").getContext("2d");
        this.lineChart = new window.Chart(lineCtx, this.lineConfig);

        // Bar Chart
        const barCtx = this.template.querySelector(".bar-chart>canvas").getContext("2d");
        this.barChart = new window.Chart(barCtx, this.barConfig);
    }
}