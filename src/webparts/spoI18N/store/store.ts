import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { IListInfo }        from '@pnp/sp/lists';
import { IFieldInfo }       from '@pnp/sp/fields';
import { IViewInfo }        from '@pnp/sp/views';
import { IContentTypeInfo } from '@pnp/sp/content-types';

interface IFieldsFilters {
  name?: string;
  groups?: string[];
}

interface IContentTypeFilters {
  groups?: string[]; 
}

interface IListsFilters {
  lists?: string[];
}
export interface IAppStore {
  locale: string; 
  setLocale: (locale: string) => void;

  fieldsFilters: IFieldsFilters;
  setIFieldsFiters: (fieldsFilters: IFieldsFilters) => void;

  fields: IFieldInfo[];
  setFields: (fields: IFieldInfo[]) => void;

  selectedFields: IFieldInfo[];
  setSelectedFields: (fields: IFieldInfo[]) => void;

  contentTypesFilters: IContentTypeFilters;
  setContentTypesFilters: (contentTypesFilters: IContentTypeFilters) => void;

  contentTypes: IContentTypeInfo[];
  setContentTypes: (contentTypes: IContentTypeInfo[]) => void;
  
  selectedContentTypes: IContentTypeInfo[];
  setSelectedContentTypes: (selectedContentTypes: IContentTypeInfo[]) => void;

  listsFilters: IListsFilters;
  setListsFilters: (setListsFilters: IListsFilters) => void;

  allLists: IListInfo[];
  setAllLists: (lists: IListInfo[]) => void;

  selectedLists: IListInfo[];
  setSelectedLists: (lists: IListInfo[]) => void;

  views: Map<string, IViewInfo[]>;
  setViews: (listId: string, views: IViewInfo[]) => void;

  selectedViews: IViewInfo[];
  toggleAllViews: () => void;
  isSelected: (viewId: string) => boolean;
  isAllSelected: (listId?: string) => boolean;
  toggleView: (view: IViewInfo) => void;
}

export const useAppStore = create<IAppStore>()(devtools((set, get) => ({
  locale: "",
  setLocale: (locale: string) => {
    set({locale});
  },

  fieldsFilters: {},
  setIFieldsFiters: (fieldsFilters: IFieldsFilters) => {
    set(() => ({ fieldsFilters }));
  },

  fields: [],
  setFields: (fields: IFieldInfo[]) => {
    set(() => ({ fields }));
  },

  selectedFields: [],
  setSelectedFields: (selectedFields: IFieldInfo[]) => {
    set(() => ({ selectedFields }));
  },

  
  contentTypesFilters: {},
  setContentTypesFilters: (contentTypesFilters: IContentTypeFilters) => {
    set({contentTypesFilters})
  },

  contentTypes: [],
  setContentTypes: (contentTypes: IContentTypeInfo[]) => {
    set(() => ({ contentTypes }));
  },

  selectedContentTypes: [],
  setSelectedContentTypes: (selectedContentTypes: IContentTypeInfo[]) => {
    set(() => ({ selectedContentTypes }));
  },

  listsFilters: {},
  setListsFilters: (listsFilters: IListsFilters) => {
    set(() => ({listsFilters}))
  },

  allLists: [],
  setAllLists: (allLists: IListInfo[]) => {
    set(() => ({ allLists }));
  },

  selectedLists: [],
  setSelectedLists: (selectedLists: IListInfo[]) => {
    set(() => ({ selectedLists }));
  },

  views: new Map(),
  setViews: (listId: string, newValue: IViewInfo[]) => {
    set(state => {
      const views = state.views.set(listId, newValue);
      return { views }
    });
  },

  selectedViews: [],
  isAllSelected: (listId?: string) => {
    const { views, selectedViews } = get();
    const selectedIds = selectedViews.map(sv => sv.Id);

    if (listId) {
      return views.get(listId)
                  ?.every(lv => selectedIds.includes(lv.Id));
    } else {
      return selectedIds?.length === [...views.values()]?.flat()?.length;
    }
  },
  toggleAllViews: () => {
    set( ({views, selectedViews}) => {
      const allViews = [...views.values()].flat();

      if (allViews?.length === selectedViews?.length) {
        return { selectedViews: [] };
      } else {
        return {
          selectedViews: [...views.values()].flat()
        }
      }
    });
  },
  toggleView: (view: IViewInfo) => {
    console.log("Selected View info: ", view);
    set(state => {
      if (state.selectedViews?.findIndex(v => v.Id === view.Id) > -1) {
        return { selectedViews: state.selectedViews.filter(v => v.Id !== view.Id) }; // Remove
      } else {
        return { selectedViews: [ ...state.selectedViews, view ] }; // Add
      }
    })
  },
  isSelected: (viewId: string) => {
    return get().selectedViews?.findIndex(v => v.Id === viewId) > -1;
  }
})));