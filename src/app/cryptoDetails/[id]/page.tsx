"use client";

import { CoreLoader } from "@/components/CoreLoader";
import CoinChart from "@/components/cryptoChare";
import { useGetAssetByIdQuery } from "@test_objectlabs_lib/coincap-sdk";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function CryptoDetailsPage() {
  const { id } = useParams();
  const { data, error, isFetching } = useGetAssetByIdQuery(id as string);

  const {
    image,
    name,
    symbol,
    last_updated,
    current_price,
    market_cap,
    market_cap_rank,
    price_change_percentage_24h,
    ath,
    ath_date,
    atl,
    atl_date,
    circulating_supply,
    total_supply,
    max_supply,
    id: coinId,
  } = data || {};

  if (isFetching) return <CoreLoader />;
  if (error || !data)
    return <p className="p-4 text-red-500">Something went wrong...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-[#0a0f0a] rounded-xl shadow-lg border border-[#39ff14] animate-glow">
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={image as string}
          alt={name as string}
          className="w-16 h-16 rounded-full transform hover:rotate-[30deg] transition-transform duration-1000"
        />
        <div>
          <h1 className="text-3xl font-bold text-[#7aff3c]">{name}</h1>
          <p className="uppercase text-[#39ff14]">{symbol}</p>
          <p className="text-sm text-[#39ff14] italic">
            Last updated: {new Date(last_updated as string).toLocaleString()}
          </p>
        </div>
      </div>

      <ul className="space-y-3 text-[#39ff14]">
        {current_price && (
          <li>
            <strong>Current Price:</strong> ${current_price.toLocaleString()}
          </li>
        )}
        {market_cap && (
          <li>
            <strong>Market Cap:</strong> ${market_cap.toLocaleString()}
          </li>
        )}
        <li>
          <strong>Market Cap Rank:</strong> #{market_cap_rank}
        </li>
        {price_change_percentage_24h && (
          <li>
            <strong>24h Price Change:</strong>{" "}
            <span
              className={
                price_change_percentage_24h > 0
                  ? "text-[#7aff3c]"
                  : "text-red-500"
              }
            >
              {price_change_percentage_24h.toFixed(2)}%
            </span>
          </li>
        )}
        <li>
          <strong>All Time High:</strong> ${ath && ath.toLocaleString()} (
          {new Date(ath_date as string).toLocaleDateString()})
        </li>
        <li>
          <strong>All Time Low:</strong> ${atl && atl.toLocaleString()} (
          {new Date(atl_date as string).toLocaleDateString()})
        </li>
        {circulating_supply && (
          <li>
            <strong>Circulating Supply:</strong>{" "}
            {circulating_supply.toLocaleString()}
          </li>
        )}
        <li>
          <strong>Total Supply:</strong>{" "}
          {total_supply ? total_supply.toLocaleString() : "N/A"}
        </li>
        <li>
          <strong>Max Supply:</strong>{" "}
          {max_supply ? max_supply.toLocaleString() : "N/A"}
        </li>
      </ul>
      {coinId && <CoinChart coinId={coinId} vs_currency="usd" days="30" />}
    </div>
  );
}
