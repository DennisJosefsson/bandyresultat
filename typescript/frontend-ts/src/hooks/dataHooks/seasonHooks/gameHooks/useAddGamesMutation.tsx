import { useToast } from '@/src/@/components/ui/use-toast'
import { FormContent } from '@/src/components/Dashboard/Subcomponents/SeasonsList'
import { postBulkGames } from '@/src/requests/games'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Dispatch, SetStateAction } from 'react'

export const useAddGamesMutation = (
  setTab: Dispatch<SetStateAction<string>>,
  setFormContent: Dispatch<SetStateAction<FormContent>>,
) => {
  const { toast } = useToast()
  const mutation = useMutation({
    mutationFn: postBulkGames,
    onSuccess: () => onMutationSuccess(),
    onError: (error) => onMutationError(error),
  })

  const onMutationSuccess = () => {
    setTab('sections')
    setFormContent(null)
    toast({
      duration: 2500,
      title: 'Matcher inlagda',
    })
  }

  const onMutationError = (error: unknown) => {
    if (error instanceof AxiosError) {
      toast({
        duration: 2500,
        title: 'Något gick fel',
        description: <p>{error.response?.data.errors}</p>,
        variant: 'destructive',
      })
    } else {
      toast({
        duration: 2500,
        title: 'Något gick fel',
        variant: 'destructive',
      })
    }
  }

  return mutation
}
