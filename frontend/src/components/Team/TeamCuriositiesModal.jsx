import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

const TeamCuriositiesModal = ({
  finals,
  golds,
  winString,
  setShowModal,
  winStreak,
  noWinStreak,
  losingStreak,
  unbeatenStreak,
  drawStreak,
  playoffStreak,
  playoffCount,
  teams,
  seasons,
  qualificationSeasons,
}) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="fixed inset-2  w-auto my-6 mx-auto max-w-3xl overflow-y-auto">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Statistik</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 font-inter text-[#011d29] float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    color="black"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="font-inter text-[#011d29] p-5">
              <p className="text-sm mb-3">
                {seasons.length === 1 && (
                  <span>
                    {teams.team.name} från {teams.team.city} har spelat en
                    säsong i högsta serien, det var {seasons[0].year}.
                  </span>
                )}
                {seasons.length > 1 && (
                  <span>
                    {teams.team.name} från {teams.team.city} har spelat{' '}
                    {seasons.length} säsonger i högsta serien. Första säsongen
                    var {seasons[seasons.length - 1].year} och senaste{' '}
                    {seasons[0].year}.{' '}
                  </span>
                )}
                {qualificationSeasons.length === 1
                  ? `${teams.team.casualName} har kvalat till högsta serien, mot motstånd från den högre serien, vid ett tillfälle.`
                  : ''}{' '}
                {qualificationSeasons.length > 1
                  ? `${teams.team.casualName} har kvalat till högsta serien, mot motstånd från den högre serien, vid ${qualificationSeasons.length} tillfällen.`
                  : ''}
              </p>
              {finals > 0 && golds > 0 && (
                <p className="text-sm mb-3">
                  {teams.team.casualName} har spelat{' '}
                  {finals === 1 ? 'en finalmatch' : `${finals} finalmatcher`}{' '}
                  och vunnit{' '}
                  {golds === 1
                    ? `en gång (${winString.slice(2)}).`
                    : `${golds} gånger (${winString.slice(2)}).`}
                </p>
              )}
              {finals > 0 && golds === 0 && (
                <p className="text-sm mb-3">
                  {teams.team.casualName} har spelat{' '}
                  {finals === 1 ? 'en finalmatch' : `${finals} finalmatcher`}{' '}
                  men har aldrig vunnit.
                </p>
              )}
              {playoffCount > 0 && (
                <p className="text-sm mb-3">
                  Laget har kvalificerat sig för slutspel{' '}
                  {playoffCount === 1 ? 'en gång.' : `${playoffCount} gånger.`}
                </p>
              )}
              {playoffCount === 0 && (
                <p className="text-sm mb-3">
                  Laget har inte kvalificerat sig för slutspel genom seriespel.
                </p>
              )}
              {playoffStreak.length > 0 && (
                <span>
                  {playoffStreak.map((streak, index) => {
                    return (
                      <p
                        className="text-sm mb-3"
                        key={`${streak.start_year}-${index}`}
                      >
                        {teams.team.casualName} spelade slutspel{' '}
                        {streak.streak_length} år på raken mellan{' '}
                        {streak.start_year} och {streak.end_year}.
                      </p>
                    )
                  })}
                </span>
              )}
              {unbeatenStreak.length > 0 && (
                <span>
                  <h4 className="font-bold text-base md:text-xl">Obesegrade</h4>
                  {unbeatenStreak.map((streak, index) => {
                    return (
                      <p
                        className="text-sm mb-3"
                        key={`${streak.start_date}-${index}`}
                      >
                        Mellan {dayjs(streak.start_date).format('D MMMM YYYY')}{' '}
                        och {dayjs(streak.end_date).format('D MMMM YYYY')}{' '}
                        spelade laget {streak.game_count} matcher utan att
                        förlora.
                      </p>
                    )
                  })}
                </span>
              )}
              {winStreak.length > 0 && (
                <span>
                  <h4 className="font-bold text-base md:text-xl">
                    Vinster i rad
                  </h4>
                  {winStreak.map((streak, index) => {
                    return (
                      <p
                        className="text-sm mb-3"
                        key={`${streak.start_date}-${index}`}
                      >
                        Mellan {dayjs(streak.start_date).format('D MMMM YYYY')}{' '}
                        och {dayjs(streak.end_date).format('D MMMM YYYY')} vann
                        laget {streak.game_count} matcher i rad.
                      </p>
                    )
                  })}
                </span>
              )}
              {drawStreak.length > 0 && (
                <span>
                  <h4 className="font-bold text-base md:text-xl">
                    Oavgjorda matcher
                  </h4>
                  {drawStreak.map((streak, index) => {
                    return (
                      <p
                        className="text-sm mb-3"
                        key={`${streak.start_date}-${index}`}
                      >
                        Mellan {dayjs(streak.start_date).format('D MMMM YYYY')}{' '}
                        och {dayjs(streak.end_date).format('D MMMM YYYY')}{' '}
                        spelade laget oavgjort {streak.game_count} matcher på
                        raken.
                      </p>
                    )
                  })}
                </span>
              )}
              {losingStreak.length > 0 && (
                <span>
                  <h4 className="font-bold text-base md:text-xl">
                    Förlustsvit
                  </h4>
                  {losingStreak.map((streak, index) => {
                    return (
                      <p
                        className="text-sm mb-3"
                        key={`${streak.start_date}-${index}`}
                      >
                        Mellan {dayjs(streak.start_date).format('D MMMM YYYY')}{' '}
                        och {dayjs(streak.end_date).format('D MMMM YYYY')}{' '}
                        spelade laget {streak.game_count} matcher och förlorade
                        alla.
                      </p>
                    )
                  })}
                </span>
              )}
              {noWinStreak.length > 0 && (
                <span>
                  <h4 className="font-bold text-base md:text-xl">
                    Matcher i rad utan vinst
                  </h4>
                  {noWinStreak.map((streak, index) => {
                    return (
                      <p
                        className="text-sm mb-3"
                        key={`${streak.start_date}-${index}`}
                      >
                        Mellan {dayjs(streak.start_date).format('D MMMM YYYY')}{' '}
                        och {dayjs(streak.end_date).format('D MMMM YYYY')}{' '}
                        spelade laget {streak.game_count} matcher utan att
                        vinna.
                      </p>
                    )
                  })}
                </span>
              )}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 bg-slate-200 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Stäng
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default TeamCuriositiesModal
