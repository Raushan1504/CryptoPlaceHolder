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

  fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10`,
    options
  )
    .then(response => response.json())
    .then(response => setHistoryData(response))
    .catch(err => console.error(err));
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
