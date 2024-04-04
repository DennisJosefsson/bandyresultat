import StreakCard from './StreakCard'
import { Card } from '@/src/@/components/ui/card'
import dayjs from 'dayjs'
import 'dayjs/locale/sv'

import { useGetRecordData } from '@/src/hooks/dataHooks/maratonHooks/useGetRecordData'
dayjs.locale('sv')

const Streaks = () => {
  const { data } = useGetRecordData()
  return (
    <>
      {data ? (
        <div className="ml-4 xl:ml-0">
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
            <StreakCard
              streak={data?.unbeatenStreak}
              title="Matcher i rad utan förlust"
            />
            <StreakCard
              streak={data?.winStreak}
              title="Matcher i rad med vinst"
            />
            <StreakCard
              streak={data?.drawStreak}
              title="Matcher i rad med oavgjort"
            />
            <StreakCard
              streak={data?.losingStreak}
              title="Matcher i rad med förlust"
            />
            <StreakCard
              streak={data?.noWinStreak}
              title="Matcher i rad utan seger"
            />

            <div className="p-2">
              <h3 className="mb-2 text-sm font-bold leading-4 sm:text-lg lg:text-xl">
                Inofficiella Svenska Mästare
              </h3>
              <div className="table">
                {data?.currInoffChamps.rows.map((team, index) => {
                  return (
                    <Card
                      className="recordCard"
                      key={`${team.lag.name}-${Math.random()}`}
                    >
                      <div className="pos">{index + 1}</div>
                      <div className="flex flex-col">
                        <div className="record1st">
                          <div className="name">{team.lag.name}</div>
                          <div className="count">
                            {team.goalsScored}-{team.goalsConceded}
                          </div>
                        </div>
                        <div className="record2nd">
                          <div className="dates">
                            {dayjs(team.date).format('D MMMM YYYY')}
                          </div>
                          <div className="text-right">{team.opp.shortName}</div>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
              <div>
                <p className="w-[292px] bg-background p-1 text-xs font-bold md:w-[22rem]">
                  Totalt {data?.currInoffChamps.count}{' '}
                  <a
                    href="https://sv.wikipedia.org/wiki/Inofficiella_v%C3%A4rldsm%C3%A4sterskapet_i_fotboll"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600"
                  >
                    &quot;mästare&quot;
                  </a>{' '}
                  sedan finalen 2000.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Streaks
