import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/@/components/ui/card'
import { StreakType } from '@/src/components/types/teams/teams'
import { ReactNode } from 'react'
import Date from '@/src/components/utilitycomponents/Components/Date'

const StreakComponent = ({ children }: { children: ReactNode }) => {
  return <Card className="mb-2">{children}</Card>
}

function Title({ children }: { children: ReactNode }) {
  return (
    <CardHeader>
      <CardTitle>{children}</CardTitle>
    </CardHeader>
  )
}

function Content({ streak, limit }: { streak: StreakType[]; limit: number }) {
  if (
    !streak ||
    streak.filter((streak) => streak.game_count > limit).length === 0
  )
    return null

  const renderStreak = streak.filter((streak) => streak.game_count > limit)

  return (
    <CardContent className="text-[10px] xxs:text-xs md:p-2 lg:mr-0 lg:text-sm">
      <div>
        {renderStreak.map((streak, index) => {
          return (
            <div
              key={`${streak.start_date}-${index}`}
              className="mb-1 flex flex-row justify-between rounded bg-muted-foreground/20 px-3 py-1"
            >
              <div>
                <Date>{streak.start_date}</Date> -{' '}
                <Date>{streak.end_date}</Date>
              </div>
              <div>{streak.game_count} matcher</div>
            </div>
          )
        })}
      </div>
    </CardContent>
  )
}

StreakComponent.Title = Title
StreakComponent.Content = Content

export default StreakComponent
