const MaratonHelpModal = ({ setShowModal }) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="fixed inset-2  w-auto my-6 mx-auto max-w-3xl overflow-y-auto">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Information</h3>
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
              <div className="text-left">
                <p className="text-sm mb-4">
                  Maratontabeller ska med nödvändighet tas med en nypa salt.*
                  Lag som spelade på den tid när det enbart spelades en handfull
                  matcher missgynnas i jämförelse med nutida lag. Dessutom
                  missgynnas lag som spelat mot svårare motstånd, framför allt
                  under den tid när grundserien var uppdelad i Elitserie och
                  Superallsvenskan.
                </p>
                <p className="text-sm mb-4">
                  Här görs inga justeringar för sådant, men{' '}
                  <a
                    href="https://ultrastermos.blogg.se/2019/april/den-riktiga-maratontabellen.html"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold"
                  >
                    Ultras Termos
                  </a>{' '}
                  (och innan dess Jimbobandy) har tittat på just det.
                  Bandyresultats tabeller är standardversionen, enbart
                  grundseriematcher. Däremot har jag valt att ta med matcherna
                  från den s.k. sexlagsserien 1930.
                </p>
                <p className="text-sm mb-4">
                  Ett specifikt problem för Bandyresultat är att tabellerna
                  uppdateras dynamiskt, dvs efter varje resultat är inlagt. Det
                  innebär att framför allt damernas tabell är direkt missvisande
                  eftersom det saknas grundserieresultat från 70- och 80-talet.
                </p>
                <p className="text-xs mb-4">
                  * Denna åsikt kan komma att ändras när Vetlanda ligger högst
                  upp.
                </p>
              </div>
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

export default MaratonHelpModal
