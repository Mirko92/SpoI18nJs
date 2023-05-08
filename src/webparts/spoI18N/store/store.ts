import { create } from 'zustand'
import { Elements } from '../models/Elements';
import { IListInfo }        from '@pnp/sp/lists';
import { IFieldInfo }       from '@pnp/sp/fields';
import { IViewInfo }        from '@pnp/sp/views';
import { IContentTypeInfo } from '@pnp/sp/content-types';

export interface IAppStore {
  test: string; 

  selectedElements: Elements[];
  setSelectedElements: (selectedElements: Elements[]) => any;

  columns: IFieldInfo[];
  setColumns: (columns: IFieldInfo[]) => void;

  contentTypes: IContentTypeInfo[];
  setContentTypes: (contentTypes: IContentTypeInfo[]) => void;

  allLists: IListInfo[];
  setAllLists: (lists: IListInfo[]) => void;

  selectedLists: IListInfo[];
  setSelectedLists: (lists: IListInfo[]) => void;

  selectedViews: IViewInfo[];
  isSelected: (viewId: string) => boolean;
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

  columns: [],
  setColumns: (columns: IFieldInfo[]) => {
    set(() => ({ columns }));
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

  selectedViews: [],
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