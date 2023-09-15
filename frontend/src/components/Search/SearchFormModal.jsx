const SearchFormModal = ({ setShowModal }) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="fixed inset-2  mx-auto my-6 w-auto max-w-3xl overflow-y-auto">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
              <h3 className="text-3xl font-semibold">Sökinstruktioner</h3>
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
                  OBS! Denna sökfunktion är att betrakta som en beta-version,
                  inte minst utseendemässigt på mobilskärmar. Är det något
                  sökresultat som ni vet är felaktigt så hör gärna av er,
                  kontaktuppgifter finns under &quot;Om sidan&quot;.
                </p>
                <p className="mb-4 text-sm">
                  Det går att söka så brett eller så smalt som besökaren önskar.
                  Formulärets grundinställningar ger kanske inte de mest
                  spännande resultaten, de listar matcher i fallande ordning
                  efter datum.
                </p>
                <p className="mb-4 text-sm">
                  Första alternativet är att söka på ett specifikt lags matcher,
                  och därefter deras matcher mot ett särskilt motstånd.
                </p>
                <p className="mb-4 text-sm">
                  Under resultatformulär kan man sedan göra än mer specifika
                  sökningar, antingen på ett exakt resultat eller utifrån
                  målskillnad. Har man valt ett lag så utgår sökningen från det
                  lagets perspektiv, resultatet 5-2 visar även matcher som
                  vunnits med 5-2 på bortaplan. Har man inte valt lag så visar
                  det enbart matcher där hemmalaget vunnit med 5-2. Det går
                  också att söka utifrån målskillnad, t.ex. lista matcher där
                  målskillnaden varit exakt 10 mål.
                </p>
                <p className="mb-4 text-sm">
                  Därefter går det att välja antalet träffar som ska visas, och
                  om resultaten ska listas i fallande eller stigande ordning.
                  Men framför allt kan man välja att sortera matcher efter andra
                  kriterier än datum, t.ex. antal mål per match.
                </p>
                <p className="mb-4 text-sm">
                  Säsongsinställningar ger besökaren möjlighet att snäva in
                  sökningen efter vissa säsonger, eller en särskild säsong
                  (genom att ange samma år som start- och slutår). Man kan också
                  söka efter matcher som spelats ett visst datum under vald
                  tidsperiod, har man valt 2008 som startår och 26/12 som datum
                  utgår sökningen från alla annandagsmatcher sedan 2007/2008.
                </p>
                <p className="mb-4 text-sm">
                  Sista fliken är kanske mer uppenbar. Där kan man välja att
                  söka utifrån olika matchkategorier, välja om man vill se
                  enbart hemma- eller bortamatcher, och enbart visa dam- eller
                  herrmatcher.
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

export default SearchFormModal
