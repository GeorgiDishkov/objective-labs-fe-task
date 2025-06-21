"use client";

import { CoinMarketResponse } from "@test_objectlabs_lib/coincap-sdk";
import AssetRow from "./AssetRow";

type Props = {
  assets: CoinMarketResponse[];
};

export default function AssetTable({ assets }: Props) {
  return (
    <div className="p-4 glow-border transition-all duration-300 ease-in-out">
      <table className="w-full table-auto border border-[#39ff14] rounded-xl overflow-hidden shadow-lg">
        <thead>
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Symbol</th>
            <th className="p-3">Price (USD)</th>
            <th className="p-3">24h Change</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <AssetRow key={asset.id} asset={asset} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
