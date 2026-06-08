import React, { useEffect, useContext, useState } from 'react'
import './Coin.css' 
import {useParams} from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext'
import LineChart from '../../components/LineChart/LineChart'
const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historyData, setHistoryData] = useState(null);
  const { currency } = useContext(CoinContext)

  const fetchCoinData = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': 'CG-vRuftKUWct3XmrDZd9VWuZv3'
        }
      }
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      if (!res.ok) {
        console.error('Failed to fetch coin:', res.status, res.statusText)
        setCoinData(null)
        return
      }
      const data = await res.json()
      setCoinData(data)
    } catch (err) {
      console.error(err)
      setCoinData(null)
    }

  }
  const fetchHistoricalData = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': 'CG-vRuftKUWct3XmrDZd9VWuZv3'
    }
  };

  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=100&interval=daily`, options);
    if (!response.ok) {
      console.error('Failed to fetch historical data:', response.status, response.statusText);
      setHistoryData(null);
      return;
    }
    const data = await response.json();
    setHistoryData(data);
  } catch (err) {
    console.error('Error fetching historical data:', err);
    setHistoryData(null);
  }
};

  useEffect(() => {
    if (coinId) {
      fetchCoinData();
      fetchHistoricalData();
    }
  }, [currency, coinId])
if(coinData && historyData){
  return (
    <div className = 'coin'>
      <div className="coin-name">
        <img src={coinData?.image?.large} alt={coinData?.name} className="coin-image-large" />
       <p><b>{coinData?.name} ({coinData?.symbol.toUpperCase()}) </b></p> 
      </div>
      <div className="coin-charts">
          <LineChart historyData={historyData} />
      </div>
      <div className="coin-info">
        <ul>  
        <li><b>Crypto Market Rank:</b></li>
        <li> {coinData?.market_cap_rank}</li>
       </ul>
       <ul>
        <li><b>Current Price:</b></li>
        <li> {currency.symbol} {coinData?.market_data?.current_price[currency.name].toLocaleString()}</li>
       </ul>
       <ul>
        <li><b>Market Cap:</b></li>
        <li> {currency.symbol} {coinData?.market_data?.market_cap[currency.name].toLocaleString()}</li>
       </ul>
       <ul>
        <li><b>24 Hour High:</b></li>
        <li> {currency.symbol} {coinData?.market_data?.high_24h[currency.name].toLocaleString()}</li>
       </ul>
       <ul>
        <li><b>24 Hour Low:</b></li>
        <li> {currency.symbol} {coinData?.market_data?.low_24h[currency.name].toLocaleString()}</li>
       </ul>
      </div>
    </div>
    
  
  )
}else{
  return (
    <div className='coin'>
      <p>Loading...</p>
    </div>
  )
}


}

export default Coin
