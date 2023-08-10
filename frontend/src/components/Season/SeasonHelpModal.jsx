const SeasonHelpModal = ({ setShowModal }) => {
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
                  Klickar man på &quot;Visa utveckling&quot; så kan man följa
                  hur tabellen förändrades omgång för omgång. Med viss
                  modifiktion, utgångspunkten är inte faktisk omgång utan
                  speldatum.
                </p>
                <p className="text-sm mb-4">
                  För närvarande finns sådan utvecklingstabell enbart för
                  grundseriematcher, ej kval.
                </p>
                <p className="text-sm mb-4">
                  Resultaten i slutspelsträdet är genomgående för semi- och
                  kvartsfinal resultatet av matchserien, även där det enbart
                  varit en match. För åttondelsfinal med bäst av två matcher är
                  det poäng och målskillnad som anges.
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

export default SeasonHelpModal
