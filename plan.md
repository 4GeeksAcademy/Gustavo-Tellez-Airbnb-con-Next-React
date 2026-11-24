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
│   └── AccommodationGrid.tsx
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
    → F3 (Navbar + Layout) 
      → F4 (Home) 
        → F5 (Catalog) 
          → F6 (Room Detail) 
            → F7 (Navigation) 
              → F8 (Responsive) 
                → F9 (Validación)
```

Cada fase depende de la anterior. No saltar fases.

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

## 📊 RESUMEN

| Fase | Archivos nuevos | Archivos modificados |
|---|---|---|
| F1 - Data Layer | 2 | 0 |
| F2 - Shared Components | 6 | 0 |
| F3 - Layout | 4 | 1 (layout.tsx) |
| F4 - Home | 3 | 1 (page.tsx) |
| F5 - Catalog | 5 | 1 (catalog/page.tsx) |
| F6 - Room Detail | 13 | 1 (rooms/[id]/page.tsx) |
| F7 - Navigation | 0 | 0 (verificar) |
| F8 - Responsive | 0 | 0 (verificar) |
| F9 - Validation | 0 | 0 (verificar) |
| **Total** | **33** | **3** |