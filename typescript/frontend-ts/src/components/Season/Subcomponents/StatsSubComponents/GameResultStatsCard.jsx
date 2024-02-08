const GameResultStatsCard = ({ title, count }) => {
  return (
    <div className="statsCard">
      <div className="name">{title}</div>
      <div className="count">{count}</div>
    </div>
  )
}

export default GameResultStatsCard
