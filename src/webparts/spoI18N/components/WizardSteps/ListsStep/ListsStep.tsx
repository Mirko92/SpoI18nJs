import {
  Stack,
  TextField,
  PrimaryButton,
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  Selection,
  SelectionMode,
  ConstrainMode,
} from "@fluentui/react";
import * as React from "react";
import { Chip } from "../../../../../components/Chip/Chip";
import { getAllLists } from "../../../../../helpers/SharepointHelpers";
import { useAppStore } from "../../../store/store";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { IListInfo } from "@pnp/sp/lists";

const columns: IColumn[] = [
  { fieldName: "Title",         key: "Title",         name: "Title",       minWidth: 350, flexGrow: 3 },
  { fieldName: "Description",   key: "Description",   name: "Description", minWidth: 200, flexGrow: 5 },
];

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

  //#region Table selection managment
  const _selection = useMemo(() => new Selection<IListInfo>({
    onSelectionChanged: () => {
      console.log("Selection changed", _selection);
      setSelectedLists(_selection.getSelection());
    },
    getKey: (item) => item.Id,
  }), []);
  
  function _restoreSelected() {
    selectedLists.forEach(
      si => _selection.setKeySelected(si.Id, true, true)
    );
  }
  //#endregion

  useEffect(() => {
    if (selectedLists?.length) {
      _restoreSelected();
    }
  }, []);

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

          <DetailsList
            items   = {allLists}
            columns = {columns}
            getKey  = {(item) => item.Id}

            selection     = {_selection as any}
            selectionMode = {SelectionMode.multiple}
            selectionPreservedOnEmptyClick

            compact
            layoutMode    = {DetailsListLayoutMode.fixedColumns}
            constrainMode = {ConstrainMode.unconstrained}
          />
        </>
      }
    </Stack.Item>
  );
}