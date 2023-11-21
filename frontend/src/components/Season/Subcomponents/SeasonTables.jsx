import { useQuery } from 'react-query'
import { getSingleSeason } from '../../../requests/seasons'
import { getSingleSeasonTable } from '../../../requests/tables'
import { Link } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { GenderContext } from '../../../contexts/contexts'
import { tableSortFunction } from '../../utilitycomponents/Functions/sortFunction'
import LoadingOrError from '../../utilitycomponents/Components/LoadingOrError'
import TableList from './TablesSubComponents/TableList'
import StaticTableList from './TablesSubComponents/StaticTableList'
import SeasonTablesButtonList from './TablesSubComponents/SeasonTablesButtonList'

const SeasonTables = ({ seasonId }) => {
  const { women } = useContext(GenderContext)
  const [selectedTable, setSelectedTable] = useState('all')
  const [homeAwayTitle, setHomeAwayTitle] = useState('')
  const {
    data: season,
    isLoading,
    error,
  } = useQuery(['singleSeason', seasonId], () => getSingleSeason(seasonId))
  const {
    data,
    isLoading: isTableLoading,
    error: tableError,
  } = useQuery(['singleSeasonTable', seasonId], () =>
    getSingleSeasonTable(seasonId),
  )

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  if (isLoading || isTableLoading || error || tableError)
    return (
      <LoadingOrError
        isLoading={isLoading || isTableLoading}
        error={error || tableError}
      />
    )

  if (data?.success === 'false' || season?.success === 'false') {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        {data.message}
      </div>
    )
  }

  let regTables
  switch (selectedTable) {
    case 'all':
      regTables = data.tabell.filter((table) => table.women === women)
      break
    case 'home':
      regTables = data.hemmaTabell.filter((table) => table.women === women)
      break
    case 'away':
      regTables = data.bortaTabell.filter((table) => table.women === women)
      break
  }

  const unsortedRegularTables = regTables.filter(
    (table) => table.category === 'regular',
  )
  const unsortedQualificationTables = regTables.filter(
    (table) => table.category === 'qualification',
  )

  const regularTables = tableSortFunction(unsortedRegularTables)
  const qualificationTables = tableSortFunction(unsortedQualificationTables)

  const seriesInfo = season.find((season) => season.women === women)
    ? season.find((season) => season.women === women).series
    : []

  const seasonTables = season.find((season) => season.women === women)
    ? season.find((season) => season.women === women).tables
    : []

  if (women && seasonId < 1973) {
    return (
      <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-sm font-bold text-[#011d29] md:text-base">
        <p className="mx-10 text-center">
          Första säsongen för damernas högsta serie var{' '}
          <Link to="/season/1973" className="font-bold">
            1972/73
          </Link>
          .
        </p>
      </div>
    )
  }

  if (unsortedRegularTables.length === 0 && seasonTables.length === 0) {
    return (
      <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-sm font-bold text-[#011d29] md:text-base">
        <p className="mx-10 text-center">
          Inga serietabeller för denna säsong.
        </p>
      </div>
    )
  }

  const womensSeason = season.filter((season) => season.women === true)

  const bonusPointsArray = seriesInfo.map((serie) => {
    return {
      group: serie.serieGroupCode,
      bonusPoints: JSON.parse(serie.bonusPoints),
    }
  })

  return (
    <div>
      <div>
        {seasonId === 2025 && (
          <div className="mx-auto grid place-items-center font-inter text-[#011d29]">
            <p>Inga resultat än.</p>
          </div>
        )}

        {seasonTables.length === 0 && seasonId < 2025 && (
          <div>
            <SeasonTablesButtonList
              setHomeAwayTitle={setHomeAwayTitle}
              setSelectedTable={setSelectedTable}
            />

            <div>
              {regularTables.length > 0 && (
                <TableList
                  tableArray={regularTables}
                  seriesInfo={seriesInfo}
                  bonusPoints={bonusPointsArray}
                  homeAwayTitle={homeAwayTitle}
                  selectedTable={selectedTable}
                />
              )}
              {qualificationTables.length > 0 && (
                <TableList
                  tableArray={qualificationTables}
                  seriesInfo={seriesInfo}
                  bonusPoints={bonusPointsArray}
                  homeAwayTitle={homeAwayTitle}
                  selectedTable={selectedTable}
                />
              )}
            </div>
          </div>
        )}
        {seasonTables.length > 0 && (
          <div>
            <StaticTableList
              tableArray={seasonTables.filter(
                (team) => team.group === 'Div1Norr',
              )}
              seriesInfo={seriesInfo}
              teams={womensSeason[0].teams}
              serieName="Division 1 Norra"
            />
            <StaticTableList
              tableArray={seasonTables.filter(
                (team) => team.group === 'Div1Syd',
              )}
              seriesInfo={seriesInfo}
              teams={womensSeason[0].teams}
              serieName="Division 1 Södra"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default SeasonTables
