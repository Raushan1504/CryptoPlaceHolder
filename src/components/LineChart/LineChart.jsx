import React, {useState, useEffect} from 'react'
import Chart from 'react-google-charts'

const LineChart = ({historyData}) => {

const [data, setData] = useState([["Data","Prices"]]);
useEffect((() => {
    let dataCopy = [["Data","Prices"]]
  if(historyData && historyData.prices){
    historyData.prices.forEach((item) => {
       dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`, item[1] ])
    });
    setData(dataCopy)
  }
}), [historyData])
  return (
   <Chart
    chartType="LineChart"
    data={data}
    height="100%"
    legendToggle
  />        

  )
}

export default LineChart
