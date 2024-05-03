import { BarChart, Bar,  XAxis, YAxis } from 'recharts'
import { sortTotalBarChartData } from '@/src/components/utilitycomponents/functions/sortFunction'
import { groupConstant } from '@/src/components/utilitycomponents/functions/constants'
import { useMediaQuery } from 'usehooks-ts'
import { Circle } from 'lucide-react'

type TotObjectArray = {
  totAll: number | undefined
  totHome: number | undefined
  totAway: number | undefined
  avgAll: number | undefined
  avgHome: number | undefined
  avgAway: number | undefined
  category: string
}[]

type AverageArray =
  | {
      category: string
      totAll: number
      totHome: number | undefined
      totAway: number | undefined
      avgAll: number | undefined
      avgHome: number | undefined
      avgAway: number | undefined
    }[]
  | undefined

type BarChartCardProps = {
  totObjectArray: TotObjectArray
  averageArray: AverageArray
}

const CustomLegend = () => {
  return (
    <div className="mb-2 flex flex-col gap-2">
      <div className="text-xs font-bold md:text-sm xl:ml-0 xl:text-base">
        Genomsnitt antal mål, totala antalet inom parentes.
      </div>
      <div className="flex flex-row justify-center gap-2">
        <div className="flex flex-row items-center gap-1">
          <Circle
            fill="currentColor"
            className="h-3 w-3 fill-primary sm:h-4 sm:w-4"
          />
          <span className="text-[8px] text-foreground sm:text-sm">Totalt</span>
        </div>
        <div className="flex flex-row items-center gap-1">
          <Circle
            fill="currentColor"
            className="h-3 w-3 fill-[#f4f1bb] sm:h-4 sm:w-4"
          />
          <span className="text-[8px] text-foreground sm:text-sm">Hemma</span>
        </div>
        <div className="flex flex-row items-center gap-1">
          <Circle
            fill="currentColor"
            className="h-3 w-3 fill-[#9bc1bc] sm:h-4 sm:w-4"
          />
          <span className="text-[8px] text-foreground sm:text-sm">Borta</span>
        </div>
      </div>
    </div>
  )
}

const BarChartCard = ({ totObjectArray, averageArray }: BarChartCardProps) => {
  const barChartData = [...totObjectArray, ...(averageArray as TotObjectArray)]
  const matches1240 = useMediaQuery('(min-width: 1240px)')
  const matches760 = useMediaQuery('(min-width: 760px)')

  const sortedData = sortTotalBarChartData(barChartData)?.map((item) => {
    return {
      avgAll: Number(item.avgAll?.toFixed(1)),
      avgAway: Number(item.avgAway?.toFixed(1)),
      avgHome: Number(item.avgHome?.toFixed(1)),
      label: groupConstant[item.category],
      totAll: item.totAll,
      totHome: item.totHome,
      totAway: item.totAway,
    }
  })

  const width = matches1240 ? 1280 : matches760 ? 1024 : 760
  const barWidth = matches1240 ? 90 : matches760 ? 60 : 45

  return (
    <div className="flex flex-col gap-2">
      <div>
        <CustomLegend />
      </div>
      <div className="overflow-x-auto">
        <BarChart data={sortedData} width={width} height={375}>
          <XAxis
            dataKey="label"
            stroke="currentColor"
            className="fill-primary-foreground"
            fontSize={matches760 ? 12 : 5}
            angle={matches760 ? 0 : -30}
            tickLine={false}
            axisLine={false}
            tickMargin={5}
          />
          <YAxis domain={[0, 10]} hide={true} />

          <Bar
            dataKey="avgAll"
            fill="currentColor"
            className="fill-primary text-[8px] md:text-sm"
            width={barWidth}
            label={({ x, y, width, height, value, index }) => {
              return (
                <text
                  x={x + width / 2}
                  y={y + height / 2}
                  fill="currentColor"
                  className="text-sm text-primary-foreground"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {value} ({sortedData && sortedData[index].totAll})
                </text>
              )
            }}
          />

          <Bar
            dataKey="avgHome"
            fill="currentColor"
            className="fill-[#f4f1bb] text-[8px] md:text-sm"
            stackId="a"
            width={90}
            label={({ x, y, width, height, value, index }) => {
              return (
                <text
                  x={x + width / 2}
                  y={y + height / 2}
                  fill="currentColor"
                  className="text-sm text-primary"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {value} ({sortedData && sortedData[index].totHome})
                </text>
              )
            }}
          />

          <Bar
            dataKey="avgAway"
            fill="currentColor"
            className="fill-[#9bc1bc] text-[8px] md:text-sm"
            stackId="a"
            width={90}
            label={({ x, y, width, height, value, index }) => {
              return (
                <text
                  x={x + width / 2}
                  y={y + height / 2}
                  fill="currentColor"
                  className="text-sm text-primary"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {value} ({sortedData && sortedData[index].totAway})
                </text>
              )
            }}
          />
        </BarChart>
      </div>
    </div>
  )
}

export default BarChartCard
