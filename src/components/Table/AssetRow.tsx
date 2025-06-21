"use client";

import { CoinMarketResponse } from "@test_objectlabs_lib/coincap-sdk";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  asset: CoinMarketResponse;
};

export default function AssetRow({ asset }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/cryptoDetails/${asset.id}`);
  };

  return (
    <tr
      onClick={handleClick}
      className="group border-t border-gray-200  cursor-pointer transition duration-300 rounded-md"
    >
      <td className="p-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <Image
            src={asset.image}
            alt={asset.name}
            loading="lazy"
            className="w-full h-full transform transition-transform duration-700 group-hover:rotate-[30deg] group-hover:scale-110"
          />
        </div>
        <span className="font-medium text-gray-800 group-hover:text-blue-700 transition">
          {asset.name}
        </span>
      </td>
      <td className="p-3 text-gray-600 uppercase">{asset.symbol}</td>
      <td className="p-3 font-mono text-gray-800">
        ${asset.current_price.toFixed(4)}
      </td>
      <td className="p-3">
        <span
          className={`font-semibold ${
            asset.price_change_percentage_24h > 0
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {asset.price_change_percentage_24h.toFixed(2)}%
        </span>
      </td>
    </tr>
  );
}
