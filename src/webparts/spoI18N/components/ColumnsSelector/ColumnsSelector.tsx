import * as React from "react";
// import { useAppStore } from "../../store/store";
import { SharepointHelper } from "../../../../helpers/SharepointHelper";
import { IFieldInfo } from "@pnp/sp/fields";
import { DetailsList, DetailsListLayoutMode, IColumn, PrimaryButton, Stack, TextField } from "@fluentui/react";
import { Chip } from "../Chip/Chip";


const columns: IColumn[] = [
  { fieldName: "Title",         key: "Title",         name: "Title",        minWidth: 200 },
  { fieldName: "InternalName",  key: "InternalName",  name: "InternalName", minWidth: 200 },
  { fieldName: "Group",         key: "Group",         name: "Group",        minWidth: 200 },
];

export function ColumnsSelector() {
  const [ namePart, setNamePart   ] = React.useState<string>();
  const [ groupName, setGroupName ] = React.useState<string>();
  const [ groups, setGroups       ] = React.useState<string[]>([]);
  
  const [ allFields, setAllFields ] = React.useState<IFieldInfo[]>();

  function onAddGroup(e: React.FormEvent) {
    e.preventDefault();

    if (!groups.includes(groupName)) {
      setGroups(gs => [...gs, groupName]);
    }

    setGroupName("");
  }

  
  async function doSearch() {
    const result = await SharepointHelper.getFieldsByGroupsAndInternalName(
      groups, namePart
    );

    console.debug("result", result);

    setAllFields(result)
  }

  return <>
    <Stack tokens={{childrenGap: 20}}>

      <div>
        <form onSubmit={onAddGroup} >
          <TextField 
            label="Group Name"
            value={groupName}
            onChange={(_, v) => setGroupName(v)} 
          />
        </form>

        <div style={{display: "flex", gap: "1rem"}}>
          { groups?.map( g => <Chip text={g} />)}
        </div>
      </div>

      <TextField 
        label="Name Part" 
        value={namePart}
        onChange={(_, v) => setNamePart(v)}
      />

      <PrimaryButton 
        text="Search" 
        onClick={doSearch}
      />
    </Stack>

    {
      !!allFields?.length && <>
        <h3>Field strovati: {allFields.length}</h3>
  
        <DetailsList
          items={allFields}
          columns={columns}
          layoutMode={DetailsListLayoutMode.justified}
        />
      </>
    }
  </>;
}