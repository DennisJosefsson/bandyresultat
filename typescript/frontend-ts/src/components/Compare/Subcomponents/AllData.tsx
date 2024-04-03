import { CompareResponseObjectType } from '../../types/teams/compare'
import { CompareFormState } from '../../types/teams/teams'
import AllDataTableHeader from './AllDataTableHeader'
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@/src/@/components/ui/table'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/@/components/ui/card'
import { useMediaQuery } from 'usehooks-ts'
import DataTableRow from './DataTableRow'

type AllDataProps = {
  allData: CompareResponseObjectType['allData']
  sortedData: CompareResponseObjectType['sortedData']
  compObject: CompareFormState | null
}

const AllData = ({ allData, compObject, sortedData }: AllDataProps) => {
  const matches = useMediaQuery('(min-width: 430px)')

  if (!compObject) return null

  if (compObject.teamArray.length > 2) {
    return (
      <Card className="mb-2">
        <CardHeader>
          <CardTitle>Sammanlagt</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full table-fixed">
            <AllDataTableHeader />
            <TableBody>
              {sortedData.map((team, index) => {
                return (
                  <TableRow key={`${team.team}-${index}`}>
                    <TableCell className="team">
                      {!matches ? team.lag.shortName : team.lag.casualName}
                    </TableCell>

                    <TableCell>{team.totalGames}</TableCell>
                    <TableCell>{team.totalWins}</TableCell>
                    <TableCell>{team.totalDraws}</TableCell>
                    <TableCell>{team.totalLost}</TableCell>
                    <TableCell className="hidden xs:table-cell">
                      {team.totalGoalsScored}
                    </TableCell>
                    <TableCell className="hidden xs:table-cell">
                      {team.totalGoalsConceded}
                    </TableCell>
                    <TableCell className="hidden xs:table-cell">
                      {team.totalGoalDifference}
                    </TableCell>
                    <TableCell>{team.totalPoints}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  } else
    return (
      <Card className="mb-2">
        <CardHeader>
          <CardTitle>Sammanlagt</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full table-fixed">
            <AllDataTableHeader />
            <TableBody>
              {allData.slice(1).map((team, index) => {
                return <DataTableRow key={index} team={team} />
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
}

export default AllData
