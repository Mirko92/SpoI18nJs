import * as React from "react";
import { FormEvent, useEffect, useMemo, useState } from "react";
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
  ConstrainMode,
} from "@fluentui/react";

// import {
//   TableBody,
//   TableCell,
//   TableRow,
//   Table,
//   TableHeader,
//   TableHeaderCell,
//   TableCellLayout,
// } from "@fluentui/react-components";
import { IFieldInfo } from "@pnp/sp/fields";
import { useAppStore } from "../../../store/store";
import { getFieldsByGroupsAndInternalName } from "../../../../../helpers/SharepointHelpers";
import { Chip } from "../../../../../components/Chip/Chip";


const tableColumns: IColumn[] = [
  { fieldName: "Title",         key: "Title",         name: "Title",        minWidth: 100, flexGrow: 1, targetWidthProportion: 1 },
  { fieldName: "InternalName",  key: "InternalName",  name: "InternalName", minWidth: 100, flexGrow: 1, targetWidthProportion: 1 },
  { fieldName: "Group",         key: "Group",         name: "Group",        minWidth: 100, flexGrow: 1, targetWidthProportion: 1 },
];


export function ColumnsStep() {
  // Store
  const [ 
    filters,setFilters,
    fields, setFields, 
    selectedFields, setSelectedFields,
   ] = useAppStore( 
    state => [ 
      state.fieldsFilters,  state.setIFieldsFiters,
      state.fields,         state.setFields, 
      state.selectedFields, state.setSelectedFields 
    ]
  );
  
  //#region Filters and search

  // Search form
  const [ groupName, setGroupName   ] = useState<string>();

  function setNameFilter(name: string) {
    setFilters({
      ...filters,
      name
    });
  }
  /**
   * Add a group to filters
   */
  function onAddGroup(e: FormEvent) {
    e.preventDefault();

    if (!filters.groups?.includes(groupName)) {
      setFilters({
        ...filters,
        groups: [...(filters.groups||[]), groupName]
      });
    }

    setGroupName("");
    
  }

  /**
   * Remove a group from filters
   */
  function onRemoveGroup(groupName: string) {
    setFilters({
      ...filters,
      groups: filters.groups.filter(g => g !== groupName)
    });
  }
  
  /**
   * Perform query to retrieve Fields from SPO
   */
  async function doSearch() {
    const result = await getFieldsByGroupsAndInternalName(
      filters.groups, filters.name
    );

    setFields(result);
    _selection.setAllSelected(true);
  }

  //#endregion

  //#region Table groups managment
  const [ columnGroups, setColumnGroups ] = useState<IGroup[]>();
  const [ showGrouped, setShowGrouped ] = useState<boolean>(false);

  function makeGroups() {
    const _groups = fields
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

    setColumnGroups(_groups);

    console.log("Groups: ", _groups);
  }
  //#endregion

  //#region Table selection managment
  const _selection = useMemo(() => new Selection<IFieldInfo>({
    onSelectionChanged: () => {
      console.log("Selection changed", _selection);
      setSelectedFields(_selection.getSelection());
    },
    getKey: (item) => item.Id,
  }), []);
  
  function _restoreSelected() {
    selectedFields.forEach(
      si => _selection.setKeySelected(si.Id, true, true)
    );
  }
  //#endregion

  useEffect(() => {
    if (showGrouped) {
      makeGroups();
    } else {
      setColumnGroups(null);
    }
  }, [showGrouped, fields]);

  useEffect(() => {
    if (selectedFields?.length) {
      _restoreSelected();
    }
  }, []);

  return <Stack.Item align="stretch">
    <Stack tokens={{childrenGap: 20}} horizontalAlign="stretch">

      <div>
        <form onSubmit={onAddGroup} >
          <TextField 
            label="Group Name"
            value={groupName}
            onChange={(_, v) => setGroupName(v)} 
            description="Press 'enter' to filter fields by groups!"
          />
        </form>

        <Stack tokens={{childrenGap: 10}} horizontal>
          { filters.groups?.map( g => <Chip text={g} onRemove={onRemoveGroup} />)}
        </Stack>
      </div>

      <TextField 
        label="Filter Name" 
        value={filters.name}
        onChange={(_, v) => setNameFilter(v)}
        description="This filter is case sensitive! It'll be used as a 'contains' query."
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
      !!fields?.length && <>
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center" tokens={{childrenGap: 20}}>
          <h3>Fields found: {fields.length}</h3>

          <Checkbox 
            label    = "Show grouped per group"
            checked  = {showGrouped}
            onChange = {(_, g) => setShowGrouped(g)}
          />
        </Stack>
  
        <div>
          {/* <Table size="small" aria-label="Table with small size">
            <TableHeader>
              <TableRow>
                {tableColumns.map((column) => (
                  <TableHeaderCell key={column.key}>
                    {column.name}
                  </TableHeaderCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((item) => (

                <TableRow key={item.Id}>

                  <TableCell>
                    <TableCellLayout>
                      {item.Title}
                    </TableCellLayout>
                  </TableCell>

                  <TableCell>
                    <TableCellLayout>
                      {item.InternalName}
                    </TableCellLayout>
                  </TableCell>

                  <TableCell>
                    {item.Group}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}
          <DetailsList
            items         = {fields}
            columns       = {tableColumns}
            getKey        = {(item) => item.Id}

            groups        = {columnGroups}
            groupProps    = {{isAllGroupsCollapsed: true}}

            selection     = {_selection as any}
            selectionMode = {SelectionMode.multiple}
            selectionPreservedOnEmptyClick

            compact
            layoutMode    = {DetailsListLayoutMode.fixedColumns}
            constrainMode = {ConstrainMode.horizontalConstrained}
          />
        </div>
      </>
    }
  </Stack.Item>;
}