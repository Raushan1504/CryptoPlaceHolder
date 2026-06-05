import { createContext,useState,useEffect } from 'react'

export const CoinContext = createContext()

const CoinContextProvider = (props) => {
    const [allCoin, setAllCoin] = useState([]);  
    const [currency,setCurrency] = useState({
        name: 'USD',
        symbol: '$'

    });
    const fetchAllCoin = async () => {

        const options = {
            method: 'GET',
            headers: {    accept: 'application/json', 
            'x-cg-demo-api-key':  'CG-vRuftKUWct3XmrDZd9VWuZv3'
            }
        };  
                
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name.toLowerCase()}`, options);
            if (!response.ok) {
                console.error('Fetch failed:', response.status, response.statusText);
                setAllCoin([]);
                return;
            }
            const data = await response.json();
            setAllCoin(data);
        } catch (error) {
            console.error('Error fetching coin data:', error);
            setAllCoin([]);
        }
    }

    useEffect(() => {
        fetchAllCoin();
    }   
    , [currency])
  return (
    <CoinContext.Provider value={{ allCoin, currency, fetchAllCoin }}>  
        {props.children}
    </CoinContext.Provider> 
    )    

}
export default CoinContextProvider
