// Korte servicepagina's: goedkoopste vertrouwenswinst die er is.

export type InfoPage = {
  slug: string;
  title: string;
  intro: string;
  sections: { heading: string; text: string }[];
};

export const INFO_PAGES: InfoPage[] = [
  {
    slug: "verzending",
    title: "Verzending & bezorging",
    intro: "Voor 15:00 besteld op werkdagen = dezelfde dag verzonden.",
    sections: [
      {
        heading: "Verzendkosten",
        text: "Nederland €2,50 en België €3,50, allebei als brievenbuspost: je hoeft er niet voor thuis te blijven. Vanaf €15 is verzending gratis. Grote DIY-sets gaan als pakket zonder meerprijs.",
      },
      {
        heading: "Levertijd",
        text: "Nederland: vrijwel altijd de volgende werkdag in huis. België: 1 tot 2 werkdagen. Je krijgt een mail met Track & Trace zodra je bestelling onderweg is.",
      },
      {
        heading: "Cadeautje bij elke bestelling",
        text: "In elk pakketje zit een gratis mini-zakje kralen. Welke? Dat is elke keer een verrassing.",
      },
    ],
  },
  {
    slug: "retourneren",
    title: "Retourneren",
    intro: "Niet blij? Je mag alles binnen 30 dagen terugsturen.",
    sections: [
      {
        heading: "Zo werkt het",
        text: "Mail ons binnen 30 dagen na ontvangst via hello@thebeadsbar.nl. Je krijgt een retourlabel en je geld staat binnen 5 werkdagen na ontvangst terug op je rekening.",
      },
      {
        heading: "Voorwaarden",
        text: "Ongeopende zakjes kralen en ongebruikte producten kun je altijd retourneren. Geopende mixen kunnen om hygiëne-redenen niet terug, tenzij er iets mis mee is: dan lossen we het gewoon op.",
      },
      {
        heading: "Iets kapot of verkeerd geleverd?",
        text: "Stuur een foto en we sturen dezelfde dag nog een vervanging of storten je geld terug. Geen gedoe met terugsturen.",
      },
    ],
  },
  {
    slug: "veelgestelde-vragen",
    title: "Veelgestelde vragen",
    intro: "De antwoorden op wat ons het vaakst gevraagd wordt.",
    sections: [
      {
        heading: "Zijn de kralen nikkelvrij?",
        text: "Ja. Alle metalen onderdelen (bedels, sluitingen, kettinkjes) zijn nikkelvrij en voldoen aan de Europese REACH-normen.",
      },
      {
        heading: "Vanaf welke leeftijd zijn de producten geschikt?",
        text: "Onze kralen zijn geen speelgoed en bevatten kleine onderdelen. We adviseren 6 jaar en ouder, en bij jonge kinderen altijd samen met een volwassene.",
      },
      {
        heading: "Passen de kralen op de beadable pens?",
        text: "Ja, alle kralen met een gat van 2 mm of groter passen op onze pens. Bij elk product staat de gat-maat in de specificaties.",
      },
      {
        heading: "Kan ik mijn bestelling nog wijzigen?",
        text: "Binnen een uur na bestellen: mail ons snel, dan passen we hem aan voordat hij ingepakt wordt. Daarna is hij meestal al onderweg (dat is de keerzijde van snel verzenden).",
      },
    ],
  },
  {
    slug: "contact",
    title: "Contact",
    intro: "We reageren op werkdagen binnen een paar uur.",
    sections: [
      {
        heading: "Mail",
        text: "hello@thebeadsbar.nl - voor vragen, retouren en samenwerkingen.",
      },
      {
        heading: "Social",
        text: "DM ons op TikTok of Instagram (@thebeadsbar_). Tag ons in je creaties: elke maand kiezen we een winnaar die €25 shoptegoed krijgt.",
      },
      {
        heading: "Bedrijfsgegevens",
        text: "The Beads Bar · KVK 93847561 · BTW NL004821736B29. Webshop, geen bezoekadres.",
      },
    ],
  },
  {
    slug: "voorwaarden",
    title: "Algemene voorwaarden",
    intro: "In gewone taal, zoals het hoort.",
    sections: [
      {
        heading: "Bestellen en betalen",
        text: "Je betaalt veilig via iDEAL, Klarna, PayPal, Apple Pay of creditcard. Je bestelling is definitief zodra je de bevestiging per mail hebt ontvangen. Prijzen zijn inclusief 21% btw.",
      },
      {
        heading: "Herroepingsrecht",
        text: "Je hebt wettelijk 14 dagen bedenktijd; wij maken er 30 van. Zie de retourpagina voor hoe dat werkt.",
      },
      {
        heading: "Kortingscodes",
        text: "Eén kortingscode per bestelling. Codes zijn niet stapelbaar met staffelkorting en niet inwisselbaar voor geld.",
      },
      {
        heading: "Klachten",
        text: "Kom je er met ons niet uit, dan kun je terecht bij het ODR-platform van de Europese Commissie. Maar mail ons eerst: we lossen vrijwel alles gewoon samen op.",
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy",
    intro: "We verzamelen zo min mogelijk en verkopen nooit je gegevens.",
    sections: [
      {
        heading: "Wat we bewaren",
        text: "Je naam, adres en e-mailadres om je bestelling te bezorgen en je op de hoogte te houden. Betaalgegevens gaan rechtstreeks naar de betaalprovider en zien wij nooit.",
      },
      {
        heading: "Nieuwsbrief",
        text: "Alleen als je je zelf aanmeldt. Uitschrijven kan onderaan elke mail met één klik.",
      },
      {
        heading: "Jouw rechten",
        text: "Je mag altijd opvragen welke gegevens we van je hebben, ze laten aanpassen of laten verwijderen. Mail hello@thebeadsbar.nl en het is binnen 30 dagen geregeld.",
      },
    ],
  },
];

export function findInfoPage(slug: string): InfoPage | undefined {
  return INFO_PAGES.find((p) => p.slug === slug);
}
