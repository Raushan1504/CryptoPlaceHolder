import React, { useContext, useState, useEffect } from 'react'
import { CoinContext } from '../../context/CoinContext'
import './Home.css'

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext)
  const [displayCoin, setDisplayCoin] = useState([])

  useEffect(() => {
    setDisplayCoin(allCoin || [])
  }, [allCoin])


  return (
    <div className='home'>
      <div className = 'hero'>
        <h1>Welcome to CryptoPlace<br/>Crypto MarketPlace</h1>
        <p>Welcome to the world's largest cryptocurrency marketplace!. Sign up today to get started.</p>
        <form>
          <input type = "text" placeholder='Search Crypto' />  
          <button type='submit'>Search</button> 
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style = {{textAlign: 'center'}}>24H Change</p>
          <p className='market-cap'>Market Cap</p>
          {
            (displayCoin || []).slice(0, 10).map((coin) => (
              <div className="table-layout" key={coin.id}>
                <p>{coin.market_cap_rank}</p>
                <div>
                  <img src={coin.image} alt={coin.name} className="coin-image" />
                  <p>{coin.name} - {coin.symbol}</p>
                </div>
                <p>{currency?.symbol}{coin.current_price?.toFixed(2)}</p>
                <p>{coin.price_change_percentage_24h?.toFixed(2)}%</p>
                <p className='market-cap'>{currency?.symbol}{coin.market_cap?.toLocaleString()}</p>
              </div>
            ))
          }
        </div>
      </div>
      
    </div>
  )
}

export default Home
