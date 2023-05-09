import * as React from "react";
import { useAppStore } from "../../store/store";
import { ListDetails } from "../ListDetails/ListDetails";
import { PrimaryButton } from "@fluentui/react";

export function ViewsSelector() {

  const {allLists} = useAppStore( 
    ({ allLists }) => ({ allLists })
  );

  const itemsRef = React.useRef<Map<string, typeof ListDetails>>(null);

  function getMap() {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  function toggleAll() {
    for (const e of itemsRef.current.values()) {
      (e as any).toggleAll();
    }
  }

  return (<>
    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      <PrimaryButton 
        text="Select all"
        onClick={toggleAll}
      />
    </div>
    { 
      allLists?.map(
        (l) => <ListDetails 
          ref={(node: any) => {
            const map = getMap();
            if (node) {
              map.set(l.Id, node);
            } else {
              map.delete(l.Id);
            }
          }}
          list={l} key={l.Id} 
        /> 
      )
    }
  </>);
}