const TeamsListHelp = () => {
  return (
    <>
      <div className="p-5 font-inter text-[#011d29]">
        <div className="text-left text-xs md:text-sm lg:text-base">
          <p className="mb-4">
            För att minska antalet lag i listan och på kartan så kan man börja
            skriva lagnamn i fältet. Ingen skillnad görs på stor eller liten
            bokstav, och listan filtreras direkt efter varje tangentnedslag.
          </p>
          <p className="mb-4">
            För att se information om specifikt lag så klickar ni på lagnamnet.
          </p>
          <p className="mb-4">
            Kryssrutan är till för att välja ut lag för att jämföra. Valda lag
            visas i en lista till höger, och när man valt minst 2 och max 4 lag
            går det att klicka på &quot;Jämför&quot; för att komma vidare.
          </p>
        </div>
      </div>
    </>
  )
}

export default TeamsListHelp
