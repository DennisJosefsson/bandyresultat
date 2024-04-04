import dayjs from 'dayjs'
import 'dayjs/locale/sv'
dayjs.locale('sv')
import { GameObjectType } from '../../../types/games/games'
import { Dispatch, SetStateAction } from 'react'
import { Button } from '@/src/@/components/ui/button'
import { Popover, PopoverContent } from '@/src/@/components/ui/popover'

type PlayoffSeriesPopupProps = {
  gameData: GameObjectType[] | null
  setShowPopup: Dispatch<SetStateAction<boolean>>
  showPopup: boolean
}

const PlayoffSeriesPopup = ({
  gameData,
  setShowPopup,
  showPopup,
}: PlayoffSeriesPopupProps) => {
  // return (
  //   <div className="fixed left-1/2 top-1/2 z-50 mx-auto h-auto min-w-[33%] -translate-x-1/2 -translate-y-1/2 justify-center rounded-md border-2 border-[#011d29] bg-background p-8 text-[10px] xs:text-xs md:text-sm">
  //     <div className="mx-auto">
  //       {gameData && (
  //         <div>
  //           {gameData.map((game, index) => (
  //             <div key={`${game.date}-${index}`} className="flex flex-col">
  //               <div>
  //                 {game.date !== null && (
  //                   <span className="font-bold">
  //                     {dayjs(game.date).format('D MMMM YYYY')}:
  //                   </span>
  //                 )}
  //               </div>
  //               <div>
  //                 <span> {game.homeTeam.casualName}</span>-
  //                 <span>{game.awayTeam.casualName}</span>{' '}
  //                 <span>{game.result}</span>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       )}
  //       <div className="mb-2 mt-4 flex justify-center">
  //         <button
  //           className="bg-slate-200 px-2 py-1 text-xs font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none md:px-6 md:py-2 md:text-sm"
  //           type="button"
  //           onClick={() => setShowPopup(false)}
  //         >
  //           Stäng
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // )
  console.log('popup', showPopup, 'gameData', gameData?.length)
  return (
    <Popover open={showPopup} onOpenChange={setShowPopup}>
      <PopoverContent>
        {gameData && (
          <div>
            {gameData.map((game, index) => (
              <div key={`${game.date}-${index}`} className="flex flex-col">
                <div>
                  {game.date !== null && (
                    <span className="font-bold">
                      {dayjs(game.date).format('D MMMM YYYY')}:
                    </span>
                  )}
                </div>
                <div>
                  <span> {game.homeTeam.casualName}</span>-
                  <span>{game.awayTeam.casualName}</span>{' '}
                  <span>{game.result}</span>
                </div>
              </div>
            ))}
            <div className="mb-2 mt-4 flex justify-center">
              <Button onClick={() => setShowPopup(false)}>Stäng</Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default PlayoffSeriesPopup
