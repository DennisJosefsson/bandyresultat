const SearchHelp = () => {
  return (
    <>
      <div className="p-5 font-inter text-[#011d29]">
        <div className="text-left text-xs md:text-sm lg:text-base">
          <p className="mb-4">
            OBS! Denna sökfunktion är att betrakta som en beta-version, inte
            minst utseendemässigt på mobilskärmar. Är det något sökresultat som
            ni vet är felaktigt så hör gärna av er, kontaktuppgifter finns under
            &quot;Om sidan&quot;.
          </p>
          <p className="mb-4">
            Det går att söka så brett eller så smalt som besökaren önskar.
            Formulärets grundinställningar ger kanske inte de mest spännande
            resultaten, de listar matcher i fallande ordning efter datum.
          </p>
          <p className="mb-4">
            Första alternativet är att söka på ett specifikt lags matcher, och
            därefter deras matcher mot ett särskilt motstånd.
          </p>
          <p className="mb-4">
            Under resultatformulär kan man sedan göra än mer specifika
            sökningar, antingen på ett exakt resultat eller utifrån målskillnad.
            Har man valt ett lag så utgår sökningen från det lagets perspektiv,
            resultatet 5-2 visar även matcher som vunnits med 5-2 på bortaplan.
            Har man inte valt lag så visar det enbart matcher där hemmalaget
            vunnit med 5-2. Det går också att söka utifrån målskillnad, t.ex.
            lista matcher där målskillnaden varit exakt 10 mål.
          </p>
          <p className="mb-4">
            Därefter går det att välja antalet träffar som ska visas, och om
            resultaten ska listas i fallande eller stigande ordning. Men framför
            allt kan man välja att sortera matcher efter andra kriterier än
            datum, t.ex. antal mål per match.
          </p>
          <p className="mb-4">
            Säsongsinställningar ger besökaren möjlighet att snäva in sökningen
            efter vissa säsonger, eller en särskild säsong (genom att ange samma
            år som start- och slutår). Man kan också söka efter matcher som
            spelats ett visst datum under vald tidsperiod, har man valt 2008 som
            startår och 26/12 som datum utgår sökningen från alla
            annandagsmatcher sedan 2007/2008.
          </p>
          <p className="mb-4">
            Sista fliken är kanske mer uppenbar. Där kan man välja att söka
            utifrån olika matchkategorier, välja om man vill se enbart hemma-
            eller bortamatcher, och enbart visa dam- eller herrmatcher.
          </p>
        </div>
      </div>
    </>
  )
}

export default SearchHelp
