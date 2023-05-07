import * as React from "react";
import styles from "./style.module.scss";

export function Chip(props: { text: string }) {
  const { text } = props; 

  return <span className={`ms-bgColor-themePrimary ${styles.chip}`}>
    {text}
  </span>
}