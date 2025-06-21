"use client";

import { store } from "@test_objectlabs_lib/coincap-sdk";
import { Provider } from "react-redux";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
