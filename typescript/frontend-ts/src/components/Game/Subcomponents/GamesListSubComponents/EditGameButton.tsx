import { Button } from '@/src/@/components/ui/button'
import { GameObjectType } from '@/src/components/types/games/games'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/@/components/ui/dropdown-menu'

import useGenderContext from '@/src/hooks/contextHooks/useGenderContext'
import useSeasonContext from '@/src/hooks/contextHooks/useSeasonContext'
import GameForm from '../GameForm'
import { useGamesSingleSeason } from '@/src/hooks/dataHooks/seasonHooks/gameHooks/useGamesSingleSeason'
import { Dialog } from '@/src/@/components/ui/dialog'
import DeleteDialog from './DeleteDialog'
import { setGame } from '../../zustand/gameStore'

type EditGameButtonProps = {
  game: GameObjectType
}

const EditGameButton = ({ game }: EditGameButtonProps) => {
  const { seasonId } = useSeasonContext()
  const { women } = useGenderContext()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [gameId, setGameId] = useState<number | null>(null)
  const { genderSeason } = useGamesSingleSeason(seasonId)

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            onClick={() => {
              setGame(game)
              setShowModal(true)
            }}
            size="icon"
          >
            <DotsVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setGame(game)
              setShowModal(true)
            }}
          >
            Ändra
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              game.gameId && setGameId(game.gameId)
              setShowDeleteModal(true)
            }}
          >
            Ta bort
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {showModal ? (
        <>
          <GameForm
            women={women}
            season={genderSeason}
            setShowModal={setShowModal}
          />
        </>
      ) : null}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        {gameId ? (
          <DeleteDialog
            gameId={gameId}
            setShowModal={setShowDeleteModal}
            setGameId={setGameId}
          />
        ) : null}
      </Dialog>
    </div>
  )
}

export default EditGameButton
