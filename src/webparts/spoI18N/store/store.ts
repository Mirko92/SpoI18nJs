import { create } from 'zustand'
import { Elements } from '../models/Elements';

export interface IAppStore {
  test: string; 

  selectedElements: Elements[];
  setSelectedElements: (selectedElements: Elements[]) => any;
}

export const useAppStore = create<IAppStore>((set) => ({
  test: "Valore iniziale",
  setTest: (test?: string) => {
    set(() => ({ test }));
  },

  selectedElements: [
    Elements.LISTS
  ],
  setSelectedElements: (selectedElements: Elements[]) => {
    set(() => ({ selectedElements }));
  }

}))