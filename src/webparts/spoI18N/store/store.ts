import { create } from 'zustand'
import { Elements } from '../models/Elements';
import { IListInfo }        from '@pnp/sp/lists';
import { IFieldInfo }       from '@pnp/sp/fields';
import { IViewInfo }        from '@pnp/sp/views';
import { IContentTypeInfo } from '@pnp/sp/content-types';

interface IFieldsFilters {
  name?: string;
  groups?: string[];
}
export interface IAppStore {
  test: string; 

  selectedElements: Elements[];
  setSelectedElements: (selectedElements: Elements[]) => any;

  fieldsFilters: IFieldsFilters;
  setIFieldsFiters: (fieldsFilters: IFieldsFilters) => void;

  fields: IFieldInfo[];
  setFields: (fields: IFieldInfo[]) => void;

  selectedFields: IFieldInfo[];
  setSelectedFields: (fields: IFieldInfo[]) => void;

  contentTypes: IContentTypeInfo[];
  setContentTypes: (contentTypes: IContentTypeInfo[]) => void;

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

export const useAppStore = create<IAppStore>((set, get) => ({
  test: "Valore iniziale",
  setTest: (test?: string) => {
    set(() => ({ test }));
  },

  selectedElements: [
    Elements.COLUMNS,
    Elements.CONTENT_TYPES,
    Elements.LISTS,
    Elements.VIEWS
  ],
  setSelectedElements: (selectedElements: Elements[]) => {
    set(() => ({ selectedElements }));
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

  contentTypes: [],
  setContentTypes: (contentTypes: IContentTypeInfo[]) => {
    set(() => ({ contentTypes }));
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
}))