import * as React from "react";
import { DetailsList, DetailsListLayoutMode, IColumn, PrimaryButton, Stack, TextField } from "@fluentui/react";
import { Chip } from "../Chip/Chip";
import { getAllContentTypeByGroups } from "../../../../helpers/SharepointHelpers";
import { IContentTypeInfo } from "@pnp/sp/content-types";


const columns: IColumn[] = [
  { fieldName: "Name",         key: "Name",         name: "Name",        minWidth: 200 },
  { fieldName: "Description",  key: "Description",  name: "Description", minWidth: 200 },
];

export function ContentTypesSelector() {
  const [ groupName, setGroupName ] = React.useState<string>();
  const [ groups, setGroups       ] = React.useState<string[]>([]);

  const [ allCts, setAllCts ] = React.useState<IContentTypeInfo[]>();

  function onAddGroup(e: React.FormEvent) {
    e.preventDefault();

    if (!groups.includes(groupName)) {
      setGroups(gs => [...gs, groupName]);
    }

    setGroupName("");
  }

  function onRemoveGroup(groupName: string) {
    setGroups(gs => gs.filter(g => g !== groupName));
  }
  
  async function doSearch() {
    const result = await getAllContentTypeByGroups(groups);

    console.debug("result", result);

    setAllCts(result);
  }

  return (
    <Stack.Item align="stretch">
      <Stack tokens={{ childrenGap: 20 }}>
        <div>
          <form onSubmit={onAddGroup} >
            <TextField 
              label="Group Name"
              value={groupName}
              onChange={(_, v) => setGroupName(v)} 
              description="Press enter to add!"
            />
          </form>

          <Stack tokens={{childrenGap: 10}} horizontal>
            { groups?.map( g => <Chip text={g} onRemove={onRemoveGroup} />)}
          </Stack>
        </div>

        <PrimaryButton 
          text="Search" 
          onClick={doSearch}
        />
      </Stack>

      {
        !!allCts?.length && <>
          <h3>Content Types found: {allCts.length}</h3>
    
          <DetailsList
            items={allCts}
            columns={columns}
            layoutMode={DetailsListLayoutMode.justified}
          />
        </>
      }
    </Stack.Item>
  );
}
