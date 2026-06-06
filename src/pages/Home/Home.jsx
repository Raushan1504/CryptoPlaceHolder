import React, { useContext, useState, useEffect } from 'react'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext)
  const [displayCoin, setDisplayCoin] = useState([])
  const [input,setInput] = useState('')

  useEffect(() => {
    setDisplayCoin(allCoin || [])
  }, [allCoin])

const InputHandler = (event) => {
  setInput(event.target.value)
   if(event.target.value === ''){
    setDisplayCoin(allCoin)
  }
  
}

 const  searchHandler = async(event) => {
  event.preventDefault()

  const coins = await allCoin.filter((item) => {
   
      return item.name.toLowerCase().includes(input.toLowerCase())
    
  })

 
  setDisplayCoin(coins)
}
  return (
    <div className='home'>
      <div className = 'hero'>
        <h1>Welcome to CryptoPlace<br/>Crypto MarketPlace</h1>
        <p>Welcome to the world's largest cryptocurrency marketplace!. Sign up today to get started.</p>
       
        <form onSubmit={searchHandler}>
          <input type = "text" onChange={InputHandler}  list='coinlist'  value  = {input} placeholder='Search Crypto'  />  
            
            <datalist id='coinlist'>
             {allCoin.map((item, index) => <option key={index} value={item.name}/>
            )}
           </datalist>

          <button type='submit'>Search</button> 
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout table-header">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style = {{textAlign: 'center'}}>24H Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>

        {(displayCoin || []).slice(0, 10).map((coin,index) => (
          <Link to={`/coin/${coin.id}`} className="table-layout table-row" key={index}>
            <p>{coin.market_cap_rank}</p>
            <div className="coin-cell">
              <img src={coin.image} alt={coin.name} className="coin-image" />
              <div className="coin-meta">
                <div className="coin-name">{coin.name}</div>
                <div className="coin-symbol">{coin.symbol}</div>
              </div>
            </div>
            <p className="price">{currency?.symbol}{coin.current_price?.toFixed(2)}</p>
            <p className={`change ${coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </p>
            <p className='market-cap'>{currency?.symbol}{coin.market_cap?.toLocaleString()}</p>
          </Link>
        ))}

      </div>
      
    </div>
  )
}

export default Home
