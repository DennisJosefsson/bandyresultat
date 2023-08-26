import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

const PlayoffSeriesPopup = ({ gameData }) => {
  return (
    <div className="fixed bottom-40 right-40 z-50 rounded border-2 border-[#011d29] bg-white p-2 text-sm">
      <ul>
        {gameData.map((game, index) => (
          <li key={`${game.date}-${index}`}>
            {game.date !== null && (
              <span>{dayjs(game.date).format('D MMMM YYYY')}:</span>
            )}
            <span> {game.homeTeam.casualName}</span>-
            <span>{game.awayTeam.casualName}</span> <span>{game.result}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PlayoffSeriesPopup
