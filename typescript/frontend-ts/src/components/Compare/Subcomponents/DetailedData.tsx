import { filterOpposition } from '../../utilitycomponents/functions/sortFunction'
import { groupConstant } from '../../utilitycomponents/functions/constants'
import { CompareResponseObjectType } from '../../types/teams/compare'

import { Table, TableBody } from '@/src/@/components/ui/table'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/@/components/ui/card'
import AllDataTableHeader from './AllDataTableHeader'

import DataTableRow from './DataTableRow'

import { CompareFormState } from '../../types/teams/teams'
type DetailedDataProps = {
  categoryData: CompareResponseObjectType['categoryData']
  searchObject: CompareFormState
}

const DetailedData = ({ categoryData, searchObject }: DetailedDataProps) => {
  if (!searchObject) return null
  return (
    <div>
      {categoryData.map((category) => {
        return (
          <Card key={category.category} className="mb-2">
            <CardHeader>
              <CardTitle className="text-xs md:text-sm">
                {groupConstant[category.category]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="w-full table-fixed">
                <AllDataTableHeader />
                <TableBody>
                  {searchObject.teamArray.length > 2 &&
                    filterOpposition(category.teams).map((team, index) => {
                      return <DataTableRow key={index} team={team} />
                    })}
                  {searchObject.teamArray.length === 2 &&
                    category.teams.slice(1).map((team, index) => {
                      return <DataTableRow key={index} team={team} />
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default DetailedData
