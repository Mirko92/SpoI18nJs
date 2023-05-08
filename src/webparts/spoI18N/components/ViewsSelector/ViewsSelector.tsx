import * as React from "react";
import { useAppStore } from "../../store/store";
import { ListDetails } from "../ListDetails/ListDetails";

export function ViewsSelector() {

  const {allLists} = useAppStore( 
    ({ allLists }) => ({ allLists })
  );

  return (<>
    { 
      allLists?.map(
        (l) => <ListDetails list={l} key={l.Id} /> 
      )
    }
  </>);
}