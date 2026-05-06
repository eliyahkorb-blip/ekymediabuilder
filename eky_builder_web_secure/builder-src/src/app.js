import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

// ============================================================
// EKY MEDIA — TEMPLATES (High-End Branchen) · v7
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


// ============================================================
// EKY BUILDER v4 — READY-READY PREMIUM UPGRADE
// ============================================================
const PREMIUM_BLUEPRINTS = {
  elektriker: { trust:['Meisterbetrieb','24h Rückmeldung','VDE-konform','98% Weiterempfehlung'], usp:[['Feste Ansprechpartner','Ein Projektleiter koordiniert Termin, Material und Abnahme.'],['Saubere Dokumentation','Schaltpläne, Prüfprotokolle und Bilder werden sauber übergeben.'],['Energie & Zukunft','Wallbox, PV, Speicher und Smart Home werden gemeinsam gedacht.'],['Regionale Reaktionszeit','Kurze Wege im Einsatzgebiet und realistische Termine.']], process:[['01','Anfrage','Projekt kurz beschreiben und Wunschtermin nennen.'],['02','Vor-Ort-Check','Bestand, Normen und Machbarkeit prüfen.'],['03','Festes Angebot','Klare Leistungen, Kosten und Zeitplan.'],['04','Ausführung','Saubere Montage, Prüfung und Abnahme.']], review:['Die Elektroarbeiten wurden pünktlich, sauber und komplett dokumentiert umgesetzt.','Familie Schneider, Regensburg'], faq:[['Arbeiten Sie in Altbauten?','Ja. Wir prüfen Leitungswege, Bestand und Sicherungskasten normgerecht.'],['Kann ich Wallbox und PV gemeinsam planen?','Ja. Lastmanagement, Speicher und Netzanschluss müssen zusammenpassen.'],['Wie schnell bekomme ich ein Angebot?','Meist 3–5 Werktage nach dem Vor-Ort-Termin.']] },
  klempner: { trust:['SHK-Meisterbetrieb','Notfallannahme','Fördermittel-Beratung','Festpreis möglich'], usp:[['Realistische Planung','Wir prüfen Bestand, Leitungen und Energiebedarf vor dem Angebot.'],['Saubere Baustellen','Abdeckung, Staubschutz und Endreinigung sind eingeplant.'],['Förderung mitdenken','Heizungstausch und Wärmepumpe werden inklusive Förderung geplant.'],['Alles aus einer Hand','Beratung, Demontage, Installation und Wartung vom Team.']], process:[['01','Problem klären','Dringlichkeit und Ziel telefonisch oder per Formular klären.'],['02','Bestand prüfen','Vor-Ort-Check für Heizung, Bad oder Rohrsystem.'],['03','Angebot','Klare Optionen mit Preis, Zeitplan und Förderhinweisen.'],['04','Umsetzung','Montage, Inbetriebnahme und Einweisung.']], review:['Vom ersten Termin bis zur fertigen Wärmepumpe lief alles klar und zuverlässig.','Andreas Müller, Ingolstadt'], faq:[['Bieten Sie Notdienst an?','Für Bestandskunden und dringende Wasserschäden organisieren wir schnellstmöglich Hilfe.'],['Planen Sie komplette Bäder?','Ja, inklusive Koordination von Gewerken und Endmontage.'],['Unterstützen Sie bei Fördermitteln?','Ja, inklusive technischer Nachweise für die Antragstellung.']] },
  zahnarzt: { trust:['Neue Patienten','Digitale Diagnostik','Angstpatienten','Online-Termin'], usp:[['Schmerzarm behandeln','Moderne Anästhesie und ruhige Abläufe.'],['Digitale Präzision','Intraoralscan, digitale Planung und transparente Befunde.'],['Prophylaxe-System','Regelmäßige Vorsorge mit Erinnerungen.'],['Zeit für Beratung','Kosten, Alternativen und Ablauf werden verständlich erklärt.']], process:[['01','Termin buchen','Online oder telefonisch Wunschtermin anfragen.'],['02','Befund','Diagnose, Röntgen und Fragen in Ruhe klären.'],['03','Plan','Optionen inklusive Kosten- und Zeitplan.'],['04','Behandlung','Schonend mit Nachkontrolle.']], review:['Sehr ruhige Praxis, alles wurde verständlich erklärt. Ich habe mich trotz Zahnarztangst gut aufgehoben gefühlt.','Patientin aus Kelheim'], faq:[['Nehmen Sie neue Patienten auf?','Ja, je nach Auslastung sind Ersttermine meist innerhalb weniger Wochen möglich.'],['Behandeln Sie Angstpatienten?','Ja, mit mehr Zeit, Ruhe und schonenden Verfahren.'],['Kann ich online buchen?','Ja, der Buchungslink kann direkt hinterlegt werden.']] },
  maler: { trust:['Meisterqualität','Saubere Abdeckung','Farbberatung','Termintreu'], usp:[['Farbkonzept statt Zufall','Farbe, Licht und Material werden passend geplant.'],['Saubere Arbeitsweise','Abdecken, Kanten, Schleifen und Endreinigung sind Standard.'],['Innen & Fassade','Wohnräume, Büros, Treppenhäuser und Außenfassaden.'],['Verlässliche Termine','Klare Zeitfenster und transparente Kommunikation.']], process:[['01','Besichtigung','Räume, Untergrund und Zielbild prüfen.'],['02','Konzept','Farbton, Material und Ablauf festlegen.'],['03','Angebot','Fläche, Material und Zusatzarbeiten klar aufführen.'],['04','Umsetzung','Saubere Ausführung inklusive Übergabe.']], review:['Sehr saubere Arbeit, perfekte Kanten und kein Chaos in der Wohnung.','Familie Weber, Ingolstadt'], faq:[['Beraten Sie bei Farben?','Ja, Farbe, Licht und Material werden abgestimmt.'],['Arbeiten Sie für Gewerbe?','Ja, in Etappen, damit der Betrieb weiterlaufen kann.'],['Wie lange dauert eine Wohnung?','Nach Besichtigung erhalten Sie einen realistischen Zeitplan.']] },
  restaurant: { trust:['Online reservieren','Speisekarte digital','Google-ready','Mobile zuerst'], usp:[['Reservierung im Fokus','Wichtige Stellen führen zur Tischreservierung oder zum Anruf.'],['Speisekarte sichtbar','Gerichte, Öffnungszeiten und Angebote sind mobil sofort erreichbar.'],['Lokal gefunden werden','Struktur für Restaurant + Stadt + Küche.'],['Atmosphäre zeigen','Galerie, Story und Bewertungen machen Lust auf Besuch.']], process:[['01','Entdecken','Küche, Atmosphäre und Öffnungszeiten erkennen.'],['02','Vertrauen','Bewertungen und Bilder beantworten Fragen.'],['03','Reservieren','CTA führt zu Telefon, WhatsApp oder Buchung.'],['04','Wiederkommen','Events und Angebote halten Gäste aktuell.']], review:['Die neue Seite zeigt endlich, wie schön das Restaurant wirklich ist.','Stammgast aus Würzburg'], faq:[['Kann ich online reservieren?','Ja, Reservierungslink oder Telefon-CTA werden verbunden.'],['Ist die Speisekarte mobil sichtbar?','Ja, die Struktur ist bewusst für Smartphone-Gäste optimiert.'],['Kann man Gruppen anfragen?','Ja, der Kontaktbereich kann Gruppen- und Eventanfragen aufnehmen.']] },
  barbershop: { trust:['Online buchen','Top bewertet','Klare Preise','Mobile-first'], usp:[['Termin vor Preis','Der wichtigste Button führt klar zur Buchung.'],['Leistungen verständlich','Cut, Beard, Styling und Kombis sind vergleichbar.'],['Social Proof','Bewertungen, Galerie und Barber-Story schaffen Vertrauen.'],['Look & Feel','Die Website transportiert Style und Qualität.']], process:[['01','Service wählen','Kunde sieht passende Leistungen.'],['02','Termin buchen','Buchungslink oder Telefon prominent.'],['03','Vorbeikommen','Adresse und Öffnungszeiten klar sichtbar.'],['04','Wiederbuchen','CTA und Social halten Kunden im System.']], review:['Man sieht direkt, dass es kein 08/15-Salon ist. Buchung und Preise kommen hochwertig rüber.','Kunde aus Würzburg'], faq:[['Sind Walk-ins möglich?','Wenn Kapazität frei ist, ja. Sicherer ist Onlinebuchung.'],['Kann ich Preise anzeigen?','Ja, Preisblöcke können bearbeitet werden.'],['Können Bilder eingebaut werden?','Ja, Galerie ist vorbereitet.']] },
  hotel: { trust:['Direkt buchen','Beste Lage','Bewertungen','Mobile Buchung'], usp:[['Direktbuchung stärken','CTAs führen zu Buchung, Anfrage oder Telefon.'],['Zimmer klar präsentieren','Zimmer, Frühstück, Lage und Ausstattung strukturiert zeigen.'],['Lage verkaufen','Stadt, Umgebung und Erlebnisfaktoren GEO-stark einbinden.'],['Vertrauen aufbauen','Bewertungen, Bilder und Geschichte reduzieren Buchungszweifel.']], process:[['01','Zimmer finden','Gast erkennt Angebot und Lage.'],['02','Vertrauen','Bilder und Bewertungen geben Sicherheit.'],['03','Buchen','CTA führt zum besten Buchungsweg.'],['04','Anreisen','Kontakt, Adresse und Infos sichtbar.']], review:['Die Seite zeigt sofort Atmosphäre und Lage. Genau das braucht ein Boutique-Hotel.','Gast aus München'], faq:[['Gibt es Parkplätze?','Kann prominent in FAQ und Trust-Bar platziert werden.'],['Kann ich direkt buchen?','Ja, der Buchungslink kann als Haupt-CTA hinterlegt werden.'],['Sind Haustiere erlaubt?','FAQ-Einträge lassen sich ergänzen.']] },
  kanzlei: { trust:['Diskrete Beratung','Fachbereiche','Schnelle Rückmeldung','Digital möglich'], usp:[['Klare Fachbereiche','Mandanten finden sofort, ob ihr Anliegen passt.'],['Verständliche Sprache','Komplexe Themen ohne Kanzlei-Floskeln erklären.'],['Anfrage mit Kontext','Kontaktbereich fragt Rechtsgebiet und Dringlichkeit ab.'],['Seriöses Design','Vertrauen, Kompetenz und Ruhe stehen im Vordergrund.']], process:[['01','Anfrage','Anliegen und Dringlichkeit beschreiben.'],['02','Einschätzung','Zuständigkeit und nächste Schritte prüfen.'],['03','Erstberatung','Empfehlung, Kostenrahmen und Strategie.'],['04','Mandat','Strukturierte Bearbeitung.']], review:['Kompetente und klare Beratung. Alle Optionen wurden verständlich erklärt.','Mandant aus Würzburg'], faq:[['Was kostet eine Erstberatung?','Kosten können transparent im FAQ erklärt werden.'],['Beraten Sie digital?','Ja, Video- oder Telefontermine können eingebunden werden.'],['Wie schnell bekomme ich Rückmeldung?','Die gewünschte Reaktionszeit kann klar kommuniziert werden.']] },
  handwerk: { trust:['Meisterbetrieb','Regionale Nähe','Saubere Ausführung','Klare Angebote'], usp:[['Leistungen klar erklären','Besucher verstehen sofort, welche Arbeiten übernommen werden.'],['Vertrauen statt Floskeln','Erfahrung, Bewertungen und Bilder zeigen Qualität.'],['Anfrage vereinfachen','CTA, Telefon und Formular holen qualifizierte Anfragen.'],['Lokal sichtbar','Stadt, Region und Leistungen sind für Google und KI vorbereitet.']], process:[['01','Anfrage','Kunde beschreibt sein Projekt.'],['02','Beratung','Bedarf und Machbarkeit klären.'],['03','Angebot','Leistung, Preisrahmen und Zeitplan.'],['04','Umsetzung','Saubere Arbeit und Übergabe.']], review:['Endlich eine Website, die Handwerk nicht billig wirken lässt, sondern Qualität und Vertrauen zeigt.','Gewerbekunde aus Bayern'], faq:[['Für welche Projekte eignet sich die Seite?','Für lokale Handwerker mit dem Ziel, bessere Anfragen zu bekommen.'],['Kann ich Leistungen austauschen?','Ja, alle Leistungsblöcke sind direkt bearbeitbar.'],['Ist die Seite mobil optimiert?','Ja, Vorschau und Export sind responsive.']] },
  friseur: { trust:['Online buchen','Bewertungen','Preise sichtbar','Galerie'], usp:[['Look verkaufen','Bilder, Atmosphäre und Leistungen zeigen den Stil des Salons.'],['Termin im Fokus','Mobile Besucher werden direkt zur Buchung geführt.'],['Leistungen klar','Farbe, Schnitt, Pflege und Pakete strukturiert zeigen.'],['Vertrauen durch Ergebnisse','Bewertungen und Galerie machen Qualität sichtbar.']], process:[['01','Leistung wählen','Kunde sieht Angebot und Preise.'],['02','Termin buchen','Onlinebuchung oder Telefon prominent.'],['03','Beratung','Wunschlook und Pflegebedarf klären.'],['04','Ergebnis','Galerie und Bewertungen stärken Wiederbuchung.']], review:['Die Seite fühlt sich hochwertig an und macht es leicht, direkt einen Termin zu buchen.','Kundin aus Würzburg'], faq:[['Kann ich Preise einbauen?','Ja, Preisblöcke können ergänzt werden.'],['Kann ich Vorher-Nachher-Bilder zeigen?','Ja, die Galerie ist vorbereitet.'],['Funktioniert Onlinebuchung?','Ja, Calendly oder ein anderer Buchungslink kann hinterlegt werden.']] },
  b2b: { trust:['B2B-fokussiert','Case Studies','Lead-CTA','SEO-Struktur'], usp:[['Klare Positionierung','Besucher verstehen Angebot, Zielgruppe und Nutzen schnell.'],['Proof statt Behauptung','Zahlen, Prozesse, Referenzen und Cases bauen Vertrauen auf.'],['Lead-Qualifizierung','Kontaktformulare fragen Bedarf und Nachricht ab.'],['Skalierbare Struktur','Leistungsseiten, FAQ und GEO/SEO sind vorbereitet.']], process:[['01','Problem','Kunde erkennt, dass sein Problem verstanden wird.'],['02','Lösung','Leistung und Ablauf werden konkret erklärt.'],['03','Proof','Referenzen und Zahlen stützen die Aussage.'],['04','Lead','Anfrage-CTA führt zur Kontaktaufnahme.']], review:['Die Struktur wirkt wie eine echte Vertriebsseite, nicht wie eine digitale Visitenkarte.','Geschäftsführer Mittelstand'], faq:[['Kann man Case Studies einbauen?','Ja, Galerie, Testimonial und Leistungsblöcke können genutzt werden.'],['Kann das Formular Leads qualifizieren?','Ja, der Kontaktblock ist editierbar.'],['Ist das SEO vorbereitet?','Ja, Title, Description, FAQ, Schema, Sitemap und Robots sind vorbereitet.']] }
};
function cloneDeep(obj){return JSON.parse(JSON.stringify(obj));}
function makeBlock(type,id,data){return {type,id,data};}
function iconList(items){return items.map((Text,i)=>({Icon:['✓','★','⚡','●'][i%4],Text}));}
function ensureBusinessFields(tpl){ const b=tpl.business||{}; tpl.business=b; b.mainKeyword=b.mainKeyword||`${tpl.name} ${b.city||'Würzburg'}`; b.seoTitle=b.seoTitle||`${b.name} | ${tpl.name} in ${b.city||'Würzburg'}`; b.seoDescription=b.seoDescription||`${b.name}: ${b.tagline||tpl.name}. Jetzt Beratung, Termin oder Angebot in ${b.city||'Ihrer Region'} anfragen.`; b.primaryRegion=b.primaryRegion||(Array.isArray(b.areaServed)?b.areaServed.join(', '):'Würzburg, Bayern'); b.conversionGoal=b.conversionGoal||(b.calendly?'Terminbuchung':'Qualifizierte Anfrage'); }
function premiumizeTemplate(key,tpl){ const alias={gastronomie:'restaurant'}; const bp=PREMIUM_BLUEPRINTS[key]||PREMIUM_BLUEPRINTS[alias[key]]||PREMIUM_BLUEPRINTS.handwerk; ensureBusinessFields(tpl); const old=tpl.blocks||[]; const get=t=>cloneDeep(old.find(b=>b.type===t)||{}); const nav=get('nav').type?get('nav'):makeBlock('nav','n1',{}); const hero=get('hero').type?get('hero'):makeBlock('hero','h1',{Eyebrow:'Unternehmen',Überschrift:'Eine Website, die <em>verkauft</em>.',Untertitel:'Professioneller Auftritt für mehr Anfragen.', 'Button 1':'Anfrage starten','Button 2':'Leistungen'}); const features=get('features').type?get('features'):makeBlock('features','f1',{Titel:'Leistungen',Elemente:[{Titel:'Leistung 1',Text:'Beschreibung.'},{Titel:'Leistung 2',Text:'Beschreibung.'},{Titel:'Leistung 3',Text:'Beschreibung.'}]}); const split=get('split').type?get('split'):makeBlock('split','s1',{Eyebrow:'Über uns',Überschrift:'Erfahrung, die man merkt.',Text:'Saubere Beratung und zuverlässige Umsetzung.'}); const cta=get('cta').type?get('cta'):makeBlock('cta','c1',{Überschrift:'Bereit für Ihr Projekt?',Untertitel:'Jetzt unverbindlich anfragen.',Button:'Anfrage starten'}); const faq=get('faq').type?get('faq'):makeBlock('faq','faq1',{Titel:'Häufige Fragen',Elemente:[]}); faq.data={...(faq.data||{}),Elemente:bp.faq.map(([Frage,Antwort])=>({Frage,Antwort}))}; const footer=get('footer').type?get('footer'):makeBlock('footer','foot1',{}); tpl.blocks=[nav,hero,makeBlock('trust','trust1',{Elemente:iconList(bp.trust)}),features,makeBlock('usps','usps1',{Titel:'Warum Kunden uns wählen.',Elemente:bp.usp.map(([Titel,Text])=>({Titel,Text}))}),makeBlock('process','process1',{Titel:'So läuft die Zusammenarbeit ab.',Elemente:bp.process.map(([Nummer,Titel,Text])=>({Nummer,Titel,Text}))}),split,makeBlock('gallery','gal1',{Titel:'Einblicke & Referenzen',Anzahl:6}),makeBlock('testimonial','testi1',{Zitat:bp.review[0],Autor:bp.review[1],Bewertung:5}),faq,cta,makeBlock('contact','contact1',{Titel:'Projekt anfragen',Untertitel:`Beschreiben Sie kurz Ihr Anliegen. ${tpl.business.name} meldet sich schnellstmöglich zurück.`,Felder:[{Label:'Name',Typ:'text',Pflicht:'ja'},{Label:'Telefon oder E-Mail',Typ:'text',Pflicht:'ja'},{Label:'Projekt / Anliegen',Typ:'textarea',Pflicht:'ja'}],Button:'Anfrage senden'}),makeBlock('social','social1',{Titel:'Online verbunden',Untertitel:'WhatsApp, Instagram, TikTok, Facebook und LinkedIn – alles an einem Ort.'}),footer]; return tpl; }
function addExtraTemplates(){ if(!TEMPLATES.handwerk){TEMPLATES.handwerk=cloneDeep(TEMPLATES.maler||TEMPLATES.elektriker);TEMPLATES.handwerk.name='Handwerk allgemein';TEMPLATES.handwerk.business={name:'Muster Handwerk GmbH',legalName:'Muster Handwerk GmbH',type:'HomeAndConstructionBusiness',tagline:'Qualitätshandwerk aus Würzburg',phone:'+49 931 123456',email:'info@muster-handwerk.de',street:'Musterstraße 12',postalCode:'97070',city:'Würzburg',region:'Bayern',country:'DE',lat:'49.7913',lng:'9.9534',openingHours:'Mo-Fr 07:00-17:00',priceRange:'€€',foundingDate:'2001',areaServed:['Würzburg','Schweinfurt','Kitzingen'],calendly:''};} if(!TEMPLATES.friseur){TEMPLATES.friseur=cloneDeep(TEMPLATES.barbershop||TEMPLATES.elektriker);TEMPLATES.friseur.name='Friseur & Beauty';TEMPLATES.friseur.business={name:'Atelier Bellezza',legalName:'Atelier Bellezza GmbH',type:'HairSalon',tagline:'Friseur, Farbe und Beauty in Würzburg',phone:'+49 931 223344',email:'termin@atelier-bellezza.de',street:'Theaterstraße 9',postalCode:'97070',city:'Würzburg',region:'Bayern',country:'DE',lat:'49.7970',lng:'9.9320',openingHours:'Di-Fr 09:00-19:00, Sa 09:00-16:00',priceRange:'€€',foundingDate:'2018',areaServed:['Würzburg','Höchberg','Veitshöchheim'],calendly:''};} if(!TEMPLATES.b2b){TEMPLATES.b2b=cloneDeep(TEMPLATES.kanzlei||TEMPLATES.elektriker);TEMPLATES.b2b.name='B2B & Mittelstand';TEMPLATES.b2b.business={name:'Noventis Solutions',legalName:'Noventis Solutions GmbH',type:'ProfessionalService',tagline:'Prozessberatung und digitale Systeme für den Mittelstand',phone:'+49 931 998877',email:'kontakt@noventis-solutions.de',street:'Berliner Platz 4',postalCode:'97080',city:'Würzburg',region:'Bayern',country:'DE',lat:'49.8001',lng:'9.9358',openingHours:'Mo-Fr 09:00-18:00',priceRange:'€€€',foundingDate:'2016',areaServed:['Würzburg','Nürnberg','Bayern'],calendly:''};} }
addExtraTemplates(); Object.keys(TEMPLATES).forEach(k=>{TEMPLATES[k]=premiumizeTemplate(k,TEMPLATES[k]);});

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
  { type: "contact", label: "Kontaktformular" },
  { type: "social", label: "Social Icons" },
];

const BLOCK_LABELS = {
  nav: "Navigation", hero: "Hero", trust: "Vertrauen", features: "Leistungen",
  usps: "USPs", process: "Ablauf", split: "Split",
  cta: "Aktion", testimonial: "Bewertung", faq: "FAQ",
  pricing: "Preise", gallery: "Galerie", contact: "Kontaktformular", social: "Social Icons", footer: "Footer"
};

const DEFAULT_BLOCK = {
  hero: { Eyebrow: "Eyebrow", Überschrift: "Überschrift hier.", Untertitel: "Untertitel.", "Button 1": "Primär", "Button 2": "Sekundär" },
  trust: { Elemente: [{ Icon: "✓", Text: "Meisterbetrieb" }, { Icon: "★", Text: "Top bewertet" }, { Icon: "⚡", Text: "Schnelle Rückmeldung" }, { Icon: "●", Text: "Regional vor Ort" }] },
  usps: { Titel: "Warum Kunden uns wählen.", Elemente: [{ Titel: "Klare Beratung", Text: "Wir erklären Ablauf, Kosten und nächste Schritte verständlich." }, { Titel: "Saubere Umsetzung", Text: "Planung, Ausführung und Übergabe laufen strukturiert." }, { Titel: "Regional erreichbar", Text: "Kurze Wege und feste Ansprechpartner in der Region." }, { Titel: "Transparentes Angebot", Text: "Keine schwammigen Versprechen, sondern klare Leistungen." }] },
  process: { Titel: "So läuft die Zusammenarbeit ab.", Elemente: [{ Nummer: "01", Titel: "Anfrage", Text: "Sie beschreiben Ihr Anliegen." }, { Nummer: "02", Titel: "Beratung", Text: "Wir prüfen Ziel und Machbarkeit." }, { Nummer: "03", Titel: "Angebot", Text: "Sie erhalten ein klares Angebot." }, { Nummer: "04", Titel: "Umsetzung", Text: "Wir setzen sauber und planbar um." }] },
  features: { Titel: "Features", Elemente: [{ Titel: "Feature 1", Text: "Beschreibung." }, { Titel: "Feature 2", Text: "Beschreibung." }, { Titel: "Feature 3", Text: "Beschreibung." }] },
  split: { Eyebrow: "Bereich", Überschrift: "Überschrift.", Text: "Text hier." },
  cta: { Überschrift: "Call to Action", Untertitel: "Unterzeile.", Button: "Jetzt handeln" },
  faq: { Titel: "Häufige Fragen", Elemente: [{ Frage: "Frage?", Antwort: "Antwort." }, { Frage: "Frage 2?", Antwort: "Antwort 2." }] },
  gallery: { Titel: "Galerie", Anzahl: 6 },
  testimonial: { Zitat: "Tolle Arbeit, pünktlich und sauber.", Autor: "Max Mustermann, Musterfirma" },
  pricing: { Titel: "Unsere Preise", Pakete: [{ Name: "Basis", Preis: "ab 500€", Features: "Für kleine Projekte" }, { Name: "Plus", Preis: "ab 1.200€", Features: "Beliebteste Option" }, { Name: "Premium", Preis: "ab 2.500€", Features: "Komplettlösung" }] },
  contact: { Titel: "Projekt anfragen", Untertitel: "Beschreiben Sie kurz Ihr Anliegen. Wir melden uns schnellstmöglich zurück.", Felder: [{ Label: "Name", Typ: "text", Pflicht: "ja" }, { Label: "Telefon oder E-Mail", Typ: "text", Pflicht: "ja" }, { Label: "Nachricht", Typ: "textarea", Pflicht: "ja" }], Button: "Anfrage senden" },
  social: { Titel: "Online verbunden", Untertitel: "Folgen Sie uns oder schreiben Sie direkt.", Layout: "zentriert" }
};

const keyMap = {
  hero: { Eyebrow: "eyebrow", Überschrift: "headline", Untertitel: "sub", "Button 1": "cta1", "Button 2": "cta2" },
  features: { Titel: "title", Elemente: "items" },
  split: { Eyebrow: "eyebrow", Überschrift: "headline", Text: "text" },
  cta: { Überschrift: "headline", Untertitel: "sub", Button: "cta" },
  faq: { Titel: "title", Elemente: "items" },
  gallery: { Titel: "title", Anzahl: "images" },
  testimonial: { Zitat: "quote", Autor: "author" },
  pricing: { Titel: "title", Pakete: "plans" },
  contact: { Titel: "title", Untertitel: "sub", Felder: "fields", Button: "button" },
  social: { Titel: "title", Untertitel: "sub", Layout: "layout" }
};

const itemKeyMap = {
  features: { Titel: "title", Text: "text" },
  faq: { Frage: "q", Antwort: "a" },
  pricing: { Name: "name", Preis: "price", Features: "features" },
  contact: { Label: "label", Typ: "type", Pflicht: "required" }
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


const DEFAULT_MEDIA = { logo: null, hero: null, gallery: [], blockImages: [] };

function slugify(value) {
  return String(value || 'seite')
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'seite';
}

function ensureArray(value) { return Array.isArray(value) ? value : []; }

function dataUrlToBase64(dataUrl) {
  const parts = String(dataUrl || '').split(',');
  return parts.length > 1 ? parts[1] : '';
}

function assetSrc(asset, mode = 'inline') {
  if (!asset) return '';
  if (mode === 'folder' && asset.exportName) return `assets/${asset.exportName}`;
  return asset.dataUrl || '';
}

function makeImageAlt(business, role, index = 0, fileName = '') {
  const cleanFile = String(fileName || '').replace(/\.[a-z0-9]+$/i, '').replace(/[-_]+/g, ' ').trim();
  const base = business?.mainKeyword || business?.name || 'Unternehmen';
  const city = business?.city ? ` in ${business.city}` : '';
  const roleText = role === 'logo' ? 'Logo' : role === 'hero' ? 'Titelbild' : `Referenzbild ${index + 1}`;
  return `${business?.name || base} ${roleText}${city}${cleanFile ? ` – ${cleanFile}` : ''}`.replace(/\s+/g, ' ').trim();
}



const LOCAL_SVG_ICONS = {
  whatsapp: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.52 0 .18 5.34.18 11.91c0 2.1.55 4.15 1.6 5.96L.08 24l6.28-1.65a11.87 11.87 0 0 0 5.72 1.46h.01c6.56 0 11.9-5.34 11.91-11.9a11.85 11.85 0 0 0-3.48-8.43ZM12.09 21.8h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.22-3.72.98.99-3.63-.24-.37a9.86 9.86 0 0 1-1.51-5.27c0-5.45 4.43-9.88 9.88-9.88a9.8 9.8 0 0 1 6.99 2.9 9.81 9.81 0 0 1 2.89 6.99c0 5.44-4.44 9.88-9.88 9.88Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.29-.77.96-.95 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.39-1.48a8.95 8.95 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35Z"/></svg>',
  instagram: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg>',
  tiktok: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.6 5.82a6.45 6.45 0 0 0 3.82 1.23v3.2a9.63 9.63 0 0 1-3.82-.8v6.05a6.5 6.5 0 1 1-6.5-6.5c.42 0 .83.04 1.23.12v3.3a3.27 3.27 0 1 0 2.05 3.03V2h3.22a6.42 6.42 0 0 0 0 3.82Z"/></svg>',
  facebook: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 5.03 3.68 9.2 8.49 9.94v-7.03H7.97v-2.91h2.52V9.84c0-2.49 1.48-3.86 3.75-3.86 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22A10.02 10.02 0 0 0 22 12.06Z"/></svg>',
  linkedin: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V8.98h3.42v1.57h.05a3.75 3.75 0 0 1 3.37-1.85c3.61 0 4.27 2.38 4.27 5.47v6.28ZM5.34 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.04H3.56V8.98h3.56v11.47ZM22.22 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"/></svg>',
  contrast: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20V2Zm0 2.2v15.6a7.8 7.8 0 0 1 0-15.6Z"/></svg>'
};

function localSvgIcon(name) { return LOCAL_SVG_ICONS[name] || LOCAL_SVG_ICONS.whatsapp; }

function normalizeMedia(media = DEFAULT_MEDIA) {
  return { logo: media?.logo || null, hero: media?.hero || null, gallery: ensureArray(media?.gallery), blockImages: ensureArray(media?.blockImages) };
}

function allMediaAssets(media = DEFAULT_MEDIA) {
  const m = normalizeMedia(media);
  return [m.logo, m.hero, ...m.gallery, ...m.blockImages].filter(Boolean);
}

function findMediaAsset(media, id) {
  if (!id) return null;
  return allMediaAssets(media).find(asset => asset.id === id) || null;
}

function imageForBlock(block, media, fallbackRole = 'hero') {
  const own = findMediaAsset(media, block?.data?.BildId || block?.data?.ImageId);
  if (own) return own;
  const m = normalizeMedia(media);
  if (fallbackRole === 'hero' || fallbackRole === 'split') return m.hero || null;
  return null;
}

function galleryAssetsForBlock(block, media) {
  const ids = ensureArray(block?.data?.BildIds || block?.data?.GalleryImageIds).filter(Boolean);
  if (ids.length) return ids.map(id => findMediaAsset(media, id)).filter(Boolean);
  return normalizeMedia(media).gallery;
}

function whatsappUrlFor(b = {}) {
  const raw = String(b.whatsapp || '').trim();
  if (/^https?:\/\//i.test(raw)) return raw;
  const digits = (raw || b.phone || '').replace(/[^0-9]/g, '');
  return digits ? `https://wa.me/${digits}` : '';
}

function normalizeSocialUrl(value, baseUrl) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  if (/^https?:\/\//i.test(raw)) return raw;
  const clean = raw.replace(/^@/, '').replace(/^\/+/, '');
  return baseUrl.endsWith('/@') ? `${baseUrl}${clean}` : `${baseUrl}/${clean}`;
}

function socialLinksFor(b = {}) {
  return [
    { key: 'whatsapp', label: 'WhatsApp', url: whatsappUrlFor(b) },
    { key: 'instagram', label: 'Instagram', url: normalizeSocialUrl(b.instagram, 'https://instagram.com') },
    { key: 'tiktok', label: 'TikTok', url: normalizeSocialUrl(b.tiktok, 'https://www.tiktok.com/@') },
    { key: 'facebook', label: 'Facebook', url: normalizeSocialUrl(b.facebook, 'https://facebook.com') },
    { key: 'linkedin', label: 'LinkedIn', url: normalizeSocialUrl(b.linkedin, 'https://linkedin.com/company') }
  ].filter(link => link.url);
}

function collectServices(blocks) {
  const feature = (blocks || []).find(b => b.type === 'features');
  const data = translateData('features', feature?.data || {});
  return ensureArray(data.items).slice(0, 8).filter(it => it?.title).map((it, i) => ({ ...it, slug: slugify(it.title), index: i }));
}



// ============================================================
// v7.1 — API Keys & SEO Keyword Engine
// ============================================================
const API_PROVIDER_FIELDS = [
  { provider: 'openai', label: 'ChatGPT / OpenAI', keyField: 'openaiApiKey', modelField: 'openaiModel', endpointField: 'openaiEndpoint', defaultModel: 'gpt-5.5', endpoint: 'https://api.openai.com/v1' },
  { provider: 'claude', label: 'Claude / Anthropic', keyField: 'claudeApiKey', modelField: 'claudeModel', endpointField: 'claudeEndpoint', defaultModel: 'claude-sonnet', endpoint: 'https://api.anthropic.com' },
  { provider: 'higgsfield', label: 'Higgsfield', keyField: 'higgsfieldApiKey', modelField: 'higgsfieldModel', endpointField: 'higgsfieldEndpoint', defaultModel: 'higgsfield-default', endpoint: 'https://api.higgsfield.ai' }
];

function parseSeoKeywords(value) {
  const raw = String(value || '')
    .split(/[\n,;|]+/g)
    .map(v => v.trim().replace(/\s+/g, ' '))
    .filter(Boolean);
  const seen = new Set();
  return raw.filter(k => {
    const key = k.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 80);
}

function keywordBag(b = {}) {
  return parseSeoKeywords([b.mainKeyword, b.seoKeywords, b.seoKeywordMap].filter(Boolean).join('\n'));
}

function plainText(value) {
  return String(value || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function containsKeyword(text, keyword) {
  if (!keyword) return true;
  return plainText(text).toLowerCase().includes(String(keyword).toLowerCase());
}

function smartTrim(value, max = 160) {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return (cut.slice(0, cut.lastIndexOf(' ')) || cut).replace(/[,.:-]+$/g, '') + '…';
}

function titleCaseKeyword(value) {
  return String(value || '').trim().replace(/\s+/g, ' ').replace(/^./, c => c.toUpperCase());
}

function withCity(keyword, city) {
  const kw = String(keyword || '').trim();
  if (!kw) return '';
  if (!city || kw.toLowerCase().includes(String(city).toLowerCase())) return kw;
  return `${kw} ${city}`;
}

function appendSeoSentence(text, sentence, keyword) {
  const base = String(text || '').trim();
  if (!sentence || (keyword && containsKeyword(base, keyword))) return base;
  return `${base}${base && !/[.!?]$/.test(plainText(base)) ? '.' : ''} ${sentence}`.replace(/\s+/g, ' ').trim();
}

function seoDescriptionFor(b, keywords) {
  const city = b.city || '';
  const list = keywords.slice(0, 4).join(', ');
  return smartTrim(`${b.name || 'Das Unternehmen'} ist Ihr Ansprechpartner für ${list}${city ? ` in ${city} und Umgebung` : ''}. Jetzt Beratung, Angebot oder Termin anfragen.`, 158);
}

function buildKeywordPlan(b = {}) {
  const fallback = `${b.type || 'Dienstleistung'} ${b.city || ''}`.trim();
  const keywords = keywordBag(b);
  const primary = keywords[0] || b.mainKeyword || fallback || 'Dienstleistung';
  const city = b.city || '';
  const regionalPrimary = withCity(primary, city);
  return {
    keywords: keywords.length ? keywords : [primary],
    primary,
    regionalPrimary,
    title: smartTrim(`${titleCaseKeyword(regionalPrimary)} | ${b.name || 'Website'}`, 62),
    description: seoDescriptionFor(b, keywords.length ? keywords : [primary])
  };
}

function applyKeywordPlan(b = {}, blocks = []) {
  const plan = buildKeywordPlan(b);
  const k = plan.keywords;
  const city = b.city || 'der Region';
  const top3 = k.slice(0, 3).join(', ');
  const updatedBusiness = {
    ...b,
    mainKeyword: plan.primary,
    seoTitle: plan.title,
    seoDescription: plan.description,
    seoKeywordMap: k.join(', '),
    seoKeywordsAppliedAt: new Date().toISOString()
  };
  const updatedBlocks = (blocks || []).map(block => {
    const data = cloneDeep(block.data || {});
    if (block.type === 'hero') {
      data.Eyebrow = plan.regionalPrimary;
      if (!containsKeyword(data.Überschrift, plan.primary)) data.Überschrift = `${titleCaseKeyword(plan.regionalPrimary)} – <em>${b.name || 'Ihr Profi'}</em>`;
      data.Untertitel = appendSeoSentence(data.Untertitel, `${b.name || 'Wir'} verbindet ${top3} mit persönlicher Beratung, klarer Umsetzung und regionaler Erreichbarkeit in ${city}.`, plan.primary);
      return { ...block, data };
    }
    if (block.type === 'features') {
      data.Titel = `Leistungen rund um ${plan.regionalPrimary}`;
      const existing = ensureArray(data.Elemente);
      const targetKeywords = k.slice(0, Math.max(3, Math.min(6, k.length || 3)));
      data.Elemente = targetKeywords.map((kw, i) => {
        const old = existing[i] || {};
        const title = old.Titel && containsKeyword(old.Titel, kw) ? old.Titel : titleCaseKeyword(kw);
        const sentence = `${titleCaseKeyword(kw)} gehört zu den zentralen Leistungen von ${b.name || 'uns'}${b.city ? ` in ${b.city}` : ''} – mit sauberer Beratung, transparenter Planung und schneller Anfragemöglichkeit.`;
        return { ...old, Titel: title, Text: appendSeoSentence(old.Text || `Professionelle Unterstützung für ${kw}.`, sentence, kw) };
      });
      return { ...block, data };
    }
    if (block.type === 'split') {
      data.Text = appendSeoSentence(data.Text, `Der Fokus liegt auf ${top3}, damit Kunden ${b.city ? `aus ${b.city} und Umgebung` : 'aus der Region'} Ihr Angebot schneller finden und direkt anfragen können.`, plan.primary);
      return { ...block, data };
    }
    if (block.type === 'usps') {
      data.Titel = `Warum ${plan.regionalPrimary} mit ${b.name || 'uns'} funktioniert.`;
      return { ...block, data };
    }
    if (block.type === 'faq') {
      const oldItems = ensureArray(data.Elemente);
      const additions = k.slice(0, 5).map(kw => ({
        Frage: `Bietet ${b.name || 'das Unternehmen'} ${kw}${b.city && !String(kw).toLowerCase().includes(String(b.city).toLowerCase()) ? ` in ${b.city}` : ''} an?`,
        Antwort: `Ja. ${b.name || 'Wir'} unterstützt Kunden bei ${kw}${b.city ? ` in ${b.city} und Umgebung` : ''}. Über Telefon, Formular oder Terminlink können Sie direkt eine Anfrage stellen.`
      }));
      const merged = [...oldItems];
      additions.forEach(item => {
        if (!merged.some(old => plainText(old.Frage).toLowerCase() === plainText(item.Frage).toLowerCase())) merged.push(item);
      });
      data.Elemente = merged.slice(0, 10);
      return { ...block, data };
    }
    if (block.type === 'contact') {
      data.Untertitel = appendSeoSentence(data.Untertitel, `Nennen Sie kurz, ob es um ${top3} geht – so kann ${b.name || 'das Team'} Ihre Anfrage schneller einschätzen.`, plan.primary);
      return { ...block, data };
    }
    return block;
  });
  return { business: updatedBusiness, blocks: updatedBlocks, plan };
}

function runQualityChecks(blocks, business, colors, media) {
  const checks = [];
  const add = (level, label, hint) => checks.push({ level, label, hint });
  const hasBlock = type => (blocks || []).some(b => b.type === type);
  const services = collectServices(blocks);
  const assetsKb = estimateExportAssetKb(media);
  const endpoint = normalizeUrl(business?.formEndpoint);
  const emailOk = !business?.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(business.email));
  const phoneOk = !business?.phone || String(business.phone).replace(/[^0-9+]/g, '').length >= 7;
  const domainOk = !business?.website || /^https?:\/\//.test(normalizeUrl(business.website));
  if (!business?.name) add('kritisch', 'Firmenname fehlt', 'Ohne Firmenname wirken SEO, Footer, Schema und rechtliche Seiten unfertig.');
  if (!business?.phone && !business?.email) add('kritisch', 'Kontaktweg fehlt', 'Telefon oder E-Mail ist Pflicht, damit die Seite Leads generieren kann.');
  if (!emailOk) add('kritisch', 'E-Mail-Format prüfen', 'Die E-Mail-Adresse wirkt ungültig.');
  if (!phoneOk) add('warnung', 'Telefonnummer prüfen', 'Die Telefonnummer sollte vollständig und klickbar sein.');
  if (!business?.city) add('warnung', 'Stadt fehlt', 'Für lokale SEO/GEO-Sichtbarkeit sollte die Hauptstadt gepflegt sein.');
  if (!business?.street || !business?.postalCode) add('warnung', 'Adresse unvollständig', 'Für Local SEO, Impressum und Vertrauen sollte die Adresse vollständig sein.');
  if (!business?.owner && !business?.legalName) add('warnung', 'Rechtliche Angaben unvollständig', 'Für Impressum bitte Inhaber/Geschäftsführer oder vollständige Firmierung pflegen.');
  if (!domainOk) add('warnung', 'Website-URL prüfen', 'Die Live-URL sollte mit https:// beginnen, damit Canonical und Sitemap stimmen.');
  if (!business?.seoTitle || String(business.seoTitle).length < 35 || String(business.seoTitle).length > 70) add('warnung', 'SEO-Titel optimieren', 'Ideal sind ca. 45–60 Zeichen mit Hauptleistung + Stadt + Firma.');
  if (!business?.seoDescription || String(business.seoDescription).length < 110 || String(business.seoDescription).length > 170) add('warnung', 'Meta Description optimieren', 'Ideal sind ca. 140–160 Zeichen mit Nutzen, Ort und Call-to-Action.');
  if (!business?.mainKeyword) add('warnung', 'Haupt-Keyword fehlt', 'Pflege das Haupt-Keyword, z.B. „Elektriker Würzburg“ oder „Zahnarzt Regensburg“.');
  const seoKeywords = keywordBag(business);
  if (seoKeywords.length < 3) add('warnung', 'Keyword-Reiter ausfüllen', 'Für starke SEO sollten mindestens 3–8 relevante Suchbegriffe im Keyword-Reiter gepflegt und automatisch eingebunden werden.');
  if (seoKeywords.length > 30) add('info', 'Viele Keywords hinterlegt', 'Mehr als 30 Keywords sind möglich, sollten aber in Clustern genutzt werden, damit kein Keyword-Stuffing entsteht.');
  if (!endpoint) add('warnung', 'Formular-Endpunkt fehlt', 'Für Live-Websites bitte Make, Zapier, Formspree, eigenes Backend oder CRM-Endpoint eintragen. Im Export liegt zusätzlich ein /backend-Beispiel bei.');
  if (endpoint && !/^https?:\/\//.test(endpoint) && !endpoint.startsWith('/api/')) add('info', 'Formular-Endpoint prüfen', 'Relative Endpoints sind okay, wenn euer Hosting/Backend sie wirklich ausliefert.');
  if (!media?.logo) add('warnung', 'Logo fehlt', 'Für Kunden-Websites sollte ein echtes Logo hochgeladen werden.');
  if (!media?.hero) add('warnung', 'Hero-Bild fehlt', 'Ein echtes Titelbild macht die Website individueller und vertrauenswürdiger.');
  if (ensureArray(media?.gallery).length < 3) add('info', 'Wenig Referenzbilder', 'Mindestens 3 echte Bilder erhöhen Vertrauen und Conversion.');
  exportedMediaAssets(media).forEach(asset => {
    if (!asset.alt || asset.alt.length < 20) add('warnung', `Alt-Text zu schwach: ${asset.name}`, 'Alt-Texte sollten Bildinhalt, Firma/Leistung und ggf. Ort beschreiben.');
    if (asset.optimizedSize > 450 * 1024) add('warnung', `Bild noch groß: ${asset.name}`, `Optimiert ca. ${bytesToKb(asset.optimizedSize)} KB. Für schnelle Ladezeit besser unter 300–400 KB.`);
  });
  if (assetsKb > 2200) add('warnung', 'Gesamtgröße Bilder hoch', `Die exportierten Bilder liegen zusammen bei ca. ${Math.round(assetsKb)} KB. Für schnelle Startseiten besser weiter reduzieren.`);
  ['hero','trust','features','usps','process','testimonial','faq','contact','footer'].forEach(type => { if (!hasBlock(type)) add('warnung', `Block fehlt: ${BLOCK_LABELS[type] || type}`, 'Für verkaufsstarke Unternehmensseiten sollte dieser Baustein vorhanden sein.'); });
  if (services.length < 3) add('warnung', 'Zu wenige Leistungsseiten', 'Für SEO/GEO sollten mindestens 3 konkrete Leistungen gepflegt sein.');
  if (services.length > 8) add('info', 'Viele Leistungsseiten', 'Prüfe, ob jede Leistungsseite wirklich eigenen Inhalt und Suchintention hat.');
  if (!colors?.primary || !colors?.accent || !colors?.bg || !colors?.text) add('warnung', 'Farbsystem unvollständig', 'Hauptfarbe, Akzent, Hintergrund und Textfarbe müssen gesetzt sein.');
  if (!checks.some(c => c.level === 'kritisch' || c.level === 'warnung')) add('ok', 'Launch-ready nach Systemcheck', 'Technische Basis, SEO-Struktur, Bilder, Formular-Konfiguration und Verkaufsstruktur sind gepflegt. Rechtliches trotzdem final prüfen.');
  const score = scoreQuality(checks);
  checks.unshift({ level: score >= 85 ? 'ok' : score >= 65 ? 'warnung' : 'kritisch', label: `Agentur-Ready Score: ${score}/100`, hint: score >= 85 ? 'Sehr gute technische Basis für Kundenexport.' : 'Vor Livegang bitte die offenen Punkte abarbeiten.' });
  return checks;
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
  const [blocks, setBlocks] = useState(() => cloneDeep(TEMPLATES.elektriker.blocks));
  const [business, setBusiness] = useState(() => cloneDeep(TEMPLATES.elektriker.business));
  const [colors, setColors] = useState(() => cloneDeep(TEMPLATES.elektriker.colors));
  const [media, setMedia] = useState(() => cloneDeep(DEFAULT_MEDIA));
  const [showQuality, setShowQuality] = useState(false);
  const [qualityReport, setQualityReport] = useState([]);
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
      const saved = localStorage.getItem('eky_builder_v7_1') || localStorage.getItem('eky_builder_v7') || localStorage.getItem('eky_builder_v6') || localStorage.getItem('eky_builder_v5') || localStorage.getItem('eky_builder_v4');
      if (saved) {
        const d = JSON.parse(saved);
        if (d.blocks) setBlocks(d.blocks);
        if (d.business) setBusiness(d.business);
        if (d.colors) setColors(d.colors);
        if (d.media) setMedia(normalizeMedia(d.media));
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
        localStorage.setItem('eky_builder_v7_1', JSON.stringify({ version: 7.1, template, blocks, business, colors, media: normalizeMedia(media) }));
        setLastSaved(Date.now());
        setSaveStatus('saved');
      } catch (e) { setSaveStatus('unsaved'); }
    }, 800);
    return () => clearTimeout(saveTimer.current);
  }, [blocks, business, colors, media]);

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


  const optimizeImageFile = (file, role, index = 0) => new Promise((resolve, reject) => {
    if (!file || !file.type?.startsWith('image/')) return reject(new Error('Keine Bilddatei'));
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Bild konnte nicht gelesen werden'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Bild konnte nicht geladen werden'));
      img.onload = () => {
        const maxW = role === 'logo' ? 640 : role === 'hero' ? 1800 : 1400;
        const scale = Math.min(1, maxW / img.width);
        const width = Math.max(1, Math.round(img.width * scale));
        const height = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);
        const quality = role === 'logo' ? 0.92 : 0.82;
        const dataUrl = canvas.toDataURL('image/webp', quality);
        const exportName = `${role}-${Date.now()}-${index + 1}-${slugify(file.name)}.webp`;
        resolve({
          id: `${role}_${Date.now()}_${index}`,
          role,
          name: file.name,
          exportName,
          dataUrl,
          alt: makeImageAlt(business, role, index, file.name),
          width,
          height,
          originalSize: file.size,
          optimizedSize: Math.round((dataUrl.length - 'data:image/webp;base64,'.length) * 0.75),
          type: 'image/webp'
        });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

  const handleImageUpload = async (e, role) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    try {
      showToast('Bilder werden optimiert…');
      const optimized = await Promise.all(files.map((file, i) => optimizeImageFile(file, role, i)));
      setMedia(prev => {
        const m = normalizeMedia(prev);
        if (role === 'logo') return { ...m, logo: optimized[0] };
        if (role === 'hero') return { ...m, hero: optimized[0] };
        return { ...m, gallery: [...m.gallery, ...optimized].slice(0, 24) };
      });
      showToast(`✓ ${optimized.length} Bild${optimized.length > 1 ? 'er' : ''} optimiert`);
    } catch (err) { showToast('Bild-Fehler: ' + err.message); }
    e.target.value = '';
  };

  const updateAssetAlt = (role, id, alt) => setMedia(prev => {
    const m = normalizeMedia(prev);
    if (role === 'logo' && m.logo?.id === id) return { ...m, logo: { ...m.logo, alt } };
    if (role === 'hero' && m.hero?.id === id) return { ...m, hero: { ...m.hero, alt } };
    if (role === 'block' || role === 'block-gallery') return { ...m, blockImages: m.blockImages.map(a => a.id === id ? { ...a, alt } : a) };
    return { ...m, gallery: m.gallery.map(a => a.id === id ? { ...a, alt } : a) };
  });

  const removeAsset = (role, id) => setMedia(prev => {
    const m = normalizeMedia(prev);
    if (role === 'logo') return { ...m, logo: null };
    if (role === 'hero') return { ...m, hero: null };
    if (role === 'block' || role === 'block-gallery') return { ...m, blockImages: m.blockImages.filter(a => a.id !== id) };
    return { ...m, gallery: m.gallery.filter(a => a.id !== id) };
  });



  const handleBlockImageUpload = async (e, blockId) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    try {
      showToast('Sektionsbild wird optimiert…');
      const [image] = await Promise.all(files.slice(0, 1).map((file, i) => optimizeImageFile(file, 'block', i)));
      setMedia(prev => {
        const m = normalizeMedia(prev);
        return { ...m, blockImages: [...m.blockImages, image].slice(-80) };
      });
      setBlocks(prev => prev.map(block => block.id === blockId ? { ...block, data: { ...block.data, BildId: image.id } } : block));
      showToast('✓ Bild direkt der Sektion zugeordnet');
    } catch (err) { showToast('Bild-Fehler: ' + err.message); }
    e.target.value = '';
  };

  const handleBlockGalleryUpload = async (e, blockId) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    try {
      showToast('Galerie-Bilder werden optimiert…');
      const images = await Promise.all(files.map((file, i) => optimizeImageFile(file, 'block-gallery', i)));
      setMedia(prev => {
        const m = normalizeMedia(prev);
        return { ...m, blockImages: [...m.blockImages, ...images].slice(-120) };
      });
      setBlocks(prev => prev.map(block => {
        if (block.id !== blockId) return block;
        const ids = ensureArray(block.data?.BildIds);
        return { ...block, data: { ...block.data, BildIds: [...ids, ...images.map(img => img.id)] } };
      }));
      showToast(`✓ ${images.length} Galerie-Bild${images.length > 1 ? 'er' : ''} zugeordnet`);
    } catch (err) { showToast('Bild-Fehler: ' + err.message); }
    e.target.value = '';
  };

  const loadTemplate = (key) => {
    if (!confirm('Template wechseln? Aktuelle Änderungen gehen verloren.')) return;
    setTemplate(key); setBlocks(cloneDeep(TEMPLATES[key].blocks));
    setBusiness(cloneDeep(TEMPLATES[key].business)); setColors(cloneDeep(TEMPLATES[key].colors)); setMedia(cloneDeep(DEFAULT_MEDIA));
    setSelectedId(null);
  };



  const addBlock = (type, index = Math.max(1, blocks.length - 1)) => {
    if (!DEFAULT_BLOCK[type]) return;
    const nb = { type, id: `${type}_${Date.now()}`, data: cloneDeep(DEFAULT_BLOCK[type] || {}) };
    const arr = [...blocks];
    const safeIndex = Math.max(0, Math.min(index, arr.length));
    arr.splice(safeIndex, 0, nb);
    setBlocks(arr); setSelectedId(nb.id); showToast(`✓ ${BLOCK_LABELS[type] || type} eingefügt`);
  };

  const handleCanvasDrop = (e, index) => {
    e.preventDefault();
    if (draggedType) {
      addBlock(draggedType, index);
    } else if (draggedBlockId) {
      const from = blocks.findIndex(b => b.id === draggedBlockId);
      if (from === -1 || blocks[from].type === 'nav' || blocks[from].type === 'footer') return;
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

  const duplicateBlock = (id) => {
    const block = blocks.find(b => b.id === id);
    if (!block || block.type === 'nav' || block.type === 'footer') return;
    const copy = JSON.parse(JSON.stringify(block)); copy.id = block.type + '_' + Date.now();
    const idx = blocks.findIndex(b => b.id === id); const arr = [...blocks]; arr.splice(idx + 1, 0, copy);
    setBlocks(arr); setSelectedId(copy.id); showToast('✓ Sektion dupliziert');
  };

  const moveBlock = (id, dir) => {
    const idx = blocks.findIndex(b => b.id === id), target = idx + dir;
    if (idx < 0 || target < 0 || target >= blocks.length) return;
    if (blocks[idx].type === 'nav' || blocks[idx].type === 'footer' || blocks[target].type === 'nav' || blocks[target].type === 'footer') return;
    const arr = [...blocks]; [arr[idx], arr[target]] = [arr[target], arr[idx]]; setBlocks(arr);
  };

  const updateBlock = (id, field, value) => setBlocks(blocks.map(b => b.id === id ? { ...b, data: { ...b.data, [field]: value } } : b));

  const applyKeywordsToWebsite = () => {
    const inputKeywords = keywordBag(business);
    if (!inputKeywords.length) { showToast('Bitte zuerst Keywords eintragen'); return; }
    const result = applyKeywordPlan(business, blocks);
    setBusiness(result.business);
    setBlocks(result.blocks);
    setLeftTab('seo');
    showToast(`✓ ${result.plan.keywords.length} Keyword${result.plan.keywords.length === 1 ? '' : 's'} sauber eingebunden`);
  };

  const generateKeywordIdeas = () => {
    const city = business.city || 'Würzburg';
    const base = business.mainKeyword || TEMPLATES[template]?.name || 'Dienstleistung';
    const ideas = [
      `${base} ${city}`,
      `${base} in der Nähe`,
      `${base} Kosten`,
      `${base} Angebot`,
      `${base} Beratung`,
      `${base} Notdienst`,
      `${base} Meisterbetrieb`,
      `${base} ${business.primaryRegion || 'Umgebung'}`
    ];
    const merged = parseSeoKeywords([business.seoKeywords, ...ideas].join('\n')).join('\n');
    setBusiness({ ...business, seoKeywords: merged, mainKeyword: business.mainKeyword || ideas[0] });
    showToast('✓ Keyword-Ideen ergänzt');
  };

  const selectedBlock = blocks.find(b => b.id === selectedId);

  const exportHtml = () => { const html = generateHtml(blocks, business, colors, media, 'inline'); setExportedHtml(html); setShowExport(true); };

  const runCheck = () => {
    const report = runQualityChecks(blocks, business, colors, media);
    setQualityReport(report);
    setShowQuality(true);
  };

  const saveProject = async () => {
    if (window.electronAPI) {
      const r = await window.electronAPI.saveProject({ version: 7.1, template, blocks, business, colors, media: normalizeMedia(media) });
      if (r?.success) { setLastSaved(Date.now()); setSaveStatus('saved'); showToast('✓ Projekt gespeichert'); }
    } else { showToast('Nur in der Desktop-App verfügbar'); }
  };

  const openProject = async () => {
    if (window.electronAPI) {
      const r = await window.electronAPI.openProject();
      if (r?.success && r.data) {
        if (!confirm('Projekt öffnen? Aktuelle Änderungen gehen verloren.')) return;
        const { template: t, blocks: b, business: biz, colors: c, media: m } = r.data;
        setTemplate(t || 'elektriker'); setBlocks(b || cloneDeep(TEMPLATES.elektriker.blocks));
        setBusiness(biz || cloneDeep(TEMPLATES.elektriker.business)); setColors(c || cloneDeep(TEMPLATES.elektriker.colors)); setMedia(normalizeMedia(m));
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

  const exportWebsiteFolder = async () => {
    const files = generateSiteFiles(blocks, business, colors, media);
    if (window.electronAPI?.saveSiteFolder) {
      const folderName = (business.name || 'website').toLowerCase().replace(/[^a-z0-9äöüß]+/gi, '-').replace(/^-|-$/g, '');
      const r = await window.electronAPI.saveSiteFolder(files, folderName);
      if (r?.success) showToast('✓ Website-Ordner exportiert'); else if (r?.error) showToast('Export-Fehler: ' + r.error);
    } else showToast('Website-Ordner Export nur in der Desktop-App verfügbar');
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
      exportHtml, exportWebsiteFolder, saveProject, openProject, runCheck,
      newProject: () => setShowOnboarding(true)
    };
  }, [blocks, business, colors, media, template]);

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
          <button onClick={runCheck} style={S.btnGhost}>✓ SEO-Check</button>
          <button onClick={exportHtml} style={S.btnGold}>HTML exportieren →</button>
        </div>
      </header>

      {/* LEFT SIDEBAR */}
      <aside style={S.sidebar}>
        <div style={S.tabs}>
          {[{ k: 'blocks', l: 'Blöcke' }, { k: 'assets', l: 'Bilder' }, { k: 'keywords', l: 'Keywords' }, { k: 'seo', l: 'Firma & SEO' }, { k: 'api', l: 'API Keys' }, { k: 'design', l: 'Design' }].map(t => (
            <div key={t.k} onClick={() => setLeftTab(t.k)} style={{ ...S.tab, ...(leftTab === t.k ? S.tabActive : {}) }}>{t.l}</div>
          ))}
        </div>
        <div style={S.sidebarScroll}>
          {leftTab === 'blocks' && (
            <>
              <div style={S.sectionLabel}>Elemente ziehen</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
                {BLOCK_LIBRARY.map(b => (
                  <div key={b.type} draggable onClick={() => addBlock(b.type)} title="Klicken zum Einfügen oder ziehen zum Platzieren"
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


          {leftTab === 'assets' && (
            <>
              <div style={S.sectionLabel}>Logo & Bilder</div>
              <AssetUploadBox title="Logo" role="logo" asset={media.logo} onUpload={handleImageUpload} onRemove={removeAsset} onAlt={updateAssetAlt} />
              <AssetUploadBox title="Hero-/Titelbild" role="hero" asset={media.hero} onUpload={handleImageUpload} onRemove={removeAsset} onAlt={updateAssetAlt} />

              <div style={S.sectionLabel}>Galerie / Referenzen</div>
              <label style={{ ...S.btnGhost, display: 'block', textAlign: 'center', marginBottom: 10 }}>
                + Bilder hochladen & optimieren
                <input type="file" accept="image/*" multiple onChange={e => handleImageUpload(e, 'gallery')} style={{ display: 'none' }} />
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {ensureArray(media.gallery).map((asset, i) => (
                  <div key={asset.id} style={{ background: '#1a1a1c', border: '1px solid #28282b', borderRadius: 7, overflow: 'hidden' }}>
                    <img src={asset.dataUrl} alt={asset.alt} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: 8 }}>
                      <input style={{ ...S.input, fontSize: 10 }} value={asset.alt} onChange={e => updateAssetAlt('gallery', asset.id, e.target.value)} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                        <span style={{ fontSize: 9, color: '#666' }}>{asset.width}×{asset.height} · {(asset.optimizedSize/1024).toFixed(0)}KB</span>
                        <button onClick={() => removeAsset('gallery', asset.id)} style={{ background: 'transparent', color: '#8a8a8f', border: '1px solid #333', borderRadius: 4, fontSize: 10, padding: '3px 6px' }}>Löschen</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={S.infoBox}>
                <strong style={{ color: '#C4923A' }}>Bildoptimierung aktiv:</strong><br />
                ✓ Upload wird zu WebP komprimiert<br />✓ große Bilder werden verkleinert<br />✓ SEO-Alt-Texte werden automatisch vorgeschlagen<br />✓ Website-Ordner exportiert echte assets-Dateien<br />✓ HTML nutzt loading=lazy und decoding=async
              </div>
            </>
          )}

          {leftTab === 'keywords' && (
            <>
              <div style={S.sectionLabel}>SEO Keyword Engine</div>
              <div style={{ marginBottom: 10 }}>
                <label style={S.label}>Haupt-Keyword</label>
                <input style={S.input} value={business.mainKeyword || ''} onChange={e => setBusiness({ ...business, mainKeyword: e.target.value })} placeholder="z.B. Elektriker Würzburg" />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label style={S.label}>Alle Keywords / Suchbegriffe</label>
                <textarea style={{ ...S.input, minHeight: 150, resize: 'vertical' }} value={business.seoKeywords || ''} onChange={e => setBusiness({ ...business, seoKeywords: e.target.value })} placeholder={'Ein Keyword pro Zeile, z.B.\nElektriker Würzburg\nElektroinstallation Würzburg\nSmart Home Beratung\nPhotovoltaik Angebot'} />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label style={S.label}>Suchintention / Ziel</label>
                <select style={S.input} value={business.keywordIntent || 'local_leads'} onChange={e => setBusiness({ ...business, keywordIntent: e.target.value })}>
                  <option value="local_leads">Lokale Leads / Anfragen</option>
                  <option value="termin">Terminbuchung</option>
                  <option value="angebot">Angebot / Beratung</option>
                  <option value="notdienst">Notdienst / schnelle Hilfe</option>
                  <option value="information">Informational / Ratgeber</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                <button onClick={generateKeywordIdeas} style={S.btnGhost}>+ Ideen</button>
                <button onClick={applyKeywordsToWebsite} style={S.btnGold}>SEO einbauen</button>
              </div>
              <div style={S.infoBox}>
                <strong style={{ color: '#C4923A' }}>Automatische Einbindung:</strong><br />
                ✓ setzt Haupt-Keyword, SEO-Titel und Meta Description<br />✓ baut Keywords natürlich in Hero, Leistungen, Über-uns, FAQ und Kontakt ein<br />✓ erzeugt aus Keywords Leistungs-/Unterseiten im Export<br />✓ Keywords landen zusätzlich in Schema.org und Meta-Tags<br />✓ achtet auf natürliche Verteilung statt Keyword-Stuffing
              </div>
              <div style={{ ...S.infoBox, borderColor: '#49351a' }}>
                Aktuell erkannt: <strong style={{ color: '#f4f4f2' }}>{keywordBag(business).length}</strong> Keyword{keywordBag(business).length === 1 ? '' : 's'}<br />
                {keywordBag(business).slice(0, 10).join(', ') || 'Noch keine Keywords eingetragen.'}
              </div>
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
                { k: 'website', l: 'Website-Domain / Live-URL' }, { k: 'owner', l: 'Inhaber/Geschäftsführer' },
                { k: 'ustId', l: 'USt-ID (optional)' }, { k: 'register', l: 'Handelsregister (optional)' },
                { k: 'mainKeyword', l: 'Haupt-Keyword' }, { k: 'primaryRegion', l: 'Region / Einzugsgebiet' },
                { k: 'seoTitle', l: 'SEO-Titel' }, { k: 'seoDescription', l: 'Meta Description' },
                { k: 'conversionGoal', l: 'Conversion-Ziel' }, { k: 'formEndpoint', l: 'Formular-Endpoint / CRM-Webhook' },
                { k: 'whatsapp', l: 'WhatsApp-Link oder Nummer' }, { k: 'instagram', l: 'Instagram-Link oder @name' },
                { k: 'tiktok', l: 'TikTok-Link oder @name' }, { k: 'facebook', l: 'Facebook-Link' }, { k: 'linkedin', l: 'LinkedIn-Link' },
                { k: 'ctaPrimaryUrl', l: 'Primärer Button-Link' },
                { k: 'ctaSecondaryUrl', l: 'Sekundärer Button-Link' }, { k: 'calendly', l: '📅 Calendly-/Buchungslink' }
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
                ✓ Canonical + Robots<br />✓ Sitemap + Rechtliches<br />✓ Kontaktformular-Block<br />✓ KI-Crawler-Ready
              </div>
            </>
          )}

          {leftTab === 'api' && (
            <>
              <div style={S.sectionLabel}>Multi API Keys</div>
              <div style={{ marginBottom: 10 }}>
                <label style={S.label}>Standard-Anbieter</label>
                <select style={S.input} value={business.aiDefaultProvider || 'openai'} onChange={e => setBusiness({ ...business, aiDefaultProvider: e.target.value })}>
                  <option value="openai">ChatGPT / OpenAI</option>
                  <option value="claude">Claude / Anthropic</option>
                  <option value="higgsfield">Higgsfield</option>
                  <option value="custom">Custom / eigenes Backend</option>
                </select>
              </div>
              {API_PROVIDER_FIELDS.map(provider => (
                <div key={provider.provider} style={{ padding: 12, background: '#1a1a1c', border: '1px solid #28282b', borderRadius: 8, marginBottom: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#f4f4f2', marginBottom: 10 }}>{provider.label}</div>
                  <label style={S.label}>API Key</label>
                  <input type="password" autoComplete="off" style={S.input} value={business[provider.keyField] || ''} onChange={e => setBusiness({ ...business, [provider.keyField]: e.target.value })} placeholder="sk-... / API-Key einfügen" />
                  <label style={{ ...S.label, marginTop: 8 }}>Modell</label>
                  <input style={S.input} value={business[provider.modelField] || ''} onChange={e => setBusiness({ ...business, [provider.modelField]: e.target.value })} placeholder={provider.defaultModel} />
                  <label style={{ ...S.label, marginTop: 8 }}>Endpoint / Base URL</label>
                  <input style={S.input} value={business[provider.endpointField] || ''} onChange={e => setBusiness({ ...business, [provider.endpointField]: e.target.value })} placeholder={provider.endpoint} />
                </div>
              ))}
              <div style={{ marginBottom: 10 }}>
                <label style={S.label}>Weitere API-Konfiguration / Notizen</label>
                <textarea style={{ ...S.input, minHeight: 90, resize: 'vertical' }} value={business.apiNotes || ''} onChange={e => setBusiness({ ...business, apiNotes: e.target.value })} placeholder="z.B. eigener Proxy, Make-Webhook, Limit, Kundenzuordnung…" />
              </div>
              <div style={S.infoBox}>
                <strong style={{ color: '#C4923A' }}>Sicherheits-Hinweis:</strong><br />
                ✓ Keys werden im lokalen Projekt/Browser-Speicher gehalten<br />✓ Keys werden nicht in den Website-HTML-Export geschrieben<br />✓ Für Live-Websites API-Keys immer über Backend/Serverless/Proxy nutzen, niemals direkt im Frontend veröffentlichen
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
                <div draggable={block.type !== 'nav' && block.type !== 'footer'}
                  onDragStart={e => { if (block.type === 'nav' || block.type === 'footer') { e.preventDefault(); return; } e.stopPropagation(); setDraggedBlockId(block.id); e.dataTransfer.effectAllowed = 'move'; }}
                  onDragEnd={() => { setDraggedBlockId(null); setDraggedType(null); setDropIndex(null); lastDragY.current = null; }}
                  onClick={() => setSelectedId(block.id)}
                  style={{ ...S.blockWrap, ...(selectedId === block.id ? S.blockSelected : {}), ...(draggedBlockId === block.id ? { opacity: 0.3 } : {}) }}>
                  {selectedId === block.id && <div style={S.selLabel}>{BLOCK_LABELS[block.type]}</div>}
                  {selectedId === block.id && block.type !== 'nav' && block.type !== 'footer' && (
                    <div style={S.canvasToolbar} onClick={e => e.stopPropagation()}>
                      <button style={S.canvasToolBtn} onClick={() => moveBlock(block.id, -1)}>↑</button>
                      <button style={S.canvasToolBtn} onClick={() => moveBlock(block.id, 1)}>↓</button>
                      <button style={S.canvasToolBtn} onClick={() => duplicateBlock(block.id)}>⧉</button>
                      <button style={S.canvasToolBtnDanger} onClick={() => deleteBlock(block.id)}>×</button>
                    </div>
                  )}
                  <BlockRender block={block} business={business} colors={colors} viewport={viewport} media={media} />
                </div>
                <DropZone index={i + 1} isDragging={isDragging} dropIndex={dropIndex}
                  onOver={(e) => { e.preventDefault(); e.stopPropagation(); setDropIndex(i + 1); lastDragY.current = e.clientY; }}
                  onDrop={(e) => handleCanvasDrop(e, i + 1)} />
              </React.Fragment>
            ))}
          </div>
          <PreviewFloatingTools business={business} />
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
            <>
              {selectedBlock.type !== 'nav' && selectedBlock.type !== 'footer' && (
                <div style={{ padding: 14, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, borderBottom: '1px solid #222225' }}>
                  <button onClick={() => moveBlock(selectedBlock.id, -1)} style={S.btnGhost}>↑ Hoch</button>
                  <button onClick={() => moveBlock(selectedBlock.id, 1)} style={S.btnGhost}>↓ Runter</button>
                  <button onClick={() => duplicateBlock(selectedBlock.id)} style={S.btnGhost}>⧉ Kopie</button>
                </div>
              )}
              <BlockEditor block={selectedBlock} media={media} onUpdate={(f, v) => updateBlock(selectedBlock.id, f, v)} onBlockImageUpload={handleBlockImageUpload} onBlockGalleryUpload={handleBlockGalleryUpload} onRemoveAsset={removeAsset} onAltUpdate={updateAssetAlt} />
            </>
          )}
        </div>
      </aside>

      {/* EXPORT MODAL */}
      {showExport && (
        <div style={S.overlay} onClick={() => setShowExport(false)}>
          <div style={{ ...S.modal, maxWidth: 860 }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, fontWeight: 400, marginBottom: 6 }}>HTML Export</h2>
            <p style={{ fontSize: 12, color: '#8a8a8f', marginBottom: 16 }}>Deploy-ready HTML bzw. Website-Ordner mit Schema.org, GEO-Tags, FAQ-Schema, Sitemap, robots.txt und rechtlichen Vorlagen.</p>
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
              <button onClick={exportWebsiteFolder} style={S.btnGhost}>📁 Website-Ordner</button>
              <button onClick={downloadHtml} style={S.btnGold}>↓ Als .html speichern</button>
            </div>
          </div>
        </div>
      )}


      {/* QUALITY CHECK MODAL */}
      {showQuality && (
        <div style={S.overlay} onClick={() => setShowQuality(false)}>
          <div style={{ ...S.modal, maxWidth: 720 }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, fontWeight: 400, marginBottom: 6 }}>SEO-/GEO-/Launch-Check</h2>
            <p style={{ fontSize: 12, color: '#8a8a8f', marginBottom: 16 }}>Prüft die wichtigsten Punkte vor Kundenexport: Kontakt, SEO, Bilder, Formular, Leistungsseiten und Verkaufsstruktur.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 420, overflow: 'auto' }}>
              {qualityReport.map((item, i) => {
                const color = item.level === 'kritisch' ? '#ef4444' : item.level === 'warnung' ? '#f59e0b' : item.level === 'ok' ? '#22c55e' : '#60a5fa';
                return <div key={i} style={{ background: '#1a1a1c', border: '1px solid #28282b', borderLeft: `3px solid ${color}`, borderRadius: 7, padding: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#f4f4f2', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: '#8a8a8f', lineHeight: 1.5 }}>{item.hint}</div>
                </div>;
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 18 }}>
              <button onClick={() => setShowQuality(false)} style={S.btnGhost}>Schließen</button>
              <button onClick={() => { setShowQuality(false); exportHtml(); }} style={S.btnGold}>Trotzdem exportieren</button>
            </div>
          </div>
        </div>
      )}

      {/* ONBOARDING */}
      {showOnboarding && (
        <OnboardingModal onStart={(tpl, b, biz, c) => {
          setTemplate(tpl); setBlocks(b); setBusiness(biz); setColors(c); setMedia(cloneDeep(DEFAULT_MEDIA));
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


function AssetUploadBox({ title, role, asset, onUpload, onRemove, onAlt }) {
  return (
    <div style={{ background: '#1a1a1c', border: '1px solid #28282b', borderRadius: 8, padding: 10, marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#f4f4f2' }}>{title}</div>
        {asset && <button onClick={() => onRemove(role, asset.id)} style={{ background: 'transparent', color: '#8a8a8f', border: '1px solid #333', borderRadius: 4, fontSize: 10, padding: '3px 6px' }}>Entfernen</button>}
      </div>
      {asset ? (
        <>
          <img src={asset.dataUrl} alt={asset.alt} style={{ width: '100%', maxHeight: role === 'logo' ? 90 : 150, objectFit: role === 'logo' ? 'contain' : 'cover', background: '#0e0e0f', borderRadius: 6, display: 'block', marginBottom: 8 }} />
          <label style={S.label}>SEO-Alt-Text</label>
          <input style={S.input} value={asset.alt} onChange={e => onAlt(role, asset.id, e.target.value)} />
          <div style={{ fontSize: 9, color: '#666', marginTop: 6 }}>{asset.width}×{asset.height}px · {(asset.optimizedSize/1024).toFixed(0)}KB WebP</div>
        </>
      ) : (
        <label style={{ ...S.btnGhost, display: 'block', textAlign: 'center' }}>
          Bild auswählen
          <input type="file" accept="image/*" onChange={e => onUpload(e, role)} style={{ display: 'none' }} />
        </label>
      )}
    </div>
  );
}


function SvgIcon({ name, size = 18 }) {
  return <span aria-hidden="true" style={{ width: size, height: size, display: 'inline-flex', lineHeight: 0 }} dangerouslySetInnerHTML={{ __html: localSvgIcon(name) }} />;
}

function PreviewFloatingTools({ business }) {
  const wa = whatsappUrlFor(business);
  return (
    <>
      {wa && <a href={wa} onClick={e => e.preventDefault()} aria-label="WhatsApp öffnen" style={{ position: 'absolute', right: 22, bottom: 22, width: 58, height: 58, borderRadius: '50%', background: '#25D366', color: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 12px 32px rgba(37,211,102,.38)', zIndex: 30 }}><SvgIcon name="whatsapp" size={30} /></a>}
      <div aria-label="Barrierefreiheit" style={{ position: 'absolute', left: 22, bottom: 22, background: 'rgba(9,13,24,.9)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 999, padding: 8, display: 'flex', gap: 8, boxShadow: '0 12px 32px rgba(0,0,0,.22)', zIndex: 30 }}>
        <button type="button" style={{ width: 42, height: 42, borderRadius: '50%', border: '1px solid rgba(255,255,255,.12)', background: 'transparent', color: '#fff', fontWeight: 900, fontSize: 18 }}>Aa</button>
        <button type="button" style={{ width: 42, height: 42, borderRadius: '50%', border: '1px solid rgba(255,255,255,.12)', background: 'transparent', color: '#fff', display: 'grid', placeItems: 'center' }}><SvgIcon name="contrast" size={22} /></button>
      </div>
    </>
  );
}

function SocialPreview({ business, colors, isMobile }) {
  const links = socialLinksFor(business);
  const shown = links.length ? links : ['whatsapp','instagram','tiktok','facebook','linkedin'].map(key => ({ key, label: key, url: '#' }));
  return <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>{shown.map(link => <a key={link.key} href="#" onClick={e => e.preventDefault()} aria-label={link.label} style={{ width: isMobile ? 42 : 48, height: isMobile ? 42 : 48, borderRadius: '50%', background: link.key === 'whatsapp' ? '#25D366' : colors.primary, color: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 10px 24px rgba(0,0,0,.12)' }}><SvgIcon name={link.key} size={isMobile ? 21 : 24} /></a>)}</div>;
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
function BlockRender({ block, business, colors, viewport, media }) {
  const d = translateData(block.type, block.data || {});
  const f = { serif: "'Instrument Serif', Georgia, serif", mono: "'JetBrains Mono', monospace" };
  const isMobile = viewport === 'mobile';
  const isTablet = viewport === 'tablet';

  const p = colors.primary, a = colors.accent, t = colors.text;
  const sectionImage = imageForBlock(block, media, 'hero');

  if (block.type === 'nav') return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: isMobile ? '12px 16px' : '16px 36px', background: '#fff', borderBottom: `2px solid ${p}14`, boxShadow: '0 2px 10px rgba(0,0,0,.06)', gap: 8 }}>
      {media?.logo ? <img src={media.logo.dataUrl} alt={media.logo.alt} style={{ maxWidth: isMobile ? 120 : 160, maxHeight: 42, objectFit: 'contain', display: 'block', flexShrink: 0 }} /> : <div style={{ fontFamily: f.serif, fontSize: isMobile ? 16 : 20, fontStyle: 'italic', color: p, flexShrink: 0 }}>{business.name}</div>}
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
        {sectionImage && <img src={sectionImage.dataUrl} alt={sectionImage.alt} style={{ width: '100%', maxHeight: isMobile ? 220 : 320, objectFit: 'cover', borderRadius: 14, marginTop: 28, boxShadow: '0 18px 50px rgba(0,0,0,.22)' }} />}
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
      {sectionImage ? <img src={sectionImage.dataUrl} alt={sectionImage.alt} style={{ aspectRatio: '4/3', width: '100%', objectFit: 'cover', borderRadius: 10, display: 'block' }} /> : <div style={{ aspectRatio: '4/3', background: `linear-gradient(135deg, ${p}, ${a})`, borderRadius: 10 }} />}
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
          {(galleryAssetsForBlock(block, media).length ? galleryAssetsForBlock(block, media) : Array.from({ length: d.images || d.Anzahl || 6 }).map((_, i) => ({ id: `ph-${i}`, placeholder: true, alt: `Bild ${i + 1}` }))).map((asset, i) => (
            asset.placeholder
              ? <div key={asset.id} style={{ aspectRatio: '4/3', background: `linear-gradient(${45 + i * 30}deg, ${a}66, ${p})`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 600, opacity: .75 }}>Bild {i + 1}</div>
              : <img key={asset.id} src={asset.dataUrl} alt={asset.alt} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 8, display: 'block' }} />
          ))}
        </div>
      </div>
    </section>
  );

  if (block.type === 'contact') return (
    <section style={{ padding: isMobile ? '36px 16px' : '64px 40px', background: '#fff' }}>
      <div style={{ maxWidth: 920, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '0.9fr 1.1fr', gap: isMobile ? 20 : 34 }}>
        <div>
          <div style={{ fontFamily: f.mono, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: a, marginBottom: 10 }}>Kontakt</div>
          <h2 style={{ fontFamily: f.serif, fontSize: isMobile ? 24 : 34, fontWeight: 400, lineHeight: 1.12, marginBottom: 12 }}>{d.title || d.Titel}</h2>
          <p style={{ fontSize: isMobile ? 13 : 15, color: t + '77', lineHeight: 1.7 }}>{d.sub || d.Untertitel}</p>
          <div style={{ marginTop: 16, fontSize: 13, color: t + '77', lineHeight: 1.9 }}><strong style={{ color: p }}>{business.name}</strong><br />{business.street}<br />{business.postalCode} {business.city}<br />{business.phone}<br />{business.email}</div>
        </div>
        <div style={{ background: p + '06', border: `1px solid ${p}12`, borderRadius: 14, padding: isMobile ? 16 : 24 }}>
          {((d.fields || d.Felder) || []).map((field, i) => (<div key={i} style={{ marginBottom: 10 }}><label style={{ fontSize: 11, fontWeight: 800, color: p, display: 'block', marginBottom: 5 }}>{field.label || field.Label}{(field.required || field.Pflicht) === 'ja' ? ' *' : ''}</label>{(field.type || field.Typ) === 'textarea' ? <div style={{ minHeight: 80, background: '#fff', border: `1px solid ${p}18`, borderRadius: 8 }} /> : <div style={{ height: 38, background: '#fff', border: `1px solid ${p}18`, borderRadius: 8 }} />}</div>))}
          <div style={{ background: p, color: '#fff', textAlign: 'center', padding: '12px 16px', borderRadius: 8, fontWeight: 800, marginTop: 12 }}>{d.button || d.Button}</div>
          <p style={{ fontSize: 10, color: t + '55', lineHeight: 1.5, marginTop: 10 }}>DSGVO-Checkbox wird im Export automatisch ergänzt.</p>
        </div>
      </div>
    </section>
  );


  if (block.type === 'social') return (
    <section style={{ padding: isMobile ? '34px 16px' : '54px 40px', background: '#fff', textAlign: 'center', borderTop: `1px solid ${p}12` }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <h2 style={{ fontFamily: f.serif, fontSize: isMobile ? 24 : 32, fontWeight: 400, color: p, marginBottom: 8 }}>{d.title || d.Titel || 'Online verbunden'}</h2>
        <p style={{ fontSize: isMobile ? 13 : 15, color: t + '77', lineHeight: 1.7, marginBottom: 22 }}>{d.sub || d.Untertitel || 'Folgen Sie uns oder schreiben Sie direkt.'}</p>
        <SocialPreview business={business} colors={colors} isMobile={isMobile} />
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
    pricing: <div style={{ display: 'flex', gap: 2 }}>{[0,1,2].map(i => <div key={i} style={{ flex: 1, height: 24, background: i === 1 ? '#C4923A44' : '#252527', borderRadius: 2 }} />)}</div>,
    trust: <>{b(95, true)}{b(70)}</>,
    usps: <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>{[0,1,2,3].map(i => <div key={i} style={{ height: 11, background: '#252527', borderLeft: '2px solid #C4923A', borderRadius: 1 }} />)}</div>,
    process: <div style={{ display: 'flex', gap: 3 }}>{[0,1,2,3].map(i => <div key={i} style={{ flex: 1, height: 20, borderRadius: 10, background: '#252527' }} />)}</div>,
    contact: <>{b(50, true)}<div style={{ height: 20, border: '1px solid #252527', borderRadius: 2 }} /></>,
    social: <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>{[0,1,2,3,4].map(i => <div key={i} style={{ width: 13, height: 13, borderRadius: '50%', background: i === 0 ? '#C4923A' : '#252527' }} />)}</div>
  };
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center', height: 36 }}>{map[type]}</div>;
}

// ============================================================
// BLOCK EDITOR
// ============================================================
function BlockEditor({ block, onUpdate, media, onBlockImageUpload, onBlockGalleryUpload, onRemoveAsset, onAltUpdate }) {
  const d = block.data || {};

  if (block.type === 'nav' || block.type === 'footer') return (
    <div style={{ padding: 14 }}>
      <div style={{ padding: 12, background: '#1a1a1c', border: '1px solid #28282b', borderRadius: 6, fontSize: 11, color: '#8a8a8f', lineHeight: 1.7 }}>
        Wird automatisch aus den <strong style={{ color: '#C4923A' }}>Firmendaten</strong> generiert. Bearbeite sie im Tab "Firma & SEO" links.
      </div>
    </div>
  );

  const availableAssets = allMediaAssets(media).filter(asset => asset.role !== 'logo');
  const selectedImage = findMediaAsset(media, d.BildId);
  const selectedGalleryAssets = galleryAssetsForBlock(block, media);

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
      {(block.type === 'hero' || block.type === 'split') && (
        <div style={{ marginBottom: 14, padding: 12, background: '#1a1a1c', border: '1px solid #28282b', borderRadius: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#f4f4f2', marginBottom: 8 }}>Bild direkt für diese Sektion</div>
          {selectedImage && <img src={selectedImage.dataUrl} alt={selectedImage.alt} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: 6, marginBottom: 8 }} />}
          <label style={S.label}>Vorhandenes Bild wählen</label>
          <select style={S.input} value={d.BildId || ''} onChange={e => onUpdate('BildId', e.target.value)}>
            <option value="">Globales Standardbild nutzen</option>
            {availableAssets.map(asset => <option key={asset.id} value={asset.id}>{asset.name || asset.exportName}</option>)}
          </select>
          {selectedImage && <><label style={{ ...S.label, marginTop: 8 }}>Alt-Text</label><input style={S.input} value={selectedImage.alt || ''} onChange={e => onAltUpdate(selectedImage.role, selectedImage.id, e.target.value)} /></>}
          <label style={{ ...S.btnGhost, display: 'block', textAlign: 'center', marginTop: 10 }}>
            Bild ersetzen / hochladen
            <input type="file" accept="image/*" onChange={e => onBlockImageUpload(e, block.id)} style={{ display: 'none' }} />
          </label>
        </div>
      )}

      {block.type === 'gallery' && (
        <div style={{ marginBottom: 14, padding: 12, background: '#1a1a1c', border: '1px solid #28282b', borderRadius: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#f4f4f2', marginBottom: 8 }}>Bilder direkt für diese Galerie</div>
          <label style={{ ...S.btnGhost, display: 'block', textAlign: 'center', marginBottom: 10 }}>
            Galerie-Bilder hochladen
            <input type="file" accept="image/*" multiple onChange={e => onBlockGalleryUpload(e, block.id)} style={{ display: 'none' }} />
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {selectedGalleryAssets.slice(0, 12).map(asset => (
              <div key={asset.id} style={{ background: '#111113', border: '1px solid #28282b', borderRadius: 6, overflow: 'hidden' }}>
                <img src={asset.dataUrl} alt={asset.alt} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: 6 }}>
                  <input style={{ ...S.input, fontSize: 9 }} value={asset.alt || ''} onChange={e => onAltUpdate(asset.role, asset.id, e.target.value)} />
                  {ensureArray(d.BildIds).includes(asset.id) && <button onClick={() => { onUpdate('BildIds', ensureArray(d.BildIds).filter(id => id !== asset.id)); onRemoveAsset(asset.role, asset.id); }} style={{ ...S.btnGhost, width: '100%', marginTop: 6, padding: '4px 6px', fontSize: 10 }}>Aus Galerie entfernen</button>}
                </div>
              </div>
            ))}
          </div>
          {!selectedGalleryAssets.length && <div style={{ fontSize: 10, color: '#666', lineHeight: 1.5 }}>Noch keine Bilder zugeordnet. Entweder globale Galerie im Bilder-Tab nutzen oder hier direkt hochladen.</div>}
        </div>
      )}

      {Object.entries(d).filter(([key]) => !['BildId', 'BildIds'].includes(key)).map(([key, value]) => (
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
  return String(str ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function normalizeUrl(url) {
  if (!url) return '';
  const value = String(url).trim();
  if (!value) return '';
  if (/^(https?:|mailto:|tel:|#)/i.test(value)) return value;
  return `https://${value}`;
}

function siteBaseUrl(b) {
  return normalizeUrl(b.website) || `https://${slugify(b.name || 'website')}.de`;
}

function ctaLinkFor(b, fallback = 'tel') {
  if (b.ctaPrimaryUrl) return normalizeUrl(b.ctaPrimaryUrl);
  if (b.calendly) return normalizeUrl(b.calendly);
  if (b.whatsapp) {
    const wa = String(b.whatsapp).replace(/[^0-9]/g, '');
    if (wa) return `https://wa.me/${wa}`;
  }
  if (fallback === 'mail' && b.email) return `mailto:${b.email}`;
  return `tel:${String(b.phone || '').replace(/\s/g, '')}`;
}

function exportedMediaAssets(media) {
  const list = [];
  if (media?.logo) list.push(media.logo);
  if (media?.hero) list.push(media.hero);
  ensureArray(media?.gallery).forEach(a => list.push(a));
  ensureArray(media?.blockImages).forEach(a => list.push(a));
  const unique = [];
  const seen = new Set();
  list.forEach(a => { if (a?.exportName && a?.dataUrl && !seen.has(a.exportName)) { seen.add(a.exportName); unique.push(a); } });
  return unique;
}

function bytesToKb(bytes) { return Math.round((Number(bytes || 0) / 1024) * 10) / 10; }

function estimateExportAssetKb(media) {
  return exportedMediaAssets(media).reduce((sum, asset) => sum + Number(asset.optimizedSize || 0), 0) / 1024;
}

function scoreQuality(checks) {
  let score = 100;
  checks.forEach(c => {
    if (c.level === 'kritisch') score -= 18;
    else if (c.level === 'warnung') score -= 8;
    else if (c.level === 'info') score -= 2;
  });
  return Math.max(0, Math.min(100, score));
}

function formEndpointFor(b) {
  const configured = normalizeUrl(b.formEndpoint);
  if (configured) return configured;
  return '/api/contact';
}

function fieldName(label) {
  return slugify(label || 'feld').replace(/-/g, '_');
}

function formHandlerJs() {
  return `(() => {
  const serialize = (form) => Object.fromEntries(new FormData(form).entries());
  document.addEventListener('submit', async (event) => {
    const form = event.target;
    if (!form.matches('[data-eky-form]')) return;
    event.preventDefault();
    const status = form.querySelector('.form-status');
    const endpoint = form.getAttribute('action');
    const submit = form.querySelector('button[type="submit"]');
    const say = (message) => { if (status) status.textContent = message; };
    if (!endpoint || endpoint === '#') { say('Bitte Formular-Endpoint konfigurieren.'); return; }
    const data = serialize(form);
    if (data.website) { say('Danke.'); return; }
    data.page_url = window.location.href;
    data.user_agent = navigator.userAgent;
    data.submitted_at = new Date().toISOString();
    if (submit) submit.disabled = true;
    say('Danke, Ihre Anfrage wird gesendet...');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      form.reset();
      say('Vielen Dank. Ihre Anfrage wurde erfolgreich übermittelt.');
    } catch (error) {
      say('Die Anfrage konnte nicht automatisch gesendet werden. Bitte rufen Sie uns an oder schreiben Sie eine E-Mail.');
    } finally {
      if (submit) submit.disabled = false;
    }
  });
})();`;
}

function generateBackendReadme(b) {
  return `EKY Backend Connector
=====================

Dieses Backend ist für Kunden-Websites vorbereitet, wenn ihr keinen externen Dienst wie Make, Zapier, Formspree oder ein CRM direkt nutzen wollt.

Schnellstart lokal:
1. In diesen Ordner wechseln: cd backend
2. Datei .env.example zu .env kopieren
3. WEBHOOK_URL eintragen, z.B. Make/Zapier/CRM-Webhook
4. Starten: node server.js
5. Im EKY Builder als Formular-Endpoint eintragen: /api/contact oder https://kundendomain.de/api/contact

Kunde: ${b.name || 'Kunde'}
Empfänger-E-Mail: ${b.email || 'bitte ergänzen'}

Wichtig:
- Auf echtem Hosting muss dieses Backend als Node-Service, Serverless Function oder Reverse-Proxy erreichbar gemacht werden.
- Für reine statische Hoster nutzt ihr besser direkt einen Webhook/Formspree/CRM-Endpoint.
- Datenschutztext an den echten Datenfluss anpassen.
`;
}


function aiProxyExampleJs() {
  return `// EKY AI Proxy Beispiel — API Keys niemals direkt im Frontend veröffentlichen.
// Dieses Beispiel zeigt eine sichere Server-Struktur für mehrere Anbieter.
// Produktiv bitte Rate Limits, Auth, Logging, Datenschutz und Fehlerbehandlung ergänzen.

const http = require('http');

const providers = {
  openai: { key: process.env.OPENAI_API_KEY, model: process.env.OPENAI_MODEL || 'gpt-5.5', endpoint: 'https://api.openai.com/v1/chat/completions' },
  claude: { key: process.env.ANTHROPIC_API_KEY, model: process.env.CLAUDE_MODEL || 'claude-sonnet', endpoint: 'https://api.anthropic.com/v1/messages' },
  higgsfield: { key: process.env.HIGGSFIELD_API_KEY, model: process.env.HIGGSFIELD_MODEL || 'higgsfield-default', endpoint: 'https://api.higgsfield.ai' }
};

function send(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

const server = http.createServer(async (req, res) => {
  if (req.url !== '/api/ai' || req.method !== 'POST') return send(res, 404, { ok: false });
  let raw = '';
  req.on('data', chunk => raw += chunk);
  req.on('end', async () => {
    try {
      const body = JSON.parse(raw || '{}');
      const providerName = body.provider || 'openai';
      const provider = providers[providerName];
      if (!provider || !provider.key) return send(res, 400, { ok: false, error: 'Provider/API-Key fehlt' });
      // Hier eure provider-spezifische Anfrage bauen und per fetch(provider.endpoint, ...) senden.
      // Rückgabe an Frontend normalisieren.
      return send(res, 200, { ok: true, provider: providerName, model: provider.model, message: 'Proxy vorbereitet. Provider-Request ergänzen.' });
    } catch (error) {
      return send(res, 500, { ok: false, error: error.message });
    }
  });
});

server.listen(8790, () => console.log('EKY AI proxy example on http://localhost:8790/api/ai'));
`;
}

function backendServerJs() {
  return `const http = require('http');
const fs = require('fs');
const path = require('path');

function loadEnv() {
  const file = path.join(__dirname, '.env');
  if (!fs.existsSync(file)) return;
  fs.readFileSync(file, 'utf8').split(/\r?\n/).forEach(line => {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  });
}
loadEnv();

const PORT = Number(process.env.PORT || 8787);
const WEBHOOK_URL = process.env.WEBHOOK_URL || '';
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

function send(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', chunk => {
      raw += chunk;
      if (raw.length > 100_000) { req.destroy(); reject(new Error('Payload too large')); }
    });
    req.on('end', () => {
      try { resolve(raw ? JSON.parse(raw) : {}); }
      catch { reject(new Error('Invalid JSON')); }
    });
    req.on('error', reject);
  });
}

function sanitize(value) {
  return String(value ?? '').replace(/[<>]/g, '').trim().slice(0, 5000);
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, {});
  if (req.url !== '/api/contact' || req.method !== 'POST') return send(res, 404, { ok: false, error: 'Not found' });
  try {
    const body = await readBody(req);
    if (body.website) return send(res, 200, { ok: true }); // Honeypot
    const payload = Object.fromEntries(Object.entries(body).map(([k, v]) => [sanitize(k), sanitize(v)]));
    if (!payload.name && !payload.Name && !payload.email && !payload['telefon_oder_e_mail']) {
      return send(res, 400, { ok: false, error: 'Missing contact fields' });
    }
    if (WEBHOOK_URL) {
      const r = await fetch(WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!r.ok) throw new Error('Webhook failed: ' + r.status);
    } else {
      console.log('Lead received:', payload);
    }
    return send(res, 200, { ok: true });
  } catch (error) {
    console.error(error);
    return send(res, 500, { ok: false, error: 'Lead could not be processed' });
  }
});

server.listen(PORT, () => console.log('EKY contact backend running on http://localhost:' + PORT + '/api/contact'));
`;
}

function htaccessFile() {
  return `# EKY Builder Performance/Security Baseline
Options -Indexes
<IfModule mod_headers.c>
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>
<IfModule mod_expires.c>
ExpiresActive On
ExpiresByType image/webp "access plus 1 year"
ExpiresByType text/css "access plus 1 month"
ExpiresByType application/javascript "access plus 1 month"
ExpiresByType text/html "access plus 1 hour"
</IfModule>
`;
}

function netlifyHeaders() {
  return `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: camera=(), microphone=(), geolocation=()
/assets/*
  Cache-Control: public, max-age=31536000, immutable
/*.html
  Cache-Control: public, max-age=3600
`;
}


function pageCss(colors) {
  return `:root{--p:${colors.primary};--a:${colors.accent};--bg:${colors.bg};--t:${colors.text};--m:#666967;--b:#e9e7df;--panel:#f6f4ee;--shadow:0 24px 80px rgba(0,0,0,.12)}*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}body{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--t);background:var(--bg);-webkit-font-smoothing:antialiased;line-height:1.5}a{color:inherit;text-decoration:none}img{max-width:100%;height:auto}.skip{position:absolute;top:-40px;left:0;background:var(--p);color:#fff;padding:8px 16px;z-index:100}.skip:focus{top:0}nav.site-nav{display:flex;justify-content:space-between;align-items:center;padding:18px 48px;border-bottom:1px solid var(--b);position:sticky;top:0;background:rgba(255,255,255,.92);backdrop-filter:blur(14px);z-index:50}.brand{font-family:Georgia,serif;font-size:22px;font-style:italic;color:var(--p);font-weight:600}.brand img{max-height:46px;max-width:180px;object-fit:contain;display:block}.nav-links{display:flex;gap:24px;font-size:14px;color:var(--m)}.nav-actions{display:flex;align-items:center;gap:12px}.nav-phone{font-size:13px;color:var(--p);font-weight:800}.nav-cta{background:var(--p);color:#fff;padding:10px 18px;border-radius:8px;font-size:13px;font-weight:800}.hero{padding:76px 48px 64px;display:grid;grid-template-columns:1.05fr .95fr;gap:48px;align-items:center;max-width:1220px;margin:0 auto}.eyebrow{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:var(--a);margin-bottom:16px;font-weight:800}h1{font-family:Georgia,serif;font-size:60px;line-height:1.02;letter-spacing:-.03em;font-weight:400;margin-bottom:22px;color:var(--p)}h1 em{color:var(--a);font-style:italic}.hero-sub{font-size:17px;color:var(--m);margin-bottom:30px;max-width:540px;line-height:1.75}.hero-btns{display:flex;gap:12px;flex-wrap:wrap}.btn-p{background:var(--p);color:#fff;padding:14px 24px;border-radius:9px;font-size:14px;font-weight:800;display:inline-block}.btn-s{padding:14px 24px;border:1px solid #d8d5cb;border-radius:9px;font-size:14px;font-weight:800;display:inline-block;background:#fff}.hero-img{aspect-ratio:4/5;background:linear-gradient(135deg,var(--a),var(--p));border-radius:16px;box-shadow:var(--shadow);object-fit:cover;width:100%;display:block}.hero-note{font-size:13px;color:var(--m);margin-top:18px}.trust{background:var(--p);color:#fff;padding:14px 48px}.trust-inner{max-width:1200px;margin:0 auto;display:flex;justify-content:center;flex-wrap:wrap}.trust-item{padding:6px 18px;border-right:1px solid rgba(255,255,255,.18);font-size:13px;font-weight:800;display:flex;gap:8px}.trust-item:last-child{border-right:0}.features,.usps,.process,.faq-sec,.pricing-sec,.gallery-sec,.contact-sec,.split-sec,.testi{padding:82px 48px}.features,.faq-sec,.pricing-sec{background:var(--panel);border-top:1px solid var(--b)}.features-w,.usps-w,.process-w,.faq-w,.pricing-w,.gallery-w,.contact-w{max-width:1200px;margin:0 auto}h2{font-family:Georgia,serif;font-size:40px;font-weight:400;margin-bottom:34px;letter-spacing:-.02em;color:var(--p)}.feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.feat-card,.usp-card,.price-card{background:#fff;padding:28px;border-radius:14px;border:1px solid var(--b);box-shadow:0 8px 30px rgba(0,0,0,.035)}.feat-icon{width:38px;height:38px;background:var(--p);border-radius:10px;margin-bottom:14px}.feat-card h3,.usp-card h3,.step h3,.faq-item h3{font-size:17px;margin-bottom:8px;font-weight:800;color:var(--p)}.feat-card p,.usp-card p,.step p,.faq-item p,.split-sec p{font-size:14px;color:var(--m);line-height:1.7}.usp-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.usp-card{display:flex;gap:16px;border-left:4px solid var(--a)}.usp-no{width:38px;height:38px;border-radius:10px;background:var(--a);color:var(--p);display:flex;align-items:center;justify-content:center;font-weight:900;flex:0 0 auto}.process{background:var(--p);color:#fff}.process h2{color:#fff;text-align:center}.process-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.step{text-align:center;padding:24px 14px}.step-no{width:54px;height:54px;border-radius:50%;background:var(--a);color:var(--p);display:flex;align-items:center;justify-content:center;margin:0 auto 14px;font-weight:900}.step h3{color:#fff}.step p{color:rgba(255,255,255,.78)}.split-sec{display:grid;grid-template-columns:1fr 1fr;gap:54px;align-items:center;max-width:1200px;margin:0 auto}.split-img{aspect-ratio:4/3;background:linear-gradient(135deg,var(--p),var(--a));border-radius:16px;object-fit:cover;width:100%}.cta-sec{padding:84px 48px;background:var(--p);color:#fff;text-align:center}.cta-sec h2{font-size:48px;margin-bottom:14px;color:#fff}.cta-sec p{font-size:17px;opacity:.86;margin-bottom:30px}.cta-btn{display:inline-block;background:var(--a);color:var(--p);padding:15px 32px;border-radius:9px;font-size:15px;font-weight:900}.faq-w{max-width:860px}.faq-item{border-bottom:1px solid var(--b);padding:22px 0}.testi{text-align:center;max-width:920px;margin:0 auto}.testi-q{font-size:52px;color:var(--a);line-height:1;margin-bottom:14px}.testi blockquote{font-family:Georgia,serif;font-size:30px;font-style:italic;line-height:1.42;margin-bottom:22px;color:var(--p)}.testi cite{font-size:13px;color:var(--m);font-weight:800;font-style:normal}.pricing-grid{display:grid;gap:18px}.price-card.feat{border:2px solid var(--a)}.price-name{font-size:13px;font-weight:800;color:var(--a);margin-bottom:7px}.price-amt{font-family:Georgia,serif;font-size:38px;font-weight:400;color:var(--p)}.gal-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.gal-item{aspect-ratio:4/3;border-radius:14px;background:linear-gradient(135deg,var(--a),var(--p));object-fit:cover;width:100%;display:block}.contact-sec{background:#fff}.contact-w{display:grid;grid-template-columns:.9fr 1.1fr;gap:40px}.contact-card{background:var(--panel);border:1px solid var(--b);border-radius:16px;padding:28px}.contact-card label{display:block;font-size:12px;font-weight:800;margin:12px 0 6px;color:var(--p)}.contact-card input,.contact-card textarea,.contact-card select{width:100%;border:1px solid var(--b);border-radius:9px;padding:13px 14px;font:inherit;background:#fff}.contact-card textarea{min-height:124px;resize:vertical}.contact-submit{border:0;background:var(--p);color:#fff;border-radius:9px;padding:14px 18px;font-weight:900;margin-top:14px;width:100%}.contact-submit:disabled{opacity:.55;cursor:not-allowed}.form-status{font-size:13px;margin-top:12px;color:var(--p);font-weight:700}.contact-facts{font-size:14px;color:var(--m);line-height:1.9;margin-top:16px}.hp{position:absolute;left:-9999px}footer.site-footer{padding:64px 48px 36px;background:#0a0a0a;color:#fff}.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:36px;max-width:1200px;margin:0 auto 36px}.footer-brand{font-family:Georgia,serif;font-size:22px;font-style:italic;margin-bottom:12px}.footer-tagline{font-size:13px;color:#888;line-height:1.6}.footer-head{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#666;margin-bottom:10px;font-weight:800}.footer-list{font-size:13px;line-height:2;color:#aaa}.footer-bottom{max-width:1200px;margin:0 auto;font-size:11px;color:#555;border-top:1px solid #222;padding-top:18px}.service-hero{padding:76px 48px;background:var(--p);color:#fff}.service-hero-inner{max-width:960px;margin:0 auto}.service-hero h1{color:#fff}.service-content{padding:70px 48px;max-width:960px;margin:0 auto}.service-content p,.service-content li{font-size:17px;color:var(--m);line-height:1.8}.service-content ul{margin:22px 0 32px 24px}.service-nav{font-size:13px;margin-bottom:20px;opacity:.8}@media(max-width:900px){nav.site-nav{padding:14px 20px}.nav-links,.nav-phone{display:none}.hero,.split-sec,.contact-w{grid-template-columns:1fr;padding:48px 20px;gap:28px}.features,.usps,.process,.faq-sec,.pricing-sec,.gallery-sec,.contact-sec,.testi,.service-content,.service-hero{padding:48px 20px}h1{font-size:40px}h2{font-size:30px}.feat-grid,.pricing-grid{grid-template-columns:1fr}.usp-grid,.process-grid,.gal-grid{grid-template-columns:repeat(2,1fr)}.footer-grid{grid-template-columns:1fr 1fr}}@media(max-width:520px){h1{font-size:30px;line-height:1.1}h2{font-size:25px}.hero,.features,.usps,.process,.faq-sec,.split-sec,.testi,.pricing-sec,.gallery-sec,.contact-sec,.service-content,.service-hero{padding:36px 16px}.hero-btns{flex-direction:column}.btn-p,.btn-s,.cta-btn{width:100%;text-align:center}.usp-grid,.process-grid,.gal-grid,.contact-w,.footer-grid{grid-template-columns:1fr}.trust{padding:10px 14px}.trust-inner{justify-content:flex-start}.trust-item{border-right:0;padding:4px 8px;font-size:11px}.cta-sec{padding:52px 16px}.cta-sec h2{font-size:30px}.testi blockquote{font-size:21px}.brand img{max-width:136px}.nav-cta{font-size:12px;padding:8px 12px}}:focus-visible{outline:2px solid var(--a);outline-offset:2px;border-radius:4px}@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}`;
}


function svgIconHtml(name) {
  return `<span class="svg-icon svg-${esc(name)}" aria-hidden="true">${localSvgIcon(name)}</span>`;
}

function floatingWidgetsHtml(b) {
  const wa = whatsappUrlFor(b);
  return `${wa ? `<a class="sticky-whatsapp" href="${esc(wa)}" aria-label="WhatsApp Chat öffnen" target="_blank" rel="noopener">${svgIconHtml('whatsapp')}</a>` : ''}
  <div class="access-widget" role="group" aria-label="Barrierefreiheit">
    <button type="button" data-a11y="font" aria-pressed="false" aria-label="Schrift vergrößern">Aa</button>
    <button type="button" data-a11y="contrast" aria-pressed="false" aria-label="Kontrast umschalten">${svgIconHtml('contrast')}</button>
  </div>`;
}

function socialIconsHtml(b, className = '') {
  const links = socialLinksFor(b);
  if (!links.length) return '';
  return `<div class="social-icons ${esc(className)}">${links.map(link => `<a href="${esc(link.url)}" class="social-link social-${esc(link.key)}" aria-label="${esc(link.label)} öffnen" target="_blank" rel="noopener">${svgIconHtml(link.key)}</a>`).join('')}</div>`;
}

function socialBlockHtml(b, data = {}) {
  const icons = socialIconsHtml(b);
  if (!icons) return '';
  return `    <section class="social-sec" aria-label="Social Media"><div class="social-w"><h2>${esc(data.Titel || data.title || 'Online verbunden')}</h2>${(data.Untertitel || data.sub) ? `<p>${esc(data.Untertitel || data.sub)}</p>` : ''}${icons}</div></section>`;
}

function accessibilityScriptJs() {
  return `(() => {
  const root = document.documentElement;
  const get = key => localStorage.getItem('eky_' + key) === '1';
  const set = (key, value) => localStorage.setItem('eky_' + key, value ? '1' : '0');
  const apply = () => {
    root.classList.toggle('eky-large-text', get('large_text'));
    root.classList.toggle('eky-high-contrast', get('high_contrast'));
    document.querySelectorAll('[data-a11y="font"]').forEach(btn => btn.setAttribute('aria-pressed', String(get('large_text'))));
    document.querySelectorAll('[data-a11y="contrast"]').forEach(btn => btn.setAttribute('aria-pressed', String(get('high_contrast'))));
  };
  document.addEventListener('click', event => {
    const btn = event.target.closest('[data-a11y]');
    if (!btn) return;
    const key = btn.getAttribute('data-a11y') === 'font' ? 'large_text' : 'high_contrast';
    set(key, !get(key));
    apply();
  });
  apply();
})();`;
}

function v7Css() {
  return `.svg-icon{display:inline-flex;width:1.25em;height:1.25em;line-height:0}.svg-icon svg{width:100%;height:100%;display:block}.sticky-whatsapp{position:fixed;right:26px;bottom:26px;width:64px;height:64px;border-radius:50%;background:#25D366;color:#fff;display:grid;place-items:center;box-shadow:0 16px 38px rgba(37,211,102,.38);z-index:90;transition:transform .18s ease,box-shadow .18s ease}.sticky-whatsapp:hover,.sticky-whatsapp:focus{transform:translateY(-2px);box-shadow:0 20px 48px rgba(37,211,102,.46);outline:3px solid rgba(37,211,102,.24);outline-offset:3px}.sticky-whatsapp .svg-icon{width:34px;height:34px}.access-widget{position:fixed;left:26px;bottom:26px;background:rgba(9,13,24,.92);border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:8px;display:flex;gap:8px;box-shadow:0 16px 38px rgba(0,0,0,.22);backdrop-filter:blur(14px);z-index:90}.access-widget button{width:46px;height:46px;border-radius:50%;border:1px solid rgba(255,255,255,.14);background:transparent;color:#fff;font-weight:900;font-size:18px;display:grid;place-items:center;cursor:pointer}.access-widget button[aria-pressed="true"]{background:#fff;color:#0b1020}.social-sec{padding:70px 48px;background:#fff;text-align:center;border-top:1px solid var(--b)}.social-w{max-width:780px;margin:0 auto}.social-w p{font-size:16px;color:var(--m);margin:-18px auto 28px;max-width:580px;line-height:1.7}.social-icons{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;align-items:center}.social-link{width:54px;height:54px;border-radius:50%;display:grid;place-items:center;background:var(--p);color:#fff;box-shadow:0 12px 28px rgba(0,0,0,.12);transition:transform .18s ease,box-shadow .18s ease}.social-link:hover,.social-link:focus{transform:translateY(-2px);box-shadow:0 18px 36px rgba(0,0,0,.18);outline:3px solid rgba(0,0,0,.1);outline-offset:3px}.social-whatsapp{background:#25D366}.social-link .svg-icon{width:25px;height:25px}html.eky-large-text{font-size:112%}html.eky-large-text body{line-height:1.65}html.eky-high-contrast body{background:#000!important;color:#fff!important}html.eky-high-contrast nav,html.eky-high-contrast section,html.eky-high-contrast footer,html.eky-high-contrast .feat-card,html.eky-high-contrast .usp-card,html.eky-high-contrast .price-card,html.eky-high-contrast .contact-card{background:#000!important;color:#fff!important;border-color:#fff!important}html.eky-high-contrast h1,html.eky-high-contrast h2,html.eky-high-contrast h3,html.eky-high-contrast p,html.eky-high-contrast a,html.eky-high-contrast .hero-sub,html.eky-high-contrast .eyebrow{color:#fff!important}html.eky-high-contrast .btn-p,html.eky-high-contrast .nav-cta,html.eky-high-contrast .cta-btn,html.eky-high-contrast .contact-submit{background:#fff!important;color:#000!important;border:2px solid #fff!important}html.eky-high-contrast img{filter:contrast(1.12)}@media(max-width:700px){.sticky-whatsapp{right:16px;bottom:16px;width:58px;height:58px}.access-widget{left:16px;bottom:16px;padding:7px}.access-widget button{width:42px;height:42px}.social-sec{padding:46px 20px}.social-link{width:48px;height:48px}.social-link .svg-icon{width:22px;height:22px}}`;
}

function localSvgAssetFiles() {
  const files = {};
  Object.entries(LOCAL_SVG_ICONS).forEach(([name, svg]) => { files[`assets/icons/${name}.svg`] = svg; });
  return files;
}

function generateHtml(blocks, b, colors, media = DEFAULT_MEDIA, mode = 'inline', pageMeta = {}) {
  const title = pageMeta.title || b.seoTitle || `${b.name} — ${b.tagline}`;
  const desc = pageMeta.desc || b.seoDescription || `${b.name} in ${b.city}. ${b.tagline}. ${(b.areaServed || []).slice(0, 3).join(', ')}. Tel: ${b.phone}`;
  const url = pageMeta.url || siteBaseUrl(b);
  const seoKeywords = keywordBag(b);
  const heroImage = imageForBlock((blocks || []).find(bl => bl.type === 'hero') || {}, media, 'hero');
  const logoImage = normalizeMedia(media).logo;
  const ogImage = heroImage ? assetSrc(heroImage, mode) : '';
  const schema = {
    "@context": "https://schema.org", "@type": b.type || 'LocalBusiness', "@id": url,
    "name": b.name, "legalName": b.legalName || b.name, "description": desc, "url": siteBaseUrl(b),
    "telephone": b.phone, "email": b.email, "priceRange": b.priceRange, "foundingDate": b.foundingDate,
    ...(seoKeywords.length ? { "knowsAbout": seoKeywords, "keywords": seoKeywords.join(', ') } : {}),
    ...(logoImage ? { "logo": assetSrc(logoImage, mode) } : {}),
    ...(heroImage ? { "image": [assetSrc(heroImage, mode), ...exportedMediaAssets(media).filter(a => a.id !== heroImage.id).slice(0, 4).map(a => assetSrc(a, mode))] } : {}),
    "address": { "@type": "PostalAddress", "streetAddress": b.street, "postalCode": b.postalCode, "addressLocality": b.city, "addressRegion": b.region, "addressCountry": b.country || 'DE' },
    "geo": { "@type": "GeoCoordinates", "latitude": b.lat, "longitude": b.lng },
    "areaServed": (b.areaServed || []).map(a => ({ "@type": "City", "name": a })),
    "openingHours": b.openingHours
  };
  const faqBlocks = blocks.filter(bl => bl.type === 'faq');
  const faqData = faqBlocks.length ? { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqBlocks.flatMap(fb => { const t = translateData('faq', fb.data); return (t.items || []).map(it => ({ "@type": "Question", "name": it.q, "acceptedAnswer": { "@type": "Answer", "text": it.a } })); }) } : null;
  const body = pageMeta.body || blocks.map(bl => renderBlockHtml(bl, b, colors, media, mode)).join('\n');
  const formScript = mode === 'folder' ? `<script src="assets/eky-form-handler.js" defer></script>` : `<script>${formHandlerJs()}</script>`;
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  ${seoKeywords.length ? `<meta name="keywords" content="${esc(seoKeywords.join(', '))}">` : ''}
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${esc(url)}">
  ${mode === 'folder' ? '<link rel="manifest" href="manifest.webmanifest">' : ''}
  ${heroImage ? `<link rel="preload" as="image" href="${esc(ogImage)}">` : ''}
  <meta name="geo.region" content="${esc(b.country || 'DE')}-BY">
  <meta name="geo.placename" content="${esc(b.city)}">
  <meta name="geo.position" content="${esc(b.lat)};${esc(b.lng)}">
  <meta name="ICBM" content="${esc(b.lat)}, ${esc(b.lng)}">
  <meta property="og:type" content="business.business">
  <meta property="og:locale" content="de_DE">
  <meta property="og:url" content="${esc(url)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  ${ogImage ? `<meta property="og:image" content="${esc(ogImage)}">` : ''}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="ai-content-declaration" content="human-authored">
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='${encodeURIComponent(colors.primary)}'/%3E%3Ctext x='50' y='68' font-family='serif' font-size='60' fill='white' text-anchor='middle'%3E${esc(String(b.name || 'E').charAt(0))}%3C/text%3E%3C/svg%3E">
  <script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>
  ${faqData ? `<script type="application/ld+json">${JSON.stringify(faqData, null, 2)}</script>` : ''}
  <style>${pageCss(colors)}${v7Css()}</style>
</head>
<body>
  <a href="#main" class="skip">Zum Hauptinhalt springen</a>
  <main id="main">
${body}
  </main>
  ${floatingWidgetsHtml(b)}
  ${formScript}
  <script>${accessibilityScriptJs()}</script>
</body>
</html>`;
}

function generateLegalPage(kind, b, colors) {
  const isPrivacy = kind === 'datenschutz';
  const title = isPrivacy ? 'Datenschutzerklärung' : 'Impressum';
  const owner = b.owner || 'Bitte Inhaber/Geschäftsführer ergänzen';
  return `<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | ${esc(b.name)}</title><meta name="robots" content="noindex, follow"><style>body{font-family:Arial,sans-serif;line-height:1.7;color:#111;max-width:860px;margin:0 auto;padding:48px 20px}a{color:${colors.primary}}h1{font-size:34px}h2{margin-top:28px}.box{background:#f5f5f5;padding:18px;border-radius:10px}</style></head><body><p><a href="index.html">← Zurück zur Website</a></p><h1>${title}</h1><div class="box"><strong>${esc(b.legalName || b.name)}</strong><br>${esc(b.street || '')}<br>${esc(b.postalCode || '')} ${esc(b.city || '')}<br>${esc(b.country || 'DE')}<br><br>Telefon: ${esc(b.phone || '')}<br>E-Mail: ${esc(b.email || '')}<br>Vertreten durch: ${esc(owner)}${b.ustId ? `<br>USt-ID: ${esc(b.ustId)}` : ''}${b.register ? `<br>Register: ${esc(b.register)}` : ''}</div>${isPrivacy ? `<h2>Hinweis</h2><p>Diese Datenschutzerklärung ist technisch vorbereitet und muss vor Veröffentlichung rechtlich geprüft und an echte Dienste wie Hosting, Analytics, Karten, Videos, Formulare, Cookies und CRM-Anbindung angepasst werden.</p><h2>Kontaktformular</h2><p>Wenn Sie das Kontaktformular nutzen, werden Ihre Angaben zur Bearbeitung der Anfrage verarbeitet. Die konkrete Verarbeitung richtet sich nach dem eingetragenen Formular-Endpoint/CRM-System.</p><h2>Bilder und Medien</h2><p>Alle verwendeten Bilder müssen lizenzrechtlich geprüft und mit passenden Alt-Texten versehen sein.</p><h2>Server-Logs</h2><p>Beim Besuch der Website können technisch notwendige Server-Logdaten verarbeitet werden.</p>` : `<h2>Verantwortlich für den Inhalt</h2><p>${esc(owner)}</p><h2>Umsatzsteuer-ID</h2><p>${esc(b.ustId || 'Bitte Umsatzsteuer-ID ergänzen, falls vorhanden.')}</p><h2>Haftung für Inhalte</h2><p>Die Inhalte dieser Seite wurden sorgfältig erstellt. Bitte rechtlich prüfen und an das Unternehmen anpassen.</p>`}<p style="margin-top:34px;color:#777;font-size:13px">Vorlage erstellt mit EKY Builder. Vor Livegang rechtlich prüfen lassen.</p></body></html>`;
}

function generateServicePage(service, b, colors, media, mode) {
  const base = siteBaseUrl(b);
  const title = `${service.title} ${b.city ? `in ${b.city}` : ''} | ${b.name}`.replace(/\s+/g, ' ').trim();
  const desc = `${b.name}: ${service.title} ${b.city ? `in ${b.city} und Umgebung` : ''}. ${service.text || 'Jetzt Beratung und Angebot anfragen.'}`.slice(0, 155);
  const body = `    <nav class="site-nav" role="navigation"><a href="../index.html" class="brand">${media?.logo ? `<img src="../${assetSrc(media.logo, 'folder')}" alt="${esc(media.logo.alt)}" width="${media.logo.width}" height="${media.logo.height}">` : esc(b.name)}</a><div class="nav-links"><a href="../index.html#leistungen">Leistungen</a><a href="../index.html#ueber-uns">Über uns</a><a href="../index.html#anfrage">Kontakt</a></div><a href="../index.html#anfrage" class="nav-cta">Anfragen</a></nav>
    <section class="service-hero"><div class="service-hero-inner"><div class="service-nav"><a href="../index.html">Startseite</a> / Leistungen</div><p class="eyebrow">${esc(b.mainKeyword || b.name)}</p><h1>${esc(service.title)} ${b.city ? `in ${esc(b.city)}` : ''}</h1><p class="hero-sub" style="color:rgba(255,255,255,.82)">${esc(service.text || 'Professionelle Beratung, klare Abläufe und saubere Umsetzung.')}</p><a href="../index.html#anfrage" class="cta-btn">Anfrage senden →</a></div></section>
    <section class="service-content"><h2>Darum ist ${esc(service.title)} wichtig</h2><p>${esc(b.name)} unterstützt Kunden ${b.city ? `in ${esc(b.city)} und der Region` : 'in der Region'} mit strukturierter Beratung, transparenter Planung und verlässlicher Umsetzung. Ziel ist eine Lösung, die fachlich sauber ist und im Alltag funktioniert.</p><ul><li>Persönliche Beratung und klare nächste Schritte</li><li>Transparentes Angebot vor der Umsetzung</li><li>Regionale Erreichbarkeit und feste Ansprechpartner</li><li>Auf Wunsch schnelle Anfrage über Formular, Telefon oder Terminlink</li></ul><h2>Jetzt ${esc(service.title)} anfragen</h2><p>Beschreiben Sie kurz Ihr Anliegen. Wir melden uns schnellstmöglich mit einer Einschätzung zurück.</p><p><a href="../index.html#anfrage" class="btn-p">Kontakt aufnehmen →</a></p></section>`;
  return generateHtml([], b, colors, media, mode, { title, desc, url: `${base}/leistungen/${service.slug}.html`, body });
}

function generateAboutPage(blocks, b, colors, media, mode) {
  const split = blocks.find(x => x.type === 'split');
  const d = translateData('split', split?.data || {});
  const body = `    <nav class="site-nav" role="navigation"><a href="index.html" class="brand">${media?.logo ? `<img src="${assetSrc(media.logo, mode)}" alt="${esc(media.logo.alt)}" width="${media.logo.width}" height="${media.logo.height}">` : esc(b.name)}</a><div class="nav-links"><a href="index.html#leistungen">Leistungen</a><a href="index.html#referenzen">Referenzen</a><a href="kontakt.html">Kontakt</a></div><a href="kontakt.html" class="nav-cta">Anfragen</a></nav>
    <section class="service-hero"><div class="service-hero-inner"><p class="eyebrow">Über uns</p><h1>${esc(d.headline || b.name)}</h1><p class="hero-sub" style="color:rgba(255,255,255,.82)">${esc(d.text || b.tagline || '')}</p></div></section>
    <section class="service-content"><h2>${esc(b.name)} aus ${esc(b.city || 'der Region')}</h2><p>${esc(d.text || `${b.name} steht für saubere Beratung, klare Abläufe und hochwertige Umsetzung.`)}</p><ul><li>Regionale Ansprechpartner</li><li>Transparente Beratung und nachvollziehbare Angebote</li><li>Strukturierter Projektablauf</li><li>Fokus auf Qualität, Erreichbarkeit und Verlässlichkeit</li></ul><p><a href="kontakt.html" class="btn-p">Projekt anfragen →</a></p></section>`;
  return generateHtml([], b, colors, media, mode, { title: `Über uns | ${b.name}`, desc: `${b.name}: ${b.tagline || 'Unternehmen'} ${b.city ? `in ${b.city}` : ''}. Lernen Sie Team, Werte und Arbeitsweise kennen.`, url: `${siteBaseUrl(b)}/ueber-uns.html`, body });
}

function generateContactPage(blocks, b, colors, media, mode) {
  const contact = blocks.find(x => x.type === 'contact') || makeBlock('contact', 'contact_export', DEFAULT_BLOCK.contact);
  const body = `    <nav class="site-nav" role="navigation"><a href="index.html" class="brand">${media?.logo ? `<img src="${assetSrc(media.logo, mode)}" alt="${esc(media.logo.alt)}" width="${media.logo.width}" height="${media.logo.height}">` : esc(b.name)}</a><div class="nav-links"><a href="index.html#leistungen">Leistungen</a><a href="ueber-uns.html">Über uns</a><a href="index.html#referenzen">Referenzen</a></div><a href="tel:${String(b.phone || '').replace(/\s/g, '')}" class="nav-cta">Anrufen</a></nav>
${renderBlockHtml(contact, b, colors, media, mode)}
${renderBlockHtml({ type: 'footer', id: 'footer_export' }, b, colors, media, mode)}`;
  return generateHtml([], b, colors, media, mode, { title: `Kontakt | ${b.name}`, desc: `Kontakt zu ${b.name}${b.city ? ` in ${b.city}` : ''}. Jetzt telefonisch, per E-Mail oder Kontaktformular anfragen.`, url: `${siteBaseUrl(b)}/kontakt.html`, body });
}

function generate404Page(b, colors) {
  return `<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Seite nicht gefunden | ${esc(b.name)}</title><meta name="robots" content="noindex, follow"><style>${pageCss(colors)}</style></head><body><section class="service-content"><h1>Seite nicht gefunden</h1><p>Die gewünschte Seite existiert nicht oder wurde verschoben.</p><p><a href="index.html" class="btn-p">Zur Startseite →</a></p></section></body></html>`;
}

function manifestJson(b, colors) {
  return JSON.stringify({ name: b.name || 'Website', short_name: b.name || 'Website', lang: 'de', start_url: '/', display: 'standalone', background_color: colors.bg, theme_color: colors.primary, description: b.seoDescription || b.tagline || '' }, null, 2);
}

function generateSiteFiles(blocks, b, colors, media = DEFAULT_MEDIA) {
  const baseUrl = siteBaseUrl(b);
  const now = new Date().toISOString().slice(0,10);
  const services = collectServices(blocks);
  const checks = runQualityChecks(blocks, b, colors, media);
  const score = scoreQuality(checks);
  const files = {
    'index.html': generateHtml(blocks, b, colors, media, 'folder'),
    'ueber-uns.html': generateAboutPage(blocks, b, colors, media, 'folder'),
    'kontakt.html': generateContactPage(blocks, b, colors, media, 'folder'),
    'impressum.html': generateLegalPage('impressum', b, colors),
    'datenschutz.html': generateLegalPage('datenschutz', b, colors),
    '404.html': generate404Page(b, colors),
    'manifest.webmanifest': manifestJson(b, colors),
    'robots.txt': `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`,
    '.htaccess': htaccessFile(),
    '_headers': netlifyHeaders(),
    'assets/eky-form-handler.js': formHandlerJs(),
    ...localSvgAssetFiles(),
    'backend/server.js': backendServerJs(),
    'backend/.env.example': `PORT=8787\nWEBHOOK_URL=\nALLOWED_ORIGIN=*\nOPENAI_API_KEY=\nANTHROPIC_API_KEY=\nHIGGSFIELD_API_KEY=\nOPENAI_MODEL=\nCLAUDE_MODEL=\nHIGGSFIELD_MODEL=\n`,
    'backend/ai-proxy.example.js': aiProxyExampleJs(),
    'backend/ai-config.template.json': JSON.stringify({ defaultProvider: b.aiDefaultProvider || 'openai', providers: API_PROVIDER_FIELDS.map(p => ({ provider: p.provider, label: p.label, model: b[p.modelField] || p.defaultModel, endpoint: b[p.endpointField] || p.endpoint, envKey: p.provider === 'openai' ? 'OPENAI_API_KEY' : p.provider === 'claude' ? 'ANTHROPIC_API_KEY' : 'HIGGSFIELD_API_KEY' })) }, null, 2),
    'backend/README.txt': generateBackendReadme(b),
    'backend/package.json': JSON.stringify({ scripts: { start: 'node server.js' }, engines: { node: '>=18' } }, null, 2),
    'README.txt': `EKY Builder v7 Export\n================================\n\nAgentur-Ready Score beim Export: ${score}/100\n\nEnthalten:\n- index.html: Hauptseite\n- ueber-uns.html / kontakt.html: zusätzliche Unternehmensseiten\n- /leistungen/*.html: automatisch generierte SEO-Leistungsseiten\n- /assets/*.webp: komprimierte Bilder mit gepflegten Alt-Texten\n- /assets/icons/*.svg: lokale SVG-Icons für WhatsApp/Social/Barrierefreiheit\n- Sticky WhatsApp unten rechts und Accessibility Widget unten links\n- /assets/eky-form-handler.js: AJAX-Formularlogik mit Statusmeldungen\n- /backend: optionales Node-Backend für /api/contact und Webhook-Weiterleitung\n- /backend/ai-proxy.example.js: sichere Vorlage für ChatGPT/OpenAI, Claude/Anthropic und Higgsfield API-Keys\n- SEO-Keyword-Engine: Meta Keywords, Schema.org knowsAbout und automatisch verteilte Keyword-Texte\n- impressum.html / datenschutz.html: rechtliche Vorlagen, vor Livegang prüfen\n- sitemap.xml / robots.txt / manifest.webmanifest / 404.html\n- .htaccess und _headers: Performance-/Security-Baseline für Apache/Netlify\n\nKontaktformular:\n${b.formEndpoint ? `Endpoint eingetragen: ${b.formEndpoint}` : 'Kein externer Endpoint eingetragen. Standard im Export: /api/contact. Dazu backend/server.js hosten oder im Builder Make/Zapier/Formspree/CRM-Endpoint eintragen.'}\n\nLivegang:\n1. Website-URL, Canonical und Sitemap prüfen\n2. Formular-Endpunkt live testen\n3. Rechtliches kundenindividuell prüfen\n4. Bilderrechte prüfen\n5. Lighthouse/Mobile-Test machen\n`,
    'launch-checkliste.txt': checks.map(c => `[${c.level.toUpperCase()}] ${c.label}\n${c.hint}`).join('\n\n')
  };
  exportedMediaAssets(media).forEach(asset => {
    files[`assets/${asset.exportName}`] = { encoding: 'base64', content: dataUrlToBase64(asset.dataUrl) };
  });
  services.forEach(service => {
    files[`leistungen/${service.slug}.html`] = generateServicePage(service, b, colors, media, 'folder');
  });
  const sitemapUrls = [
    `  <url><loc>${baseUrl}/</loc><lastmod>${now}</lastmod><priority>1.0</priority></url>`,
    `  <url><loc>${baseUrl}/ueber-uns.html</loc><lastmod>${now}</lastmod><priority>0.7</priority></url>`,
    `  <url><loc>${baseUrl}/kontakt.html</loc><lastmod>${now}</lastmod><priority>0.8</priority></url>`,
    ...services.map(sv => `  <url><loc>${baseUrl}/leistungen/${sv.slug}.html</loc><lastmod>${now}</lastmod><priority>0.85</priority></url>`),
    `  <url><loc>${baseUrl}/impressum.html</loc><lastmod>${now}</lastmod><priority>0.2</priority></url>`,
    `  <url><loc>${baseUrl}/datenschutz.html</loc><lastmod>${now}</lastmod><priority>0.2</priority></url>`
  ];
  files['sitemap.xml'] = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.join('\n')}\n</urlset>`;
  return files;
}
function renderBlockHtml(block, b, colors, media = DEFAULT_MEDIA, mode = 'inline') {
  const d = translateData(block.type, block.data || {});
  const ctaLink = ctaLinkFor(b);
  const secondaryLink = normalizeUrl(b.ctaSecondaryUrl) || '#leistungen';
  const m = normalizeMedia(media);
  const logo = m.logo;
  const hero = imageForBlock(block, media, 'hero');
  const logoHtml = logo ? `<img src="${assetSrc(logo, mode)}" alt="${esc(logo.alt)}" width="${logo.width}" height="${logo.height}">` : esc(b.name);

  if (block.type === 'nav') return `    <nav class="site-nav" role="navigation" aria-label="Hauptnavigation">
      <a href="index.html" class="brand">${logoHtml}</a>
      <div class="nav-links"><a href="#leistungen">Leistungen</a><a href="#vorteile">Vorteile</a><a href="#referenzen">Referenzen</a><a href="#anfrage">Kontakt</a></div>
      <div class="nav-actions">${b.phone ? `<a class="nav-phone" href="tel:${String(b.phone).replace(/\s/g, '')}">${esc(b.phone)}</a>` : ''}<a href="${ctaLink}" class="nav-cta"${/^https?:/.test(ctaLink) ? ' target="_blank" rel="noopener"' : ''}>${b.calendly ? 'Termin buchen' : 'Anfrage starten'}</a></div>
    </nav>`;

  if (block.type === 'hero') return `    <section class="hero" id="hero"><div><p class="eyebrow">${esc(d.eyebrow)}</p><h1>${d.headline || ''}</h1><p class="hero-sub">${esc(d.sub)}</p><div class="hero-btns"><a href="${ctaLink}" class="btn-p"${/^https?:/.test(ctaLink) ? ' target="_blank" rel="noopener"' : ''}>${esc(d.cta1)} →</a><a href="${secondaryLink}" class="btn-s">${esc(d.cta2)}</a></div>${b.phone ? `<p class="hero-note">📞 ${esc(b.phone)} ${b.openingHours ? `· ${esc(b.openingHours)}` : ''}</p>` : ''}</div>${hero ? `<img class="hero-img" src="${assetSrc(hero, mode)}" alt="${esc(hero.alt)}" width="${hero.width}" height="${hero.height}" fetchpriority="high" decoding="async">` : `<div class="hero-img" role="img" aria-label="${esc(b.name)} ${esc(b.city)}"></div>`}</section>`;

  if (block.type === 'trust') return `    <section class="trust" aria-label="Vertrauen"><div class="trust-inner">${ensureArray(block.data?.Elemente).map(el => `<div class="trust-item"><span>${esc(el.Icon || '✓')}</span><span>${esc(el.Text || '')}</span></div>`).join('')}</div></section>`;

  if (block.type === 'features') return `    <section class="features" id="leistungen"><div class="features-w"><h2>${esc(d.title)}</h2><div class="feat-grid">${ensureArray(d.items).map(it => `<article class="feat-card"><div class="feat-icon" aria-hidden="true"></div><h3>${esc(it.title)}</h3><p>${esc(it.text)}</p><p style="margin-top:14px"><a href="leistungen/${slugify(it.title)}.html" class="btn-s" style="padding:9px 14px;font-size:12px">Mehr erfahren</a></p></article>`).join('')}</div></div></section>`;

  if (block.type === 'usps') return `    <section class="usps" id="vorteile"><div class="usps-w"><h2>${esc(block.data?.Titel || 'Warum Kunden uns wählen.')}</h2><div class="usp-grid">${ensureArray(block.data?.Elemente).map((el, i) => `<article class="usp-card"><div class="usp-no">${i + 1}</div><div><h3>${esc(el.Titel || '')}</h3><p>${esc(el.Text || '')}</p></div></article>`).join('')}</div></div></section>`;

  if (block.type === 'process') return `    <section class="process" id="ablauf"><div class="process-w"><h2>${esc(block.data?.Titel || 'So läuft die Zusammenarbeit ab.')}</h2><div class="process-grid">${ensureArray(block.data?.Elemente).map(el => `<article class="step"><div class="step-no">${esc(el.Nummer || '')}</div><h3>${esc(el.Titel || '')}</h3><p>${esc(el.Text || '')}</p></article>`).join('')}</div></div></section>`;

  if (block.type === 'split') return `    <section class="split-sec" id="ueber-uns">${hero ? `<img class="split-img" src="${assetSrc(hero, mode)}" alt="${esc(hero.alt)}" loading="lazy" decoding="async" width="${hero.width}" height="${hero.height}">` : `<div class="split-img" role="img" aria-label="${esc(b.name)}"></div>`}<div><p class="eyebrow">${esc(d.eyebrow)}</p><h2>${esc(d.headline)}</h2><p>${esc(d.text)}</p></div></section>`;

  if (block.type === 'cta') return `    <section class="cta-sec" id="kontakt"><h2>${esc(d.headline)}</h2><p>${esc(d.sub)}</p><a href="${ctaLink}" class="cta-btn"${/^https?:/.test(ctaLink) ? ' target="_blank" rel="noopener"' : ''}>${esc(d.cta)} →</a></section>`;

  if (block.type === 'faq') return `    <section class="faq-sec"><div class="faq-w"><h2>${esc(d.title)}</h2>${ensureArray(d.items).map(it => `<div class="faq-item"><h3>${esc(it.q)}</h3><p>${esc(it.a)}</p></div>`).join('')}</div></section>`;

  if (block.type === 'testimonial') return `    <section class="testi"><div class="testi-q" aria-hidden="true">"</div><blockquote>${esc(d.quote)}</blockquote><cite>— ${esc(d.author)}</cite></section>`;

  if (block.type === 'pricing') return `    <section class="pricing-sec" id="preise"><div class="pricing-w"><h2>${esc(d.title)}</h2><div class="pricing-grid" style="grid-template-columns:repeat(${Math.max(1, ensureArray(d.plans).length)},1fr)">${ensureArray(d.plans).map((p, i) => `<div class="price-card${i === 1 ? ' feat' : ''}"><div class="price-name">${esc(p.name)}</div><div class="price-amt">${esc(p.price)}</div><p>${esc(p.features || '')}</p></div>`).join('')}</div></div></section>`;

  if (block.type === 'gallery') {
    const images = galleryAssetsForBlock(block, media);
    return `    <section class="gallery-sec" id="referenzen"><div class="gallery-w"><h2>${esc(block.data?.Titel || 'Einblicke & Referenzen')}</h2><div class="gal-grid">${images.length ? images.map(asset => `<img class="gal-item" src="${assetSrc(asset, mode)}" alt="${esc(asset.alt)}" width="${asset.width}" height="${asset.height}" loading="lazy" decoding="async">`).join('') : Array.from({ length: d.images || 6 }).map((_, i) => `<div class="gal-item" role="img" aria-label="Referenzbild ${i + 1}"></div>`).join('')}</div></div></section>`;
  }

  if (block.type === 'contact') {
    const endpoint = formEndpointFor(b);
    const action = endpoint || '#';
    return `    <section class="contact-sec" id="anfrage"><div class="contact-w"><div><p class="eyebrow">Kontakt</p><h2>${esc(d.title || block.data?.Titel || 'Projekt anfragen')}</h2><p class="hero-sub">${esc(d.sub || block.data?.Untertitel || 'Beschreiben Sie kurz Ihr Anliegen. Wir melden uns schnellstmöglich zurück.')}</p><div class="contact-facts"><strong>${esc(b.name)}</strong><br>${esc(b.street)} · ${esc(b.postalCode)} ${esc(b.city)}<br><a href="tel:${String(b.phone || '').replace(/\s/g, '')}">${esc(b.phone)}</a><br><a href="mailto:${esc(b.email)}">${esc(b.email)}</a></div></div><form class="contact-card" data-eky-form action="${esc(action)}" method="post"><input type="hidden" name="source" value="EKY Website"><input type="hidden" name="firma" value="${esc(b.name)}"><input type="hidden" name="branch" value="${esc(b.type || 'LocalBusiness')}"><input type="hidden" name="city" value="${esc(b.city || '')}"><input class="hp" type="text" name="website" tabindex="-1" autocomplete="off">${ensureArray(d.fields || block.data?.Felder).map((f, i) => `<label for="field-${i}">${esc(f.label || f.Label || 'Feld')}${(f.required || f.Pflicht) === 'ja' ? ' *' : ''}</label>${(f.type || f.Typ) === 'textarea' ? `<textarea id="field-${i}" name="${fieldName(f.label || f.Label || 'Nachricht')}" ${(f.required || f.Pflicht) === 'ja' ? 'required' : ''}></textarea>` : `<input id="field-${i}" name="${fieldName(f.label || f.Label || 'Feld')}" type="text" ${(f.required || f.Pflicht) === 'ja' ? 'required' : ''}>`}`).join('')}<label style="display:flex;gap:8px;align-items:flex-start;font-size:12px;font-weight:500;color:var(--m);line-height:1.5"><input type="checkbox" required style="width:auto;margin-top:3px"> Ich stimme der Verarbeitung meiner Angaben zur Kontaktaufnahme zu.</label><button class="contact-submit" type="submit">${esc(d.button || block.data?.Button || 'Anfrage senden')}</button><div class="form-status" aria-live="polite"></div></form></div></section>`;
  }

  if (block.type === 'social') return socialBlockHtml(b, block.data || {});

  if (block.type === 'footer') return `    <footer class="site-footer"><div class="footer-grid"><div><div class="footer-brand">${esc(b.name)}</div><p class="footer-tagline">${esc(b.tagline)}</p><p style="font-size:10px;color:#333;margin-top:10px">Erstellt von EKY Media · <a href="https://ekymedia.de" style="color:#555">ekymedia.de</a></p></div><div><div class="footer-head">Kontakt</div><div class="footer-list"><a href="tel:${String(b.phone || '').replace(/\s/g, '')}">${esc(b.phone)}</a><br><a href="mailto:${esc(b.email)}">${esc(b.email)}</a></div></div><div><div class="footer-head">Adresse</div><address class="footer-list" style="font-style:normal">${esc(b.street)}<br>${esc(b.postalCode)} ${esc(b.city)}</address></div><div><div class="footer-head">Rechtliches</div><div class="footer-list"><a href="impressum.html">Impressum</a><br><a href="datenschutz.html">Datenschutz</a></div></div></div><div class="footer-bottom">© ${new Date().getFullYear()} ${esc(b.legalName || b.name)} · Alle Rechte vorbehalten</div></footer>`;

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
  canvasToolbar: { position: 'absolute', top: 4, right: 4, display: 'flex', gap: 4, zIndex: 20, background: 'rgba(17,17,19,.86)', border: '1px solid #28282b', borderRadius: 6, padding: 3 },
  canvasToolBtn: { width: 24, height: 22, border: '1px solid #333', background: '#1c1c1e', color: '#f4f4f2', borderRadius: 4, fontSize: 11, cursor: 'pointer', padding: 0 },
  canvasToolBtnDanger: { width: 24, height: 22, border: '1px solid #573232', background: '#2a1414', color: '#ffb4b4', borderRadius: 4, fontSize: 14, cursor: 'pointer', padding: 0 },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'grid', placeItems: 'center', zIndex: 100 },
  modal: { background: '#161618', border: '1px solid #28282b', borderRadius: 12, padding: 28, maxWidth: 500, width: '92%', maxHeight: '90vh', overflow: 'auto' },
  label: { fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666', marginBottom: 4, display: 'block' },
  input: { width: '100%', background: '#1c1c1e', border: '1px solid #2c2c2e', borderRadius: 5, padding: '6px 10px', color: '#f4f4f2', fontFamily: 'inherit', fontSize: 11, outline: 'none' },
  infoBox: { marginTop: 14, padding: 12, background: '#1c1c1e', border: '1px solid #2c2c2e', borderRadius: 6, fontSize: 10, color: '#8a8a8f', lineHeight: 1.9, fontFamily: "'JetBrains Mono', monospace" },
};

createRoot(document.getElementById('root')).render(<EKYBuilder />);
