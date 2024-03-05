import { createContext, Dispatch } from 'react'

export type GenderType = boolean
export type UserType = boolean
export type MenuType = boolean
export type TeamPreference = number[]

export type UserActionType = { type: 'LOGIN' } | { type: 'LOGOUT' }
export type GenderActionType =
  | { type: 'TOGGLE' }
  | { type: 'SET'; payload: boolean }
export type MenuActionType = { type: 'TOGGLE' } | { type: 'CLOSE' }
export type FavTeamsActionType =
  | { type: 'ADD_TEAM'; teamId: number }
  | { type: 'REMOVE_TEAM'; teamId: number }
  | { type: 'CLEAR_TEAMS' }

export const GenderContext = createContext<{
  women: GenderType
  dispatch: Dispatch<GenderActionType>
} | null>(null)
export const UserContext = createContext<{
  user: UserType
  dispatch: Dispatch<UserActionType>
} | null>(null)
export const MenuContext = createContext<{
  open: MenuType
  dispatch: Dispatch<MenuActionType>
} | null>(null)
export const TeamPreferenceContext = createContext<{
  favTeams: TeamPreference
  favTeamsDispatch: Dispatch<FavTeamsActionType>
} | null>(null)
export const SeasonContext = createContext<{ seasonId: number } | null>(null)
