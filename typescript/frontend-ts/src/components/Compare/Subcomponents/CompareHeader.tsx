import { ButtonComponent } from '../../utilitycomponents/Components/ButtonComponents'
import { groupConstant } from '../../utilitycomponents/functions/constants'

import { useNavigate } from 'react-router-dom'
import { CompareFormState } from '../../types/teams/teams'
import { CompareLink } from '../../types/link/link'
import { CompareResponseObjectType } from '../../types/teams/compare'
import { useCopyToClipboard } from 'usehooks-ts'

type CompareHeaderProps = {
  length: number
  compObject: CompareFormState
  link: CompareLink
  compareAllGames: CompareResponseObjectType['compareAllGames']
  seasonNames: CompareResponseObjectType['seasonNames']
  origin: string
}

const CompareHeader = ({
  length,
  compObject,
  link,
  compareAllGames,
  seasonNames,
  origin,
}: CompareHeaderProps) => {
  const [copiedText, copy] = useCopyToClipboard()

  const navigate = useNavigate()

  const baseUrl = import.meta.env.PROD
    ? 'https://bandyresultat.se'
    : 'http://localhost:5173'
  const compareLink = `${baseUrl}/link/${link[0].linkName}`

  const catStringArray = compObject.categoryArray.map(
    (cat) => groupConstant[cat],
  )

  let catString

  if (catStringArray.length === 1) {
    catString = 'i ' + catStringArray[0] + ','
  } else if (catStringArray.length === 6) {
    catString = ''
  } else {
    const last = catStringArray.pop()
    catString = 'i ' + catStringArray.join(', ') + ' och ' + last + ','
  }

  const teamStringArray = [
    ...new Set(compareAllGames.map((team) => team.lag.casualName)),
  ]

  const lastTeam = teamStringArray.pop()
  const teamString = teamStringArray.join(', ') + ' och ' + lastTeam

  const startSeasonName =
    seasonNames[0].seasonId < seasonNames[1].seasonId
      ? seasonNames[0].year
      : seasonNames[1].year
  const endSeasonName =
    seasonNames[0].seasonId > seasonNames[1].seasonId
      ? seasonNames[0].year
      : seasonNames[1].year
  return (
    <>
      {length === 0 && (
        <div className="flex flex-row justify-between xl:mx-0">
          <div>
            <p className="mb-2 w-[90%] text-base font-bold md:text-lg lg:mb-4 xl:w-[36rem]">
              Lagen har inte mötts {catString} mellan {seasonNames[0].year} och{' '}
              {seasonNames[1].year}.
            </p>
          </div>
          <div className="mb-2 flex flex-col-reverse justify-end gap-2 xl:mb-6 xl:flex-row xl:justify-end">
            {origin === 'gamesList' && (
              <ButtonComponent clickFunctions={() => navigate(-1)}>
                Tillbaka
              </ButtonComponent>
            )}
            {length > 0 && (
              <ButtonComponent clickFunctions={() => copy(compareLink)}>
                {copiedText ? 'Kopierad!' : `Länk: ${compareLink}`}
              </ButtonComponent>
            )}
          </div>
        </div>
      )}
      {length > 0 && (
        <div className="flex flex-row justify-between xl:mx-0">
          {compObject.teamArray.length > 2 && (
            <div className="w-full">
              <h2 className="mb-2 text-base font-bold md:text-xl xl:text-2xl">
                Inbördes möten
              </h2>
              <p className="mb-2 w-[90%] text-xs font-bold md:text-sm lg:mb-4 xl:w-[36rem]">
                Möten mellan {teamString} {catString}{' '}
                {compObject.startSeason === compObject.endSeason
                  ? `säsongen ${seasonNames[0].year}`
                  : `${startSeasonName}-${endSeasonName}.`}
              </p>
            </div>
          )}
          {compObject.teamArray.length === 2 && (
            <div className="w-full">
              <h2 className="mb-2 text-base font-bold md:text-xl xl:text-2xl">
                Inbördes möten
              </h2>
              <p className="mb-2 w-[90%] text-xs font-bold md:text-sm lg:mb-4 xl:w-[36rem]">
                Möten mellan {teamString} {catString}{' '}
                {compObject.startSeason === compObject.endSeason
                  ? `säsongen ${seasonNames[0].year}`
                  : `${startSeasonName}-${endSeasonName}.`}
              </p>
            </div>
          )}
          <div className="mb-2 flex flex-col-reverse justify-end gap-2 xl:mb-6 xl:h-9 xl:flex-row xl:justify-end">
            {origin === 'gamesList' && (
              <ButtonComponent clickFunctions={() => navigate(-1)}>
                Tillbaka
              </ButtonComponent>
            )}
            {length > 0 && (
              <ButtonComponent clickFunctions={() => copy(compareLink)}>
                {copiedText ? 'Kopierad!' : `Länk: ${compareLink}`}
              </ButtonComponent>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default CompareHeader
