import { create } from 'zustand'
import { GameObjectType } from '../../types/games/games'

type Game = { game: GameObjectType | null }

export const useGameStore = create<Game>()(() => ({
  game: null,
}))

export const setGame = (game: GameObjectType) => useGameStore.setState({ game })
export const resetGame = () => useGameStore.setState({ game: null })
