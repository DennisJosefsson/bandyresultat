// import { useEffect } from 'react'

// import { useQuery } from 'react-query'
// import { compareTeams } from '../../requests/tables'

// import Spinner from '../utilitycomponents/Components/Spinner'

// import AllData from './Subcomponents/AllData'
// import DetailedData from './Subcomponents/DetailedData'
// import CompareStats from './Subcomponents/CompareStats'
// import CompareHeader from './Subcomponents/CompareHeader'
// import { CompareFormState } from '../types/teams/teams'
import { useFormContext } from 'react-hook-form'

const Compare = () => {
  const methods = useFormContext()
  // useEffect(() => {
  //   window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  // }, [])

  // const { data, isLoading, error, isSuccess } = useQuery(
  //   ['compareTeams', compObject],
  //   () => compareTeams(compObject),
  // )

  // if (isLoading) {
  //   return (
  //     <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
  //       <Spinner />
  //     </div>
  //   )
  // }

  // if (error instanceof Error && error) {
  //   if (error.message === 'nullObject') {
  //     return (
  //       <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
  //         <p className="mx-10 text-center">
  //           Någon sköt högt över mål, och alla bollar i bollkorgarna är borta.
  //           Det var nog inte meningen att det skulle länkas till denna sidan
  //           direkt, så tyvärr har vi ingen information till dig. Om du kom hit
  //           från en länk på bandyresultat.se, meddela gärna
  //           dennis@bandyresultat.se att det finns en bugg han behöver fixa.
  //         </p>
  //       </div>
  //     )
  //   }
  //   return (
  //     <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
  //       {error.message}
  //     </div>
  //   )
  // }

  // const compareData = isSuccess ? data : null
  console.log(methods.formState)
  return (
    // <>
    //   {compareData && (
    //     <div className="mx-auto flex min-h-screen max-w-7xl flex-col pt-4 font-inter text-[#011d29]">
    //       <div className="mx-2 xl:mx-0">
    //         <CompareHeader
    //           length={compareData.allData.length}
    //           seasonNames={compareData.seasonNames}
    //           link={compareData.link}
    //           compObject={compObject}
    //           compareAllGames={compareData.compareAllGames}
    //           origin={origin}
    //         />

    //         <div className="flex flex-col xl:flex-row xl:justify-between">
    //           {compareData.allData.length > 0 && (
    //             <>
    //               <div>
    //                 <AllData
    //                   allData={compareData.allData}
    //                   sortedData={compareData.sortedData}
    //                   compObject={compObject}
    //                 />
    //                 <DetailedData
    //                   categoryData={compareData.categoryData}
    //                   compObject={compObject}
    //                 />
    //               </div>

    //               <div>
    //                 <CompareStats
    //                   compObject={compObject}
    //                   firstGames={compareData.firstGames}
    //                   latestGames={compareData.latestGames}
    //                   golds={compareData.golds}
    //                   playoffs={compareData.playoffs}
    //                   allPlayoffs={compareData.allPlayoffs}
    //                   seasons={compareData.seasons}
    //                   allSeasons={compareData.allSeasons}
    //                 />
    //               </div>
    //             </>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </>
    <h2>Hello</h2>
  )
}

export default Compare
