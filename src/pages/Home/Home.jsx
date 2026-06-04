import React from 'react'
import './Home.css'
const Home = () => {
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
        </div>
      </div>
      
    </div>
  )
}

export default Home
