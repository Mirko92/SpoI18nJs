import { getSP } from "../pnpjsconfig";
import "@pnp/sp/webs";
import "@pnp/sp/fields";
import "@pnp/sp/content-types";
import "@pnp/graph/sites";
import { IFieldInfo } from "@pnp/sp/fields";


export function getFieldsByGroupsAndInternalName( groupName?: string[], pattern?: string ): Promise<IFieldInfo[]> {
  let _fields = getSP().web.fields

  if (groupName || pattern) {

    const groupFilter =  Array.isArray(groupName) &&  groupName?.length > 0 
        ? groupName.map(g => `Group eq '${g}'`).join(' or ')
        : null;

    const textFilter = [
      groupFilter,
      pattern   && `substringof('${pattern}', InternalName) `
    ]
    .filter(x => !!x)
    .join(' and ');

    _fields = _fields.filter(textFilter)
  }

  return _fields.select("Title", "InternalName", "Group")();
}

export function getAllContentTypeByGroups(groupName?: string[]) {
  let _cts = getSP().web.contentTypes;

  if ( groupName?.length ) {
    const groupFilter =  groupName.map(g => `Group eq '${g}'`).join(' or ');

    _cts = _cts.filter(groupFilter)
  }
  return _cts.select("Name", "Description")();
}