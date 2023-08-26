const SeasonHelpModal = ({ setShowModal }) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="fixed inset-2  mx-auto my-6 w-auto max-w-3xl overflow-y-auto">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
              <h3 className="text-3xl font-semibold">Information</h3>
              <button
                className="float-right ml-auto border-0 bg-transparent p-1 font-inter text-3xl font-semibold leading-none text-[#011d29] outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="block h-6 w-6 bg-transparent text-2xl text-black outline-none focus:outline-none">
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
            <div className="p-5 font-inter text-[#011d29]">
              <div className="text-left">
                <p className="mb-4 text-sm">
                  Klickar man på &quot;Visa utveckling&quot; så kan man följa
                  hur tabellen förändrades omgång för omgång. Med viss
                  modifiktion, utgångspunkten är inte faktisk omgång utan
                  speldatum.
                </p>
                <p className="mb-4 text-sm">
                  För närvarande finns sådan utvecklingstabell enbart för
                  grundseriematcher, ej kval.
                </p>
                <p className="mb-4 text-sm">
                  Resultaten i slutspelsträdet är genomgående för semi- och
                  kvartsfinal resultatet av matchserien, även där det enbart
                  varit en match. För åttondelsfinal med bäst av två matcher är
                  det poäng och målskillnad som anges.
                </p>
                <p className="mb-4 text-sm">
                  De som använder en större skärm kan se matchresultat för
                  slutspelet genom att föra muspekaren över respektive
                  slutspelsserie. På mindre skärmar &quot;pekar&quot; man
                  istället för att få fram samma information.
                </p>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
              <button
                className="mb-1 mr-1 bg-slate-200 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Stäng
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  )
}

export default SeasonHelpModal
