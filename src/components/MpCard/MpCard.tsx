import * as React from "react";
import { PropsWithChildren, ReactNode } from "react"
import styles from "./style.module.scss";

export interface IMpCardProps { 

}

export function MpCard(props: PropsWithChildren<IMpCardProps>) {

  const { children } = props;

  let _titleSlot: ReactNode;
  let _bodySlot : ReactNode;

  (Array.isArray(children) ? children : [ children ]) 
    .forEach(child => {
      switch ((child as any).type) {
        case MpCardTitle: 
          _titleSlot = child;
          break
        case MpCardBody: 
          _bodySlot = child;
          break
      }
    });

  return <article className={styles.MpCard}>
    <header className={styles.MpCardHeader}>
      {_titleSlot}
    </header>

    <div className={styles.MpCardBody}>
      {_bodySlot}
    </div>
  </article>
}


function MpCardTitle(props: PropsWithChildren<any>) {
  return <> {props.children} </>;
}

function MpCardBody(props: PropsWithChildren<any>) {
  return <> {props.children} </>;
}

MpCard.Title = MpCardTitle;
MpCard.Body  = MpCardBody;