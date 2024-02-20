const CompareHelp = () => {
  return (
    <>
      <div className="p-5 font-inter text-[#011d29]">
        <div className="text-left text-xs md:text-sm lg:text-base">
          <p className="mb-4">
            OBS! Ändrar man från t.ex. dam till herr samtidigt som man redan har
            valt lag för jämförelse så nollställs urvalet, dvs. dina val
            försvinner.
          </p>
          <p className="mb-4">
            Knappen &quot;Länk&quot; kopierar en permanent länk till aktuell
            sökning. Observera att länken är unik utifrån sökkriterie, dvs.
            ändrar man tex. säsongsval så ändras också länken.
          </p>
          <p className="mb-4">
            Det går att ändra urvalet under fliken Sökval, det går också att
            lägga till och ta bort lag från urvalet via kartan. Notera att
            filtreringsfältet också filtrerar lagen som visas på kartan.
          </p>
          <p className="mb-4">
            Första och senaste matcherna är de datum då lagen möttes på
            respektive hemmaplan.
          </p>
          <p className="mb-4">
            Antalet slutspel är enbart de slutspel som lagen kvalificerat sig
            för genom seriespel, dvs slutspel före 1931 räknas inte med. Även
            antalet säsonger utgår från seriespelet från och med 1931. Det är
            anledningen till varför antalet guld i vissa fall är fler än antalet
            säsonger/slutspel.
          </p>
        </div>
      </div>
    </>
  )
}

export default CompareHelp
