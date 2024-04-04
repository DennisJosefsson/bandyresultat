const MaratonHelp = () => {
  return (
    <>
      <div className="p-5 font-inter text-foreground">
        <div className="text-left text-xs md:text-sm lg:text-base">
          <p className="mb-4">
            Maratontabeller ska med nödvändighet tas med en nypa salt.* Lag som
            spelade på den tid när det enbart spelades en handfull matcher
            missgynnas i jämförelse med nutida lag. Dessutom missgynnas lag som
            spelat mot svårare motstånd, framför allt under den tid när
            grundserien var uppdelad i Elitserie och Superallsvenskan.
          </p>
          <p className="mb-4">
            Här görs inga justeringar för sådant, men{' '}
            <a
              href="https://ultrastermos.blogg.se/2019/april/den-riktiga-maratontabellen.html"
              target="_blank"
              rel="noreferrer"
              className="font-bold"
            >
              Ultras Termos
            </a>{' '}
            (och innan dess Jimbobandy) har tittat på just det. Bandyresultats
            tabeller är standardversionen, enbart grundseriematcher. Däremot har
            jag valt att ta med matcherna från den s.k. sexlagsserien 1930.
          </p>
          <p className="mb-4">
            Ett specifikt problem för Bandyresultat är att tabellerna uppdateras
            dynamiskt, dvs efter varje resultat är inlagt. Det innebär att
            framför allt damernas tabell är direkt missvisande eftersom det
            saknas grundserieresultat från 70- och 80-talet.
          </p>
          <p className="mb-4 text-[8px] md:text-[10px]">
            * Denna åsikt kan komma att ändras när Vetlanda ligger högst upp.
          </p>
        </div>
      </div>
    </>
  )
}

export default MaratonHelp
