import { Link } from '@tanstack/react-router'

import kalenderbitare from '../../assets/kalenderbitare.png'

const About = () => {
  return (
    <div className="prose mx-auto min-h-screen max-w-7xl px-2 text-foreground md:px-10 xl:px-0">
      <div className="flex flex-col justify-start gap-4 [@media(min-width:1000px)]:flex-row [@media(min-width:1000px)px]:justify-between">
        <div className="mx-10 lg:mx-0 lg:w-1/2">
          <h2 className="text-foreground [@media(min-width:1000px)]:text-left">
            Om det här projektet
          </h2>
          <p>
            Vi har väl alla någon gång undrat hur det var, den där
            bandy&shy;vintern{' '}
            <Link
              to="/season/$seasonId"
              params={{ seasonId: '1969' }}
              search={{ tab: 'tables' }}
              className="text-foreground transition-colors hover:text-foreground"
            >
              1968/69
            </Link>{' '}
            när Katrine&shy;holm vann SM-guld. När de slogs mot
            Hällefors&shy;näs och Örebro i södra serien, och hade säll&shy;skap
            av Värmbol. Kokade Närke och västra Sörmland av bandy&shy;eufori?
            Kunde man gå ut utan att få en tackling av Håkan Spång&shy;berg?
          </p>
          <p>
            Sådant får man inte nödvändigt&shy;vis reda på här. Däremot kan man
            hitta resultaten, och det är just det som är syftet med den här
            sidan. Om du undrar över ett bandy&shy;resultat från förr eller vill
            jämföra två eller kanske fyra klubbar, så är mål&shy;bilden att du
            ska kunna göra det här.
          </p>
          <p>
            Än så länge en målbild, för även om det är ganska så nära när det
            gäller herrarnas högsta serie så har det varit bra mycket
            knepi&shy;gare att hitta gamla res&shy;ultat från damernas matcher
            (särskilt från tiden före 1990). Ovärderligt bidrag av Ingemar
            Ekelund från Eksjö har gjort så att det nu enbart saknas tre
            säsonger av damernas resultat i högsta serien. De två första, och
            1987/1988. Jag vill också tacka Johan Svedbom, Fredrik Axelsson och
            Stefan Svensson för bidrag till sidan.
          </p>
          <p>
            Vad man däremot inte kommer att hitta är spelar&shy;statistik.
            Tyvärr, för det är något som verk&shy;ligen behövs. Men så länge det
            inte finns något någor&shy;lunda enkelt sätt att samman&shy;ställa
            sådan statistik så får det vänta.
          </p>
          <p>
            Däremot är det inte helt omöjligt att stati&shy;stiken utökas så att
            även lägre divi&shy;sioner ingår, och kanske också Svenska Cupen.
          </p>
        </div>
        <div className="mx-10 lg:mx-0 lg:w-2/5">
          <p className="[@media(min-width:1000px)]:mt-10">
            Jag som står bakom det här heter Dennis Josefsson, och jag kommer
            från Vetlanda. Det hade för&shy;modligen inte blivit något av detta
            om det inte funnits före&shy;gångare som förenklat
            data&shy;insamlingen och stått för inspiration. Då tänker jag
            närmast på{' '}
            <a
              href="https://web.archive.org/web/20150222174940/http://www.jimbobandy.nu/"
              className="text-foreground transition-colors hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              Jimbo&shy;bandy
            </a>{' '}
            och{' '}
            <a
              href="http://www.bandysidan.nu/"
              className="text-foreground transition-colors hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              bandysidan.nu
            </a>
            .
          </p>
          <img src={kalenderbitare} alt="Kalenderbitare" className="mb-6" />
          <h4>Det kostar inget att fråga</h4>
          <p>
            Jag kan inte lova något, men det är ju så att det går att ta reda på
            annan stati&shy;stik än den som pre&shy;senteras här. Så har du en
            speci&shy;fik fråga så är det bara att kon&shy;takta mig, på{' '}
            <a
              href="https://twitter.com/_DennisJ_"
              className="text-foreground transition-colors hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>{' '}
            (så länge det finns) eller via{' '}
            <a
              href="mailto:dennis@bandyresultat.se"
              className="text-foreground transition-colors hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              mail
            </a>
            . För&shy;modligen är även jag själv intress&shy;erad av svaret, om
            jag bara hade vett att fråga.
          </p>
          <p>
            Vill man ändå bidra med en korv med bröd till nästa bandymatch så
            kan man swisha till 0738137187. Märk kuvertet &quot;bandy, bandy,
            bandy&quot;.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
