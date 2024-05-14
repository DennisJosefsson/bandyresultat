import { create } from 'zustand'
import { CompareFormState } from '../../types/teams/teams'

type Compare = {
  compare: CompareFormState
  set: (compareObject: CompareFormState) => void
  setTeamArray: (array: number[]) => void
  setCategoryArray: (array: string[]) => void
  setStartSeason: (season: string) => void
  setEndSeason: (season: string) => void
  setWomen: (women: boolean) => void
}

const categoryArray = [
  'qualification',
  'regular',
  'eight',
  'quarter',
  'semi',
  'final',
]
const initialState = {
  teamArray: [],
  categoryArray: categoryArray,
  startSeason: '',
  endSeason: '',
  women: false,
}

export const useCompareStore = create<Compare>()((set) => ({
  compare: initialState,
  set: (compareObject: CompareFormState) => set({ compare: compareObject }),
  reset: () => set({ compare: initialState }),
  setTeamArray: (array: number[]) =>
    set((state) => ({ compare: { ...state.compare, teamArray: array } })),
  setCategoryArray: (array: string[]) =>
    set((state) => ({ compare: { ...state.compare, categoryArray: array } })),
  setStartSeason: (season: string) =>
    set((state) => ({ compare: { ...state.compare, startSeason: season } })),
  setEndSeason: (season: string) =>
    set((state) => ({ compare: { ...state.compare, endSeason: season } })),
  setWomen: (women: boolean) =>
    set((state) => ({ compare: { ...state.compare, women: women } })),
}))
