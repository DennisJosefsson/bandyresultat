const GamesHelpModal = ({ setShowModal }) => {
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
                  Visa resultat för specifikt lag genom att skriva lagnamn i
                  textfältet. Ingen skillnad görs på stor eller liten bokstav,
                  och listan filtreras direkt efter varje tangentnedslag.
                </p>
                <p className="text-sm mb-4">
                  Resultat från tidiga säsonger kan framstå som
                  &quot;konstiga&quot;, och kan kräva en närmare presentation än
                  vad som är syftet med den här sidan. 1912 till exempel så
                  delades guldet mellan Djurgården och Uppsala, det blev
                  oavgjort i första finalen men inget omspel kunde spelas.
                </p>
                <p className="text-sm mb-4">
                  Även Djurgårdens kvartsfinal det året kräver förklaring.
                  Resultatet, förlust med 1-2, i första matchen är ställningen
                  då matchen avbröts. Matchen spelades om med oavgjort resultat
                  som följd, och Djurgården vann sedan det tredje försöket.
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

export default GamesHelpModal
