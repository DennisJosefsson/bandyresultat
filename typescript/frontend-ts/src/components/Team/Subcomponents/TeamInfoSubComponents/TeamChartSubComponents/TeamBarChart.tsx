import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/@/components/ui/card'
import { TeamChartType } from '@/src/components/types/teams/teams'
import useGenderContext from '@/src/hooks/contextHooks/useGenderContext'
import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  ResponsiveContainer,
  LabelList,
} from 'recharts'
import { useMediaQuery } from 'usehooks-ts'

type PositionType = {
  year: string
  dataPoint: number | undefined | null
  position: number | undefined | null
  points: number | undefined | null
}

const TeamBarChart = ({ chartData }: { chartData: TeamChartType[] }) => {
  const matches1240 = useMediaQuery('(min-width: 1240px)')
  const { women } = useGenderContext()
  const baseLinePosition = women ? 10 : 17
  const baseLineSeasonId = women ? 161 : 101
  const positionChart: PositionType[] = chartData
    .filter((year) => year.seasonId > baseLineSeasonId)
    .map((year) => {
      return {
        year: year.year.slice(-4),
        dataPoint: year.position ? baseLinePosition - year.position : 0,
        position: year.position,
        points: year.points,
      }
    })

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Slutplacering Elitserien</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={positionChart}>
              <XAxis
                dataKey="year"
                stroke="#888888"
                fontSize={matches1240 ? 12 : 8}
                tickLine={false}
                axisLine={false}
              />
              <YAxis hide={true} domain={[0, women ? 9 : 16]} />
              <Bar
                dataKey="dataPoint"
                fill="currentColor"
                className="fill-primary text-[8px] md:text-sm"
              >
                <LabelList
                  dataKey="position"
                  position="center"
                  fill="currentColor"
                  className="text-primary-foreground"
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  )
}

export default TeamBarChart
