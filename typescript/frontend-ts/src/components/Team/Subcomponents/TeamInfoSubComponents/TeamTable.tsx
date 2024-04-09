import { SingleTeamTable } from '../../../types/tables/tables'

import {
  groupConstant,
  sortOrder,
} from '../../../utilitycomponents/functions/constants'
import { Table, TableBody } from '@/src/@/components/ui/table'
import TeamTableHeader from './TableComponents/TableHeader'
import TeamTableRow from './TableComponents/TeamTableDataRow'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/@/components/ui/card'

type TeamTableProps = SingleTeamTable

const TeamTable = ({
  tabeller,
  season = '',
}: {
  tabeller: TeamTableProps[]
  season?: string
}) => {
  const sortedTables = tabeller.sort((a, b) => {
    if (sortOrder.indexOf(a.category) > sortOrder.indexOf(b.category)) {
      return 1
    }
    if (sortOrder.indexOf(a.category) < sortOrder.indexOf(b.category)) {
      return -1
    } else {
      return 0
    }
  })
  return (
    <div className="mb-6">
      {sortedTables.map((category, index) => {
        return (
          <Card key={category.category} className="mb-2 sm:mb-4 md:mb-6">
            <CardHeader>
              <CardTitle className="text-sm md:text-base">
                {`${groupConstant[category.category]} ${season}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="w-full table-fixed">
                <TeamTableHeader />
                <TableBody>
                  <TeamTableRow category={category} key={index} />
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default TeamTable
