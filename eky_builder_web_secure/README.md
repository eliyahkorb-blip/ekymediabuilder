# EKY Builder Web Secure v7.2

Diese Version ist für **GitHub + Vercel Hosting** gedacht. Sie läuft im Browser, also auch auf dem iPad, und ist per serverseitigem Passwortschutz gesichert.

## Was ist drin?

- EKY Builder v7.1 als Web-App unter `/builder/`
- Passwortschutz über `BASIC_AUTH_USER` und `BASIC_AUTH_PASSWORD`
- Läuft auf iPad, Mac, Windows und Handy im Browser
- Projekt speichern/öffnen funktioniert im Browser über `.eky.json`
- Website-Export funktioniert im Browser als ZIP-Download
- Sticky WhatsApp, Accessibility Widget, Social Icons, Keyword-Engine, API-Key-Reiter, Bilder/Alt-Texte und Assets bleiben enthalten

## Wichtig zur Sicherheit

GitHub Pages ist für echten Passwortschutz nicht geeignet, weil dort nur statische Dateien liegen. Diese Version ist deshalb für **Vercel** gebaut: Code auf GitHub, Hosting bei Vercel, Passwort über Environment Variables.

## Schnellstart auf dem PC/Mac

```bash
npm install
cp .env.example .env.local
# .env.local öffnen und Passwort setzen
npm run dev
```

Dann im Browser öffnen:

```text
http://localhost:3000/builder/
```

## Upload zu GitHub

1. Neuen GitHub-Ordner/Repo erstellen, am besten **private**.
2. Alle Dateien aus diesem Ordner hochladen.
3. Nicht `node_modules` hochladen.
4. Repo mit Vercel verbinden.

## Vercel Einstellungen

In Vercel im Projekt unter **Settings → Environment Variables** eintragen:

```text
BASIC_AUTH_USER=eky
BASIC_AUTH_PASSWORD=dein-starkes-passwort
```

Danach neu deployen.

## Nutzung auf dem iPad

Nach dem Deploy bekommst du eine Vercel-URL. Diese im Safari öffnen. Safari fragt dann Benutzername und Passwort ab. Danach läuft der Builder wie eine normale Web-App.

## Build Command

Vercel erkennt Next.js normalerweise automatisch. Falls du es manuell setzen musst:

```text
npm run build
```

Output bleibt Next.js Standard. Kein separater Output-Ordner nötig.

## API Keys

API Keys im Builder dienen als Konfiguration/Vorlage. Wirklich sichere API-Calls müssen über ein Backend/Proxy laufen. Der Website-Export enthält dafür weiterhin Beispiele im Ordner `backend`.
