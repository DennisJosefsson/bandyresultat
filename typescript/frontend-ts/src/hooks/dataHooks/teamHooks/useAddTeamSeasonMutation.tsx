import { useToast } from '@/src/@/components/ui/use-toast'
import { FormContent } from '@/src/components/Dashboard/Subcomponents/SeasonsList'
import { TeamSeasonAttributes } from '@/src/components/types/teams/teams'
import { postTeamSeason } from '@/src/requests/teamSeason'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'

export const useAddTeamSeasonMutation = (
  setTab: Dispatch<SetStateAction<string>>,
  setFormContent: Dispatch<SetStateAction<FormContent>>,
  setTeamSeasonData: Dispatch<SetStateAction<TeamSeasonAttributes[] | null>>,
) => {
  const { toast } = useToast()
  const mutation = useMutation({
    mutationFn: postTeamSeason,
    onSuccess: () => onMutationSuccess(),
    onError: () => onMutationError(),
  })

  const queryClient = useQueryClient()

  const onMutationSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['singleSeason'] })
    toast({
      duration: 5000,
      title: 'Lag inlagda/uppdaterade',
    })

    setTeamSeasonData(null)
    setTab('sections')
    setFormContent(null)
  }

  const onMutationError = () => {
    toast({
      duration: 5000,
      title: 'Lag inlagda/uppdaterade',
      variant: 'destructive',
    })
  }

  return mutation
}
