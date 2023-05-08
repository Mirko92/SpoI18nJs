import * as React from "react";
// import { useAppStore } from "../../store/store";
import { DetailsList, DetailsListLayoutMode, IColumn, PrimaryButton, Stack, TextField } from "@fluentui/react";
import { Chip } from "../Chip/Chip";
import { getFieldsByGroupsAndInternalName } from "../../../../helpers/SharepointHelpers";
import { useAppStore } from "../../store/store";


const tableColumns: IColumn[] = [
  { fieldName: "Title",         key: "Title",         name: "Title",        minWidth: 200 },
  { fieldName: "InternalName",  key: "InternalName",  name: "InternalName", minWidth: 200 },
  { fieldName: "Group",         key: "Group",         name: "Group",        minWidth: 200 },
];

export function ColumnsSelector() {
  const [ namePart, setNamePart   ] = React.useState<string>();
  const [ groupName, setGroupName ] = React.useState<string>();
  const [ groups, setGroups       ] = React.useState<string[]>([]);
  
  const {columns, setColumns} = useAppStore( 
    ({ columns, setColumns }) => ({ columns, setColumns })
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
    const result = await getFieldsByGroupsAndInternalName(
      groups, namePart
    );

    console.debug("result", result);

    setColumns(result)
  }

  return <Stack.Item align="stretch">
    <Stack tokens={{childrenGap: 20}} horizontalAlign="stretch">

      <div>
        <form onSubmit={onAddGroup} >
          <TextField 
            label="Group Name"
            value={groupName}
            onChange={(_, v) => setGroupName(v)} 
            description="Press 'enter' to add the group as filter!"
          />
        </form>

        <Stack tokens={{childrenGap: 10}} horizontal>
          { groups?.map( g => <Chip text={g} onRemove={onRemoveGroup} />)}
        </Stack>
      </div>

      <TextField 
        label="Name Part" 
        value={namePart}
        onChange={(_, v) => setNamePart(v)}
        description="This filter is case sensitive!"
      />

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
      !!columns?.length && <>
        <h3>Columns found: {columns.length}</h3>
  
        <DetailsList
          items={columns}
          columns={tableColumns}
          layoutMode={DetailsListLayoutMode.justified}
        />
      </>
    }
  </Stack.Item>;
}