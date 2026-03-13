# Little Looms – Eksamensprojekt

**Fag:** Customer Experience
**Uddannelse:** Multimediedesigner
**Projekt:** Børnetøjswebshop

---

## Om projektet

Little Looms er en børnetøjswebshop udviklet som eksamensprojekt. Konceptet er en webshop der sælger øko-certificeret og bæredygtigt børnetøj fra 7 udvalgte scandinaviske brands. Projektet er bygget som en **Single Page Application (SPA)** med React og fokuserer på en god brugeroplevelse med intuitiv navigation, produktfiltrering og en fungerende indkøbskurv.

Shoppen er inddelt i tre kønskategorier (Baby, Pige og Dreng) med dybdegående underkategorier, og hvert produkt har sin egen detaljeside med billeder, farvevarianter, størrelsesvalg og relaterede produkter.

---

## Sådan starter du projektet

Åbn terminalen i projektmappen og kør:

```bash
npm install
npm run dev
```

Projektet åbner herefter i browseren på `http://localhost:5173`.

---

## Anvendte teknologier

| Teknologi              | Formål                                                  |
| ---------------------- | ------------------------------------------------------- |
| **React 19**           | Komponentbaseret UI-framework                           |
| **React Router DOM 7** | Klient-side routing – én HTML-fil, mange sider          |
| **Vite**               | Hurtig udviklingsserver og byggeværktøj                 |
| **CSS Modules**        | Isoleret styling pr. komponent (undgår navnekonflikter) |
| **localStorage**       | Gemmer kurvindhold og sidst-sete produkter i browseren  |

---

## Sider i projektet

| Side               | URL                                        | Beskrivelse                                                       |
| ------------------ | ------------------------------------------ | ----------------------------------------------------------------- |
| Forside            | `/`                                        | Hero-slider, brands, kønsopdeling, badges og anmeldelser          |
| Baby               | `/baby`                                    | Produktgrid med alle baby-produkter og filteroverlay              |
| Pige               | `/pige`                                    | Produktgrid med alle pige-produkter og filteroverlay              |
| Dreng              | `/dreng`                                   | Produktgrid med alle drenge-produkter og filteroverlay            |
| Produktdetaljeside | `/produkt/:id`                             | Billeder, farver, størrelser, beskrivelse og relaterede produkter |
| Kategoriside       | `/kategori/:køn/:kategori/:underkategori?` | Dynamisk filtreret produktliste                                   |
| Brandside          | `/brand/:brand`                            | Alle produkter fra ét brand                                       |
| Favoritliste       | `/favorites`                               | Gemte favoritprodukter                                            |
| Indkøbskurv        | `/shoppingbag`                             | Kurv med produkter, antal og samlet pris                          |
| Udsalg             | `/sale`                                    | Udsalgsprodukter                                                  |
| Nyheder            | `/news`                                    | Nye produkter                                                     |
| Inspiration        | `/inspiration`                             | Inspirationside                                                   |
| Bæredygtighed      | `/sustainability`                          | Information om bæredygtighed                                      |
| Om os              | `/about`                                   | Om Little Looms                                                   |
| Kontakt            | `/contact`                                 | Kontaktoplysninger                                                |
| 404                | `*`                                        | Vises ved forkerte URL'er                                         |

---

## Centrale funktioner

**Navigation**

- Topnavigation med dropdown-menuer til Baby, Pige og Dreng
- Brødkrummenavigation på alle undersider
- Roterende banner med kampagnebudskaber

**Produkter**

- Produkter hentes fra `/public/products.json` via `fetch()`
- Produkter har varianter (forskellige farver) med egne billeder og størrelser
- Variant-URL bygges som `produktId-variantId`, fx `/produkt/42-v1`

**Filtrering**

- Filteroverlay med sortering, farve, størrelse, brand og prisinterval
- Kategoriknapper til hurtig filtrering på underkategori
- Filtre anvender "draft"-mønster – bekræftes ved tryk på "Vis resultater"

**Kurv**

- Kurv-overlay åbnes fra navigationsikonen uden at forlade siden
- Kurvdata gemmes i `localStorage` så den huskes ved genbesøg
- Fuld kurvside med trin-indikator (Kurv → Oplysninger → Levering → Betaling → Bekræftelse)

**Sidst set**

- Besøgte produkter gemmes automatisk i `localStorage`
- Vises som en karrusel nederst på produktdetailsiden

---

## Projektstruktur

```
src/
├── App.jsx               # Routing og globalt layout
├── main.jsx              # Indgangspunkt
├── pages/                # Én fil pr. side
├── components/           # Genbrugelige komponenter
├── context/              # Global state til kurv-overlay
├── utils/                # Filtreringslogik og localStorage-håndtering
└── image/                # SVG- og PNG-filer

public/
├── products.json         # Produktdata (hentes via fetch)
└── product-pics/         # Produktbilleder
```

---

## Brands i shoppen

- Dilling
- Konges Sløjd
- Lil' Atelier
- MarMar Copenhagen
- Mini Rodini
- Serendipity Organics
- Wheat

---

## Fuld teknisk dokumentation

Se [DOKUMENTATION.md](./DOKUMENTATION.md) for en detaljeret gennemgang af alle sider, komponenter, hjælpefunktioner og datastruktur.
