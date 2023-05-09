import * as React from "react";
import styles from "./style.module.scss";

export function Chip(props: { text: string, onRemove: (text: string) => void; }) {
  const { text, onRemove } = props; 

  return <span className={`ms-bgColor-themePrimary ${styles.chip}`}>
    <div className={`${styles.text}`}>
      {text}
    </div>

    <div className={`${styles.close}`} onClick={() => onRemove(text)}>
      &times;
    </div>
  </span>;
}