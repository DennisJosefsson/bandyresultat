import { useState } from 'react'
import { ButtonComponent } from '../../utilitycomponents/Components/ButtonComponents'
import { groupConstant } from '../../utilitycomponents/Functions/constants'
import { handleCopyClick } from '../../utilitycomponents/Functions/copyLinkFunctions'
import { useNavigate } from 'react-router-dom'

const CompareHeader = ({
  length,
  compObject,
  link,
  compareAllGames,
  seasonNames,
  origin,
}) => {
  const [isCopied, setIsCopied] = useState(false)
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
    seasonNames.length > 1
      ? seasonNames[0].seasonId < seasonNames[1].seasonId
        ? seasonNames[0].year
        : seasonNames[1].year
      : seasonNames[0].year
  const endSeasonName =
    seasonNames.length > 1
      ? seasonNames[0].seasonId > seasonNames[1].seasonId
        ? seasonNames[0].year
        : seasonNames[1].year
      : null
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
              <ButtonComponent
                clickFunctions={(event) => handleCopyClick(event)}
              >
                {isCopied ? 'Kopierad!' : `Länk: ${compareLink}`}
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
                {seasonNames.length === 1
                  ? `säsongen ${startSeasonName}`
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
                {seasonNames.length === 1
                  ? `säsongen ${startSeasonName}`
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
              <ButtonComponent
                clickFunctions={(event) =>
                  handleCopyClick(event, compareLink, setIsCopied)
                }
              >
                {isCopied ? 'Kopierad!' : `Länk: ${compareLink}`}
              </ButtonComponent>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default CompareHeader
