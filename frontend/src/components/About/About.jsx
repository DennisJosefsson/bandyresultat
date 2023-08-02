import kalenderbitare from '../../assets/kalenderbitare.PNG'

const About = () => {
  return (
    <div className="max-w-7xl min-h-screen mx-auto font-inter text-[#011d29]">
      <h2 className="text-xl font-bold mb-4">Om det här projektet</h2>
      <div className="flex flex-row gap-4">
        <div className="w-1/2">
          <p className="text-base mb-2 text-justify">
            Vi har väl alla någon gång undrat hur det var, den där bandyvintern
            1967/68 när Katrineholm vann SM-guld. När de slogs mot Hälleforsnäs
            och Örebro i södra serien, och hade sällskap av Värmbol. Kokade
            Närke och västra Sörmland av bandyeufori? Kunde man gå ut utan att
            få en tackling av Håkan Spångberg?
          </p>
          <p className="text-base mb-2 text-justify">
            Sådant får man inte nödvändigtvis reda på här. Däremot kan man hitta
            resultaten, och det är just det som är syftet med den här sidan. Om
            du undrar över ett bandyresultat från förr eller vill jämföra två
            eller kanske fyra klubbar, så är målbilden att du ska kunna göra det
            här.
          </p>
          <p className="text-base mb-2 text-justify">
            Än så länge en målbild, för även om det är ganska så nära när det
            gäller herrarnas högsta serie så har det varit bra mycket knepigare
            att hitta gamla resultat från damernas matcher (särskilt från tiden
            innan 1990). Det blir nästa del av projektet.
          </p>
          <p className="text-base mb-2 text-justify">
            Vad man däremot inte kommer att hitta är spelarstatistik. Tyvärr,
            för det är något som verkligen behövs. Men så länge det inte finns
            något någorlunda enkelt sätt att sammanställa sådan statistik så får
            det vänta.
          </p>
          <p className="text-base mb-2 text-justify">
            Däremot är det inte helt omöjligt att statistiken utökas så att även
            lägre divisioner ingår, och t.ex. Svenska Cupen.
          </p>
          <p className="text-base mb-2 text-justify">
            Jag som står bakom det här heter Dennis Josefsson, och jag kommer
            från Vetlanda. Det hade förmodligen inte blivit något av detta om
            det inte funnits föregångare som förenklat datainsamlingen och stått
            för inspiration. Då tänker jag förstås närmast på Jimbobandy och
            Bandysidan.
          </p>
        </div>
        <div className="w-2/5">
          <img src={kalenderbitare} alt="Kalenderbitare" className="mb-6" />
          <h4 className="text-lg font-bold">Det kostar inget att fråga</h4>
          <p className="text-base mb-2 text-justify">
            Jag kan inte lova något, men det är ju så att det går att ta reda på
            annan statistik än den som presenteras här. Så har du en specifik
            fråga så är det bara att kontakta mig, på{' '}
            <a href="https://twitter.com/_DennisJ_" className="font-semibold">
              Twitter
            </a>{' '}
            (så länge det finns) eller via mail (
            <a
              href="mailto:dennis.josefsson@gmail.com"
              className="font-semibold"
            >
              dennis.josefsson@gmail.com
            </a>
            ). Förmodligen är även jag själv intresserad av svaret, om jag bara
            hade vett att fråga.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
