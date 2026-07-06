/**
 * Privatlivspolitik — fuldskala udkast til launch.
 *
 * VIGTIGT: Dette er et grundigt UDKAST baseret på de faktiske data-flows i
 * appen (Supabase EU, hvilke tabeller, RLS-opsætning osv.). En jurist med
 * GDPR-erfaring bør gennemgå den før produktion, særligt fordi appen
 * behandler "særlige kategorier af personoplysninger" (helbredsdata
 * under GDPR artikel 9).
 */

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-12 max-w-2xl mx-auto">
      <h1 className="font-serif text-[2rem] font-medium mb-2">Privatlivspolitik</h1>
      <p className="text-[0.72rem] text-muted-foreground mb-8">
        Senest opdateret: 30. maj 2026 · Melo Parents ApS
      </p>

      <div className="space-y-7 text-[0.92rem] leading-relaxed text-foreground/85">

        <Intro />

        <Section title="1. Hvem er ansvarlig for dine oplysninger?">
          <p>
            Den dataansvarlige er <strong>Melo Parents ApS</strong>, Danmark.
            Du kan kontakte os på{" "}
            <a href="mailto:hej@meloparents.com" className="underline">
              hej@meloparents.com
            </a>{" "}
            med spørgsmål om denne politik eller om dine oplysninger.
          </p>
        </Section>

        <Section title="2. Hvilke oplysninger behandler vi?">
          <p>Vi behandler kun det, du selv giver os i appen. Konkret:</p>
          <List items={[
            "Kontooplysninger: e-mailadresse og en krypteret adgangskode.",
            "Profil: dit navn, partner­navn, rolle (mor/far/medforælder), sprog­valg, ønsket familietype.",
            "Graviditets- og barneoplysninger: terminsdato eller barnets fødselsdato, barnets navn, fase (gravid/nyfødt/baby).",
            "Helbreds­oplysninger om mor (hvis du vælger at udfylde dem): fødselstype, eventuelle komplikationer, ernæringsmetode (amning/flaske/begge).",
            "Logninger fra dagligdagen: amninger, bleskift, søvn, milepæle, dagbogs­tekster, daglige check-ins, anerkendelser, “øjeblikke”.",
            "Familie­sammenkobling: en invitationskode du selv deler med din partner, og en henvisning til partnerens konto når I er forbundet.",
            "Teknisk: device-token til push-notifikationer, og automatisk genererede fejl-logs hvis appen skulle gå ned.",
          ]} />
          <p>
            Vi henter <em>ingen</em> oplysninger om dig fra tredjeparter. Vi
            tilkøber ingen data. Vi bruger ingen reklame-cookies eller
            tredjeparts-analyse-værktøjer.
          </p>
        </Section>

        <Section title="3. Hvorfor behandler vi dem? Og hvilket retsgrundlag?">
          <p>
            Vi behandler dine oplysninger for at kunne levere selve appen — vise
            uge-for-uge-indhold, synkronisere mellem dine enheder, forbinde dig
            med din partner, sende dig de notifikationer du har valgt, og holde
            dagbøgerne. Det er vores berettigede grundlag efter GDPR artikel
            6(1)(b) (opfyldelse af aftale).
          </p>
          <p>
            Helbreds­oplysninger om mor (fødselstype, komplikationer,
            ernærings­metode) er "særlige kategorier af personoplysninger"
            efter GDPR artikel 9. Vi behandler dem kun, fordi du udtrykkeligt
            har givet samtykke til det ved at udfylde dem i appen (artikel
            9(2)(a)). Du kan til enhver tid trække samtykket tilbage ved at
            slette felterne i appen eller bede os om at slette din konto.
          </p>
        </Section>

        <Section title="4. Hvem deler vi dem med?">
          <p>
            Vi sælger aldrig dine oplysninger. Vi viser ikke reklamer. Vi deler
            kun data med:
          </p>
          <List items={[
            "Din partner, hvis I selv har forbundet jer med en invitationskode — og kun de data der er nødvendige for det fælles overblik (opgaver, dagbog, milepæle). Privat indhold som chat og ventilrum deles aldrig.",
            "Vores databehandler Supabase (EU-region), der hoster databasen og håndterer login. Vi har en databehandleraftale med dem.",
            "Apple, i form af tekniske push-tokens, hvis du har slået notifikationer til.",
            "Vores AI-leverandør (Anthropic) når du bruger MELO-chat. Beskeder sendes anonymiseret — uden e-mail eller navn — og bruges ikke til træning af AI-modeller.",
          ]} />
          <p>
            Vi udleverer kun data til myndigheder, hvis vi er retligt forpligtet
            til det.
          </p>
        </Section>

        <Section title="5. Hvor opbevares de — og hvor længe?">
          <p>
            Data ligger i Supabase' EU-region (Frankfurt). Data forlader ikke
            EU, undtagen når du selv bruger MELO-chat, hvor anonymiserede
            beskeder sendes til Anthropic via deres EU-datacenter, hvor det er
            tilgængeligt.
          </p>
          <p>
            Vi opbevarer dine oplysninger så længe din konto eksisterer. Sletter
            du kontoen, slettes alle dine personoplysninger inden for 30 dage —
            med undtagelse af automatiske backup­filer, der ryddes inden for
            yderligere 30 dage.
          </p>
        </Section>

        <Section title="6. Sikkerhed">
          <p>
            Adgang til dine data er beskyttet med Row Level Security i
            databasen: din egen konto kan kun se sine egne rækker, og din
            partner kan kun se de rækker, I udtrykkeligt har valgt at dele
            gennem familie­koblingen. Adgangskoder er hashed og lagret hos
            Supabase Auth — de er aldrig synlige for os.
          </p>
          <p>
            Forbindelsen til serveren krypteres altid med TLS. Hvis vi opdager
            et brud på sikkerheden, der kan true dine rettigheder, kontakter vi
            dig og Datatilsynet inden for 72 timer, som loven kræver.
          </p>
        </Section>

        <Section title="7. Dine rettigheder">
          <p>Du har til enhver tid ret til:</p>
          <List items={[
            "at få indsigt i, hvilke oplysninger vi har om dig",
            "at få rettet forkerte oplysninger",
            "at få slettet dine oplysninger (“retten til at blive glemt”)",
            "at få begrænset behandlingen, hvis du har en indsigelse",
            "at gøre indsigelse mod en behandling",
            "at få udleveret dine oplysninger i et maskinlæsbart format (dataportabilitet)",
            "at trække et samtykke tilbage, hvor behandlingen bygger på det",
            "at klage til Datatilsynet (datatilsynet.dk) hvis du mener, vi behandler dine oplysninger forkert.",
          ]} />
          <p>
            Skriv til{" "}
            <a href="mailto:hej@meloparents.com" className="underline">
              hej@meloparents.com
            </a>{" "}
            — vi svarer inden for 30 dage.
          </p>
        </Section>

        <Section title="8. Børn">
          <p>
            Melo er et redskab til <em>forældre</em>, ikke et redskab til børn.
            Vi registrerer barnets navn og fødselsdato, fordi det bruges til at
            personalisere indholdet til dig. Vi behandler ikke oplysningerne til
            markedsføring, og vi deler dem ikke med tredjeparter ud over det,
            der er beskrevet ovenfor. Appen henvender sig til personer over 18 år.
          </p>
        </Section>

        <Section title="9. Sundhedsfagligt forbehold">
          <p>
            Indholdet i Melo — uge-for-uge, råd, MELO-chat — er generel
            information og støtte. Det erstatter <em>aldrig</em> kontakt til
            jordemoder, sundhedsplejerske, læge eller anden fagperson. Ved
            symptomer, bekymring eller akut behov: kontakt din egen læge,
            akuttelefonen 1813 (Region Hovedstaden) eller relevant vagtlæge.
            Ved livstruende situationer: ring 112.
          </p>
        </Section>

        <Section title="10. Ændringer i denne politik">
          <p>
            Vi opdaterer denne politik, hvis vores behandling ændrer sig.
            Væsentlige ændringer varsler vi i appen mindst 30 dage før, de
            træder i kraft. Den seneste version vil altid stå på denne side med
            ny "senest opdateret"-dato.
          </p>
        </Section>

        <Section title="11. Kontakt">
          <p>
            <strong>Melo Parents ApS</strong>
            <br />
            CVR: [indsæt CVR-nummer]
            <br />
            E-mail:{" "}
            <a href="mailto:hej@meloparents.com" className="underline">
              hej@meloparents.com
            </a>
          </p>
        </Section>

      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────

function Intro() {
  return (
    <div
      className="rounded-2xl px-5 py-4"
      style={{
        background: "hsl(var(--cream))",
        border: "1px solid hsl(var(--stone-light))",
      }}
    >
      <p className="text-[0.9rem] leading-relaxed">
        Melo er bygget op om to ord: <strong>tillid</strong> og{" "}
        <strong>tryghed</strong>. Det betyder også, at vi tager dine
        oplysninger alvorligt. Denne side forklarer i klar tale, hvilke
        oplysninger vi har, hvad vi bruger dem til, hvor de ligger, og hvad
        du kan kræve af os. Hvis noget er uklart, så skriv — vi svarer
        gerne.
      </p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-[1.05rem] font-semibold text-foreground mb-2 font-serif">
        {title}
      </h2>
      <div className="space-y-2.5">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
