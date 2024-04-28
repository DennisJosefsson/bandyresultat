import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react'
import { Textarea } from '@/src/@/components/ui/textarea'
import { Label } from '@/src/@/components/ui/label'

import { z } from 'zod'
import GameTable from './GameTable'
import { TeamAndSeasonAttributes } from '../../../types/teams/teams'

import { Button } from '@/src/@/components/ui/button'
import { SerieAttributes } from '@/src/components/types/series/series'
import { RadioGroup, RadioGroupItem } from '@/src/@/components/ui/radio-group'
import { sortOrder } from '@/src/components/utilitycomponents/functions/constants'
import { FormContent } from '../SeasonsList'

interface FormElements extends HTMLFormControlsCollection {
  pasteArea: HTMLInputElement
}
interface PasteAreaFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

const testDate = z.string().regex(/^[a-öA-Ö]{3}\s\d{1,2}\/\d{1,2}$/)

const categoryArray = [
  { value: 'final', label: 'Final' },
  { value: 'semi', label: 'Semi' },
  { value: 'quarter', label: 'Kvart' },
  { value: 'eight', label: 'Åttondel' },
  { value: 'regular', label: 'Grundserie' },
  { value: 'qualification', label: 'Kval' },
]

type BulkAddGameProps = {
  teams: TeamAndSeasonAttributes[] | null
  seasonId: number
  series: SerieAttributes[] | null
  seasonYear: string
  women: boolean
  setTab: Dispatch<SetStateAction<string>>
  setFormContent: Dispatch<SetStateAction<FormContent>>
}

const BulkAddGame = ({
  teams,
  seasonId,
  series,
  seasonYear,
  women,
  setTab,
  setFormContent,
}: BulkAddGameProps) => {
  const firstYear = seasonYear.split('/')[0]
  const secondYear = seasonYear.split('/')[1]
  const [gamesList, setGamesList] = useState<string>('')
  const [pastedContent, setPastedContent] = useState<string>('')
  const [category, setCategory] = useState<string>('regular')
  const [group, setGroup] = useState<string>('elitserien')
  const lines = gamesList ? gamesList.split('\n') : []

  const groupArray = series
    ?.map((serie) => {
      return { value: serie.serieGroupCode, label: serie.serieName }
    })
    .sort((a, b) => {
      if (sortOrder.indexOf(a.value) > sortOrder.indexOf(b.value)) {
        return 1
      } else if (sortOrder.indexOf(a.value) < sortOrder.indexOf(b.value)) {
        return -1
      } else {
        return 0
      }
    })

  const chunkedLines = lines?.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 5)

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [] as string[][])

  const parseDate = (dateString: string) => {
    const match = testDate.safeParse(dateString)
    if (!match.success) return 'Wrong date'
    const day = dateString.split(' ')[1].split('/')[0]
    const month = parseInt(dateString.split(' ')[1].split('/')[1])
    const date = `${month > 5 ? firstYear : secondYear}-${month.toString().padStart(2, '0')}-${day.padStart(2, '0')}`
    return date
  }

  const games = chunkedLines.map((line) => {
    return {
      date: parseDate(line[0]),
      homeTeam: line[2].trimEnd(),
      awayTeam: line[4].trimEnd(),
      seasonId: seasonId,
      category: category,
      group: group,
      women: women,
      serieId: series?.find((serie) => serie.serieGroupCode === group)?.serieId,
    }
  })

  const handleSubmit = (event: FormEvent<PasteAreaFormElement>) => {
    event.preventDefault()
    setGamesList(pastedContent)
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPastedContent(event.target.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        <RadioGroup
          value={category}
          onValueChange={setCategory}
          className="mb-4 flex flex-row gap-4"
        >
          {categoryArray.map((cat) => {
            return (
              <div key={cat.value} className="flex items-center space-x-2">
                <Label htmlFor={cat.value}>{cat.label}</Label>
                <RadioGroupItem value={cat.value} id={cat.value} />
              </div>
            )
          })}
        </RadioGroup>
        <RadioGroup
          value={group}
          onValueChange={setGroup}
          className="mb-4 flex flex-row flex-wrap gap-4"
        >
          {groupArray?.map((group) => {
            return (
              <div key={group.value} className="flex items-center space-x-2">
                <Label htmlFor={group.value}>{group.label}</Label>
                <RadioGroupItem value={group.value} id={group.value} />
              </div>
            )
          })}
        </RadioGroup>
        <Label htmlFor="pasteArea">Matcher</Label>
        <Textarea
          id="pasteArea"
          value={pastedContent}
          onChange={handleChange}
          className="mb-4"
          rows={6}
        />
        <Button type="submit">Uppdatera lista</Button>
      </form>

      <GameTable
        games={games}
        teams={teams}
        setTab={setTab}
        setFormContent={setFormContent}
      />
    </div>
  )
}

export default BulkAddGame
