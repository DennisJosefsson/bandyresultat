import { groupConstant } from '../../utilitycomponents/functions/constants'

import { useNavigate } from 'react-router-dom'
import { CompareFormState } from '../../types/teams/teams'
import { CompareLink } from '../../types/link/link'
import { CompareResponseObjectType } from '../../types/teams/compare'
import { useCopyToClipboard } from 'usehooks-ts'
import {
  CardTitle,
  CardHeader,
  CardDescription,
} from '@/src/@/components/ui/card'
import { Button } from '@/src/@/components/ui/button'

type CompareHeaderProps = {
  length: number
  compObject: CompareFormState | null
  link: CompareLink
  compareAllGames: CompareResponseObjectType['compareAllGames']
  seasonNames: CompareResponseObjectType['seasonNames']
  origin: string
}

const Buttons = ({
  link,
  origin,
  length,
}: {
  link: CompareLink
  origin: string | undefined
  length: number
}) => {
  const baseUrl = import.meta.env.PROD
    ? 'https://bandyresultat.se'
    : 'http://localhost:5173'
  const compareLink = `${baseUrl}/link/${link[0].linkName}`
  const navigate = useNavigate()
  const [copiedText, copy] = useCopyToClipboard()
  return (
    <div className="mb-2 flex flex-col-reverse justify-end gap-2 xl:mb-6 xl:flex-row xl:justify-end">
      {origin === 'gamesList' && (
        <Button onClick={() => navigate(-1)}>Tillbaka</Button>
      )}
      {length > 0 && (
        <Button onClick={() => copy(compareLink)} size="sm">
          {copiedText ? 'Kopierad!' : `Länk`}
        </Button>
      )}
    </div>
  )
}

const CompareHeader = ({
  length,
  compObject,
  link,
  compareAllGames,
  seasonNames,
  origin,
}: CompareHeaderProps) => {
  if (!compObject) return null

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
        <CardHeader>
          <div className="flex flex-row justify-between">
            <CardTitle className="mb-2 w-[90%] text-base font-bold md:text-lg lg:mb-4 xl:w-[36rem]">
              Lagen har inte mötts {catString} mellan {seasonNames[0].year} och{' '}
              {seasonNames[1].year}.
            </CardTitle>

            <Buttons link={link} origin={origin} length={length} />
          </div>
        </CardHeader>
      )}
      {length > 0 && (
        <CardHeader>
          {compObject.teamArray.length > 2 && (
            <div className="w-full">
              <div className="flex flex-row justify-between">
                <CardTitle className="mb-2">Inbördes möten</CardTitle>
                <Buttons link={link} origin={origin} length={length} />
              </div>

              <CardDescription>
                Möten mellan {teamString} {catString}{' '}
                {compObject.startSeason === compObject.endSeason
                  ? `säsongen ${seasonNames[0].year}`
                  : `${startSeasonName}-${endSeasonName}.`}
              </CardDescription>
            </div>
          )}
          {compObject.teamArray.length === 2 && (
            <div className="w-full">
              <div className="flex flex-row justify-between">
                <CardTitle className="mb-2">Inbördes möten</CardTitle>
                <Buttons link={link} origin={origin} length={length} />
              </div>

              <CardDescription>
                Möten mellan {teamString} {catString}{' '}
                {compObject.startSeason === compObject.endSeason
                  ? `säsongen ${seasonNames[0].year}`
                  : `${startSeasonName}-${endSeasonName}.`}
              </CardDescription>
            </div>
          )}
        </CardHeader>
      )}
    </>
  )
}

export default CompareHeader
