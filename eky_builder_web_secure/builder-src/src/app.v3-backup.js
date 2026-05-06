const { useState, useRef, useEffect, useCallback } = React;

// ============================================================
// EKY MEDIA — TEMPLATES (8 Branchen)
// ============================================================
const TEMPLATES = {
  elektriker: {
    name: "Elektriker",
    business: {
      name: "Bauer Elektrotechnik", legalName: "Bauer Elektrotechnik GmbH",
      type: "Electrician", tagline: "Elektromeister aus Regensburg — seit 1998",
      phone: "+49 941 2345678", email: "info@bauer-elektro.de",
      street: "Maximilianstraße 12", postalCode: "93047", city: "Regensburg",
      region: "Bayern", country: "DE", lat: "49.0134", lng: "12.1016",
      openingHours: "Mo-Fr 07:00-17:00", priceRange: "€€", foundingDate: "1998",
      areaServed: ["Regensburg", "Kelheim", "Neumarkt", "Schwandorf"],
      calendly: ""
    },
    colors: { primary: "#1a3a5c", accent: "#f4b942", bg: "#fafaf7", text: "#0a0a0a" },
    blocks: [
      { type: "nav", id: "n1" },
      { type: "hero", id: "h1", data: { Eyebrow: "Elektromeister · Regensburg", Überschrift: "Strom, der einfach <em>funktioniert</em>.", Untertitel: "Seit 1998 kümmern wir uns um Elektroinstallationen, Smart Home und Photovoltaik in Regensburg — meisterlich, pünktlich, fair kalkuliert.", "Button 1": "Kostenloses Angebot", "Button 2": "Leistungen ansehen" }},
      { type: "features", id: "f1", data: { Titel: "Was wir für Sie tun.", Elemente: [{ Titel: "Elektroinstallation", Text: "Neubau, Sanierung, Altbau — nach VDE-Norm und mit Meisterabnahme." }, { Titel: "Smart Home", Text: "KNX, Loxone, Homematic — wir planen Ihr intelligentes Zuhause." }, { Titel: "Photovoltaik", Text: "PV-Anlage mit Speicher, Wallbox und Netzanschluss — alles aus einer Hand, inkl. Förderantrag." }] }},
      { type: "split", id: "s1", data: { Eyebrow: "Über uns", Überschrift: "35 Jahre Erfahrung in Regensburg.", Text: "Als familiengeführter Meisterbetrieb kennen wir jede Steckdose zwischen Donau und Naab. 14 Mitarbeiter, garantierte Reaktionszeit von 48 Stunden." }},
      { type: "cta", id: "c1", data: { Überschrift: "Bereit für Ihr Projekt?", Untertitel: "Kostenloser Vor-Ort-Termin innerhalb von 5 Werktagen.", Button: "Jetzt Termin anfragen" }},
      { type: "faq", id: "faq1", data: { Titel: "Häufige Fragen", Elemente: [{ Frage: "Wie schnell können Sie kommen?", Antwort: "Bei Notfällen innerhalb von 24 Stunden. Für geplante Arbeiten binnen 5 Werktagen." }, { Frage: "Machen Sie auch Altbau-Sanierungen?", Antwort: "Ja — von der Bestandsaufnahme bis zur VDE-Abnahme." }, { Frage: "Förderung für Photovoltaik?", Antwort: "Wir übernehmen den kompletten Förderantrag bei KfW und BAFA." }] }},
      { type: "footer", id: "foot1" }
    ]
  },
  zahnarzt: {
    name: "Zahnarztpraxis",
    business: {
      name: "dentArt Fortis", legalName: "dentArt Fortis GmbH",
      type: "Dentist", tagline: "Zahnmedizin mit Handwerk und Haltung",
      phone: "+49 9441 123456", email: "praxis@dentart-fortis.de",
      street: "Donaustraße 8", postalCode: "93309", city: "Kelheim",
      region: "Bayern", country: "DE", lat: "48.9179", lng: "11.8768",
      openingHours: "Mo-Do 08:00-18:00, Fr 08:00-14:00", priceRange: "€€€", foundingDate: "2012",
      areaServed: ["Kelheim", "Abensberg", "Bad Abbach", "Regensburg"],
      calendly: ""
    },
    colors: { primary: "#2a4a3a", accent: "#c9a961", bg: "#fafaf7", text: "#0a0a0a" },
    blocks: [
      { type: "nav", id: "n1" },
      { type: "hero", id: "h1", data: { Eyebrow: "Zahnarztpraxis · Kelheim", Überschrift: "Zahnmedizin mit <em>Handwerk</em> und Haltung.", Untertitel: "Seit 2012 begleiten wir Familien in Kelheim mit moderner, schmerzarmer Zahnmedizin — persönlich, gründlich, ohne Hektik.", "Button 1": "Termin vereinbaren", "Button 2": "Leistungen ansehen" }},
      { type: "features", id: "f1", data: { Titel: "Was uns ausmacht.", Elemente: [{ Titel: "Schmerzarme Behandlung", Text: "Modernste Anästhesietechnik — auch bei Angstpatienten." }, { Titel: "Digitale Abdrücke", Text: "Kein Würgreiz. Intraoraler 3D-Scan in unter 2 Minuten." }, { Titel: "Eigenes Labor", Text: "Kronen und Inlays aus Kelheim — kürzere Wartezeit, volle Qualitätskontrolle." }] }},
      { type: "split", id: "s1", data: { Eyebrow: "Unser Team", Überschrift: "Drei Generationen, ein Anspruch.", Text: "Dr. Fortis sen. gründete die Praxis 2012. Heute arbeitet das 8-köpfige Team mit eigenem Labor und Spezialisierung auf Prophylaxe und Implantologie." }},
      { type: "cta", id: "c1", data: { Überschrift: "Termin online buchen.", Untertitel: "In unter 60 Sekunden — 24/7 verfügbar.", Button: "Zum Online-Kalender" }},
      { type: "faq", id: "faq1", data: { Titel: "Häufige Fragen", Elemente: [{ Frage: "Nehmen Sie neue Patienten auf?", Antwort: "Ja — Termin für Erstberatung binnen 2 Wochen." }, { Frage: "Was kostet eine Zahnreinigung?", Antwort: "89€, ca. 60 Minuten. Viele Krankenkassen bezuschussen auf Antrag." }, { Frage: "Angstpatienten?", Antwort: "Behandlung unter Lachgas oder Vollnarkose möglich." }] }},
      { type: "footer", id: "foot1" }
    ]
  },
  maler: {
    name: "Malerbetrieb",
    business: {
      name: "Huber Malermeister", legalName: "Huber Malermeister GmbH",
      type: "HousePainter", tagline: "Maler- und Lackierarbeiten im Altmühltal",
      phone: "+49 8421 98765", email: "info@huber-malermeister.de",
      street: "Ingolstädter Str. 42", postalCode: "85049", city: "Ingolstadt",
      region: "Bayern", country: "DE", lat: "48.7665", lng: "11.4257",
      openingHours: "Mo-Fr 07:00-16:30", priceRange: "€€", foundingDate: "1987",
      areaServed: ["Ingolstadt", "Eichstätt", "Neuburg", "Pfaffenhofen"],
      calendly: ""
    },
    colors: { primary: "#3a2a1a", accent: "#d4a574", bg: "#f8f5ef", text: "#0a0a0a" },
    blocks: [
      { type: "nav", id: "n1" },
      { type: "hero", id: "h1", data: { Eyebrow: "Malermeister · Ingolstadt", Überschrift: "Farbe ist <em>Handwerk</em>.", Untertitel: "Seit 1987 streichen, tapezieren und lackieren wir in Ingolstadt und dem Altmühltal. Innen, außen, Denkmalschutz — sauber, pünktlich, mit 5 Jahren Gewährleistung.", "Button 1": "Angebot anfragen", "Button 2": "Referenzen" }},
      { type: "features", id: "f1", data: { Titel: "Unsere Leistungen.", Elemente: [{ Titel: "Innenanstrich", Text: "Wohnungen, Büros, Treppenhäuser — von der Tapete bis zur Kalkfarbe." }, { Titel: "Fassadensanierung", Text: "WDVS, Silikatanstrich, Denkmalschutz-konforme Sanierung." }, { Titel: "Bodenbeschichtung", Text: "Epoxidharz für Garagen und Werkstätten, rutschfest und belastbar." }] }},
      { type: "split", id: "s1", data: { Eyebrow: "Über uns", Überschrift: "38 Jahre, drei Generationen Huber.", Text: "Gegründet 1987 von Max Huber sen., heute geführt von Enkel Lukas. 12 Mitarbeiter, Spezialisierung in historischen Techniken." }},
      { type: "cta", id: "c1", data: { Überschrift: "Ihr Projekt, unser Pinsel.", Untertitel: "Unverbindliche Besichtigung innerhalb einer Woche.", Button: "Termin vereinbaren" }},
      { type: "faq", id: "faq1", data: { Titel: "Häufige Fragen", Elemente: [{ Frage: "Wie lange dauert ein Wohnungsanstrich?", Antwort: "Eine 80qm-Wohnung streichen wir in 2-3 Werktagen — inkl. Abdecken und Endreinigung." }, { Frage: "Arbeiten Sie mit Ökofarben?", Antwort: "Ja — auf Wunsch ausschließlich mineralische Farben oder Naturharzlacke." }, { Frage: "Denkmalschutz?", Antwort: "Wir haben Aufträge für das Neue Schloss Ingolstadt ausgeführt." }] }},
      { type: "footer", id: "foot1" }
    ]
  },
  klempner: {
    name: "Sanitär & Heizung",
    business: {
      name: "Rohr & Heiz Meister", legalName: "Rohr & Heiz Meister GmbH",
      type: "Plumber", tagline: "Sanitär und Heizung aus Ingolstadt",
      phone: "+49 841 1234567", email: "info@rohr-heiz.de",
      street: "Schrannenstraße 5", postalCode: "85049", city: "Ingolstadt",
      region: "Bayern", country: "DE", lat: "48.7652", lng: "11.4227",
      openingHours: "Mo-Fr 07:00-16:30", priceRange: "€€", foundingDate: "2005",
      areaServed: ["Ingolstadt", "Neuburg", "Pfaffenhofen", "Eichstätt"],
      calendly: ""
    },
    colors: { primary: "#1a3a5c", accent: "#b87333", bg: "#fafaf9", text: "#0a0a0a" },
    blocks: [
      { type: "nav", id: "n1" },
      { type: "hero", id: "h1", data: { Eyebrow: "Sanitär & Heizung · Ingolstadt", Überschrift: "Wasser, das <em>fließt</em>.", Untertitel: "Seit 2005 installieren und reparieren wir Heizungsanlagen, Bäder und Wasserrohre — schnell, sauber, mit Festpreisgarantie.", "Button 1": "Notfallservice anfragen", "Button 2": "Leistungen ansehen" }},
      { type: "features", id: "f1", data: { Titel: "Was wir für Sie tun.", Elemente: [{ Titel: "Heizungsinstallation", Text: "Gas, Öl, Wärmepumpe, Pellets — wir planen und installieren inkl. Förderantrag." }, { Titel: "Badsanierung", Text: "Komplette Badsanierung aus einer Hand — inkl. Projektplanung." }, { Titel: "Rohrnotdienst", Text: "24/7 Notfallservice bei Rohrbruch — Reaktionszeit unter 2 Stunden." }] }},
      { type: "split", id: "s1", data: { Eyebrow: "Über uns", Überschrift: "20 Jahre Verlässlichkeit.", Text: "10 Mitarbeiter, eigenes Lager mit Sofortteilen, Notfallbereitschaft 365 Tage im Jahr." }},
      { type: "cta", id: "c1", data: { Überschrift: "Rohre unter Druck?", Untertitel: "Kostenloser Bestandscheck innerhalb von 48 Stunden.", Button: "Jetzt Termin anfragen" }},
      { type: "faq", id: "faq1", data: { Titel: "Häufige Fragen", Elemente: [{ Frage: "Kommen Sie nachts?", Antwort: "Ja — 24/7 Notfallservice, auch an Wochenenden und Feiertagen." }, { Frage: "Förderung für Heizung?", Antwort: "Bei Wärmepumpen bis zu 70% Förderung möglich — wir übernehmen den Antrag." }, { Frage: "Was kostet eine Badsanierung?", Antwort: "Ab ca. 8.000€ für ein 6qm-Bad — verbindliches Festpreisangebot nach Besichtigung." }] }},
      { type: "footer", id: "foot1" }
    ]
  },
  gastronomie: {
    name: "Restaurant & Gastro",
    business: {
      name: "Trattoria da Marco", legalName: "Trattoria da Marco GmbH",
      type: "Restaurant", tagline: "Italienische Küche in Würzburg — seit 2008",
      phone: "+49 931 876543", email: "tisch@trattoria-marco.de",
      street: "Domstraße 18", postalCode: "97070", city: "Würzburg",
      region: "Bayern", country: "DE", lat: "49.7944", lng: "9.9294",
      openingHours: "Di-So 12:00-14:30, 18:00-23:00", priceRange: "€€€", foundingDate: "2008",
      areaServed: ["Würzburg", "Veitshöchheim", "Ochsenfurt"],
      calendly: ""
    },
    colors: { primary: "#8b1a1a", accent: "#d4a832", bg: "#fdf8f0", text: "#0a0a0a" },
    blocks: [
      { type: "nav", id: "n1" },
      { type: "hero", id: "h1", data: { Eyebrow: "Ristorante · Würzburg", Überschrift: "Cucina italiana. <em>Come a casa.</em>", Untertitel: "Seit 2008 servieren wir handgemachte Pasta, frischen Fisch und ehrliche Weine im Herzen Würzburgs — jeden Dienstag bis Sonntag.", "Button 1": "Tisch reservieren", "Button 2": "Speisekarte ansehen" }},
      { type: "features", id: "f1", data: { Titel: "Was uns besonders macht.", Elemente: [{ Titel: "Hausgemachte Pasta", Text: "Täglich frisch — nach Rezepten der Nonna aus Neapel." }, { Titel: "Frischer Fisch", Text: "Drei Mal pro Woche direkt vom Großmarkt. Seasonal, regional, ehrlich." }, { Titel: "Weinauswahl", Text: "90+ Positionen aus Franken und Italien. Offene Weine ab 4,50€." }] }},
      { type: "split", id: "s1", data: { Eyebrow: "Unsere Geschichte", Überschrift: "Seit 2008 in Würzburg zuhause.", Text: "Marco Ferretti kam 2006 aus Neapel nach Würzburg. Zwei Jahre später eröffnete er mit seiner Frau das Trattoria — mit 40 Plätzen und der Idee, dass gutes Essen Zeit braucht." }},
      { type: "cta", id: "c1", data: { Überschrift: "Tisch reservieren.", Untertitel: "Online in unter 60 Sekunden — oder rufen Sie uns an.", Button: "Jetzt reservieren" }},
      { type: "faq", id: "faq1", data: { Titel: "Häufige Fragen", Elemente: [{ Frage: "Wie buche ich einen Tisch?", Antwort: "Online über unsere Buchungsseite oder telefonisch unter +49 931 876543." }, { Frage: "Gibt es Optionen für Vegetarier?", Antwort: "Ja — ca. 40% unserer Karte ist vegetarisch oder vegan." }, { Frage: "Reservierung für Gruppen?", Antwort: "Gerne — für Gruppen ab 8 Personen bitte per E-Mail anfragen." }] }},
      { type: "footer", id: "foot1" }
    ]
  },
  barbershop: {
    name: "Barbershop",
    business: {
      name: "The Sharp Cut", legalName: "The Sharp Cut GmbH",
      type: "BarberShop", tagline: "Premium Barbershop in Würzburg",
      phone: "+49 931 445566", email: "book@thesharpcut.de",
      street: "Juliuspromenade 7", postalCode: "97070", city: "Würzburg",
      region: "Bayern", country: "DE", lat: "49.7985", lng: "9.9302",
      openingHours: "Di-Fr 09:00-19:00, Sa 09:00-16:00", priceRange: "€€", foundingDate: "2019",
      areaServed: ["Würzburg", "Zell", "Höchberg"],
      calendly: ""
    },
    colors: { primary: "#1a1a2e", accent: "#c9a831", bg: "#f7f5f0", text: "#0a0a0a" },
    blocks: [
      { type: "nav", id: "n1" },
      { type: "hero", id: "h1", data: { Eyebrow: "Premium Barbershop · Würzburg", Überschrift: "Dein Haar. <em>Unser Handwerk.</em>", Untertitel: "Klassische Herrenschnitte, Rasiermesser-Behandlungen und Bartpflege — in entspannter Atmosphäre, ohne Kompromisse bei der Qualität.", "Button 1": "Termin buchen", "Button 2": "Preise ansehen" }},
      { type: "features", id: "f1", data: { Titel: "Unsere Leistungen.", Elemente: [{ Titel: "Klassischer Haarschnitt", Text: "Scherenarbeit und Maschine — präzise, zeitlos, auf deine Gesichtsform abgestimmt." }, { Titel: "Heißwachs-Rasur", Text: "Rasiermesser, Heißwachs und Entspannung. Eine Erfahrung, keine Routinerasur." }, { Titel: "Bartpflege", Text: "Formen, Trimmen, Ölen — dein Bart bekommt die Aufmerksamkeit die er verdient." }] }},
      { type: "split", id: "s1", data: { Eyebrow: "Über uns", Überschrift: "Gegründet 2019 mit Überzeugung.", Text: "The Sharp Cut entstand aus dem Wunsch, einen Ort zu schaffen wo Männer wirklich gut aussehen — ohne Schnellschnitt-Atmosphäre. Vier Barber, eine Leidenschaft." }},
      { type: "cta", id: "c1", data: { Überschrift: "Bereit für einen neuen Look?", Untertitel: "Termin online in unter 30 Sekunden buchen.", Button: "Termin buchen" }},
      { type: "faq", id: "faq1", data: { Titel: "Häufige Fragen", Elemente: [{ Frage: "Wie buche ich einen Termin?", Antwort: "Online über unseren Buchungslink — einfach Barber, Service und Zeit wählen." }, { Frage: "Was kostet ein Haarschnitt?", Antwort: "Klassischer Schnitt ab 28€, inkl. Waschen und Finish." }, { Frage: "Walk-ins möglich?", Antwort: "Wenn Platz ist gerne — aber empfehlen würden wir immer eine Buchung." }] }},
      { type: "footer", id: "foot1" }
    ]
  },
  hotel: {
    name: "Hotel & Boutique",
    business: {
      name: "Hotel am Weinberg", legalName: "Hotel am Weinberg GmbH",
      type: "Hotel", tagline: "Boutique Hotel mit Blick auf Würzburger Weinberge",
      phone: "+49 931 556677", email: "buchung@hotel-weinberg.de",
      street: "Randersackerer Str. 22", postalCode: "97072", city: "Würzburg",
      region: "Bayern", country: "DE", lat: "49.7781", lng: "9.9502",
      openingHours: "Rezeption: 07:00-22:00", priceRange: "€€€€", foundingDate: "2015",
      areaServed: ["Würzburg", "Randersacker", "Kitzingen"],
      calendly: ""
    },
    colors: { primary: "#2c3e50", accent: "#a08060", bg: "#f9f7f4", text: "#0a0a0a" },
    blocks: [
      { type: "nav", id: "n1" },
      { type: "hero", id: "h1", data: { Eyebrow: "Boutique Hotel · Würzburg", Überschrift: "Wein. Stille. <em>Weinberg.</em>", Untertitel: "24 Zimmer mit Blick auf die fränkischen Weinberge — mitten in Würzburg und doch weit weg vom Alltag. Frühstück mit Eigenproduktion, Spa mit Weinbad.", "Button 1": "Zimmer buchen", "Button 2": "Angebote ansehen" }},
      { type: "features", id: "f1", data: { Titel: "Was Sie erwartet.", Elemente: [{ Titel: "24 Boutique-Zimmer", Text: "Jedes Zimmer individuell gestaltet — Parkett, Naturmaterialien, Weinberg-Blick." }, { Titel: "Weinkeller & Bar", Text: "Eigener Weinkeller mit über 200 Positionen aus Franken. Bar bis 23 Uhr." }, { Titel: "Spa & Weinbad", Text: "Sauna, Dampfbad und unser einzigartiges Weinbad mit Traubenkernen." }] }},
      { type: "split", id: "s1", data: { Eyebrow: "Unser Haus", Überschrift: "Seit 2015 ein Rückzugsort.", Text: "Das Hotel entstand in einem denkmalgeschützten Winzerhaus. Die Familie Stark hat es über 3 Jahre restauriert — mit Respekt für das Alte und Liebe zum Neuen." }},
      { type: "cta", id: "c1", data: { Überschrift: "Ihr nächster Kurzurlaub.", Untertitel: "Jetzt buchen und direkt den besten Preis erhalten.", Button: "Zimmer buchen" }},
      { type: "faq", id: "faq1", data: { Titel: "Häufige Fragen", Elemente: [{ Frage: "Gibt es Parkplätze?", Antwort: "Ja — kostenloser Parkplatz direkt am Hotel, 24 Plätze." }, { Frage: "Ist Frühstück inklusive?", Antwort: "Frühstück kann dazu gebucht werden — 18€/Person, täglich 07:30-10:30 Uhr." }, { Frage: "Haustiere erlaubt?", Antwort: "Kleine Hunde sind willkommen — bitte bei Buchung angeben." }] }},
      { type: "footer", id: "foot1" }
    ]
  },
  kanzlei: {
    name: "Kanzlei & Beratung",
    business: {
      name: "Kanzlei Berger & Partner", legalName: "Berger & Partner Rechtsanwälte GbR",
      type: "LegalService", tagline: "Rechtsanwälte für Unternehmen und Privatpersonen in Bayern",
      phone: "+49 931 778899", email: "kontakt@berger-kanzlei.de",
      street: "Sanderstraße 12", postalCode: "97070", city: "Würzburg",
      region: "Bayern", country: "DE", lat: "49.7913", lng: "9.9360",
      openingHours: "Mo-Fr 09:00-18:00", priceRange: "€€€", foundingDate: "2010",
      areaServed: ["Würzburg", "Schweinfurt", "Aschaffenburg"],
      calendly: ""
    },
    colors: { primary: "#1c2b3a", accent: "#8a6c45", bg: "#fafaf8", text: "#0a0a0a" },
    blocks: [
      { type: "nav", id: "n1" },
      { type: "hero", id: "h1", data: { Eyebrow: "Rechtsanwälte · Würzburg", Überschrift: "Recht klar. <em>Recht sicher.</em>", Untertitel: "Berger & Partner steht für klare Beratung ohne Umwege. Schwerpunkte: Unternehmensrecht, Erbrecht und Arbeitsrecht — für Privatpersonen und mittelständische Unternehmen.", "Button 1": "Beratungstermin anfragen", "Button 2": "Leistungen ansehen" }},
      { type: "features", id: "f1", data: { Titel: "Unsere Schwerpunkte.", Elemente: [{ Titel: "Unternehmensrecht", Text: "Gesellschaftsgründungen, Verträge, Nachfolge — wir begleiten Sie in jeder Unternehmensphase." }, { Titel: "Erbrecht", Text: "Testamente, Erbstreitigkeiten, Pflichtteil — diskret, präzise, lösungsorientiert." }, { Titel: "Arbeitsrecht", Text: "Arbeitgeber- und Arbeitnehmerseite — Kündigungen, Abfindungen, Abmahnungen." }] }},
      { type: "split", id: "s1", data: { Eyebrow: "Über uns", Überschrift: "Gegründet 2010 — gewachsen durch Vertrauen.", Text: "Drei Rechtsanwälte, zwei Fachanwälte, ein Ziel: rechtliche Klarheit für unsere Mandanten. Wir erklären Recht verständlich — ohne Kanzleisprache." }},
      { type: "cta", id: "c1", data: { Überschrift: "Erstberatung anfragen.", Untertitel: "Wir melden uns innerhalb von 24 Stunden.", Button: "Termin anfragen" }},
      { type: "faq", id: "faq1", data: { Titel: "Häufige Fragen", Elemente: [{ Frage: "Was kostet eine Erstberatung?", Antwort: "Die Erstberatung kostet 90€/Stunde — nach RVG abgerechnet, transparent und nachvollziehbar." }, { Frage: "Kann ich auch digital beraten werden?", Antwort: "Ja — Videokonfrenzen über Zoom oder Teams möglich." }, { Frage: "Wie schnell reagieren Sie?", Antwort: "In dringenden Fällen noch am selben Tag, sonst innerhalb von 24 Stunden." }] }},
      { type: "footer", id: "foot1" }
    ]
  }
};

const BLOCK_LIBRARY = [
  { type: "hero", label: "Hero" },
  { type: "trust", label: "Vertrauen" },
  { type: "features", label: "Leistungen" },
  { type: "usps", label: "USPs" },
  { type: "process", label: "Ablauf" },
  { type: "split", label: "Split" },
  { type: "cta", label: "Aktion" },
  { type: "testimonial", label: "Bewertung" },
  { type: "faq", label: "FAQ" },
  { type: "pricing", label: "Preise" },
  { type: "gallery", label: "Galerie" },
];

const BLOCK_LABELS = {
  nav: "Navigation", hero: "Hero", trust: "Vertrauen", features: "Leistungen",
  usps: "USPs", process: "Ablauf", split: "Split",
  cta: "Aktion", testimonial: "Bewertung", faq: "FAQ",
  pricing: "Preise", gallery: "Galerie", footer: "Footer"
};

const DEFAULT_BLOCK = {
  hero: { Eyebrow: "Eyebrow", Überschrift: "Überschrift hier.", Untertitel: "Untertitel.", "Button 1": "Primär", "Button 2": "Sekundär" },
  features: { Titel: "Features", Elemente: [{ Titel: "Feature 1", Text: "Beschreibung." }, { Titel: "Feature 2", Text: "Beschreibung." }, { Titel: "Feature 3", Text: "Beschreibung." }] },
  split: { Eyebrow: "Bereich", Überschrift: "Überschrift.", Text: "Text hier." },
  cta: { Überschrift: "Call to Action", Untertitel: "Unterzeile.", Button: "Jetzt handeln" },
  faq: { Titel: "Häufige Fragen", Elemente: [{ Frage: "Frage?", Antwort: "Antwort." }, { Frage: "Frage 2?", Antwort: "Antwort 2." }] },
  gallery: { Titel: "Galerie", Anzahl: 6 },
  testimonial: { Zitat: "Tolle Arbeit, pünktlich und sauber.", Autor: "Max Mustermann, Musterfirma" },
  pricing: { Titel: "Unsere Preise", Pakete: [{ Name: "Basis", Preis: "ab 500€" }, { Name: "Plus", Preis: "ab 1.200€" }, { Name: "Premium", Preis: "ab 2.500€" }] }
};

const keyMap = {
  hero: { Eyebrow: "eyebrow", Überschrift: "headline", Untertitel: "sub", "Button 1": "cta1", "Button 2": "cta2" },
  features: { Titel: "title", Elemente: "items" },
  split: { Eyebrow: "eyebrow", Überschrift: "headline", Text: "text" },
  cta: { Überschrift: "headline", Untertitel: "sub", Button: "cta" },
  faq: { Titel: "title", Elemente: "items" },
  gallery: { Titel: "title", Anzahl: "images" },
  testimonial: { Zitat: "quote", Autor: "author" },
  pricing: { Titel: "title", Pakete: "plans" }
};

const itemKeyMap = {
  features: { Titel: "title", Text: "text" },
  faq: { Frage: "q", Antwort: "a" },
  pricing: { Name: "name", Preis: "price" }
};

function translateData(type, data) {
  const map = keyMap[type];
  if (!map) return data;
  const result = {};
  for (const [de, en] of Object.entries(map)) {
    const val = data[de];
    if (Array.isArray(val)) {
      const imap = itemKeyMap[type];
      result[en] = val.map(item => {
        if (!imap) return item;
        const newItem = {};
        for (const [dk, ek] of Object.entries(imap)) newItem[ek] = item[dk];
        return newItem;
      });
    } else {
      result[en] = val;
    }
  }
  return result;
}

function timeSince(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 5) return 'gerade eben';
  if (s < 60) return `vor ${s}s`;
  if (s < 3600) return `vor ${Math.floor(s / 60)}min`;
  return `vor ${Math.floor(s / 3600)}h`;
}

// ============================================================
// ONBOARDING — Neues Projekt
// ============================================================
function OnboardingModal({ onStart }) {
  const [step, setStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('elektriker');
  const [firmendaten, setFirmendaten] = useState({
    name: '', phone: '', email: '', street: '', postalCode: '', city: '', calendly: ''
  });

  const templateKeys = Object.keys(TEMPLATES);

  if (step === 0) return (
    <div style={S.overlay}>
      <div style={{ ...S.modal, maxWidth: 720 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={S.ekyLogo}><span style={{ color: '#1A2B4A' }}>E</span><span style={{ color: '#C4923A' }}>KY</span></div>
          <div style={{ fontSize: 22, fontFamily: "'Instrument Serif', serif", marginBottom: 6 }}>Neues Projekt starten</div>
          <div style={{ fontSize: 12, color: '#8a8a8f' }}>Wähle eine Branche als Ausgangspunkt</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 24 }}>
          {templateKeys.map(key => (
            <div key={key} onClick={() => setSelectedTemplate(key)} style={{
              padding: '14px 10px', background: selectedTemplate === key ? 'rgba(196,146,58,0.12)' : '#1a1a1c',
              border: `1.5px solid ${selectedTemplate === key ? '#C4923A' : '#28282b'}`,
              borderRadius: 8, cursor: 'pointer', textAlign: 'center'
            }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>
                {key === 'elektriker' ? '⚡' : key === 'zahnarzt' ? '🦷' : key === 'maler' ? '🎨' : key === 'klempner' ? '🔧' : key === 'gastronomie' ? '🍝' : key === 'barbershop' ? '✂️' : key === 'hotel' ? '🏨' : '⚖️'}
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: selectedTemplate === key ? '#C4923A' : '#f4f4f2' }}>{TEMPLATES[key].name}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={() => setStep(1)} style={S.btnGold}>Weiter → Firmendaten</button>
        </div>
      </div>
    </div>
  );

  if (step === 1) return (
    <div style={S.overlay}>
      <div style={{ ...S.modal, maxWidth: 560 }}>
        <div style={{ fontSize: 20, fontFamily: "'Instrument Serif', serif", marginBottom: 4 }}>Firmendaten eingeben</div>
        <div style={{ fontSize: 12, color: '#8a8a8f', marginBottom: 20 }}>Diese Daten werden automatisch in alle Texte und den HTML-Export übernommen.</div>
        {[
          { k: 'name', label: 'Firmenname *', placeholder: 'z.B. Müller Elektrotechnik GmbH' },
          { k: 'phone', label: 'Telefon *', placeholder: '+49 941 123456' },
          { k: 'email', label: 'E-Mail *', placeholder: 'info@firma.de' },
          { k: 'street', label: 'Straße + Nr.', placeholder: 'Musterstraße 12' },
          { k: 'postalCode', label: 'PLZ', placeholder: '97070' },
          { k: 'city', label: 'Stadt *', placeholder: 'Würzburg' },
          { k: 'calendly', label: 'Calendly-Link (optional)', placeholder: 'https://calendly.com/...' }
        ].map(f => (
          <div key={f.k} style={{ marginBottom: 10 }}>
            <label style={S.label}>{f.label}</label>
            <input style={S.input} placeholder={f.placeholder} value={firmendaten[f.k]} onChange={e => setFirmendaten({ ...firmendaten, [f.k]: e.target.value })} />
          </div>
        ))}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
          <button onClick={() => setStep(0)} style={S.btnGhost}>← Zurück</button>
          <button onClick={() => {
            const tpl = JSON.parse(JSON.stringify(TEMPLATES[selectedTemplate]));
            if (firmendaten.name) tpl.business.name = firmendaten.name;
            if (firmendaten.phone) tpl.business.phone = firmendaten.phone;
            if (firmendaten.email) tpl.business.email = firmendaten.email;
            if (firmendaten.street) tpl.business.street = firmendaten.street;
            if (firmendaten.postalCode) tpl.business.postalCode = firmendaten.postalCode;
            if (firmendaten.city) { tpl.business.city = firmendaten.city; }
            if (firmendaten.calendly) tpl.business.calendly = firmendaten.calendly;
            onStart(selectedTemplate, tpl.blocks, tpl.business, tpl.colors);
          }} style={S.btnGold}>Projekt erstellen →</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// HAUPT-APP
// ============================================================
function EKYBuilder() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [template, setTemplate] = useState('elektriker');
  const [blocks, setBlocks] = useState(TEMPLATES.elektriker.blocks);
  const [business, setBusiness] = useState(TEMPLATES.elektriker.business);
  const [colors, setColors] = useState(TEMPLATES.elektriker.colors);
  const [selectedId, setSelectedId] = useState(null);
  const [leftTab, setLeftTab] = useState('blocks');
  const [viewport, setViewport] = useState('desktop');
  const [showExport, setShowExport] = useState(false);
  const [exportedHtml, setExportedHtml] = useState('');
  const [copiedToast, setCopiedToast] = useState(false);
  const [saveStatus, setSaveStatus] = useState('saved');
  const [lastSaved, setLastSaved] = useState(Date.now());
  const [tick, setTick] = useState(0);
  const [draggedType, setDraggedType] = useState(null);
  const [draggedBlockId, setDraggedBlockId] = useState(null);
  const [dropIndex, setDropIndex] = useState(null);
  const saveTimer = useRef(null);
  const isFirst = useRef(true);
  const canvasRef = useRef(null);
  const lastDragY = useRef(null);
  const scrollRAF = useRef(null);
  const [toast, setToast] = useState('');

  useEffect(() => { const id = setInterval(() => setTick(t => t + 1), 15000); return () => clearInterval(id); }, []);

  // Autosave
  useEffect(() => {
    try {
      const saved = localStorage.getItem('eky_builder_v2');
      if (saved) {
        const d = JSON.parse(saved);
        if (d.blocks) setBlocks(d.blocks);
        if (d.business) setBusiness(d.business);
        if (d.colors) setColors(d.colors);
        if (d.template) setTemplate(d.template);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }
    setSaveStatus('unsaved');
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      setSaveStatus('saving');
      try {
        localStorage.setItem('eky_builder_v2', JSON.stringify({ version: 2, template, blocks, business, colors }));
        setLastSaved(Date.now());
        setSaveStatus('saved');
      } catch (e) { setSaveStatus('unsaved'); }
    }, 800);
    return () => clearTimeout(saveTimer.current);
  }, [blocks, business, colors]);

  const isDragging = draggedType !== null || draggedBlockId !== null;

  // Drag-Scroll
  useEffect(() => {
    if (!isDragging) { if (scrollRAF.current) cancelAnimationFrame(scrollRAF.current); return; }
    const ZONE = 80;
    const loop = () => {
      const canvas = canvasRef.current;
      const y = lastDragY.current;
      if (canvas && y !== null) {
        const rect = canvas.getBoundingClientRect();
        const dt = y - rect.top, db = rect.bottom - y;
        if (dt < ZONE && dt > 0) canvas.scrollTop -= 8 * Math.pow(1 - dt / ZONE, 2);
        else if (db < ZONE && db > 0) canvas.scrollTop += 8 * Math.pow(1 - db / ZONE, 2);
      }
      scrollRAF.current = requestAnimationFrame(loop);
    };
    scrollRAF.current = requestAnimationFrame(loop);
    return () => { if (scrollRAF.current) cancelAnimationFrame(scrollRAF.current); };
  }, [isDragging]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const loadTemplate = (key) => {
    if (!confirm('Template wechseln? Aktuelle Änderungen gehen verloren.')) return;
    setTemplate(key); setBlocks(TEMPLATES[key].blocks);
    setBusiness(TEMPLATES[key].business); setColors(TEMPLATES[key].colors);
    setSelectedId(null);
  };

  const handleCanvasDrop = (e, index) => {
    e.preventDefault();
    if (draggedType) {
      const nb = { type: draggedType, id: draggedType + '_' + Date.now(), data: JSON.parse(JSON.stringify(DEFAULT_BLOCK[draggedType] || {})) };
      const arr = [...blocks]; arr.splice(index, 0, nb);
      setBlocks(arr); setSelectedId(nb.id);
    } else if (draggedBlockId) {
      const from = blocks.findIndex(b => b.id === draggedBlockId);
      if (from === -1) return;
      const arr = [...blocks]; const [moved] = arr.splice(from, 1);
      const at = from < index ? index - 1 : index;
      arr.splice(at, 0, moved); setBlocks(arr);
    }
    setDraggedType(null); setDraggedBlockId(null); setDropIndex(null); lastDragY.current = null;
  };

  const deleteBlock = (id) => {
    if (!confirm('Block löschen?')) return;
    setBlocks(blocks.filter(b => b.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const updateBlock = (id, field, value) => setBlocks(blocks.map(b => b.id === id ? { ...b, data: { ...b.data, [field]: value } } : b));

  const selectedBlock = blocks.find(b => b.id === selectedId);

  const exportHtml = () => { const html = generateHtml(blocks, business, colors); setExportedHtml(html); setShowExport(true); };

  const saveProject = async () => {
    if (window.electronAPI) {
      const r = await window.electronAPI.saveProject({ version: 2, template, blocks, business, colors });
      if (r?.success) { setLastSaved(Date.now()); setSaveStatus('saved'); showToast('✓ Projekt gespeichert'); }
    } else { showToast('Nur in der Desktop-App verfügbar'); }
  };

  const openProject = async () => {
    if (window.electronAPI) {
      const r = await window.electronAPI.openProject();
      if (r?.success && r.data) {
        if (!confirm('Projekt öffnen? Aktuelle Änderungen gehen verloren.')) return;
        const { template: t, blocks: b, business: biz, colors: c } = r.data;
        setTemplate(t || 'elektriker'); setBlocks(b || TEMPLATES.elektriker.blocks);
        setBusiness(biz || TEMPLATES.elektriker.business); setColors(c || TEMPLATES.elektriker.colors);
        setSelectedId(null); showToast('✓ Projekt geöffnet');
      }
    } else { showToast('Nur in der Desktop-App verfügbar'); }
  };

  const downloadHtml = async () => {
    if (window.electronAPI) {
      const r = await window.electronAPI.saveHtml(exportedHtml, `${business.name.toLowerCase().replace(/\s+/g, '-')}.html`);
      if (r?.success) showToast(`✓ Gespeichert: ${r.filePath}`);
    } else {
      const blob = new Blob([exportedHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url;
      a.download = `${business.name.toLowerCase().replace(/\s+/g, '-')}.html`; a.click();
      URL.revokeObjectURL(url);
    }
  };

  const openInBrowser = async () => {
    if (window.electronAPI) { await window.electronAPI.openInBrowser(exportedHtml); }
    else {
      const w = window.open('', '_blank');
      w.document.write(exportedHtml); w.document.close();
    }
  };

  useEffect(() => {
    window.ekyApp = {
      exportHtml, saveProject, openProject,
      newProject: () => setShowOnboarding(true)
    };
  }, [blocks, business, colors, template]);

  const cw = viewport === 'mobile' ? 375 : viewport === 'tablet' ? 768 : 1000;

  return (
    <div style={S.app}>
      {/* TOPBAR */}
      <header style={S.topbar}>
        <div style={S.logoWrap}>
          <div style={S.ekyLogo}><span style={{ color: '#1A2B4A' }}>E</span><span style={{ color: '#C4923A' }}>KY</span></div>
          <span style={{ fontSize: 10, color: '#55555a', fontWeight: 700, letterSpacing: 1 }}>BUILDER</span>
        </div>

        <div style={{ width: 1, height: 24, background: '#28282b' }} />

        <select value={template} onChange={e => loadTemplate(e.target.value)} style={S.select}>
          {Object.keys(TEMPLATES).map(k => <option key={k} value={k}>{TEMPLATES[k].name}</option>)}
        </select>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={S.vpSwitch}>
            {[{ k: 'desktop', icon: '⬛', label: 'Desktop' }, { k: 'tablet', icon: '▪', label: 'Tablet' }, { k: 'mobile', icon: '▫', label: 'Handy' }].map(v => (
              <button key={v.k} onClick={() => setViewport(v.k)} style={{ ...S.vpBtn, ...(viewport === v.k ? S.vpBtnActive : {}) }}>{v.label}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={S.statusPill}>
            <span style={{ ...S.dot, background: saveStatus === 'saved' ? '#4ade80' : saveStatus === 'saving' ? '#fbbf24' : '#fb923c' }} />
            {saveStatus === 'saved' ? `Gespeichert ${timeSince(lastSaved)}` : saveStatus === 'saving' ? 'Speichern…' : 'Nicht gespeichert'}
          </div>
          <button onClick={saveProject} style={S.btnGhost} title="Projekt speichern (Strg+S)">💾 Speichern</button>
          <button onClick={openProject} style={S.btnGhost} title="Projekt öffnen (Strg+O)">📂 Öffnen</button>
          <button onClick={() => setShowOnboarding(true)} style={S.btnGhost}>+ Neu</button>
          <button onClick={exportHtml} style={S.btnGold}>HTML exportieren →</button>
        </div>
      </header>

      {/* LEFT SIDEBAR */}
      <aside style={S.sidebar}>
        <div style={S.tabs}>
          {[{ k: 'blocks', l: 'Blöcke' }, { k: 'seo', l: 'Firma & SEO' }, { k: 'design', l: 'Design' }].map(t => (
            <div key={t.k} onClick={() => setLeftTab(t.k)} style={{ ...S.tab, ...(leftTab === t.k ? S.tabActive : {}) }}>{t.l}</div>
          ))}
        </div>
        <div style={S.sidebarScroll}>
          {leftTab === 'blocks' && (
            <>
              <div style={S.sectionLabel}>Elemente ziehen</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
                {BLOCK_LIBRARY.map(b => (
                  <div key={b.type} draggable
                    onDragStart={() => setDraggedType(b.type)}
                    onDragEnd={() => { setDraggedType(null); setDropIndex(null); lastDragY.current = null; }}
                    style={S.blockItem}>
                    <Thumb type={b.type} />
                    <div style={{ fontSize: 10, color: '#8a8a8f', fontWeight: 600, marginTop: 4 }}>{b.label}</div>
                  </div>
                ))}
              </div>
              <div style={S.sectionLabel}>Seitenstruktur</div>
              {blocks.map(b => (
                <div key={b.id} onClick={() => setSelectedId(b.id)} style={{ ...S.layer, ...(selectedId === b.id ? S.layerActive : {}) }}>
                  <span style={{ flex: 1, fontSize: 12 }}>{BLOCK_LABELS[b.type] || b.type}</span>
                  {b.type !== 'nav' && b.type !== 'footer' && (
                    <span onClick={e => { e.stopPropagation(); deleteBlock(b.id); }} style={{ color: '#55555a', fontSize: 16, padding: '0 4px' }}>×</span>
                  )}
                </div>
              ))}
            </>
          )}

          {leftTab === 'seo' && (
            <>
              <div style={S.sectionLabel}>Firmendaten & SEO</div>
              {[
                { k: 'name', l: 'Firmenname' }, { k: 'legalName', l: 'Vollständiger Name' },
                { k: 'tagline', l: 'Tagline' }, { k: 'phone', l: 'Telefon' },
                { k: 'email', l: 'E-Mail' }, { k: 'street', l: 'Straße + Nr.' },
                { k: 'postalCode', l: 'PLZ' }, { k: 'city', l: 'Stadt' },
                { k: 'lat', l: 'Breitengrad' }, { k: 'lng', l: 'Längengrad' },
                { k: 'openingHours', l: 'Öffnungszeiten' }, { k: 'foundingDate', l: 'Gründungsjahr' },
                { k: 'priceRange', l: 'Preisklasse (€€€)' },
                { k: 'calendly', l: '📅 Calendly-Link' }
              ].map(f => (
                <div key={f.k} style={{ marginBottom: 10 }}>
                  <label style={S.label}>{f.l}</label>
                  <input style={S.input} value={business[f.k] || ''} onChange={e => setBusiness({ ...business, [f.k]: e.target.value })} />
                </div>
              ))}
              <div style={S.infoBox}>
                <strong style={{ color: '#C4923A' }}>Automatisch im Export:</strong><br />
                ✓ Schema.org JSON-LD<br />✓ Open Graph + Twitter<br />
                ✓ GEO-Tags (Lat/Lng)<br />✓ FAQ-Schema<br />
                ✓ Canonical + Robots<br />✓ KI-Crawler-Ready
              </div>
            </>
          )}

          {leftTab === 'design' && (
            <>
              <div style={S.sectionLabel}>Farbschema</div>
              {[{ k: 'primary', l: 'Hauptfarbe' }, { k: 'accent', l: 'Akzentfarbe' }, { k: 'bg', l: 'Hintergrund' }, { k: 'text', l: 'Textfarbe' }].map(c => (
                <div key={c.k} style={{ marginBottom: 10 }}>
                  <label style={S.label}>{c.l}</label>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <input type="color" value={colors[c.k]} onChange={e => setColors({ ...colors, [c.k]: e.target.value })} style={{ width: 28, height: 28, padding: 0, border: '1px solid #28282b', borderRadius: 4, background: 'transparent', cursor: 'pointer' }} />
                    <input style={S.input} value={colors[c.k]} onChange={e => setColors({ ...colors, [c.k]: e.target.value })} />
                  </div>
                </div>
              ))}
              <div style={S.sectionLabel}>Quick Themes</div>
              {[
                { label: 'Navy & Gold (EKY)', colors: { primary: '#1A2B4A', accent: '#C4923A', bg: '#F4F7FB', text: '#0a0a0a' } },
                { label: 'Dunkelblau & Gelb', colors: { primary: '#1a3a5c', accent: '#f4b942', bg: '#fafaf7', text: '#0a0a0a' } },
                { label: 'Waldgrün & Bronze', colors: { primary: '#2a4a3a', accent: '#c9a961', bg: '#fafaf7', text: '#0a0a0a' } },
                { label: 'Tiefrot & Gold', colors: { primary: '#8b1a1a', accent: '#d4a832', bg: '#fdf8f0', text: '#0a0a0a' } },
                { label: 'Nacht & Silber', colors: { primary: '#1a1a2e', accent: '#c9a831', bg: '#f7f5f0', text: '#0a0a0a' } },
                { label: 'Anthrazit & Orange', colors: { primary: '#2c3e50', accent: '#e67e22', bg: '#fafafa', text: '#0a0a0a' } },
              ].map(theme => (
                <div key={theme.label} onClick={() => setColors(theme.colors)} style={{ padding: '8px 10px', marginBottom: 6, background: '#1a1a1c', border: '1px solid #28282b', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', gap: 3 }}>
                    <div style={{ width: 14, height: 14, borderRadius: 3, background: theme.colors.primary }} />
                    <div style={{ width: 14, height: 14, borderRadius: 3, background: theme.colors.accent }} />
                  </div>
                  <span style={{ fontSize: 11, color: '#f4f4f2' }}>{theme.label}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </aside>

      {/* CANVAS */}
      <main ref={canvasRef} style={S.canvas}
        onDragOver={isDragging ? e => { e.preventDefault(); lastDragY.current = e.clientY; } : undefined}
        onDragLeave={isDragging ? e => { if (!canvasRef.current?.contains(e.relatedTarget)) setDropIndex(null); } : undefined}
      >
        <div style={{ ...S.frame, width: cw }}>
          <div style={{ position: 'absolute', top: -26, left: 0, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8a8a8f', display: 'flex', gap: 10 }}>
            <span><span style={{ width: 6, height: 6, background: '#4ade80', borderRadius: '50%', display: 'inline-block', marginRight: 4 }} />Vorschau — {cw}px</span>
            <span style={{ color: '#55555a' }}>{business.name.toLowerCase().replace(/\s+/g, '-')}.de</span>
          </div>

          <DropZone index={0} isDragging={isDragging} dropIndex={dropIndex}
            onOver={(e) => { e.preventDefault(); e.stopPropagation(); setDropIndex(0); lastDragY.current = e.clientY; }}
            onDrop={(e) => handleCanvasDrop(e, 0)} />

          <div style={{ background: colors.bg, color: colors.text }}>
            {blocks.map((block, i) => (
              <React.Fragment key={block.id}>
                <div draggable
                  onDragStart={e => { e.stopPropagation(); setDraggedBlockId(block.id); e.dataTransfer.effectAllowed = 'move'; }}
                  onDragEnd={() => { setDraggedBlockId(null); setDraggedType(null); setDropIndex(null); lastDragY.current = null; }}
                  onClick={() => setSelectedId(block.id)}
                  style={{ ...S.blockWrap, ...(selectedId === block.id ? S.blockSelected : {}), ...(draggedBlockId === block.id ? { opacity: 0.3 } : {}) }}>
                  {selectedId === block.id && <div style={S.selLabel}>{BLOCK_LABELS[block.type]}</div>}
                  <BlockRender block={block} business={business} colors={colors} viewport={viewport} />
                </div>
                <DropZone index={i + 1} isDragging={isDragging} dropIndex={dropIndex}
                  onOver={(e) => { e.preventDefault(); e.stopPropagation(); setDropIndex(i + 1); lastDragY.current = e.clientY; }}
                  onDrop={(e) => handleCanvasDrop(e, i + 1)} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </main>

      {/* RIGHT SIDEBAR */}
      <aside style={S.sidebarRight}>
        <div style={S.tabs}><div style={{ ...S.tab, ...S.tabActive }}>Eigenschaften</div></div>
        <div style={S.sidebarScroll}>
          {!selectedBlock ? (
            <div style={{ padding: 24, textAlign: 'center', color: '#55555a' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>◌</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#8a8a8f' }}>Nichts ausgewählt</div>
              <div style={{ fontSize: 11, color: '#55555a', marginTop: 6, lineHeight: 1.6 }}>Klicke auf eine Sektion im Canvas um Texte zu bearbeiten.</div>
            </div>
          ) : (
            <BlockEditor block={selectedBlock} onUpdate={(f, v) => updateBlock(selectedBlock.id, f, v)} />
          )}
        </div>
      </aside>

      {/* EXPORT MODAL */}
      {showExport && (
        <div style={S.overlay} onClick={() => setShowExport(false)}>
          <div style={{ ...S.modal, maxWidth: 860 }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, fontWeight: 400, marginBottom: 6 }}>HTML Export</h2>
            <p style={{ fontSize: 12, color: '#8a8a8f', marginBottom: 16 }}>Deploy-ready HTML mit Schema.org JSON-LD, GEO-Tags, Open Graph, FAQ-Schema, WCAG und Performance-Optimierung.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8, marginBottom: 16 }}>
              {[['KB', (exportedHtml.length / 1024).toFixed(1)], ['Sektionen', blocks.length], ['Schema.org', '✓'], ['GEO', '✓'], ['KI-Ready', '✓']].map(([l, v]) => (
                <div key={l} style={{ background: '#1a1a1c', border: '1px solid #28282b', borderRadius: 6, padding: 10, textAlign: 'center' }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 700, color: '#C4923A' }}>{v}</div>
                  <div style={{ fontSize: 9, color: '#8a8a8f', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
            <textarea readOnly value={exportedHtml} style={{ width: '100%', minHeight: 280, background: '#0e0e0f', color: '#C4923A', border: '1px solid #28282b', borderRadius: 7, padding: 12, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, lineHeight: 1.5, outline: 'none', resize: 'vertical' }} />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
              <button onClick={() => { navigator.clipboard.writeText(exportedHtml); setCopiedToast(true); setTimeout(() => setCopiedToast(false), 2000); }} style={S.btnGhost}>{copiedToast ? '✓ Kopiert!' : 'Kopieren'}</button>
              <button onClick={openInBrowser} style={S.btnGhost}>🌐 Im Browser öffnen</button>
              <button onClick={() => setShowExport(false)} style={S.btnGhost}>Schließen</button>
              <button onClick={downloadHtml} style={S.btnGold}>↓ Als .html speichern</button>
            </div>
          </div>
        </div>
      )}

      {/* ONBOARDING */}
      {showOnboarding && (
        <OnboardingModal onStart={(tpl, b, biz, c) => {
          setTemplate(tpl); setBlocks(b); setBusiness(biz); setColors(c);
          setSelectedId(null); setShowOnboarding(false);
          showToast('✓ Projekt erstellt');
        }} />
      )}

      {/* TOAST */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: '#1A2B4A', color: '#fff', padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600, zIndex: 9999, border: '1px solid #C4923A' }}>
          {toast}
        </div>
      )}
    </div>
  );
}

function DropZone({ index, isDragging, dropIndex, onOver, onDrop }) {
  return (
    <div onDragOver={onOver} onDrop={onDrop}
      style={{ height: isDragging ? 20 : 4, margin: '0 32px', borderRadius: 3, background: '#C4923A', opacity: dropIndex === index ? 1 : isDragging ? 0.12 : 0, transition: 'opacity 0.12s, height 0.12s' }} />
  );
}

// ============================================================
// BLOCK RENDERER
// ============================================================
function BlockRender({ block, business, colors, viewport }) {
  const d = translateData(block.type, block.data || {});
  const f = { serif: "'Instrument Serif', Georgia, serif", mono: "'JetBrains Mono', monospace" };
  const isMobile = viewport === 'mobile';
  const isTablet = viewport === 'tablet';

  const p = colors.primary, a = colors.accent, t = colors.text;

  if (block.type === 'nav') return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: isMobile ? '12px 16px' : '16px 36px', background: '#fff', borderBottom: `2px solid ${p}14`, boxShadow: '0 2px 10px rgba(0,0,0,.06)', gap: 8 }}>
      <div style={{ fontFamily: f.serif, fontSize: isMobile ? 16 : 20, fontStyle: 'italic', color: p, flexShrink: 0 }}>{business.name}</div>
      {!isMobile && <div style={{ display: 'flex', gap: 20, fontSize: 13, color: t + '88' }}>
        <span>Leistungen</span><span>Über uns</span><span>Kontakt</span>
      </div>}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {!isMobile && business.phone && <span style={{ fontSize: 12, fontWeight: 700, color: p }}>{business.phone}</span>}
        <div style={{ background: a, color: p, padding: isMobile ? '7px 11px' : '8px 16px', borderRadius: 6, fontSize: isMobile ? 11 : 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
          {business.calendly ? 'Termin buchen' : 'Angebot anfragen'}
        </div>
      </div>
    </nav>
  );

  if (block.type === 'hero') return (
    <section style={{ background: `linear-gradient(150deg, ${p} 0%, ${p}cc 100%)`, color: '#fff', padding: isMobile ? '36px 16px 28px' : isTablet ? '52px 28px' : '64px 44px 56px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)', borderRadius: 50, padding: isMobile ? '5px 12px' : '6px 16px', fontSize: isMobile ? 10 : 12, fontWeight: 600, marginBottom: 18, gap: 4 }}>
          {d.eyebrow || d.Eyebrow}
        </div>
        <h1 style={{ fontFamily: f.serif, fontSize: isMobile ? 27 : isTablet ? 36 : 48, lineHeight: 1.08, fontWeight: 400, marginBottom: 14, letterSpacing: '-.02em' }}
          dangerouslySetInnerHTML={{ __html: (d.headline || d.Ueberschrift || '').replace(/<em>/g, `<em style="color:${a};font-style:italic">`) }} />
        <p style={{ fontSize: isMobile ? 14 : 16, lineHeight: 1.72, opacity: .88, marginBottom: 24, maxWidth: 560 }}>{d.sub || d.Untertitel}</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ background: a, color: p, padding: isMobile ? '10px 16px' : '12px 22px', borderRadius: 7, fontSize: isMobile ? 13 : 14, fontWeight: 700, cursor: 'pointer' }}>{d.cta1 || d.Button1} →</div>
          <div style={{ background: 'rgba(255,255,255,.1)', color: '#fff', border: '1px solid rgba(255,255,255,.22)', padding: isMobile ? '10px 16px' : '12px 22px', borderRadius: 7, fontSize: isMobile ? 13 : 14, fontWeight: 600, cursor: 'pointer' }}>{d.cta2 || d.Button2}</div>
        </div>
        {(d.Telefon || business.phone) && (
          <div style={{ marginTop: 14, fontSize: 12, opacity: .7, display: 'flex', alignItems: 'center', gap: 6 }}>
            📞 <span style={{ fontWeight: 600 }}>{d.Telefon || business.phone}</span>
            {!isMobile && business.openingHours && <span style={{ opacity: .7 }}>· {business.openingHours}</span>}
          </div>
        )}
      </div>
    </section>
  );

  if (block.type === 'features') return (
    <section style={{ padding: isMobile ? '36px 16px' : isTablet ? '52px 28px' : '64px 40px', background: p + '06', borderTop: `1px solid ${p}12` }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 24 : 32 }}>
          <h2 style={{ fontFamily: f.serif, fontSize: isMobile ? 24 : 34, fontWeight: 400, marginBottom: 8 }}>{d.title || d.Titel}</h2>
          {(d.Untertitel) && <p style={{ fontSize: isMobile ? 13 : 15, color: t + '77', maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}>{d.Untertitel}</p>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(3,1fr)', gap: isMobile ? 10 : 16 }}>
          {((d.items || d.Elemente) || []).map((it, i) => (
            <article key={i} style={{ background: '#fff', padding: isMobile ? '16px 14px' : '20px 18px', borderRadius: 10, border: `1px solid ${p}10`, boxShadow: '0 2px 8px rgba(0,0,0,.03)' }}>
              {(it.Icon) && <div style={{ fontSize: 24, marginBottom: 10 }}>{it.Icon}</div>}
              {!(it.Icon) && <div style={{ width: 28, height: 28, background: a, borderRadius: 6, marginBottom: 10 }} />}
              <h3 style={{ fontSize: isMobile ? 14 : 15, fontWeight: 700, marginBottom: 6, color: p }}>{it.title || it.Titel}</h3>
              <p style={{ fontSize: isMobile ? 12 : 13, color: t + '77', lineHeight: 1.65 }}>{it.text || it.Text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );

  if (block.type === 'split') return (
    <section style={{ padding: isMobile ? '36px 16px' : isTablet ? '52px 28px' : '64px 40px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 20 : 44, alignItems: 'center' }}>
      <div style={{ aspectRatio: '4/3', background: `linear-gradient(135deg, ${p}, ${a})`, borderRadius: 10 }} />
      <div>
        <div style={{ fontFamily: f.mono, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: a, marginBottom: 10 }}>{d.eyebrow}</div>
        <h2 style={{ fontFamily: f.serif, fontSize: isMobile ? 24 : 32, lineHeight: 1.1, marginBottom: 14, fontWeight: 400 }}>{d.headline}</h2>
        <p style={{ fontSize: isMobile ? 13 : 15, lineHeight: 1.7, color: t + '88' }}>{d.text}</p>
      </div>
    </section>
  );

  // ── TRUST ────────────────────────────────────────────────
  if (block.type === 'trust') return (
    <section style={{ background: p, padding: isMobile ? '12px 14px' : '12px 40px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? 5 : 0, justifyContent: 'center', maxWidth: 960, margin: '0 auto' }}>
        {(d.Elemente || []).map((el, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: isMobile ? '3px 8px' : '0 16px', borderRight: !isMobile && i < (d.Elemente.length - 1) ? '1px solid rgba(255,255,255,.2)' : 'none', fontSize: isMobile ? 10 : 12, color: '#fff', fontWeight: 600, whiteSpace: 'nowrap' }}>
            <span>{el.Icon}</span><span>{el.Text}</span>
          </div>
        ))}
      </div>
    </section>
  );

  // ── USPs ─────────────────────────────────────────────────
  if (block.type === 'usps') return (
    <section style={{ padding: isMobile ? '36px 16px' : '64px 40px', background: '#fff' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontFamily: f.serif, fontSize: isMobile ? 24 : 34, fontWeight: 400, marginBottom: isMobile ? 22 : 32, textAlign: 'center' }}>{d.Titel}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(2,1fr)', gap: isMobile ? 12 : 18 }}>
          {(d.Elemente || []).map((el, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, padding: isMobile ? '14px' : '18px 20px', background: p + '06', borderRadius: 10, borderLeft: `4px solid ${a}` }}>
              <div style={{ width: 34, height: 34, minWidth: 34, background: a, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: p }}>{i + 1}</div>
              <div>
                <h3 style={{ fontSize: isMobile ? 14 : 15, fontWeight: 700, marginBottom: 5, color: p }}>{el.Titel}</h3>
                <p style={{ fontSize: isMobile ? 12 : 13, color: t + '77', lineHeight: 1.65 }}>{el.Text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // ── PROCESS ──────────────────────────────────────────────
  if (block.type === 'process') return (
    <section style={{ padding: isMobile ? '36px 16px' : '64px 40px', background: p, color: '#fff' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <h2 style={{ fontFamily: f.serif, fontSize: isMobile ? 24 : 34, fontWeight: 400, marginBottom: isMobile ? 24 : 36, textAlign: 'center', color: '#fff' }}>{d.Titel}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(4,1fr)', gap: isMobile ? 14 : 18 }}>
          {(d.Elemente || []).map((el, i) => (
            <div key={i} style={{ textAlign: 'center', padding: isMobile ? '14px' : '18px 12px' }}>
              <div style={{ width: 46, height: 46, background: a, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 15, fontWeight: 700, color: p }}>{el.Nummer}</div>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 7, color: '#fff' }}>{el.Titel}</h3>
              <p style={{ fontSize: 12, opacity: 0.72, lineHeight: 1.6 }}>{el.Text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  if (block.type === 'cta') return (
    <section style={{ padding: isMobile ? '44px 16px' : '68px 40px', background: p, color: '#fff', textAlign: 'center' }}>
      <div style={{ maxWidth: 580, margin: '0 auto' }}>
        <h2 style={{ fontFamily: f.serif, fontSize: isMobile ? 24 : 36, marginBottom: 12, fontWeight: 400, color: '#fff' }}>{d.headline || d.Ueberschrift}</h2>
        <p style={{ fontSize: isMobile ? 13 : 16, opacity: 0.84, marginBottom: 24, lineHeight: 1.65 }}>{d.sub || d.Untertitel}</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ background: a, color: p, padding: isMobile ? '11px 18px' : '13px 24px', borderRadius: 7, fontSize: isMobile ? 14 : 15, fontWeight: 700, cursor: 'pointer' }}>
            {d.cta || d.Button} →
          </div>
          {business.phone && (d.ButtonTel) && (
            <div style={{ background: 'rgba(255,255,255,.1)', color: '#fff', border: '1px solid rgba(255,255,255,.22)', padding: isMobile ? '11px 18px' : '13px 24px', borderRadius: 7, fontSize: isMobile ? 14 : 15, fontWeight: 600, cursor: 'pointer' }}>
              📞 {d.ButtonTel}
            </div>
          )}
        </div>
        {business.phone && <div style={{ marginTop: 12, fontSize: 12, opacity: .5 }}>{business.phone} · {business.openingHours}</div>}
      </div>
    </section>
  );

  if (block.type === 'faq') return (
    <section style={{ padding: isMobile ? '36px 16px' : '64px 40px', background: p + '05', borderTop: `1px solid ${p}12` }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>
        <h2 style={{ fontFamily: f.serif, fontSize: isMobile ? 24 : 32, marginBottom: isMobile ? 22 : 30, fontWeight: 400 }}>{d.title || d.Titel}</h2>
        {((d.items || d.Elemente) || []).map((it, i) => (
          <div key={i} style={{ borderBottom: `1px solid ${p}12`, padding: isMobile ? '14px 0' : '18px 0' }}>
            <h3 style={{ fontSize: isMobile ? 14 : 15, fontWeight: 700, marginBottom: 7, color: p }}>{it.q || it.Frage}</h3>
            <p style={{ fontSize: isMobile ? 12 : 13, color: t + '77', lineHeight: 1.7 }}>{it.a || it.Antwort}</p>
          </div>
        ))}
      </div>
    </section>
  );

  if (block.type === 'testimonial') return (
    <section style={{ padding: isMobile ? '36px 16px' : '60px 40px', background: p + '04', borderTop: `1px solid ${p}10`, borderBottom: `1px solid ${p}10`, textAlign: 'center' }}>
      <div style={{ maxWidth: 660, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 14 }}>
          {Array.from({ length: parseInt(d.Bewertung || d.Sterne) || 5 }).map((_, i) => (
            <span key={i} style={{ color: a, fontSize: 20 }}>★</span>
          ))}
        </div>
        <blockquote style={{ fontFamily: f.serif, fontSize: isMobile ? 17 : 22, fontStyle: 'italic', lineHeight: 1.55, color: p, marginBottom: 18, fontWeight: 400 }}>
          „{d.quote || d.Zitat}"
        </blockquote>
        <div style={{ width: 36, height: 2, background: a, margin: '0 auto 12px' }} />
        <div style={{ fontSize: 14, fontWeight: 700, color: p }}>{d.author || d.Autor}</div>
        {(d.Firma) && <div style={{ fontSize: 12, color: t + '55', marginTop: 2 }}>{d.Firma}</div>}
      </div>
    </section>
  );

  if (block.type === 'pricing') return (
    <section style={{ padding: isMobile ? '36px 16px' : '64px 40px', background: p + '06' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <h2 style={{ fontFamily: f.serif, fontSize: isMobile ? 24 : 32, marginBottom: isMobile ? 22 : 30, fontWeight: 400, textAlign: 'center' }}>{d.title || d.Titel}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : `repeat(${(d.plans || d.Pakete || []).length},1fr)`, gap: 16 }}>
          {((d.plans || d.Pakete) || []).map((pl, i) => (
            <div key={i} style={{ background: '#fff', padding: 24, borderRadius: 10, border: i === 1 ? `2px solid ${a}` : `1px solid ${p}12`, textAlign: 'center', boxShadow: i === 1 ? `0 4px 20px ${a}22` : 'none' }}>
              {i === 1 && <div style={{ fontSize: 10, fontWeight: 700, color: a, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>Empfohlen</div>}
              <div style={{ fontSize: 14, fontWeight: 700, color: p, marginBottom: 6 }}>{pl.name || pl.Name}</div>
              <div style={{ fontFamily: f.serif, fontSize: 28, fontWeight: 400, color: p }}>{pl.price || pl.Preis}</div>
              {(pl.Features || pl.Feature) && <div style={{ fontSize: 12, color: t + '66', marginTop: 6 }}>{pl.Features || pl.Feature}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  if (block.type === 'gallery') return (
    <section style={{ padding: isMobile ? '32px 16px' : '52px 40px', background: p + '04' }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>
        {(d.Titel) && <h2 style={{ fontFamily: f.serif, fontSize: isMobile ? 22 : 30, fontWeight: 400, marginBottom: 20 }}>{d.Titel}</h2>}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3,1fr)', gap: isMobile ? 8 : 12 }}>
          {Array.from({ length: d.images || d.Anzahl || 6 }).map((_, i) => (
            <div key={i} style={{ aspectRatio: '4/3', background: `linear-gradient(${45 + i * 30}deg, ${a}66, ${p})`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 600, opacity: .75 }}>Bild {i + 1}</div>
          ))}
        </div>
      </div>
    </section>
  );

  if (block.type === 'footer') return (
    <footer style={{ padding: isMobile ? '28px 16px 18px' : '48px 40px 28px', background: '#0a0a0a', color: '#fff' }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : isTablet ? '1fr 1fr 1fr' : '2fr 1fr 1fr 1fr', gap: isMobile ? 20 : 28, marginBottom: 24 }}>
          <div style={{ gridColumn: isMobile ? '1 / -1' : 'auto' }}>
            <div style={{ fontFamily: f.serif, fontSize: isMobile ? 18 : 20, fontStyle: 'italic', marginBottom: 8 }}>{business.name}</div>
            <p style={{ fontSize: 12, color: '#888', lineHeight: 1.6 }}>{business.tagline}</p>
            {business.openingHours && <p style={{ fontSize: 11, color: '#666', marginTop: 8 }}>🕐 {business.openingHours}</p>}
            <p style={{ fontSize: 10, color: '#333', marginTop: 10 }}>Website von <a href="https://ekymedia.de" style={{ color: '#555', textDecoration: 'none' }}>EKY Media</a></p>
          </div>
          <div>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.1em', color: '#555', marginBottom: 8, fontWeight: 700 }}>Kontakt</div>
            <div style={{ fontSize: 13, lineHeight: 1.9, color: '#aaa' }}>{business.phone}<br />{business.email}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.1em', color: '#555', marginBottom: 8, fontWeight: 700 }}>Adresse</div>
            <div style={{ fontSize: 13, lineHeight: 1.9, color: '#aaa' }}>{business.street}<br />{business.postalCode} {business.city}</div>
          </div>
          {!isMobile && <div>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.1em', color: '#555', marginBottom: 8, fontWeight: 700 }}>Rechtliches</div>
            <div style={{ fontSize: 13, lineHeight: 1.9, color: '#aaa' }}>Impressum<br />Datenschutz<br />AGB</div>
          </div>}
        </div>
        <div style={{ fontSize: 11, color: '#444', borderTop: '1px solid #1a1a1a', paddingTop: 14 }}>
          © {new Date().getFullYear()} {business.legalName} · Alle Rechte vorbehalten
        </div>
      </div>
    </footer>
  );

  return null;
}

function Thumb({ type }) {
  const b = (w, accent) => <div style={{ height: 3, width: w + '%', background: accent ? '#C4923A' : '#333', borderRadius: 1 }} />;
  const map = {
    hero: <>{b(35, true)}{b(85)}{b(65)}</>,
    features: <div style={{ display: 'flex', gap: 3 }}><div style={{ flex: 1, height: 20, background: '#252527', borderRadius: 2 }} /><div style={{ flex: 1, height: 20, background: '#252527', borderRadius: 2 }} /><div style={{ flex: 1, height: 20, background: '#252527', borderRadius: 2 }} /></div>,
    split: <div style={{ display: 'flex', gap: 3 }}><div style={{ flex: 1, height: 24, background: '#252527', borderRadius: 2 }} /><div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center' }}>{b(90)}{b(70)}</div></div>,
    cta: <>{b(40, true)}{b(80)}{b(35, true)}</>,
    faq: <>{b(40)}{b(90)}{b(70)}{b(90)}</>,
    gallery: <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>{[0,1,2,3,4,5].map(i => <div key={i} style={{ aspectRatio: 1, background: '#252527', borderRadius: 1 }} />)}</div>,
    testimonial: <div style={{ textAlign: 'center', color: '#C4923A', fontSize: 18 }}>"</div>,
    pricing: <div style={{ display: 'flex', gap: 2 }}>{[0,1,2].map(i => <div key={i} style={{ flex: 1, height: 24, background: i === 1 ? '#C4923A44' : '#252527', borderRadius: 2 }} />)}</div>
  };
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center', height: 36 }}>{map[type]}</div>;
}

// ============================================================
// BLOCK EDITOR
// ============================================================
function BlockEditor({ block, onUpdate }) {
  const d = block.data || {};

  if (block.type === 'nav' || block.type === 'footer') return (
    <div style={{ padding: 14 }}>
      <div style={{ padding: 12, background: '#1a1a1c', border: '1px solid #28282b', borderRadius: 6, fontSize: 11, color: '#8a8a8f', lineHeight: 1.7 }}>
        Wird automatisch aus den <strong style={{ color: '#C4923A' }}>Firmendaten</strong> generiert. Bearbeite sie im Tab "Firma & SEO" links.
      </div>
    </div>
  );

  const renderField = (key, value) => {
    if (typeof value === 'string') {
      return value.length > 60
        ? <textarea style={{ ...S.input, minHeight: 72, resize: 'vertical' }} value={value} onChange={e => onUpdate(key, e.target.value)} />
        : <input style={S.input} value={value} onChange={e => onUpdate(key, e.target.value)} />;
    }
    if (typeof value === 'number') return <input type="number" style={S.input} value={value} onChange={e => onUpdate(key, parseInt(e.target.value) || 0)} />;
    if (Array.isArray(value)) return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {value.map((item, i) => (
          <div key={i} style={{ padding: 10, background: '#1a1a1c', border: '1px solid #28282b', borderRadius: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 10, color: '#8a8a8f', fontWeight: 700 }}>#{i + 1}</span>
              <button onClick={() => { if (!confirm('Löschen?')) return; onUpdate(key, value.filter((_, idx) => idx !== i)); }}
                style={{ background: 'transparent', border: '1px solid #28282b', color: '#8a8a8f', width: 18, height: 18, borderRadius: 3, fontSize: 11, cursor: 'pointer', padding: 0 }}>×</button>
            </div>
            {Object.entries(item).map(([k, v]) => (
              <div key={k} style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 9, color: '#55555a', marginBottom: 2 }}>{k}</div>
                {v && v.length > 50
                  ? <textarea style={{ ...S.input, minHeight: 48 }} value={v} onChange={e => { const a = [...value]; a[i] = { ...a[i], [k]: e.target.value }; onUpdate(key, a); }} />
                  : <input style={S.input} value={v} onChange={e => { const a = [...value]; a[i] = { ...a[i], [k]: e.target.value }; onUpdate(key, a); }} />}
              </div>
            ))}
          </div>
        ))}
        <button onClick={() => { const tmpl = value[0] ? Object.fromEntries(Object.keys(value[0]).map(k => [k, ''])) : {}; onUpdate(key, [...value, tmpl]); }}
          style={{ background: 'transparent', border: '1px dashed #28282b', color: '#8a8a8f', padding: 8, borderRadius: 5, fontSize: 11, cursor: 'pointer' }}>
          + Neuer Eintrag
        </button>
      </div>
    );
    return <input style={S.input} value={value} onChange={e => onUpdate(key, e.target.value)} />;
  };

  return (
    <div style={{ padding: 14 }}>
      <div style={{ paddingBottom: 12, borderBottom: '1px solid #28282b', marginBottom: 14 }}>
        <div style={{ fontWeight: 600, fontSize: 12 }}>{BLOCK_LABELS[block.type]}</div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#55555a', marginTop: 2 }}>#{block.id}</div>
      </div>
      {Object.entries(d).map(([key, value]) => (
        <div key={key} style={{ marginBottom: 12 }}>
          <label style={S.label}>{key}</label>
          {renderField(key, value)}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// HTML EXPORT
// ============================================================
function esc(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function generateHtml(blocks, b, colors) {
  const title = `${b.name} — ${b.tagline}`;
  const desc = `${b.name} in ${b.city}. ${b.tagline}. ${b.areaServed?.slice(0, 3).join(', ')}. Tel: ${b.phone}`;
  const url = `https://${b.name.toLowerCase().replace(/\s+/g, '-')}.de`;

  const schema = {
    "@context": "https://schema.org", "@type": b.type, "@id": url,
    "name": b.name, "legalName": b.legalName, "description": desc, "url": url,
    "telephone": b.phone, "email": b.email, "priceRange": b.priceRange,
    "foundingDate": b.foundingDate,
    "address": { "@type": "PostalAddress", "streetAddress": b.street, "postalCode": b.postalCode, "addressLocality": b.city, "addressRegion": b.region, "addressCountry": b.country },
    "geo": { "@type": "GeoCoordinates", "latitude": b.lat, "longitude": b.lng },
    "areaServed": (b.areaServed || []).map(a => ({ "@type": "City", "name": a })),
    "openingHours": b.openingHours
  };

  const faqBlocks = blocks.filter(bl => bl.type === 'faq');
  let faqSchema = '';
  if (faqBlocks.length) {
    const faqData = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqBlocks.flatMap(fb => { const t = translateData('faq', fb.data); return (t.items || []).map(it => ({ "@type": "Question", "name": it.q, "acceptedAnswer": { "@type": "Answer", "text": it.a } })); }) };
    faqSchema = `<script type="application/ld+json">\n${JSON.stringify(faqData, null, 2)}\n</script>`;
  }

  const body = blocks.map(bl => renderBlockHtml(bl, b, colors)).join('\n');
  const ctaLink = b.calendly ? b.calendly : `tel:${b.phone?.replace(/\s/g, '')}`;
  const ctaLabel = b.calendly ? 'Termin buchen' : 'Jetzt anrufen';

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${url}">
  <meta name="geo.region" content="${b.country}-BY">
  <meta name="geo.placename" content="${esc(b.city)}">
  <meta name="geo.position" content="${b.lat};${b.lng}">
  <meta name="ICBM" content="${b.lat}, ${b.lng}">
  <meta property="og:type" content="business.business">
  <meta property="og:locale" content="de_DE">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(desc)}">
  <meta name="ai-content-declaration" content="human-authored">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='${encodeURIComponent(colors.primary)}'/%3E%3Ctext x='50' y='68' font-family='serif' font-size='60' fill='white' text-anchor='middle'%3E${b.name.charAt(0)}%3C/text%3E%3C/svg%3E">
  <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
  </script>
  ${faqSchema}
  <style>
    :root{--p:${colors.primary};--a:${colors.accent};--bg:${colors.bg};--t:${colors.text};--m:#6a6a68;--b:#ebeae5;--panel:#f5f3ec;}
    *{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    body{font-family:'Satoshi',-apple-system,sans-serif;color:var(--t);background:var(--bg);-webkit-font-smoothing:antialiased;}
    a{color:inherit;text-decoration:none;}
    .skip{position:absolute;top:-40px;left:0;background:var(--p);color:#fff;padding:8px 16px;z-index:100;}
    .skip:focus{top:0;}
    nav.site-nav{display:flex;justify-content:space-between;align-items:center;padding:20px 48px;border-bottom:1px solid var(--b);position:sticky;top:0;background:var(--bg);z-index:50;}
    .brand{font-family:'Instrument Serif',serif;font-size:22px;font-style:italic;}
    .nav-links{display:flex;gap:24px;font-size:14px;color:var(--m);}
    .nav-cta{background:var(--p);color:#fff;padding:9px 18px;border-radius:6px;font-size:13px;font-weight:600;}
    .hero{padding:80px 48px 64px;display:grid;grid-template-columns:1.1fr 0.9fr;gap:48px;align-items:center;max-width:1200px;margin:0 auto;}
    .eyebrow{font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:var(--a);margin-bottom:16px;}
    h1{font-family:'Instrument Serif',serif;font-size:62px;line-height:1.02;letter-spacing:-.02em;font-weight:400;margin-bottom:22px;}
    h1 em{color:var(--a);font-style:italic;}
    .hero-sub{font-size:16px;color:var(--m);margin-bottom:30px;max-width:480px;line-height:1.7;}
    .hero-btns{display:flex;gap:12px;flex-wrap:wrap;}
    .btn-p{background:var(--p);color:#fff;padding:13px 24px;border-radius:7px;font-size:14px;font-weight:600;display:inline-block;}
    .btn-s{padding:13px 24px;border:1px solid #d4d3cc;border-radius:7px;font-size:14px;font-weight:600;display:inline-block;}
    .hero-img{aspect-ratio:4/5;background:linear-gradient(135deg,var(--a),var(--p));border-radius:10px;}
    .features{padding:80px 48px;background:var(--panel);border-top:1px solid var(--b);}
    .features-w{max-width:1200px;margin:0 auto;}
    h2{font-family:'Instrument Serif',serif;font-size:38px;font-weight:400;margin-bottom:36px;letter-spacing:-.01em;}
    .feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
    .feat-card{background:#fff;padding:28px;border-radius:9px;border:1px solid var(--b);}
    .feat-icon{width:36px;height:36px;background:var(--p);border-radius:7px;margin-bottom:14px;}
    .feat-card h3{font-size:16px;margin-bottom:7px;font-weight:600;}
    .feat-card p{font-size:13px;color:var(--m);line-height:1.6;}
    .split-sec{padding:80px 48px;display:grid;grid-template-columns:1fr 1fr;gap:52px;align-items:center;max-width:1200px;margin:0 auto;}
    .split-img{aspect-ratio:4/3;background:linear-gradient(135deg,var(--p),var(--a));border-radius:10px;}
    .split-sec h2{font-size:40px;margin-bottom:18px;}
    .split-sec p{font-size:16px;color:var(--m);line-height:1.7;}
    .cta-sec{padding:80px 48px;background:var(--p);color:#fff;text-align:center;}
    .cta-sec h2{font-size:46px;margin-bottom:14px;color:#fff;}
    .cta-sec p{font-size:16px;opacity:.85;margin-bottom:30px;}
    .cta-btn{display:inline-block;background:var(--a);color:var(--p);padding:14px 32px;border-radius:8px;font-size:15px;font-weight:700;}
    .faq-sec{padding:80px 48px;background:var(--panel);border-top:1px solid var(--b);}
    .faq-w{max-width:800px;margin:0 auto;}
    .faq-item{border-bottom:1px solid var(--b);padding:22px 0;}
    .faq-item h3{font-size:16px;font-weight:600;margin-bottom:9px;}
    .faq-item p{font-size:14px;color:var(--m);line-height:1.6;}
    .testi{padding:80px 48px;text-align:center;max-width:860px;margin:0 auto;}
    .testi-q{font-size:52px;color:var(--a);line-height:1;margin-bottom:14px;}
    .testi blockquote{font-family:'Instrument Serif',serif;font-size:30px;font-style:italic;line-height:1.4;margin-bottom:22px;}
    .testi cite{font-size:13px;color:var(--m);font-weight:600;font-style:normal;}
    .pricing-sec{padding:80px 48px;background:var(--panel);}
    .pricing-w{max-width:1200px;margin:0 auto;}
    .pricing-grid{display:grid;gap:18px;}
    .price-card{background:#fff;padding:32px;border-radius:9px;border:1px solid var(--b);}
    .price-card.feat{border:2px solid var(--a);}
    .price-name{font-size:13px;font-weight:600;color:var(--a);margin-bottom:7px;}
    .price-amt{font-family:'Instrument Serif',serif;font-size:38px;font-weight:400;}
    .gallery-sec{padding:64px 48px;max-width:1200px;margin:0 auto;}
    .gal-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}
    .gal-item{aspect-ratio:1;border-radius:8px;background:linear-gradient(135deg,var(--a),var(--p));}
    footer.site-footer{padding:64px 48px 36px;background:#0a0a0a;color:#fff;}
    .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:36px;max-width:1200px;margin:0 auto 36px;}
    .footer-brand{font-family:'Instrument Serif',serif;font-size:22px;font-style:italic;margin-bottom:12px;}
    .footer-tagline{font-size:13px;color:#888;line-height:1.6;}
    .footer-head{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#666;margin-bottom:10px;font-weight:600;}
    .footer-list{font-size:13px;line-height:2;}
    .footer-bottom{max-width:1200px;margin:0 auto;font-size:11px;color:#555;border-top:1px solid #222;padding-top:18px;}
    .eky-credit{font-size:10px;color:#333;margin-top:4px;}
    @media(max-width:900px){
      .hero,.split-sec{grid-template-columns:1fr;padding:44px 20px;gap:24px;}
      h1{font-size:36px;} h2{font-size:26px;}
      .features,.cta-sec,.faq-sec,.pricing-sec{padding:44px 20px;}
      .feat-grid{grid-template-columns:repeat(auto-fit,minmax(240px,1fr));}
      .pricing-grid{grid-template-columns:1fr;}
      .gal-grid{grid-template-columns:repeat(2,1fr);}
      .footer-grid{grid-template-columns:1fr 1fr;}
      nav.site-nav{padding:12px 16px;flex-wrap:wrap;}
      .nav-links{display:none;}
      .nav-phone{display:none;}
      .cta-sec h2{font-size:28px;}
      .testi blockquote{font-size:19px;}
      .hero-sub{font-size:15px;}
      .split-img{min-height:200px;}
    }
    @media(max-width:480px){
      h1{font-size:27px;line-height:1.1;}
      h2{font-size:22px;}
      .hero,.features,.cta-sec,.faq-sec,.split-sec,.testi,.pricing-sec{padding:36px 14px;}
      .hero-badge{font-size:10px;padding:4px 10px;}
      .hero-btns{flex-direction:column;}
      .btn-primary,.btn-secondary{width:100%;text-align:center;}
      .cta-btns{flex-direction:column;}
      .cta-btn,.cta-tel{width:100%;text-align:center;}
      .feat-grid{grid-template-columns:1fr;}
      .footer-grid{grid-template-columns:1fr;}.nav-cta{font-size:11px;padding:7px 10px;}
    }
    :focus-visible{outline:2px solid var(--a);outline-offset:2px;border-radius:4px;}
    @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important;}}
  </style>
</head>
<body>
  <a href="#main" class="skip">Zum Hauptinhalt springen</a>
  <main id="main">
${body}
  </main>
  <div style="display:none" itemscope itemtype="https://schema.org/${b.type}">
    <span itemprop="name">${esc(b.name)}</span>
    <span itemprop="telephone">${b.phone}</span>
    <span itemprop="email">${b.email}</span>
    <div itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
      <span itemprop="streetAddress">${esc(b.street)}</span>
      <span itemprop="postalCode">${b.postalCode}</span>
      <span itemprop="addressLocality">${esc(b.city)}</span>
    </div>
  </div>
</body>
</html>`;
}

function renderBlockHtml(block, b, colors) {
  const d = translateData(block.type, block.data || {});
  const ctaLink = b.calendly ? b.calendly : `tel:${(b.phone || '').replace(/\s/g, '')}`;

  if (block.type === 'nav') return `    <nav class="site-nav" role="navigation" aria-label="Hauptnavigation">
      <a href="/" class="brand">${esc(b.name)}</a>
      <div class="nav-links">
        <a href="#leistungen">Leistungen</a>
        <a href="#ueber-uns">Über uns</a>
        <a href="#kontakt">Kontakt</a>
      </div>
      <a href="${ctaLink}" class="nav-cta"${b.calendly ? ' target="_blank" rel="noopener"' : ''}>${b.type === 'Dentist' || b.type === 'BarberShop' ? 'Termin buchen' : 'Angebot anfragen'}</a>
    </nav>`;

  if (block.type === 'hero') return `    <section class="hero" id="hero">
      <div>
        <p class="eyebrow">${esc(d.eyebrow)}</p>
        <h1>${d.headline}</h1>
        <p class="hero-sub">${esc(d.sub)}</p>
        <div class="hero-btns">
          <a href="${ctaLink}" class="btn-p"${b.calendly ? ' target="_blank" rel="noopener"' : ''}>${esc(d.cta1)} →</a>
          <a href="#leistungen" class="btn-s">${esc(d.cta2)}</a>
        </div>
      </div>
      <div class="hero-img" role="img" aria-label="${esc(b.name)} in ${esc(b.city)}"></div>
    </section>`;

  if (block.type === 'features') return `    <section class="features" id="leistungen">
      <div class="features-w">
        <h2>${esc(d.title)}</h2>
        <div class="feat-grid">
${(d.items || []).map(it => `          <article class="feat-card">
            <div class="feat-icon" aria-hidden="true"></div>
            <h3>${esc(it.title)}</h3>
            <p>${esc(it.text)}</p>
          </article>`).join('\n')}
        </div>
      </div>
    </section>`;

  if (block.type === 'split') return `    <section class="split-sec" id="ueber-uns">
      <div class="split-img" role="img" aria-label="${esc(b.name)}"></div>
      <div>
        <p class="eyebrow">${esc(d.eyebrow)}</p>
        <h2>${esc(d.headline)}</h2>
        <p>${esc(d.text)}</p>
      </div>
    </section>`;

  if (block.type === 'cta') return `    <section class="cta-sec" id="kontakt">
      <h2>${esc(d.headline)}</h2>
      <p>${esc(d.sub)}</p>
      <a href="${ctaLink}" class="cta-btn"${b.calendly ? ' target="_blank" rel="noopener"' : ''}>${esc(d.cta)} →</a>
    </section>`;

  if (block.type === 'faq') return `    <section class="faq-sec">
      <div class="faq-w">
        <h2>${esc(d.title)}</h2>
${(d.items || []).map(it => `        <div class="faq-item">
          <h3>${esc(it.q)}</h3>
          <p>${esc(it.a)}</p>
        </div>`).join('\n')}
      </div>
    </section>`;

  if (block.type === 'testimonial') return `    <section class="testi">
      <div class="testi-q" aria-hidden="true">"</div>
      <blockquote>${esc(d.quote)}</blockquote>
      <cite>— ${esc(d.author)}</cite>
    </section>`;

  if (block.type === 'pricing') return `    <section class="pricing-sec" id="preise">
      <div class="pricing-w">
        <h2>${esc(d.title)}</h2>
        <div class="pricing-grid" style="grid-template-columns:repeat(${(d.plans || []).length},1fr)">
${(d.plans || []).map((p, i) => `          <div class="price-card${i === 1 ? ' feat' : ''}">
            <div class="price-name">${esc(p.name)}</div>
            <div class="price-amt">${esc(p.price)}</div>
          </div>`).join('\n')}
        </div>
      </div>
    </section>`;

  if (block.type === 'gallery') return `    <section class="gallery-sec" id="referenzen">
      <div class="gal-grid">
${Array.from({ length: d.images || 6 }).map((_, i) => `        <div class="gal-item" role="img" aria-label="Referenzbild ${i + 1}"></div>`).join('\n')}
      </div>
    </section>`;

  if (block.type === 'footer') return `    <footer class="site-footer">
      <div class="footer-grid">
        <div>
          <div class="footer-brand">${esc(b.name)}</div>
          <p class="footer-tagline">${esc(b.tagline)}</p>
          <p class="eky-credit">Erstellt von EKY Media · <a href="https://ekymedia.de" style="color:#555">ekymedia.de</a></p>
        </div>
        <div>
          <div class="footer-head">Kontakt</div>
          <div class="footer-list">
            <a href="tel:${(b.phone || '').replace(/\s/g, '')}">${esc(b.phone)}</a><br>
            <a href="mailto:${b.email}">${esc(b.email)}</a>
          </div>
        </div>
        <div>
          <div class="footer-head">Adresse</div>
          <address class="footer-list" style="font-style:normal">
            ${esc(b.street)}<br>${b.postalCode} ${esc(b.city)}
          </address>
        </div>
        <div>
          <div class="footer-head">Rechtliches</div>
          <div class="footer-list">
            <a href="/impressum">Impressum</a><br>
            <a href="/datenschutz">Datenschutz</a><br>
            <a href="/agb">AGB</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">© ${new Date().getFullYear()} ${esc(b.legalName)} · Alle Rechte vorbehalten</div>
    </footer>`;

  return '';
}

// ============================================================
// STYLES
// ============================================================
const S = {
  app: { display: 'grid', gridTemplateRows: '48px 1fr', gridTemplateColumns: '264px 1fr 296px', gridTemplateAreas: '"tb tb tb" "l c r"', height: '100vh', overflow: 'hidden' },
  topbar: { gridArea: 'tb', background: '#111113', borderBottom: '1px solid #222225', display: 'flex', alignItems: 'center', padding: '0 14px', gap: 12 },
  logoWrap: { display: 'flex', alignItems: 'center', gap: 6 },
  ekyLogo: { fontFamily: "'Instrument Serif', serif", fontSize: 22, fontStyle: 'italic', letterSpacing: '-0.02em' },
  select: { background: '#1c1c1e', border: '1px solid #2c2c2e', color: '#f4f4f2', padding: '5px 10px', borderRadius: 6, fontSize: 11, cursor: 'pointer' },
  vpSwitch: { display: 'flex', background: '#1c1c1e', border: '1px solid #2c2c2e', borderRadius: 7, padding: 2, gap: 2 },
  vpBtn: { background: 'transparent', border: 'none', color: '#8a8a8f', padding: '4px 14px', borderRadius: 5, fontSize: 11, cursor: 'pointer' },
  vpBtnActive: { background: '#2c2c2e', color: '#f4f4f2' },
  statusPill: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8a8a8f', display: 'flex', alignItems: 'center', gap: 6 },
  dot: { width: 6, height: 6, borderRadius: '50%', display: 'inline-block' },
  btnGold: { background: '#C4923A', color: '#0e0e0f', border: 'none', padding: '7px 16px', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer' },
  btnGhost: { background: 'transparent', border: '1px solid #28282b', color: '#c4c4c8', padding: '6px 12px', borderRadius: 6, fontSize: 11, cursor: 'pointer' },
  sidebar: { gridArea: 'l', background: '#111113', borderRight: '1px solid #222225', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  sidebarRight: { gridArea: 'r', background: '#111113', borderLeft: '1px solid #222225', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  tabs: { display: 'flex', padding: '0 10px', borderBottom: '1px solid #222225', gap: 2, flexShrink: 0 },
  tab: { padding: '9px 8px', color: '#55555a', fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer', borderBottom: '1.5px solid transparent', marginBottom: -1 },
  tabActive: { color: '#f4f4f2', borderBottomColor: '#C4923A' },
  sidebarScroll: { flex: 1, overflowY: 'auto', padding: 12 },
  sectionLabel: { fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#444448', marginBottom: 8, marginTop: 4 },
  blockItem: { aspectRatio: '1.4', background: '#1c1c1e', border: '1px solid #2c2c2e', borderRadius: 7, cursor: 'grab', padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  layer: { display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px', cursor: 'pointer', borderLeft: '2px solid transparent', borderRadius: 4 },
  layerActive: { background: 'rgba(196,146,58,0.08)', borderLeftColor: '#C4923A' },
  canvas: { gridArea: 'c', background: '#0a0a0b', backgroundImage: 'radial-gradient(circle at 1px 1px, #1e1e20 1px, transparent 0)', backgroundSize: '24px 24px', overflow: 'auto', padding: '52px 28px' },
  frame: { background: '#fafaf7', borderRadius: 8, boxShadow: '0 16px 48px rgba(0,0,0,0.6)', color: '#0a0a0a', position: 'relative', minHeight: 800, transition: 'width 0.3s cubic-bezier(0.23,1,0.32,1)', margin: '0 auto', overflow: 'hidden' },
  blockWrap: { position: 'relative', cursor: 'grab', userSelect: 'none' },
  blockSelected: { outline: '2px solid #C4923A', outlineOffset: -2 },
  selLabel: { position: 'absolute', top: 4, left: 4, background: '#C4923A', color: '#0a0a0a', fontSize: 9, padding: '2px 6px', borderRadius: 3, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, zIndex: 10 },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'grid', placeItems: 'center', zIndex: 100 },
  modal: { background: '#161618', border: '1px solid #28282b', borderRadius: 12, padding: 28, maxWidth: 500, width: '92%', maxHeight: '90vh', overflow: 'auto' },
  label: { fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666', marginBottom: 4, display: 'block' },
  input: { width: '100%', background: '#1c1c1e', border: '1px solid #2c2c2e', borderRadius: 5, padding: '6px 10px', color: '#f4f4f2', fontFamily: 'inherit', fontSize: 11, outline: 'none' },
  infoBox: { marginTop: 14, padding: 12, background: '#1c1c1e', border: '1px solid #2c2c2e', borderRadius: 6, fontSize: 10, color: '#8a8a8f', lineHeight: 1.9, fontFamily: "'JetBrains Mono', monospace" },
};

ReactDOM.createRoot(document.getElementById('root')).render(<EKYBuilder />);
