import React from 'react'
import { Line } from 'react-chartjs-2'
import initChartData from './init-chart-data.js'

//const SERVER = 'http://localhost'

const initialState = {
  labels: initChartData.xData2,
  datasets: [
    {
      type: 'bubble',
      label: 'Current Price',
      data: [
        {
          x: -5000,
          y: 1,
          r: 5,
        },
      ],
      fill: false,
      borderColor: 'red',
      backgroundColor: 'red',
      yAxisID: 'A',
      //xAxisID: 'deltaToken'
      //pointRadius: 10,
    },
    {
      // BCH/Token Exchange Rate
      type: 'line',
      label: 'n-a1',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 0,
      //pointRadius: 1,
      pointHitRadius: 10,
      data: initChartData.yData1,
      yAxisID: 'B',
      showLine: false,
    },
    {
      // $/Token Exchange Rate
      type: 'line',
      label: 'n-a2',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      //borderColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(75,1,1,1)',
      //borderColor: 'rgba(254,254,254,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      //data: [65, 59, 80, 81, 56, 55, 40],
      data: initChartData.yData2,
      yAxisID: 'A',
    },
    {
      type: 'bubble',
      label: 'Target Stable Price',
      data: [
        {
          x: -5000,
          y: 1,
          r: 5,
        },
      ],
      fill: false,
      borderColor: 'black',
      backgroundColor: 'black',
      yAxisID: 'A',
      //xAxisID: 'deltaToken'
      //pointRadius: 10,
    },
  ],
}

const options = {
  scales: {
    title: {
      text: 'Change in app token balance',
    },
    xAxes: [
      {
        id: 'deltaToken',
        scaleLabel: {
          labelString: 'Token Balance',
          display: true,
          fontColor: 'rgba(0,0,0,1)',
          fontSize: 24,
        },
      },
    ],
    yAxes: [
      {
        id: 'A',
        type: 'linear',
        position: 'left',
        scaleLabel: {
          labelString: '$ / Token',
          display: true,
          fontColor: 'rgba(254,254,254,1)',
          fontSize: 24,
        },
        gridLines: {
          color: 'rgba(254,254,254,1)',
        },
      },
      {
        id: 'B',
        type: 'linear',
        position: 'right',
        scaleLabel: {
          labelString: 'BCH Balance',
          display: true,
          fontColor: 'rgba(51,26,68,1)',
          fontSize: 24,
        },
        gridLines: {
          color: 'rgba(51,26,68,1)',
        },
      },
    ],
    responseive: true,
    tooltips: {
      position: 'nearest',
      mode: 'index',
      intersect: false,
    },
  },
  // https://stackoverflow.com/questions/47084144/is-it-possible-in-chartjs-to-hide-certain-dataset-legends
  legend: {
    labels: {
      //display: false,
      filter: function(item, chart) {
        return !item.text.includes('n-a')
      },
    },
  },
}

class PriceChart extends React.Component {
  //displayName: 'Graph',

  componentWillMount() {
    //this.setState(initialState)
    this.setState(prevState => ({
      chartData: initialState,
      chartOptions: options,
    }))

    // Adjust chart settings based on screen width.
    const screenWidth = window.innerWidth
    console.log(`Window width: ${screenWidth}`)
    if(screenWidth < 800) {
      options.scales.xAxes[0].scaleLabel.fontSize = 14
      options.scales.yAxes[0].scaleLabel.fontSize = 14
      options.scales.yAxes[1].scaleLabel.fontSize = 14
    }
  }

  async componentDidMount() {
    try {
      var _this = this

      // Update the component state with token price from the server.
      await this.getPrice()

      // Get the best chart values to use.
      const { bestX, bestY } = this.getBestChartValues()
      console.log(`{x, y}: {${bestX}, ${bestY}}`)

      //setInterval(function() {
      var oldDataSet = _this.state.chartData.datasets[1]
      var newData = []

      const newIndex = Math.floor(Math.abs(Math.random() * 10))
      let newX = initChartData.xData2[newIndex]
      let newY = initChartData.yData2[newIndex]

      for (var x = 0; x < _this.state.chartData.labels.length; x++) {
        newData.push(Math.floor(Math.random() * 100))
      }
      let newState = _this.state.chartData
      newState.datasets[1].data = newData

      //newState.datasets[0].data[0] = {x: newX, y: newY, r: 5}
      newState.datasets[0].data[0] = { x: bestX, y: bestY, r: 5 }

      _this.setState(prevState => ({
        chartData: newState,
      }))

      window.tempdata = _this.state
      //window.tempdata.chartData.datasets[2].data[0]
      //}, 5000)
    } catch (err) {
      console.log(`Error trying to update price chart: `, err)
    }
  }

  // Get the current price from the server.
  async getPrice() {
    try {
      const resp = await fetch(`${this.props.server}/price`)
      const body = await resp.json()

      this.setState(prevState => ({
        usdPerToken: body.usdPerToken,
        usdPerBCH: body.usdPerBCH,
        bchBalance: body.bchBalance,
        tokenBalance: body.tokenBalance,
      }))

      console.log(`usdPerToken: ${this.state.usdPerToken}`)
      console.log(`usdPerBCH: ${this.state.usdPerBCH}`)
      console.log(`bchBalance: ${this.state.bchBalance}`)
      console.log(`tokenBalance: ${this.state.tokenBalance}`)

      // Add BCH price to window object, so it can be used by Badger Button
      window.usdPerBCH = this.state.usdPerBCH
    } catch (err) {
      console.error(`Error in getPrice().`)
      throw err
    }
  }

  // Find the best x-y coordinates to use based on the real price.
  getBestChartValues() {
    // Find the best x value.
    const x = -1 * this.state.tokenBalance
    var curr = initChartData.xData2[0]
    var diff = Math.abs(x - curr)
    for (var val = 0; val < initChartData.xData2.length; val++) {
      var newdiff = Math.abs(x - initChartData.xData2[val])
      if (newdiff < diff) {
        diff = newdiff
        curr = initChartData.xData2[val]
      }
    }
    const bestX = curr
    console.log(`bestX: ${bestX}`)

    const index = initChartData.xData2.indexOf(bestX)
    const bestY = initChartData.yData2[index]
    console.log(`bestY: ${bestY}`)

    return { bestX, bestY }
  }

  render() {
    return (
      <Line data={this.state.chartData} options={this.state.chartOptions} />
    )
  }
}

export default PriceChart
