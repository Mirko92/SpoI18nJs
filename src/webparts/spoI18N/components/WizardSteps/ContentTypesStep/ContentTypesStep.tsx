import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import {
  Checkbox,
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  IGroup,
  PrimaryButton,
  Stack,
  TextField,
  Selection,
  SelectionMode,
  ConstrainMode
} from "@fluentui/react";
import { IContentTypeInfo } from "@pnp/sp/content-types";
import { getAllContentTypeByGroups } from "../../../../../helpers/SharepointHelpers";
import { useAppStore } from "../../../store/store";
import { Chip } from "../../../../../components/Chip/Chip";


const columns: IColumn[] = [
  { fieldName: "Name",         key: "Name",         name: "Name",        minWidth: 200, flexGrow: 1 },
  { fieldName: "Description",  key: "Description",  name: "Description", minWidth: 200, flexGrow: 2 },
  { fieldName: "Group",        key: "Group",        name: "Category",    minWidth: 200, flexGrow: 1 },

];

export function ContentTypesStep() {
  // Store
  const [
    filters, setFilters,
    contentTypes, setContentTypes,
    selectedCts, setSelectedCts
  ] = useAppStore( 
    state => ([ 
      state.contentTypesFilters, state.setContentTypesFilters,
      state.contentTypes, state.setContentTypes,
      state.selectedContentTypes, state.setSelectedContentTypes
    ])
  );

  //#region Filters and search
  const [ groupName, setGroupName ] = React.useState<string>();

  function onAddGroup(e: React.FormEvent) {
    e.preventDefault();

    if (!filters.groups?.includes(groupName)) {
      setFilters({
        ...filters,
        groups: [...(filters.groups||[]), groupName]
      });
    }

    setGroupName("");
  }

  function onRemoveGroup(groupName: string) {
    setFilters({
      ...filters,
      groups: filters.groups.filter(g => g !== groupName)
    });
  }
  
  async function doSearch() {
    const result = await getAllContentTypeByGroups(filters.groups);

    console.debug("result", result);

    setContentTypes(result);
  }
  //#endregion

  //#region Table groups managment
  const [ ctGroups, setCtGroups ] = useState<IGroup[]>();
  const [ showGrouped, setShowGrouped ] = useState<boolean>(false);

  function makeGroups() {
    const _groups = contentTypes
                      .sort( (x,y) => x.Group.localeCompare(y.Group))
                      .reduce( (acc, x, index) => {
                        const existingGroup = acc?.find( (a: IGroup) => a.key === x.Group);

                        if (!existingGroup) {
                          return [
                            ...acc,
                            { key: x.Group, name: x.Group, startIndex: index, count: 1 , level: 0}
                          ]
                        } else {
                          existingGroup.count++;
                        }

                        return acc;
                      }, [] as IGroup[]);

    setCtGroups(_groups);

    console.log("Groups: ", _groups);
  }
  //#endregion

  //#region Table selection managment
  const _selection = useMemo(() => new Selection<IContentTypeInfo>({
    onSelectionChanged: () => {
      console.log("Selection changed", _selection);
      setSelectedCts(_selection.getSelection());
    },
    getKey: (item) => item.Id.StringValue,
  }), []);
  
  function _restoreSelected() {
    selectedCts.forEach(
      si => _selection.setKeySelected(si.Id.StringValue, true, true)
    );
  }
  //#endregion

  useEffect(() => {
    if (showGrouped) {
      makeGroups();
    } else {
      setCtGroups(null);
    }
  }, [showGrouped, contentTypes]);
  
  useEffect(() => {
    if (selectedCts?.length) {
      _restoreSelected();
    }
  }, []);

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
            { filters.groups?.map( g => <Chip text={g} onRemove={onRemoveGroup} />)}
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
          <Stack horizontal horizontalAlign="space-between" verticalAlign="center" tokens={{childrenGap: 20}}>
            <h3>Content Types found: {contentTypes.length}</h3>

            <Checkbox 
              label    = "Show grouped per group"
              checked  = {showGrouped}
              onChange = {(_, g) => setShowGrouped(g)}
            />
          </Stack>
    
          <DetailsList
            items         = {contentTypes}
            columns       = {columns}
            getKey        = {(item) => item.Id.StringValue}

            groups        = {ctGroups}
            groupProps    = {{isAllGroupsCollapsed: true}}

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
