"use client";

import { useState } from "react";
import AssetTable from "@/components/Table/AssetTable";
import { store, useGetAssetsQuery } from "@test_objectlabs_lib/coincap-sdk";
import { Provider } from "react-redux";
import Pagination from "@/components/pagination";
import { CoreLoader } from "@/components/CoreLoader";

export default function Home() {
  const [page, setPage] = useState(1);
  const { data, error, isFetching } = useGetAssetsQuery({
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: 10,
    page,
    sparkline: false,
  });

  return (
    <Provider store={store}>
      <main className="p-8">
        {error && <p>Something went wrong!</p>}
        {data && (
          <>
            {isFetching ? <CoreLoader /> : <AssetTable assets={data} />}
            <Pagination
              totalPages={30}
              /*hardcode total page bcs endpoint doesn't support it*/ currentPage={
                page
              }
              onPageChange={setPage}
            />
          </>
        )}
      </main>
    </Provider>
  );
}
