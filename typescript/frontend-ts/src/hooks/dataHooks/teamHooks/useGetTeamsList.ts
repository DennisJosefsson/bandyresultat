import useGenderContext from '../../contextHooks/useGenderContext'
import { useGetTeams } from './useGetTeams'

export const useGetTeamsList = (teamFilter: string) => {
  const { women } = useGenderContext()
  const { data, isLoading, error } = useGetTeams()

  const teams = data
    .filter((team) => team.teamId !== 176)
    .filter((team) => team.women === women)
    .filter((team) =>
      team.name.toLowerCase().includes(teamFilter.toLowerCase()),
    )

  const unFilteredTeams = data

  return { unFilteredTeams, teams, isLoading, error }
}
