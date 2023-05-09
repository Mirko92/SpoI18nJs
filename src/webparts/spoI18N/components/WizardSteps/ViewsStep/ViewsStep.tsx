import * as React from "react";
import { PrimaryButton } from "@fluentui/react";
import { useAppStore } from "../../../store/store";
import { ListDetails } from "./ListDetails/ListDetails";

export function ViewsStep() {

  const {allLists, toggleAllViews, isAllSelected} = useAppStore( 
    ({ allLists, toggleAllViews, isAllSelected }) => ({ allLists, toggleAllViews, isAllSelected })
  );

  return (<>
    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      <PrimaryButton 
        text={isAllSelected() ? 'Unselect all' : 'Select all'}
        onClick={toggleAllViews}
        iconProps={{iconName: isAllSelected() ? 'ClearSelection' :'MultiSelect' }}
      />
    </div>

    { 
      allLists?.map(
        (l) => <ListDetails list={l} key={`ListDetails${l.Id}`} /> 
      )
    }
  </>);
}