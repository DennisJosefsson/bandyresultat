import { useQuery } from 'react-query'
import { getSingleSeason } from '../../requests/seasons'
import { getSingleSeasonTable } from '../../requests/tables'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { GenderContext } from '../../contexts/contexts'
import { tableSortFunction } from '../utilitycomponents/sortFunction'
import Spinner from '../utilitycomponents/spinner'
import TableList from './TableList'
import StaticTableList from './StaticTableList'

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
  if (isLoading || isTableLoading) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        <Spinner />
      </div>
    )
  }

  if (error || tableError) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        Något gick fel.
      </div>
    )
  }

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
      <div className="mx-auto mt-4 grid place-items-center font-inter text-[#011d29]">
        <p>
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
      <div className="mx-auto mt-4 grid place-items-center font-inter font-bold text-[#011d29]">
        Inga serietabeller för denna säsong.
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
            <div className="mt-2 grid w-full grid-cols-3 justify-center gap-4 px-6 sm:px-2 md:flex md:flex-row lg:px-0">
              <div
                onClick={() => {
                  setSelectedTable('all')
                  setHomeAwayTitle('')
                }}
              >
                <div className="mb-2 max-w-[80px] cursor-pointer rounded-md bg-[#011d29] px-0.5 py-0.5 text-center text-[10px] text-white transition-all duration-150 ease-in-out hover:bg-slate-600 sm:max-w-none sm:px-1 sm:text-sm lg:px-2 lg:py-1 xl:mb-6 xl:w-[128px] xl:text-lg">
                  Alla matcher
                </div>
              </div>
              <div
                onClick={() => {
                  setSelectedTable('home')
                  setHomeAwayTitle('Hemma')
                }}
              >
                <div className="mb-2 max-w-[80px] cursor-pointer rounded-md bg-[#011d29] px-0.5 py-0.5 text-center text-[10px] text-white transition-all duration-150 ease-in-out hover:bg-slate-600 sm:max-w-none sm:px-1 sm:text-sm lg:px-2 lg:py-1 xl:mb-6 xl:w-[128px] xl:text-lg">
                  Hemmatabell
                </div>
              </div>
              <div
                onClick={() => {
                  setSelectedTable('away')
                  setHomeAwayTitle('Borta')
                }}
              >
                <div className="mb-2 max-w-[80px] cursor-pointer rounded-md bg-[#011d29] px-0.5 py-0.5 text-center text-[10px] text-white transition-all duration-150 ease-in-out hover:bg-slate-600 sm:max-w-none sm:px-1 sm:text-sm lg:px-2 lg:py-1 xl:mb-6 xl:w-[128px] xl:text-lg">
                  Bortatabell
                </div>
              </div>
            </div>

            <div>
              {regularTables.length > 0 && (
                <TableList
                  tableArray={regularTables}
                  seriesInfo={seriesInfo}
                  bonusPoints={bonusPointsArray}
                  homeAwayTitle={homeAwayTitle}
                />
              )}
              {qualificationTables.length > 0 && (
                <TableList
                  tableArray={qualificationTables}
                  seriesInfo={seriesInfo}
                  bonusPoints={bonusPointsArray}
                  homeAwayTitle={homeAwayTitle}
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
