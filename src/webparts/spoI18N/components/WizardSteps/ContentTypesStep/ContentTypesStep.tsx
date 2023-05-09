import * as React from "react";
import { DetailsList, DetailsListLayoutMode, IColumn, PrimaryButton, Stack, TextField } from "@fluentui/react";
import { getAllContentTypeByGroups } from "../../../../../helpers/SharepointHelpers";
import { useAppStore } from "../../../store/store";
import { Chip } from "../../../../../components/Chip/Chip";


const columns: IColumn[] = [
  { fieldName: "Name",         key: "Name",         name: "Name",        minWidth: 200 },
  { fieldName: "Description",  key: "Description",  name: "Description", minWidth: 200 },
];

export function ContentTypesStep() {
  const [ groupName, setGroupName ] = React.useState<string>();
  const [ groups, setGroups       ] = React.useState<string[]>([]);

  const {contentTypes, setContentTypes} = useAppStore( 
    ({ contentTypes, setContentTypes }) => ({ contentTypes, setContentTypes })
  );

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

    setContentTypes(result);
  }

  return (
    <Stack.Item align="stretch">
      <Stack tokens={{ childrenGap: 20 }}>
        <div>
          <form onSubmit={onAddGroup} >
            <TextField 
              label="Category"
              value={groupName}
              onChange={(_, v) => setGroupName(v)} 
              description="Press 'enter' to add the group as filter!"
            />
          </form>

          <Stack tokens={{childrenGap: 10}} horizontal>
            { groups?.map( g => <Chip text={g} onRemove={onRemoveGroup} />)}
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
        !!contentTypes?.length && <>
          <h3>Content Types found: {contentTypes.length}</h3>
    
          <DetailsList
            items={contentTypes}
            columns={columns}
            layoutMode={DetailsListLayoutMode.justified}
          />
        </>
      }
    </Stack.Item>
  );
}
