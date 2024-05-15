import { groupConstant } from '../../utilitycomponents/functions/constants'

import { useRouter } from '@tanstack/react-router'
import { CompareFormState } from '../../types/teams/teams'

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
  searchObject: CompareFormState | null
  link: string
  compareAllGames: CompareResponseObjectType['compareAllGames']
  seasonNames: CompareResponseObjectType['seasonNames']
  origin: string
}

const Buttons = ({
  link,
  origin,
  length,
}: {
  link: string
  origin: string | undefined
  length: number
}) => {
  const router = useRouter()
  const [copiedText, copy] = useCopyToClipboard()
  return (
    <div className="mb-2 flex flex-col-reverse justify-end gap-2 xl:mb-6 xl:flex-row xl:justify-end">
      {origin === 'gamesList' && (
        <Button onClick={() => router.history.back()} size="sm">
          Tillbaka
        </Button>
      )}
      {length > 0 && (
        <Button onClick={() => copy(link)} size="sm">
          {copiedText ? 'Kopierad!' : `Länk`}
        </Button>
      )}
    </div>
  )
}

const CompareHeader = ({
  length,
  searchObject,
  link,
  compareAllGames,
  seasonNames,
  origin,
}: CompareHeaderProps) => {
  if (!searchObject) return null

  const catStringArray = searchObject.categoryArray.map(
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
            <CardTitle>
              Lagen har inte mötts {catString} mellan {seasonNames[0].year} och{' '}
              {seasonNames[1].year}.
            </CardTitle>

            <Buttons link={link} origin={origin} length={length} />
          </div>
        </CardHeader>
      )}
      {length > 0 && (
        <CardHeader>
          {searchObject.teamArray.length > 2 && (
            <div className="w-full">
              <div className="flex flex-row justify-between">
                <CardTitle className="mb-2">Inbördes möten</CardTitle>
                <Buttons link={link} origin={origin} length={length} />
              </div>

              <CardDescription>
                Möten mellan {teamString} {catString}{' '}
                {searchObject.startSeason === searchObject.endSeason
                  ? `säsongen ${seasonNames[0].year}`
                  : `${startSeasonName}-${endSeasonName}.`}
              </CardDescription>
            </div>
          )}
          {searchObject.teamArray.length === 2 && (
            <div className="w-full">
              <div className="flex flex-row justify-between">
                <CardTitle className="mb-2">Inbördes möten</CardTitle>
                <Buttons link={link} origin={origin} length={length} />
              </div>

              <CardDescription className="text-[10px] sm:text-sm">
                Möten mellan {teamString} {catString}{' '}
                {searchObject.startSeason === searchObject.endSeason
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
