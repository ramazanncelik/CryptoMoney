import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CryptoInfo from './Components/CryptoInfo';

function App() {

  const [cryptoMoneyList, setCryptoMoneyList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const language = navigator.language;

  const getCrypto = async () => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then(response => {
        const list = [];
        Object.assign(list, Object.values(response.data));
        list.sort((a, b) => { return (a.market_cap_rank) - (b.market_cap_rank) });
        setCryptoMoneyList(list);
      });
  }

  useEffect(() => {

    getCrypto();

    return () => {
      setCryptoMoneyList([]);
    }

  }, []);

  if (cryptoMoneyList.length !== 0) {
    return (
      <div className='grid w-full h-12/12 bg-white p-6'>
        <div className='flex w-full h-max mb-6 items-center justify-center'>
          <input
            value={searchText}
            placeholder="Search"
            onChange={e => setSearchText(e.target.value)}
            className="w-96 h-max p-2 border border-black rounded-lg focus:ring-blue-500"
          />
        </div>

        <div className="flex text-gray-700 h-1/12 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <div className="w-[9%] font-bold px-6 py-3">
            {language.includes("tr") ? "Rütbe" : "Rank"}
          </div>
          <div className="w-[23%] font-bold px-6 py-3">
            {language.includes("tr") ? "Koin Adı" : "Coin Name"}
          </div>
          <div className="w-[17%] font-bold px-6 py-3">
            {language.includes("tr") ? "Fiyat" : "Price"}
          </div>
          <div className="w-[30%] font-bold px-6 py-3">
            {language.includes("tr") ? "Fiyat Değişikliği" : "Price Change"}
          </div>
          <div className="font-bold px-6 py-3">
            {language.includes("tr") ? "Piyasa Değeri" : "Market Cap"}
          </div>
        </div>

        <div className="flex min-h-96 max-h-[550px] overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left">
            {searchText === "" ?
              cryptoMoneyList.map(crypto => {
                return (
                  <CryptoInfo cryptoInfo={crypto} />
                )
              })
              :
              cryptoMoneyList.filter(crypto => crypto.name.includes(searchText)).length !== 0 &&
              cryptoMoneyList.filter(crypto => crypto.name.includes(searchText)).map(crypto => {
                return (
                  <CryptoInfo cryptoInfo={crypto} />
                )
              }) ||
              <div className='w-full h-max bg-orange-100 text-black p-5'>
                {language.includes("tr")?"Kripto bulunamadı":"Crypto not found"}
              </div>
            }
          </table>
        </div>

      </div>
    )
  }
  else {
    return (
      <div></div>
    )
  }
}

export default App