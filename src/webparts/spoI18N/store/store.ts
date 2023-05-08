import { create } from 'zustand'
import { Elements } from '../models/Elements';
import { IListInfo } from '@pnp/sp/lists';
import { IFieldInfo } from '@pnp/sp/fields';
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
}

export const useAppStore = create<IAppStore>((set) => ({
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
}))