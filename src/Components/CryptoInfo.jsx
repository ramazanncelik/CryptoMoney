import React from 'react'

function CryptoInfo({ cryptoInfo }) {
    return (
        <tr className={`${cryptoInfo.market_cap_rank % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b`}>
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                {cryptoInfo.market_cap_rank}
            </th>
            <td className="px-6 text-black py-4">
                {cryptoInfo.name}
            </td>
            <td className="px-6 text-black py-4">
                ${cryptoInfo.current_price}
            </td>
            <td className={`px-6 py-4 ${cryptoInfo.price_change_24h > 0 ? "text-green-500" : "text-red-500"}`}>
                {cryptoInfo.price_change_24h} %
            </td>
            <td className="px-6 py-4">
                ${cryptoInfo.market_cap}
            </td>
        </tr>
    )
}

export default CryptoInfo