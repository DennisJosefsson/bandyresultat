import { useState } from 'react'

import {
  DataError,
  Loading,
} from '../../utilitycomponents/Components/LoadingOrError'
import TableList from './TablesSubComponents/TableList'

import SeasonTablesButtonList from './TablesSubComponents/SeasonTablesButtonList'
import useGenderContext from '../../../hooks/contextHooks/useGenderContext'
import useScrollTo from '../../../hooks/domHooks/useScrollTo'
import { useGetFirstAndLastSeason } from '../../../hooks/dataHooks/seasonHooks/useGetFirstAndLastSeason'
import { useGetSingleSeasonTables } from '../../../hooks/dataHooks/seasonHooks/tableHooks/useGetSingleSeasonTables'
import { useGetSingleSeason } from '../../../hooks/dataHooks/seasonHooks/useGetSingleSeason'
import { NoWomenSeason } from '../../utilitycomponents/Components/NoWomenSeason'
import StaticTables from './TablesSubComponents/StaticTables'
import useSeasonContext from '../../../hooks/contextHooks/useSeasonContext'

const SeasonTables = () => {
  const { seasonId } = useSeasonContext()
  const { lastSeason } = useGetFirstAndLastSeason()
  const { women } = useGenderContext()
  const [selectedTable, setSelectedTable] = useState<string>('all')
  const [homeAwayTitle, setHomeAwayTitle] = useState<string>('')
  const season = useGetSingleSeason(seasonId)
  const tables = useGetSingleSeasonTables(seasonId, selectedTable)

  useScrollTo()

  if (season.seasonData && tables.tableData) {
    if (women && seasonId < 1973) {
      return <NoWomenSeason />
    }

    if (seasonId < 1930) {
      return (
        <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-sm font-bold text-foreground md:text-base">
          <p className="mx-10 text-center">
            Inga serietabeller för denna säsong.
          </p>
        </div>
      )
    }

    return (
      <div>
        <div>
          {season.seasonData.tableLength === 0 && seasonId <= lastSeason && (
            <div>
              <SeasonTablesButtonList
                setHomeAwayTitle={setHomeAwayTitle}
                setSelectedTable={setSelectedTable}
                table={selectedTable}
              />

              <div>
                {tables.tableData.regularTables.length > 0 &&
                  season.seasonData.seriesInfo && (
                    <TableList
                      tableArray={tables.tableData.regularTables}
                      seriesInfo={season.seasonData.seriesInfo}
                      homeAwayTitle={homeAwayTitle}
                      selectedTable={selectedTable}
                    />
                  )}
                {tables.tableData.qualificationTables.length > 0 &&
                  season.seasonData.seriesInfo && (
                    <TableList
                      tableArray={tables.tableData.qualificationTables}
                      seriesInfo={season.seasonData.seriesInfo}
                      homeAwayTitle={homeAwayTitle}
                      selectedTable={selectedTable}
                    />
                  )}
              </div>
            </div>
          )}
          {season.seasonData.tableLength &&
          season.seasonData.tableLength > 0 &&
          season.seasonData.seasonTables &&
          season.seasonData.seriesInfo &&
          season.seasonData.womensSeason ? (
            <div>
              <StaticTables
                tableArray={season.seasonData.seasonTables}
                seriesInfo={season.seasonData.seriesInfo}
              />
            </div>
          ) : null}
        </div>
      </div>
    )
  }

  if (season.error || tables.error) return <DataError />

  if (season.isLoading || tables.isLoading) return <Loading />
}

export default SeasonTables
