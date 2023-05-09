import * as React from "react";
import styles from "./style.module.scss";
import { Checkbox } from "@fluentui/react";
import { useAppStore } from "../../store/store";

export interface IDetailsProps extends React.PropsWithChildren<any> {
  listId: string;
  title: string; 
  onOpen?: () => void;
  onClose?: () => void;
  onToggleAll?: (checked: boolean) => void;
}

export function Details(props: IDetailsProps) {
  const { listId, title, children, onOpen, onClose, onToggleAll } = props; 

  const [ checked, setChecked ] = React.useState<boolean>(false);

  const {isAllSelected, selectedViews} = useAppStore( 
    ({isAllSelected, selectedViews}) => ({isAllSelected, selectedViews})
  );

  React.useEffect(() => {
    setChecked(isAllSelected(listId)) ;
  }, [selectedViews])

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
              checked  = {checked}
              title    = {isAllSelected ? "Unselect all" : "Select all"}
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