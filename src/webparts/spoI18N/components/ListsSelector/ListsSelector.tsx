import { Stack, TextField, PrimaryButton, DetailsList, DetailsListLayoutMode, IColumn } from "@fluentui/react";
import * as React from "react";
import { Chip } from "../Chip/Chip";
import { getAllLists } from "../../../../helpers/SharepointHelpers";
import { useAppStore } from "../../store/store";

const columns: IColumn[] = [
  { fieldName: "Title",         key: "Title",         name: "Title",        minWidth: 200 },
  { fieldName: "Description",   key: "Description",   name: "Description", minWidth: 200 },
];

export function ListsSelector() {
  const [ listName, setListName ] = React.useState<string>();
  const [ listNames, setListNames       ] = React.useState<string[]>([]);

  const {allLists, setAllLists} = useAppStore( ({allLists, setAllLists}) => ({
    allLists, setAllLists
  }))

  function onAddGroup(e: React.FormEvent) {
    e.preventDefault();

    if (!listNames.includes(listName)) {
      setListNames(gs => [...gs, listName]);
    }

    setListName("");
  }

  function onRemoveGroup(listName: string) {
    setListNames(ls => ls.filter(g => g !== listName));
  }
  
  async function doSearch() {
    const result = await getAllLists(listNames);

    console.debug("result", result);

    setAllLists(result);
  }

  return (
    <Stack.Item align="stretch">
      <Stack tokens={{ childrenGap: 20 }}>
        <div>
          <form onSubmit={onAddGroup} >
            <TextField 
              label="List Name"
              value={listName}
              onChange={(_, v) => setListName(v)} 
              description="Press 'enter' to add the list as filter!"
            />
          </form>

          <Stack tokens={{childrenGap: 10}} horizontal>
            { listNames?.map( g => <Chip text={g} onRemove={onRemoveGroup} />)}
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
          <h3>Lists found: {allLists.length}</h3>
    
          <DetailsList
            items={allLists}
            columns={columns}
            layoutMode={DetailsListLayoutMode.justified}
          />
        </>
      }
    </Stack.Item>
  );
}