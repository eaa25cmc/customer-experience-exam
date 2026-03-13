# Little Looms – Projektdokumentation

> Eksamensprojekt | Customer Experience | React + Vite

---

## Indholdsfortegnelse

1. [Projektbeskrivelse](#1-projektbeskrivelse)
2. [Teknologi og opsætning](#2-teknologi-og-opsætning)
3. [Projektstruktur](#3-projektstruktur)
4. [Routing – oversigt over alle sider](#4-routing--oversigt-over-alle-sider)
5. [Pages – sidebeskrivelser](#5-pages--sidebeskrivelser)
6. [Components – komponentbeskrivelser](#6-components--komponentbeskrivelser)
7. [Utils – hjælpefunktioner](#7-utils--hjælpefunktioner)
8. [Context – global state](#8-context--global-state)
9. [Data – products.json](#9-data--productsjson)

---

## 1. Projektbeskrivelse

**Little Looms** er en børnetøjswebshop bygget som et eksamensopgave. Webshoppens sortiment består af øko-certificeret børnetøj fra 7 udvalgte brands. Brugeren kan browse produkter fordelt på køn (baby, pige, dreng) og kategorier, se produktdetaljer, tilføje til kurv og gemme favoritter.

**Brands i shoppen:**
- Dilling
- Konges Sløjd
- Lil' Atelier
- MarMar Copenhagen
- Mini Rodini
- Serendipity Organics
- Wheat

---

## 2. Teknologi og opsætning

| Teknologi | Formål |
|---|---|
| **React 18** | UI-framework med komponentbaseret arkitektur |
| **Vite** | Byggeværktøj og udviklingsserver |
| **React Router DOM** | Klient-side routing (SPA) |
| **CSS Modules** | Scoped styling til komponenter |
| **localStorage** | Persistens for kurv og sidst-set produkter |

**Start projektet:**
```bash
npm install
npm run dev
```

---

## 3. Projektstruktur

```
src/
├── App.jsx                  # Rodkomponent – routing og global layout
├── main.jsx                 # Indgangspunkt – React DOM render
├── styles.css               # Globale styles
│
├── pages/                   # Sider (én pr. URL)
├── components/              # Genbrugelige UI-komponenter
├── context/                 # Global React Context (kurv-overlay)
├── utils/                   # Hjælpefunktioner
└── image/                   # Lokale billedfiler (SVG/PNG)

public/
├── products.json            # Alle produktdata (hentes via fetch)
└── product-pics/            # Produktbilleder
```

---

## 4. Routing – oversigt over alle sider

Routing håndteres i `App.jsx` med React Router DOM. Alle routes er defineret nedenfor:

| URL | Komponent/Side | Beskrivelse |
|---|---|---|
| `/` | `HomePage` | Forsiden |
| `/baby` | `ProductGridBaby` | Alle baby-produkter |
| `/pige` | `ProductGridGirls` | Alle pige-produkter |
| `/dreng` | `ProductGridBoys` | Alle drenge-produkter |
| `/produkt/:id` | `DetailPage` | Produktdetaljeside (enkelt produkt) |
| `/kategori/:gender/:mainCategory/:subcategory?` | `CategoryPage` | Dynamisk kategoriside |
| `/brand/:brandSlug` | `BrandPage` | Alle produkter fra ét brand |
| `/favorites` | `FavoritesPage` | Brugerens favoritliste |
| `/shoppingbag` | `ShoppingbagPage` | Indkøbskurv (fuld side) |
| `/sale` | `SalePage` | Udsalgssiden |
| `/news` | `NewsPage` | Nyhedssiden |
| `/inspiration` | `InspirationPage` | Inspirationssiden |
| `/about` | `AboutPage` | Om os |
| `/contact` | `ContactPage` | Kontakt |
| `/services` | `ServicesPage` | Services |
| `/sustainability` | `SustainabilityPage` | Bæredygtighed |
| `/payment` | `PaymentPage` | Betaling |
| `*` | `NotFoundPage` | 404 – side ikke fundet |

**Eksempler på dynamiske URL'er:**
- `/kategori/baby/overtoj/flyverdragt` → viser flyverdragter til baby
- `/produkt/42` → viser produkt med id 42
- `/produkt/42-v1` → viser variant v1 af produkt 42
- `/brand/mini-rodini` → viser alle Mini Rodini-produkter

---

## 5. Pages – sidebeskrivelser

### `HomePage.jsx`
**URL:** `/`

Forsiden samler alle forsidekomponenter i en fast rækkefølge:
1. **Hero-slider** – tre billeder der skifter automatisk (HeroPictures)
2. **Brandkarrusel** – de 7 brands med links (BrandKarrusel)
3. **Kønssektion** – Baby, Pige, Dreng med billede og links (GenderSection)
4. **Badges** – 4 kvalitets- og bæredygtighedsbadges (Badges)
5. **Inspiration** – 4 inspirationsbilleder + Instagram-tag (ForsideInspiration)
6. **Infoikoner** – levering, fri fragt, retur og anmeldelser (Infoikoner)
7. **Kundeanmeldelser** – 4 anmeldelseskort (AnmeldelserForside)

---

### `DetailPage.jsx`
**URL:** `/produkt/:id`

Viser en detaljeside for ét produkt. Henter produktdata fra `/products.json` via `fetch()`.

**Funktionalitet:**
- Matcher produkt-id fra URL – understøtter både produkter og varianter (fx `42-v1`)
- Gemmer det besøgte produkt i `localStorage` (til "Sidst set"-karrusellen)
- Scroller til toppen ved sideskift
- Viser loading-besked mens data hentes

**Indeholder komponenterne:**
- `Breadcrumbs` – brødkrummenavigation
- `DetailImageBox` – billedgalleri
- `DetailInfoBox` – produktinformation inkl. akkordeon
- `DetailRelatedProducts` – relaterede produkter
- `DetailRecentProducts` – sidst set produkter

---

### `BrandPage.jsx`
**URL:** `/brand/:brandSlug`

Viser alle produkter fra ét specifikt brand.

**Funktionalitet:**
- Henter brand fra URL-parameteren (`brandSlug`) og mapper den til det korrekte brandnavn
- Filtrerer produkter fra `products.json` der matcher brandet
- Viser produkterne i et grid med `ProductCard`

**Brands og deres slugs:**

| Slug | Brand |
|---|---|
| `dilling` | Dilling |
| `konges-slojd` | Konges Sløjd |
| `lil-atelier` | Lil' Atelier |
| `mar-mar-copenhagen` | MarMar Copenhagen |
| `mini-rodini` | Mini Rodini |
| `serendipity-organics` | Serendipity Organics |
| `wheat` | Wheat |

---

### `FavoritesPage.jsx`
**URL:** `/favorites`

Viser en liste over brugerens favoritprodukter.

**Funktionalitet:**
- Viser produktkort med billede, navn og pris
- Produkter kan fjernes fra favoritlisten (med fortryd-funktion)
- Produkter kan lægges i kurven inkl. størrelsesvælger
- Viser nyhed/sale-ikoner på relevante produkter
- Deler-knap til sociale medier

> **Bemærk:** Favoritprodukterne er i øjeblikket hardkodet i `initialFavorites`. De er ikke koblet til localStorage endnu.

---

### `ShoppingbagPage.jsx`
**URL:** `/shoppingbag`

Indkøbskurven som en fuld side.

**Funktionalitet:**
- Indlæser og gemmer kurv-data i `localStorage` via `shoppingbagStorage.js`
- Viser trin-indikator: Kurv → Oplysninger → Levering → Betaling → Bekræftelse
- Kan ændre antal på produkter (+/-)
- Kan fjerne produkter fra kurven
- Beregner og viser samlet pris + antal produkter
- Lukkes ved klik på baggrund eller kryds (navigerer tilbage)

---

### `NotFoundPage.jsx`
**URL:** `*` (alle ukendte URL'er)

Viser en 404-fejlside med link tilbage til forsiden.

---

### Statiske sider (ikke fuldt implementeret)

Følgende sider er oprettet med grundstruktur (overskrift + breadcrumbs), men mangler indhold:

| Side | URL | Status |
|---|---|---|
| `AboutPage` | `/about` | Kun overskrift |
| `ContactPage` | `/contact` | Kun overskrift |
| `ServicesPage` | `/services` | Kun overskrift |
| `SalePage` | `/sale` | Overskrift + breadcrumbs |
| `NewsPage` | `/news` | Overskrift + breadcrumbs |
| `InspirationPage` | `/inspiration` | Overskrift + breadcrumbs |
| `PaymentPage` | `/payment` | Kun overskrift |
| `SustainabilityPage` | `/sustainability` | Kun overskrift |

---

## 6. Components – komponentbeskrivelser

### Navigation

#### `Navbar.jsx`
Topnavigationen der vises på alle sider.

- **Logo** med link til forsiden
- **Hovednavigation** med links: Baby, Pige, Dreng, Udsalg, Nyheder, Inspiration
- **Dropdown-menuer** til Baby, Pige og Dreng (åbnes ved klik)
- **Ikoner** til søgning, profil, favoritter og kurv
- **Roterende banner** øverst med skiftende kampagnebudskaber (hvert 3. sekund)

#### `BabyDropdown.jsx` / `PigeDropdown.jsx` / `DrengDropdown.jsx`
Tre separate dropdown-navigationsmenuer – ét pr. kønskategori.

- Vises som et overlay oven på siden
- Indeholder links til alle underkategorier (overtøj, overdele, accessories, underdele, fodtøj, undertøj)
- Lukkes ved klik på baggrunden eller på krydset
- Modtager `onClose`-prop fra Navbar

#### `Breadcrumbs.jsx`
Brødkrummenavigation der vises øverst på undersider.

- Opbygger automatisk navigation ud fra URL-parametre (`gender`, `mainCategory`, `subcategory`)
- Kan også modtage eksplicitte `items`-props fra forælderen
- Starter altid med "Forside" som første led

---

### Produktvisning

#### `ProductCard.jsx`
Genbrugelig produktkortkomponent brugt overalt i grids og karruseller.

- Viser produktbillede (første billede fra `images`-array eller første variant)
- Viser nyhed-ikon og/eller sale-ikon hvis relevant
- Favorit-hjerte der kan toggles
- Produktnavn og pris
- Linker til produktets detaljeside (håndterer både produkter og varianter)

#### `ProductGridBaby.jsx`
Produktgrid til baby-siden (`/baby`).

- Henter alle produkter fra `products.json`
- Flader varianter ud, så hver variant vises som sit eget produktkort
- Filtrerer på `gender === "Baby"`
- Indeholder kategorifilterpanel og filteroverlay

#### `ProductGridGirls.jsx`
Produktgrid til pige-siden (`/pige`).

- Samme opbygning som ProductGridBaby
- Filtrerer på `gender === "Pige"` (inkl. unisex)

#### `ProductGridBoys.jsx`
Produktgrid til drenge-siden (`/dreng`).

- Samme opbygning som ProductGridBaby
- Filtrerer på `gender === "Dreng"` (inkl. unisex)

#### `CategoryPage.jsx`
Dynamisk kategoriside der vises ved URL'er som `/kategori/baby/overtoj/flyverdragt`.

- Henter køn, overkategori og underkategori fra URL-parametre
- Filtrerer produkter derefter
- Indeholder `CategoryFilterPanel` og `FilterOverlay`

#### `CategoryFilterPanel.jsx`
Knapper til filtrering på underkategorier øverst på kategorisiderne.

- Viser en "Alle"-knap + én knap per underkategori
- Aktiv knap fremhæves visuelt

#### `FilterOverlay.jsx`
Avanceret filterside-panel der åbner som en sidebar fra venstre.

- Trigger-knap med filter-ikon
- Sortering: alfabetisk, pris lav/høj, dato
- Filtre: produkttype, farve, størrelse, brand, køn, prisinterval
- Bruger "draft filters"-mønster: ændringer gemmes ikke før "Vis resultater" trykkes
- Nulstil-knap der rydder alle filtre

---

### Produktdetaljer

#### `DetailImageBox.jsx`
Billedgalleri på produktdetaljesiden.

- Viser det aktive billede i stort format
- Dot-navigation til at skifte billede
- Thumbnail-række nederst
- Nyhed/sale-ikoner øverst til venstre
- Favorit-hjerte øverst til højre
- Håndterer produkter med direkte billeder og produkter med varianter

#### `DetailInfoBox.jsx`
Produktinformationsboks på detailsiden.

- Produktnavn
- Pris – viser både udsalgspris og original pris ved salg (85% af original)
- Farvevalg med farvecirkler – klik navigerer til den valgte variant
- Størrelsesvælger via `DetailSizeSelector`
- Lagerinfo
- "Læg i kurv"-knap
- Leveringsinformation (levering, fri fragt, returret)
- Akkordeon med detaljer via `DetailAccordion`

#### `DetailSizeSelector.jsx`
Størrelsesvælger komponent.

- Viser alle tilgængelige størrelser som klikkbare cirkler
- Udsolgte størrelser vises med overstregning og kan ikke vælges
- Valgt størrelse fremhæves med fyldt baggrund
- Håndterer både varianter og enkeltprodukter
- Fjerner dublet-størrelser og sorterer numerisk

#### `DetailAccordion.jsx`
Foldbare sektioner på produktdetaljesiden.

- **Beskrivelse** – produktets beskrivelsestekst
- **Materialer** – detaljeret forklaring af materialerne
- **Certificeringer** – information om OEKO-TEX® og GOTS
- **Levering** – leveringstid og fragtpris
- Første sektion er åben som standard
- Flere sektioner kan være åbne samtidig

#### `DetailRelatedProducts.jsx`
Karrusel med relaterede produkter.

- Viser produkter fra samme `under_kategori`
- Hvis færre end 4, suppleres med produkter fra samme brand
- Returnerer ingenting hvis listen er tom

#### `DetailRecentProducts.jsx`
Karrusel med sidst set produkter.

- Henter produktlisten fra `localStorage` (nøgle: `recentProducts`)
- Viser op til 10 senest besøgte produkter
- Returnerer ingenting hvis ingen produkter er set endnu

---

### Forsidekomponenter

#### `HeroPictures.jsx`
Hero-billedslider øverst på forsiden.

- Skifter automatisk mellem 3 billeder hvert 4. sekund
- Dot-navigation til manuel skift
- CTA-billede ("Shop nyheder") oven på slideren

#### `BrandKarrusel.jsx`
Brandkarrusel på forsiden.

- Viser de 7 brands med produktbillede og CTA-knap
- Hvert brand linker til `/brand/:slug`

#### `GenderSection.jsx`
Kvælgesektionen på forsiden med tre kønskategorier.

- Tre billeder (baby, pige, dreng) med links til de respektive produktgrids

#### `Badges.jsx`
Fire kvalitetsbadges på forsiden.

- Naturlige materialer, GOTS-certificering, Holdbarhed, Komfort

#### `ForsideInspiration.jsx`
Inspirationssektionen på forsiden.

- Fire inspirationsbilleder i et grid
- Instagram-tag med link

#### `Infoikoner.jsx`
Fire serviceikoner på forsiden.

- Levering (1-2 hverdage), Fri fragt, Retur (30 dage), Anmeldelser

#### `AnmeldelserForside.jsx`
Kundeanmeldelsessektion på forsiden.

- Viser 4 anmeldelseskort med profilbillede, 5-stjernebedømmelse og citat
- Trustpilot-logo

---

### Kurv og checkout

#### `ShoppingBagOverlay.jsx`
Kurvens slide-in overlay (åbnes fra Navbar-kurvikon).

- Viser aktuelle kurv-produkter med billede, navn, pris og størrelse
- Kan ændre antal (+/-) og fjerne produkter
- Viser trin-indikator og samlet pris
- Data synkroniseres med `localStorage`
- Linker til `/shoppingbag` for fuld kurvside

#### `HeartIcon.jsx`
Genbrugelig favorit-hjerte komponent.

- Kan toggles mellem tomt og fyldt hjerte
- Kalder `onToggle`-callback ved skift
- Bruges på produktkort og i billedgalleriet

---

### Layout

#### `Footer.jsx`
Sidefoden der vises på alle sider.

- 5 kolonner med links: Shopping guide, Om Little Looms, Min konto, Hjælp, Kontakt
- Sprogvælger (Danmark/Dansk)
- Sociale medier: Facebook, Pinterest, Instagram
- Betalingsmetoder: MobilePay, Apple Pay, Mastercard, Visa, PayPal, Klarna

---

## 7. Utils – hjælpefunktioner

### `productFilters.js`

Indeholder al logik til filtrering og sortering af produkter.

**Eksporterede funktioner og konstanter:**

| Navn | Type | Beskrivelse |
|---|---|---|
| `SORT_OPTIONS` | Konstant | Sorteringsmuligheder (alfabetisk, pris, dato) |
| `PRICE_OPTIONS` | Konstant | Prisintervaller til filteroverlay |
| `SIZE_GROUPS` | Konstant | Størrelsesgrupper (Baby / Barn) |
| `createEmptyFilters()` | Funktion | Returnerer et tomt filter-objekt |
| `buildFilterOptions(products)` | Funktion | Bygger tilgængelige filtervalg ud fra produktlisten |
| `applyProductFilters(products, filters)` | Funktion | Filtrerer og sorterer produktlisten ud fra aktive filtre |

### `shoppingbagStorage.js`

Håndterer persistens af kurvdata i `localStorage`.

| Funktion | Beskrivelse |
|---|---|
| `loadShoppingbagItems(fallback)` | Indlæser kurv-items fra localStorage |
| `saveShoppingbagItems(items)` | Gemmer kurv-items til localStorage |
| `addShoppingbagItem(item)` | Tilføjer et item til kurven (øger antal hvis produktet + størrelse allerede findes) |

---

## 8. Context – global state

### `CartOverlayContext.jsx`

Global React Context der styrer om kurv-overlaydet er synligt.

- **`CartOverlayProvider`** – wrapper hele appen og holder state
- **`useCartOverlay()`** – hook der giver adgang til `isCartOverlayOpen` og `setCartOverlayOpen`
- Bruges i `Navbar` (åbn kurv) og `App.jsx` (vis/skjul `ShoppingBagOverlay`)

---

## 9. Data – products.json

Alle produktdata ligger i `/public/products.json` og hentes via `fetch("/products.json")`.

**Et produkt har følgende felter:**

| Felt | Type | Beskrivelse |
|---|---|---|
| `id` | number | Unikt produkt-id |
| `title` | string | Produktnavn |
| `price` | number | Pris i DKK |
| `gender` | string | `"Baby"`, `"Pige"`, `"Dreng"` eller `"Unisex"` |
| `over_kategori` | string | Overkategori fx `"Overtøj"`, `"Overdele"` |
| `under_kategori` | string | Underkategori fx `"Flyverdragt"`, `"Strik"` |
| `brand` | string | Brandnavn |
| `description` | string | Produktbeskrivelse |
| `materiale` | string | Materialets navn (bruges til akkordeon) |
| `color` | string | Farvenavn |
| `size` | object | Størrelser med lager-boolean `{ "86": true, "92": false }` |
| `images` | array | Liste af billedstier |
| `variants` | array | Liste af farve-varianter (hver med `variantId`, `color`, `images`, `size`) |
| `sale` | boolean | Om produktet er på udsalg |
| `news` | boolean | Om produktet er en nyhed |
| `stock` | number | Lagerantal |
| `rating` | number | Bedømmelse |

**Varianter:**
Produkter med flere farver har et `variants`-array. Variant-URL'er bygges som `{produktId}-{variantId}`, fx `42-v1`.
