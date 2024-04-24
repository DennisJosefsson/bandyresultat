import { Button } from '@/src/@/components/ui/button'
import {
  DialogContent,
  DialogTitle,
  DialogHeader,
} from '@/src/@/components/ui/dialog'
import { useToast } from '@/src/@/components/ui/use-toast'
import { deleteGame } from '@/src/requests/games'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Dispatch, SetStateAction } from 'react'

type DeleteDialogProps = {
  gameId: number | null
  setShowModal: Dispatch<SetStateAction<boolean>>
  setGameId: Dispatch<SetStateAction<number | null>>
}

const DeleteDialog = ({
  gameId,
  setShowModal,
  setGameId,
}: DeleteDialogProps) => {
  const { toast } = useToast()

  const client = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: ({ gameId }: { gameId: number }) => deleteGame(gameId),
    onSuccess: () => onSuccessDeleteMutation(),
    onError: (error) => onErrorFunction(error),
  })

  const onSuccessDeleteMutation = () => {
    client.invalidateQueries({ queryKey: ['singleSeasonGames'] })
    toast({
      duration: 5000,
      title: 'Match borttagen',
    })
    setGameId(null)
    setShowModal(false)
  }

  const onErrorFunction = (error: unknown) => {
    if (error instanceof AxiosError) {
      toast({
        duration: 5000,
        title: 'Fel',
        description: error.response?.data.errors,
        variant: 'destructive',
      })
    } else {
      toast({
        duration: 5000,
        title: 'Något gick fel',
        variant: 'destructive',
      })
    }
  }
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Ta bort match</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-center">Är du säker?</div>
        <div className="flex flex-row items-center justify-center gap-2">
          <Button
            variant="destructive"
            onClick={() => gameId && deleteMutation.mutate({ gameId: gameId })}
          >
            Ja, ta bort
          </Button>
          <Button
            onClick={() => {
              setGameId(null)
              setShowModal(false)
            }}
          >
            Nej, ångra
          </Button>
        </div>
      </div>
    </DialogContent>
  )
}

export default DeleteDialog
