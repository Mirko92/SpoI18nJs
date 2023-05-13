import { getSP } from "../pnpjsconfig";

import "@pnp/sp/webs";
import "@pnp/sp/fields";
import "@pnp/sp/content-types";
import "@pnp/sp/lists";
import "@pnp/sp/views";


export function getFieldsByGroupsAndInternalName( groupName?: string[], pattern?: string ) {
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

  return _fields.select("Id", "Title", "InternalName", "Group")();
}

export function getAllContentTypeByGroups(groupName?: string[]) {
  let _cts = getSP().web.contentTypes;

  if ( groupName?.length ) {
    const groupFilter =  groupName.map(g => `Group eq '${g}'`).join(' or ');

    _cts = _cts.filter(groupFilter)
  }
  return _cts.select("Id", "Name", "Description", "Group")();
}

export function getAllLists(listNames?: string[]) {
  let _lists = getSP().web.lists;

  if ( listNames?.length ) {
    const nameFilter =  listNames.map(g => `Title eq '${g}'`).join(' or ');

    _lists = _lists.filter(nameFilter)
  }

  return _lists.select("Id", "Title", "Description")();
}

export function getViews(listId: string) {
  let _views = getSP().web.lists.getById(listId).views;
  return _views();
}

export function getAvailableLocales() {
  
}
