const MaratonHelpModal = ({ setShowModal }) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Information</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 font-inter text-[#011d29] opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
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
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
