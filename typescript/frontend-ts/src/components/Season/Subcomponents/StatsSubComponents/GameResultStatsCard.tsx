const GameResultStatsCard = ({
  title,
  count,
}: {
  title: string
  count: number | string | undefined
}) => {
  return (
    <div className="statsCard">
      <div className="name">{title}</div>
      <div className="count">{count}</div>
    </div>
  )
}

export default GameResultStatsCard
