import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

const CuriositiesModal = ({
  setShowModal,
  winStreak,
  noWinStreak,
  losingStreak,
  unbeatenStreak,
  drawStreak,
}) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="fixed inset-2  w-auto my-6 mx-auto max-w-3xl overflow-y-auto">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Kuriosa</h3>
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
              {unbeatenStreak.length > 0 && (
                <h6 className="font-bold text-base mb-2">
                  Matcher i rad utan förlust:
                </h6>
              )}
              {unbeatenStreak?.map((team) => {
                return (
                  <p
                    key={`${team.casual_name}-${team.game_count}-${team.start_date}`}
                    className="text-sm mb-3"
                  >
                    Mellan {dayjs(team.start_date).format('D MMMM YYYY')} och{' '}
                    {dayjs(team.end_date).format('D MMMM YYYY')} var{' '}
                    {team.casual_name} obesegrade i {team.game_count} matcher.
                  </p>
                )
              })}
              {winStreak.length > 0 && (
                <h6 className="font-bold text-base mb-2">
                  Matcher i rad med vinst:
                </h6>
              )}
              {winStreak?.map((team) => {
                return (
                  <p
                    key={`${team.casual_name}-${team.game_count}-${team.start_date}`}
                    className="text-sm mb-3"
                  >
                    Från {dayjs(team.start_date).format('D MMMM YYYY')} till{' '}
                    {dayjs(team.end_date).format('D MMMM YYYY')} vann{' '}
                    {team.casual_name} alla sin matcher, totalt{' '}
                    {team.game_count} stycken.
                  </p>
                )
              })}
              {drawStreak.length > 0 && (
                <h6 className="font-bold text-base mb-2">
                  Matcher i rad med oavgjort:
                </h6>
              )}
              {drawStreak?.map((team) => {
                return (
                  <p
                    key={`${team.casual_name}-${team.game_count}-${team.start_date}`}
                    className="text-sm mb-3"
                  >
                    {team.casual_name} spelade från{' '}
                    {dayjs(team.start_date).format('D MMMM YYYY')} till{' '}
                    {dayjs(team.end_date).format('D MMMM YYYY')}{' '}
                    {team.game_count} matcher som alla slutade oavgjort.
                  </p>
                )
              })}
              {noWinStreak.length > 0 && (
                <h6 className="font-bold text-base mb-2">
                  Matcher i rad utan vinst:
                </h6>
              )}
              {noWinStreak?.map((team) => {
                return (
                  <p
                    key={`${team.casual_name}-${team.game_count}-${team.start_date}`}
                    className="text-sm mb-3"
                  >
                    {team.casual_name} spelade {team.game_count} matcher utan
                    att vinna mellan{' '}
                    {dayjs(team.start_date).format('D MMMM YYYY')} och{' '}
                    {dayjs(team.end_date).format('D MMMM YYYY')}
                  </p>
                )
              })}
              {losingStreak.length > 0 && (
                <h6 className="font-bold text-base mb-2">
                  Matcher i rad med förlust:
                </h6>
              )}
              {losingStreak?.map((team) => {
                return (
                  <p
                    key={`${team.casual_name}-${team.game_count}-${team.start_date}`}
                    className="text-sm mb-3"
                  >
                    {team.casual_name} förlorade {team.game_count} raka matcher
                    mellan {dayjs(team.start_date).format('D MMMM YYYY')} och{' '}
                    {dayjs(team.end_date).format('D MMMM YYYY')}
                  </p>
                )
              })}
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

export default CuriositiesModal
