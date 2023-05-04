import * as React from "react";
import { useAppStore } from "../../store/store";

export function ColumnsSelector() {
  const test = useAppStore(state => state.test);
  return <>
    <h2>Columns selector: {test}</h2>
  </>;
}