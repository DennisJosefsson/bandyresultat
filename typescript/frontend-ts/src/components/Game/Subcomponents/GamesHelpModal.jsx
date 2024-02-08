const GamesHelp = () => {
  return (
    <>
      <div className="p-5 font-inter text-[#011d29]">
        <div className="text-left text-xs md:text-sm lg:text-base">
          <p className="mb-4">
            Visa resultat för specifikt lag genom att skriva lagnamn i
            textfältet. Ingen skillnad görs på stor eller liten bokstav, och
            listan filtreras direkt efter varje tangentnedslag.
          </p>
          <p className="mb-4">
            Klickar man på en match tas man vidare till sida med historiken
            mellan de båda lagen.
          </p>
          <p className="mb-4">
            Resultat från tidiga säsonger kan framstå som &quot;konstiga&quot;,
            och kan kräva en närmare presentation än vad som är syftet med den
            här sidan. 1912 till exempel så delades guldet mellan Djurgården och
            Uppsala, det blev oavgjort i första finalen men inget omspel kunde
            spelas.
          </p>
          <p className="mb-4">
            Även Djurgårdens kvartsfinal det året kräver förklaring. Resultatet,
            förlust med 1-2, i första matchen är ställningen då matchen avbröts.
            Matchen spelades om med oavgjort resultat som följd, och Djurgården
            vann sedan det tredje försöket.
          </p>
        </div>
      </div>
    </>
  )
}

export default GamesHelp
