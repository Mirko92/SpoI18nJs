import {
  Stack,
  TextField,
  PrimaryButton,
  Checkbox,
} from "@fluentui/react";
import * as React from "react";
import { Chip } from "../../../../../components/Chip/Chip";
import { getAllLists } from "../../../../../helpers/SharepointHelpers";
import { useAppStore } from "../../../store/store";
import { FormEvent, useState } from "react";
import { IListInfo } from "@pnp/sp/lists";

const flexRowCenter = {display: "flex", gap: "1rem", alignItems: "center"};

export function ListsStep() {

  // Store
  const [
    filters, setFilters,
    allLists, setAllLists,
    selectedLists, setSelectedLists
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

  function onSelect(list: IListInfo) {
    if (isSelected(list)) {
      setSelectedLists(selectedLists.filter(l => l.Id !== list.Id));
    } else {
      setSelectedLists([...selectedLists, list]);
    }
  }

  function onToggleAll() {
    if (_isAllSelected()) {
      setSelectedLists([]);
    } else {
      setSelectedLists(allLists);
    }
  }

  function isSelected(list: IListInfo) {
    return !!selectedLists?.find(s => s.Id === list.Id);
  }

  function _isAllSelected() {
    return selectedLists?.length === allLists?.length;
  }

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
            <div style={flexRowCenter}>
              <Checkbox 
                title="Select all" 
                checked={_isAllSelected()}
                onChange={onToggleAll}
              />
              <h3>List title</h3>
            </div>
            <hr />

            {
              allLists.map( (l) => (
                <div style={flexRowCenter} key={l.Id}>
                  <Checkbox 
                    checked  = {isSelected(l)}
                    onChange = {() => onSelect(l)}
                  />
                  <h4>{l.Title}</h4>
                </div>
              ))
            }
          </div>
         
        </>
      }
    </Stack.Item>
  );
}