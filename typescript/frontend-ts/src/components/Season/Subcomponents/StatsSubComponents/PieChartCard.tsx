import { PieChart, Pie, Cell } from 'recharts'

import { Circle } from 'lucide-react'
type PieChartData = {
  win: string
  count: number
  percent: number
}[]

type PieChartCardProps = {
  data: PieChartData
}

const CustomLegend = () => {
  return (
    <div className="mb-2 flex flex-col gap-2">
      <div className="text-xs font-bold md:text-sm xl:ml-0 xl:text-base">
        Segrande lag
      </div>
      <div className="flex flex-row justify-center gap-2">
        <div className="flex flex-row items-center gap-1">
          <Circle
            fill="currentColor"
            className="h-3 w-3 fill-primary sm:h-4 sm:w-4"
          />
          <span className="text-[8px] text-foreground sm:text-sm">Hemma</span>
        </div>
        <div className="flex flex-row items-center gap-1">
          <Circle
            fill="currentColor"
            className="h-3 w-3 fill-[#f4f1bb] sm:h-4 sm:w-4"
          />
          <span className="text-[8px] text-foreground sm:text-sm">Borta</span>
        </div>
        <div className="flex flex-row items-center gap-1">
          <Circle
            fill="currentColor"
            className="h-3 w-3 fill-[#9bc1bc] sm:h-4 sm:w-4"
          />
          <span className="text-[8px] text-foreground sm:text-sm">
            Oavgjort
          </span>
        </div>
      </div>
    </div>
  )
}

const COLORS = ['fill-primary', 'fill-[#f4f1bb]', 'fill-[#9bc1bc]']

const PieChartCard = ({ data }: PieChartCardProps) => {
  return (
    <div>
      <CustomLegend />
      <PieChart
        width={280}
        height={280}
        margin={{
          right: 50,
        }}
      >
        <Pie
          data={data}
          dataKey="count"
          nameKey="win"
          fill="currentColor"
          className="fill-primary"
          paddingAngle={2}
          labelLine={false}
          label={({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            value,
            index,
          }) => {
            console.log('handling label?')
            const RADIAN = Math.PI / 180

            const radius = 15 + innerRadius + (outerRadius - innerRadius)

            const x = cx + radius * Math.cos(-midAngle * RADIAN)

            const y = cy + radius * Math.sin(-midAngle * RADIAN)

            return (
              <text
                x={x}
                y={y}
                fill="currentColor"
                className="text-sm text-primary"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
              >
                {`${data[index].percent.toFixed(1)}%`} ({value})
              </text>
            )
          }}
        >
          {data.map((_entry, index) => {
            return (
              <Cell key={index} fill="currentColor" className={COLORS[index]} />
            )
          })}
        </Pie>
      </PieChart>
    </div>
  )
}

export default PieChartCard
