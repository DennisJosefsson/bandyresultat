import { useEffect } from 'react'

import { useQuery } from 'react-query'
import { compareTeams } from '../../requests/tables'

import Spinner from '../../components/utilitycomponents/Components/spinner'

import AllData from './Subcomponents/AllData'
import DetailedData from './Subcomponents/DetailedData'
import CompareStats from './Subcomponents/CompareStats'
import CompareHeader from './Subcomponents/CompareHeader'

const Compare = ({ compObject, origin }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const { data, isLoading, error } = useQuery(
    ['compareTeams', compObject],
    () => compareTeams(compObject),
  )

  if (isLoading) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        Något gick fel.
      </div>
    )
  }

  if (data.success === false) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        <p className="mx-10 text-center">
          Någon sköt högt över mål, och alla bollar i bollkorgarna är borta. Det
          var nog inte meningen att det skulle länkas till denna sidan direkt,
          så tyvärr har vi ingen information till dig. Om du kom hit från en
          länk på bandyresultat.se, meddela gärna dennis@bandyresultat.se att
          det finns en bugg han behöver fixa.
        </p>
      </div>
    )
  }

  const {
    categoryData,
    allData,
    seasons,
    playoffs,
    allSeasons,
    allPlayoffs,
    golds,
    firstGames,
    latestGames,
    compareAllGames,
    seasonNames,
    link,
  } = data

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col pt-4 font-inter text-[#011d29]">
      <div className="mx-2 xl:mx-0">
        <CompareHeader
          length={allData.length}
          seasonNames={seasonNames}
          link={link}
          compObject={compObject}
          compareAllGames={compareAllGames}
          origin={origin}
        />

        <div className="flex flex-col xl:flex-row xl:justify-between">
          {allData.length > 0 && (
            <>
              <div>
                <AllData allData={allData} compObject={compObject} />
                <DetailedData
                  categoryData={categoryData}
                  compObject={compObject}
                />
              </div>

              <div>
                <CompareStats
                  compObject={compObject}
                  firstGames={firstGames}
                  latestGames={latestGames}
                  golds={golds}
                  playoffs={playoffs}
                  allPlayoffs={allPlayoffs}
                  seasons={seasons}
                  allSeasons={allSeasons}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Compare
