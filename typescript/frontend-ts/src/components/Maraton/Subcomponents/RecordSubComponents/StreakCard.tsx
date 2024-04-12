import { Card } from '@/src/@/components/ui/card'
import Date from '@/src/components/utilitycomponents/Components/Date'

type StreakCardProps = {
  streak: {
    name: string
    game_count: number
    start_date: string
    end_date: string
  }[]
  title: string
}

const StreakCard = ({ streak, title }: StreakCardProps) => {
  return (
    <div className="p-2">
      <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
        {title}
      </h3>
      <div className="table">
        {streak.map((streak, index) => {
          return (
            <Card
              className="recordCard"
              key={`${streak.name}-${Math.random()}`}
            >
              <div className="pos">{index + 1}</div>
              <div className="flex flex-col">
                <div className="record1st">
                  <div className="name">{streak.name}</div>
                  <div className="count">{streak.game_count}</div>
                </div>
                <div className="record2nd">
                  <div className="dates">
                    <Date>{streak.start_date}</Date> -{' '}
                    <Date>{streak.end_date}</Date>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default StreakCard
