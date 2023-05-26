import {
  Stack,
  TextField,
  PrimaryButton,
} from "@fluentui/react";
import * as React from "react";
import { Chip } from "../../../../../components/Chip/Chip";
import { getAllLists } from "../../../../../helpers/SharepointHelpers";
import { useAppStore } from "../../../store/store";
import { FormEvent, useState } from "react";
import { ListDetails } from "./ListDetails/ListDetails";

export function ListsStep() {

  // Store
  const [
    filters, setFilters,
    allLists, setAllLists,
  ] = useAppStore( 
    state => ([
      state.listsFilters, state.setListsFilters,
      state.allLists, state.setAllLists,
      state.selectedLists, state.setSelectedLists
    ])
  );
  
  //#region Filters and search
  const [ listName, setListName   ] = useState<string>();

  /**
   * Add a list to query
   */
  function onAddListName(e: FormEvent) {
    e.preventDefault();

    if (!filters.lists?.includes(listName)) {
      setFilters({
        ...filters,
        lists: [...(filters.lists||[]), listName]
      });
    }

    setListName("");
  }

  /**
   * Remove a list from query
   */
  function onRemoveListName(listName: string) {
    setFilters({
      ...filters,
      lists: filters.lists.filter(l => l !== listName)
    });
  }
  
  async function doSearch() {
    const result = await getAllLists(filters.lists);

    console.debug("result", result);

    setAllLists(result);
  }
  //#endregion


  return (
    <Stack.Item align="stretch">
      <Stack tokens={{ childrenGap: 20 }}>
        <div>
          <form onSubmit={onAddListName} >
            <TextField 
              label="List Name"
              value={listName}
              onChange={(_, v) => setListName(v)} 
              description="Press 'enter' to add the list as filter!"
            />
          </form>

          <Stack tokens={{childrenGap: 10}} horizontal>
            { filters.lists?.map( l => <Chip text={l} onRemove={onRemoveListName} />)}
          </Stack>
        </div>

        <Stack.Item align="center">
          <PrimaryButton 
            iconProps={{
              iconName: "Search",
            }}
            text="Search" 
            onClick={doSearch}
          />
        </Stack.Item>
      </Stack>

      {
        !!allLists?.length && <>
          <div>
            <h3>Lists found: {allLists.length}</h3>
          </div>

          <ListDetails></ListDetails>
        </>
      }
    </Stack.Item>
  );
}