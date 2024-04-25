import { ChangeEvent, FormEvent, useState } from 'react'
import { Textarea } from '@/src/@/components/ui/textarea'
import { Label } from '@/src/@/components/ui/label'
//import { Input } from '@/src/@/components/ui/input'
import { z } from 'zod'
import GameTable from './GameTable'
import { TeamAndSeasonAttributes } from '../../../types/teams/teams'
import BulkGameForm from './BulkGameForm'
import { Button } from '@/src/@/components/ui/button'

interface FormElements extends HTMLFormControlsCollection {
  pasteArea: HTMLInputElement
}
interface PasteAreaFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

const testDate = z.string().regex(/^[a-öA-Ö]{3}\s\d{1,2}\/\d{1,2}$/)

type BulkAddGameProps = {
  teams: TeamAndSeasonAttributes[] | null
}

const BulkAddGame = ({ teams }: BulkAddGameProps) => {
  const seasonYear = '2023/2024'
  const firstYear = seasonYear.split('/')[0]
  const secondYear = seasonYear.split('/')[1]
  const [gamesList, setGamesList] = useState<string>('')
  const [pastedContent, setPastedContent] = useState<string>('')
  const lines = gamesList ? gamesList.split('\n') : []

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
      <form onSubmit={handleSubmit}>
        <Label htmlFor="pasteArea">Matcher</Label>
        <Textarea
          id="pasteArea"
          value={pastedContent}
          onChange={handleChange}
        />
        <Button type="submit">Uppdatera lista</Button>
      </form>

      <GameTable games={games} teams={teams} />
    </div>
  )
}

export default BulkAddGame
