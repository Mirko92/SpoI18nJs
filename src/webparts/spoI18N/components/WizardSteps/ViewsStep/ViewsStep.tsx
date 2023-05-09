import * as React from "react";
import { PrimaryButton } from "@fluentui/react";
import { useAppStore } from "../../../store/store";
import { ListDetails } from "./ListDetails/ListDetails";

export function ViewsStep() {

  const {allLists, toggleAllViews} = useAppStore( 
    ({ allLists, toggleAllViews }) => ({ allLists, toggleAllViews })
  );

  return (<>
    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      <PrimaryButton 
        text="Select all"
        onClick={toggleAllViews}
      />
    </div>

    { 
      allLists?.map(
        (l) => <ListDetails list={l} key={`ListDetails${l.Id}`} /> 
      )
    }
  </>);
}