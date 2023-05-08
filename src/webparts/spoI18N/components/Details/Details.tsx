import * as React from "react";
import styles from "./style.module.scss";
import { Checkbox } from "@fluentui/react";

export interface IDetailsProps extends React.PropsWithChildren<any> {
  title: string; 
  onOpen?: () => void;
  onClose?: () => void;

  isAllSelected?: boolean;
  onToggleAll?: (checked: boolean) => void;
}

export function Details(props: IDetailsProps) {
  const { title, children, isAllSelected, onOpen, onClose, onToggleAll } = props; 

  function onToggle(e: React.SyntheticEvent<HTMLDetailsElement, Event>) {
    const isOpen = (e.target as HTMLDetailsElement).open;

    if (isOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }

  function _onToggleAll(_: any, checked?: boolean) {
    onToggleAll?.(checked);
  }

  return <div style={{width: "100%"}}>
    <details className={styles.MpDetails} onToggle={onToggle}>
      <summary style={{display: 'block'}}>
        <div style={{display: 'flex'}}>
          <span>
            <Checkbox 
              checked  = {isAllSelected}
              title    = "Select/Unselect all"
              onChange = {_onToggleAll}
            />
          </span>
          <span>{title}</span>
        </div>
      </summary>

      <div className={styles.Content}>
        {children}
      </div>
    </details>
  </div>
}