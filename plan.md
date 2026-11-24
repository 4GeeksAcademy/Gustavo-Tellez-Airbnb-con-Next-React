# PLAN DE IMPLEMENTACIÓN — Airbnb Clone

> **Proyecto:** Gustavo Tellez — Airbnb con Next/React
> **Basado en:** `specs.md`, `context.md`
> **Decisiones tomadas:** 2026-11-23

---

## 📁 ESTRUCTURA DE ARCHIVOS (RAÍZ, SIN `src/`)

```
app/
├── layout.tsx          # Root layout (Navbar persistente)
├── page.tsx            # Home (/)
├── globals.css         # Estilos globales Tailwind
├── catalog/
│   └── page.tsx        # Catalog (/catalog)
└── rooms/
    └── [id]/
        └── page.tsx    # Room Detail (/rooms/[id])

components/
├── layout/
│   ├── Navbar.tsx
│   ├── Logo.tsx
│   ├── SearchBar.tsx
│   └── UserMenu.tsx
├── home/
│   ├── CategoriesNavigation.tsx
│   ├── CategoryItem.tsx
│   ├── AccommodationGrid.tsx
│   ├── SearchFilters.tsx      # [NUEVO] Barra de filtros tipo Airbnb
│   ├── DestinationPanel.tsx   # [NUEVO] Panel de ciudades fijas
│   ├── DatePanel.tsx          # [NUEVO] Calendario casero
│   └── GuestsPanel.tsx        # [NUEVO] Controles de viajeros
├── catalog/
│   ├── ResultsHeader.tsx
│   ├── ResultsCounter.tsx
│   ├── SortingControl.tsx
│   ├── AccommodationList.tsx
│   └── MapPlaceholder.tsx
├── room/
│   ├── BackNavigation.tsx
│   ├── PhotoGallery.tsx
│   ├── GalleryNavigation.tsx
│   ├── RoomHeader.tsx
│   ├── RatingAndReviews.tsx
│   ├── LocationInfo.tsx
│   ├── HostInfo.tsx
│   ├── HostAvatar.tsx
│   ├── AmenitiesGrid.tsx
│   ├── AmenityItem.tsx
│   ├── BookingCard.tsx
│   ├── GuestCounter.tsx
│   └── BookingCTA.tsx
└── shared/
    ├── AccommodationCard.tsx
    ├── AccommodationImage.tsx
    ├── AccommodationInfo.tsx
    ├── PricePerNight.tsx
    ├── Rating.tsx
    └── LoadingState.tsx

data/
└── accommodations.ts   # Datos simulados

types/
└── index.ts            # Interfaces TypeScript
```

---

## 📋 DECISIONES TOMADAS

| # | Asunto | Decisión |
|---|---|---|
| 1 | 📁 Estructura | `app/`, `components/`, `types/`, `data/` en **raíz** (sin `src/`) |
| 2 | 🔤 Categorías | Playa 🏖️, Mansiones 🏰, Tendencias 🔥, Casas rurales 🏡, Piscina 🏊, Frente al mar 🌊, Vistas espectaculares 👀, Habitaciones 🛏️ |
| 3 | 📸 Imágenes | `https://picsum.photos/...` (placeholders externos) |
| 4 | 💰 Moneda | **EUR**, formato `"120€ / noche"` |
| 5 | 🔄 Home → Catalog | **Independientes.** Home filtra en su propio grid. Catalog es URL directa |
| 6 | 🧑‍💻 UserMenu | Solo **iconos decorativos** (sin funcionalidad) |

### Decisiones adicionales

| Asunto | Decisión |
|---|---|
| Máximo huéspedes | 10 |
| Acento visual | `rose-500` (Tailwind) |
| BookingCard en desktop | Flujo normal (no sticky) |
| Footer | ❌ No implementar |
| Heart/favorito | ❌ No implementar |
| SearchModeSelector | ❌ No implementar |
| Secciones adicionales Home | ❌ No implementar |
| UserMenu interactivo | ❌ No implementar |

---

## 🗺️ ORDEN DE EJECUCIÓN

```
F1 (Tipos y datos) 
  → F2 (Componentes compartidos) 
    → F2.5 (Search Filters — barra tipo Airbnb) 
      → F3 (Navbar + Layout) 
        → F4 (Home) 
          → F5 (Catalog) 
            → F6 (Room Detail) 
              → F7 (Navigation) 
                → F8 (Responsive) 
                  → F9 (Validación)
```

Cada fase depende de la anterior. No saltar fases.

> **Nota:** F2.5 se ejecuta después de F2 porque los filtros reutilizan componentes compartidos (como `LoadingState`), pero antes de F3 porque SearchFilters se integra directamente en Home.

---

## 🔷 FASE 1: Data Layer — Tipos y datos simulados

**Archivos a crear:**
- `types/index.ts`
- `data/accommodations.ts`

### types/index.ts

Interfaces a definir:

| Interfaz | Campos clave |
|---|---|
| `Category` | `id: string`, `label: string`, `icon: string` (emoji) |
| `Host` | `name: string`, `avatar: string`, `yearsHosting: number` |
| `Amenity` | `id: string`, `label: string`, `icon: string` (emoji) |
| `Accommodation` | `id`, `title`, `image`, `images[]`, `pricePerNight`, `rating`, `reviewCount`, `categoryId`, `location`, `host`, `amenities[]`, `description?` |

### data/accommodations.ts

- 8 categorías con emoji
- 8-12 alojamientos mock con imágenes de `https://picsum.photos/seed/{id}/400/300`
- 3-5 imágenes por alojamiento para la galería
- 4-6 amenities por alojamiento
- Precios entre 50-300€

---

## 🔷 FASE 2: Shared Components

**Archivos a crear (6):** en `components/shared/`

| Componente | Props | Descripción |
|---|---|---|
| `PricePerNight.tsx` | `price: number` | Muestra "120€ / noche" |
| `Rating.tsx` | `rating: number`, `reviewCount?: number` | ⭐ + valor numérico |
| `AccommodationImage.tsx` | `src: string`, `alt: string` | Imagen con esquinas redondeadas |
| `AccommodationInfo.tsx` | `title`, `price`, `rating` | Bloque de texto (usa PricePerNight, Rating) |
| `AccommodationCard.tsx` | `accommodation: Accommodation` | Imagen + Info. Link a `/rooms/[id]` |
| `LoadingState.tsx` | `count?: number` | Skeletons animados |

---

## 🔷 FASE 3: Layout Components (Navbar)

**Archivos a crear (4):** en `components/layout/`
**Archivo a modificar:** `app/layout.tsx`

| Componente | Descripción |
|---|---|
| `Logo.tsx` | Texto "Airbnb" o SVG. Link a `/` |
| `SearchBar.tsx` | Input controlado: `value: string`, `onChange: (v) => void` |
| `UserMenu.tsx` | Iconos decorativos 🌐 👤 ☰ |
| `Navbar.tsx` | Flex: Logo \| SearchBar \| UserMenu |

**En layout.tsx:**
- Importar Navbar
- Envolver `{children}` con Navbar arriba
- Pasar searchQuery y onSearchChange desde las páginas (o manejarlo internamente)

---

## 🔷 FASE 4: Home Page

**Archivos a crear (3):** en `components/home/`
**Archivo a modificar:** `app/page.tsx`

| Componente | Props | Descripción |
|---|---|---|
| `CategoryItem.tsx` | `label`, `icon`, `isActive`, `onClick` | Categoría individual con emoji |
| `CategoriesNavigation.tsx` | `categories[]`, `selected`, `onSelect` | Fila horizontal con scroll |
| `AccommodationGrid.tsx` | `accommodations[]` | Grid responsive |

**En app/page.tsx:**
- Estados: `isLoading`, `searchQuery`, `selectedCategory`
- `useEffect` con setTimeout(~1.5s) para simular carga
- Filtrado combinado (search + category)
- Mensaje si no hay resultados
- LoadingState mientras carga

---

## 🔷 FASE 5: Catalog Page

**Archivos a crear (5):** en `components/catalog/`
**Archivo a crear:** `app/catalog/page.tsx`

| Componente | Props | Descripción |
|---|---|---|
| `ResultsHeader.tsx` | — | Contenedor del encabezado |
| `ResultsCounter.tsx` | `count: number` | "12 alojamientos encontrados" |
| `SortingControl.tsx` | `sortOrder`, `onChange` | Toggle asc/desc |
| `AccommodationList.tsx` | `accommodations[]` | Lista vertical |
| `MapPlaceholder.tsx` | — | Div gris con 🗺️ |

**En app/catalog/page.tsx:**
- Cargar todos los alojamientos (sin filtro de Home)
- Estado `sortOrder` para ordenar por precio
- Layout responsive: móvil vertical → desktop split

---

## 🔷 FASE 6: Room Detail Page

**Archivos a crear (13):** en `components/room/`
**Archivo a crear:** `app/rooms/[id]/page.tsx`

| Componente | Props clave |
|---|---|
| `BackNavigation.tsx` | `onClick` o useRouter().back() |
| `PhotoGallery.tsx` | `images: string[]` (estado currentIndex interno) |
| `GalleryNavigation.tsx` | `onPrev`, `onNext`, `hasPrev`, `hasNext` |
| `RoomHeader.tsx` | `title: string` |
| `RatingAndReviews.tsx` | `rating: number`, `reviewCount: number` |
| `LocationInfo.tsx` | `location: string` |
| `HostInfo.tsx` | `host: Host` |
| `HostAvatar.tsx` | `avatar: string`, `name: string` |
| `AmenitiesGrid.tsx` | `amenities: Amenity[]` |
| `AmenityItem.tsx` | `amenity: Amenity` |
| `GuestCounter.tsx` | `value`, `min(1)`, `max(10)`, `onChange` |
| `BookingCTA.tsx` | `onClick` → alert("Reserva simulada") |
| `BookingCard.tsx` | `price`, `onBook`. Contiene PricePerNight, GuestCounter, BookingCTA |

**En app/rooms/[id]/page.tsx:**
- Obtener `id` con `useParams()`
- Estado `isLoading` con setTimeout(~1s)
- Buscar alojamiento en datos mock por `id`
- Si no existe → "Alojamiento no encontrado"
- Si existe → renderizar componentes

---

## 🔷 FASE 7: Navigation

**Puntos a verificar:**
- Logo en Navbar → Link a `/`
- AccommodationCard → Link a `/rooms/${id}`
- BackNavigation → botón de retroceso
- Catalog es URL independiente `/catalog`
- Todas las navegaciones con `<Link>` de Next.js

---

## 🔷 FASE 8: Responsive Design

| Elemento | Móvil (<768px) | Desktop (≥768px) |
|---|---|---|
| Navbar | Compacta | Logo \| Search \| Menu |
| Home Grid | 1 columna | 2-3-4 columnas |
| Catalog | Lista + Mapa abajo | Split lado a lado |
| Room Detail | Todo apilado | BookingCard a la derecha |
| Categories | Scroll horizontal | Más espacio visible |

---

## 🔷 FASE 9: Polish & Validation

- `next build` exitoso
- Sin errores TypeScript
- Estados de carga funcionales
- Navegación entre 3 páginas
- Filtros: búsqueda + categorías
- Ordenación en Catalog
- Galería + guest counter en Room Detail

---

## 🔷 FASE 2.5: Search Filters — Barra de búsqueda tipo Airbnb

**Nuevo feature aprobado:** 2026-11-24
**Basado en:** `airbnb-filtro-1.png` a `airbnb-filtro-4.png`

### Decisiones tomadas

| # | Asunto | Decisión |
|---|---|---|
| 1 | 🏙️ Destino | Ciudades **fijas** (lista predefinida) |
| 2 | 📅 Fechas | Calendario casero en grilla (sin librería externa). Inputs `date` nativos como fallback en móvil |
| 3 | 👥 Viajeros | Adultos min 1 / max 10, Niños min 0 / max 10, Bebés min 0 / max 5, Mascotas min 0 / max 5 |
| 4 | 🔍 Botón Buscar | Redirige a `/catalog?q={destino}` con parámetros de URL adicionales |

### Archivos a crear (4): en `components/home/`

| Componente | Props | Descripción |
|---|---|---|
| `SearchFilters.tsx` | — | Barra horizontal con 3 segmentos clickeables y botón Buscar. Estado local: `activePanel`, `destination`, `checkIn`, `checkOut`, `guests` |
| `DestinationPanel.tsx` | `value`, `onSelect` | Panel desplegable con lista de ciudades fijas |
| `DatePanel.tsx` | `checkIn`, `checkOut`, `onChange` | Calendario en grilla de dos meses. Clic en día fija entrada, segundo clic fija salida, resalta rango |
| `GuestsPanel.tsx` | `value: GuestCount`, `onChange` | Contadores independientes: adultos, niños, bebés, mascotas con controles +/- |

### Ciudades fijas para DestinationPanel

"Cualquier destino", "Madrid", "Barcelona", "Sevilla", "Valencia", "Granada", "Málaga", "Bilbao", "París", "Roma", "Lisboa"

### Lógica de SearchFilters

- `activePanel: "destination" | "dates" | "guests" | null`
- Al hacer clic en un segmento se abre su panel y se cierran los otros
- Al hacer clic fuera se cierra todo
- Al hacer clic en "Buscar" → redirige a `/catalog?q={destino}&checkIn={...}&checkOut={...}&adults={...}&children={...}`

### Archivo a modificar

- `app/page.tsx` — integrar `SearchFilters` entre Navbar y `CategoriesNavigation`; combinar filtro de destino con filtro de categoría y búsqueda por texto existentes