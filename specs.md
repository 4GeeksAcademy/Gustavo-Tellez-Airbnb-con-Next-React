# SPECIFICATIONS — Airbnb Clone

> **Proyecto:** Gustavo Tellez — Airbnb con Next/React
> **Fecha:** 2026-11-24 (última actualización)
> **Propósito:** Documento central de especificaciones para el desarrollo del clon visual de Airbnb.
> **Estado:** Aprobado para implementación.

---

## 1. Project Overview

**Nombre del proyecto:** Airbnb Clone (Gustavo Tellez — Airbnb con Next/React)

**Objetivo:** Construir un clon visual de la interfaz de navegación y reserva de alojamientos de Airbnb.com utilizando Next.js 16, TypeScript y Tailwind CSS.

**Descripción:** Aplicación web de tres vistas interconectadas (Home, Catalog, Room Detail) que permite a los usuarios descubrir, explorar, comparar y evaluar alojamientos temporales. Todos los componentes se construyen desde cero con componentes funcionales de React y utilidades de Tailwind, sin librerías de UI preconstruidas.

**Alcance general:** Implementación frontend de tres páginas con datos simulados, navegación interna, filtrado, búsqueda en tiempo real, ordenación, galería de imágenes y gestión de huéspedes.

**Resultado esperado:** Una aplicación funcional, responsive (mobile-first), que replica visual y funcionalmente el flujo de exploración y reserva de Airbnb en sus tres vistas principales.

---

## 2. Project Scope

### Funcionalidades incluidas (Required)

- Barra de navegación superior (Navbar) con logo, SearchBar y UserMenu, persistente en las tres páginas.
- Filtro de búsqueda en tiempo real desde la SearchBar.
- Navegación de categorías horizontal (CategoriesNavigation) con selección visual activa.
- Cuadrícula responsive de tarjetas de alojamiento (AccommodationGrid) en Home.
- Catálogo de resultados con número de resultados (ResultsCounter) y ordenación por precio (SortingControl).
- Vista de detalle de habitación (Room Detail) con galería de fotos, host info, amenities y booking card.
- Gestión de huéspedes (GuestCounter) con controles de incremento/decremento.
- Estados de carga simulados (LoadingState) en Home y Room Detail.
- Navegación entre páginas usando `Link` de Next.js sin recarga completa.
- Barra de búsqueda tipo Airbnb (SearchFilters) con 3 segmentos: Destino (ciudades fijas), Fechas (calendario casero), Viajeros (contadores adultos/niños/bebés/mascotas).
- Botón "Buscar" en SearchFilters que redirige a `/catalog?q={destino}`.
- Diseño mobile-first (375px → 768px+).

### Páginas que deben desarrollarse

| Página | Ruta | Estado |
|---|---|---|
| Home | `/` | Required |
| Catalog | `/catalog` | Required |
| Room Detail | `/rooms/[id]` | Required |

### Elementos fuera del alcance (Out of Scope)

- Backend real, base de datos o API externa.
- Autenticación de usuarios.
- Sistema de reservas real.
- Integración de mapas funcional (placeholder estático).
- Pasarela de pago.
- Modo "Experiencias" u otros modos de exploración funcionales (solo referencia visual).
- Guardado de favoritos (funcionalidad inferida visualmente no requerida).

### Funcionalidades opcionales (Optional)

- Footer compartido entre páginas (no especificado como requisito obligatorio).
- `SearchModeSelector` / `DesktopNavigation` con modos Todo/Alojamientos/Experiencias.
- Carruseles horizontales en secciones de Home.
- Secciones adicionales de contenido (experiencias, hoteles, servicios cercanos, travel inspiration).

> **Nota:** Las funcionalidades opcionales se derivan del análisis visual de las referencias (`airbnb-home.jpg`, `airbnb-desktop.jpg`). No son requisitos funcionales del challenge original. Deben implementarse solo si se decide extender el alcance.

---

## 3. Technology Stack

| Tecnología | Versión | Uso |
|---|---|---|
| Next.js | 16.4.6 | Framework principal con App Router |
| React | 19.3.0 | Biblioteca de componentes |
| TypeScript | ~5 | Tipado estático |
| Tailwind CSS | 4.3.3 | Estilizado con clases de utilidad |
| Turbopack | 4.3.3 | Bundler (configurado en next.config.ts) |

### Reglas de uso

- Todos los componentes deben ser funcionales, definidos con `const`.
- Estilizado exclusivamente con clases de utilidad de Tailwind CSS.
- **No** se permiten estilos inline (`style={{}}`).
- **No** se permiten librerías de componentes UI: shadcn/ui, Material UI, Ant Design, Chakra UI, ni similares.
- Navegación interna exclusivamente con `<Link>` de Next.js (no `<a href>`).
- App Router de Next.js para enrutamiento.

### Hooks de React permitidos

- `useState` para estado local.
- `useEffect` para efectos secundarios (simulación de carga).
- `useRouter` / `useParams` para navegación y parámetros de ruta.
- `useCallback`, `useMemo` si son necesarios para optimización.

---

## 4. Project Architecture

### Organización de carpetas

```
app/
├── layout.tsx              # Root layout (Navbar persistente + SearchProvider)
├── page.tsx                # Home (/)
├── globals.css             # Estilos globales Tailwind
├── catalog/
│   └── page.tsx            # Catalog (/catalog)
└── rooms/
    └── [id]/
        └── page.tsx        # Room Detail (/rooms/[id])

components/
├── layout/                 # Componentes de layout compartidos
│   ├── Navbar.tsx
│   ├── Logo.tsx
│   ├── SearchBar.tsx
│   └── UserMenu.tsx
├── home/                   # Componentes específicos de Home
│   ├── CategoriesNavigation.tsx
│   ├── CategoryItem.tsx
│   ├── AccommodationGrid.tsx
│   ├── SearchFilters.tsx       # Barra de filtros tipo Airbnb (Destino, Fechas, Viajeros)
│   ├── DestinationPanel.tsx    # Panel de ciudades fijas
│   ├── DatePanel.tsx           # Calendario casero en grilla
│   └── GuestsPanel.tsx         # Controles de viajeros (adultos, niños, bebés, mascotas)
├── catalog/                # Componentes específicos de Catalog
│   ├── ResultsHeader.tsx
│   ├── ResultsCounter.tsx
│   ├── SortingControl.tsx
│   ├── AccommodationList.tsx
│   └── MapPlaceholder.tsx
├── room/                   # Componentes específicos de Room Detail
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
└── shared/                 # Componentes compartidos entre páginas
    ├── AccommodationCard.tsx
    ├── AccommodationImage.tsx
    ├── AccommodationInfo.tsx
    ├── PricePerNight.tsx
    ├── Rating.tsx
    └── LoadingState.tsx

data/                       # Datos simulados
├── accommodations.ts       # 10 alojamientos mock con imágenes picsum.photos
└── categories.ts           # 8 categorías con emoji

types/                      # Interfaces y tipos TypeScript
└── index.ts                # Category, Host, Amenity, Accommodation
```

### Principios de organización

- Separación entre páginas (carpeta `app/`) y componentes reutilizables (`components/`).
- Cada componente en su propio archivo.
- Cada componente con una única responsabilidad.
- Límite orientativo de ~80 líneas de JSX y lógica por componente.
- Los componentes compartidos van en `components/shared/`.
- Los datos simulados y tipos se separan de la lógica de presentación.

---

## 5. Routes and Pages

### 5.1 Home (`/`)

**Objetivo:** Punto de entrada que presenta una visión general navegable de los alojamientos disponibles, fomentando la exploración y el descubrimiento.

**Estructura:**

1. **Navbar** (superior): Logo (enlace a `/`), SearchBar, UserMenu (iconos: 🌐 👤 ☰).
2. **SearchFilters**: Barra horizontal segmentada con 3 paneles desplegables (Destino, Fechas, Viajeros) y botón "Buscar". Redirige a `/catalog?q={destino}`.
3. **CategoriesNavigation**: Fila horizontal desplazable de categorías (Playa, Mansiones, Tendencias, etc.). Cada una con icono y etiqueta. Scroll horizontal en móvil.
4. **MainContent — AccommodationGrid**: Cuadrícula responsive de tarjetas de alojamiento.
   - Móvil: 1 columna.
   - Escritorio (≥768px): Múltiples columnas.
4. **LoadingState**: Se muestra mientras simula carga de datos.

**Componentes principales:** Navbar, Logo, SearchBar, UserMenu, CategoriesNavigation, CategoryItem, AccommodationGrid, AccommodationCard, LoadingState.

**Funcionalidades:**

- Búsqueda en tiempo real desde SearchBar filtra los alojamientos mostrados.
- Selección de categoría filtra los alojamientos por tipo.
- Click en AccommodationCard navega a `/rooms/[id]`.
- Simulación de carga al iniciar.

**Estados:**

- **Cargando:** Muestra LoadingState (skeleton/spinner).
- **Categoría activa:** Categoría seleccionada resaltada visualmente.
- **Con datos:** Grid de tarjetas.
- **Sin resultados tras filtro:** Mensaje o grid vacío.

**Layout:** Apilado vertical. Navbar fija o estática en la parte superior.

**Responsive:** Mobile-first. Grid se adapta según viewport.

### 5.2 Catalog (`/catalog`)

**Objetivo:** Presentar resultados de búsqueda o filtro de categoría en un diseño estructurado y comparativo.

**Estructura:**

1. **Navbar** (compartida).
2. **ResultsHeader** con **ResultsCounter**: "X alojamientos encontrados".
3. **SortingControl**: Ordenación por precio (ascendente/descendente).
4. **Área principal:**
   - Izquierda: **AccommodationList** con tarjetas en disposición vertical.
   - Derecha: **MapPlaceholder** (solo desktop; en móvil debajo de la lista).

**Componentes:** Navbar (compartido), ResultsHeader, ResultsCounter, SortingControl, AccommodationList, AccommodationCard (compartido), MapPlaceholder.

**Funcionalidades:**

- Muestra resultados según búsqueda por texto (desde SearchBar) o query param `?q=` en la URL.
- Búsqueda por label de categoría: buscar "playa" también encuentra alojamientos de categoría "Playa 🏖️".
- Ordenación por precio ascendente/descendente.
- Click en tarjeta navega a `/rooms/[id]`.
- MapPlaceholder muestra un visual estático.

**Estados:**

- **Con resultados:** Lista de tarjetas.
- **Sin resultados:** Mensaje informativo.
- **Ordenación activa:** Lista reordenada.

**Responsive:**

- Móvil: Lista vertical → luego MapPlaceholder.
- Desktop (≥768px): Lista a la izquierda, MapPlaceholder a la derecha (split layout).

### 5.3 Room Detail (`/rooms/[id]`)

**Objetivo:** Proporcionar información completa de un alojamiento específico para evaluar la propiedad.

**Estructura:**

1. **Navbar** (compartida).
2. **BackNavigation**: Botón de retroceso o breadcrumb.
3. **PhotoGallery** con **GalleryNavigation**: Galería con botones anterior/siguiente.
4. **RoomHeader**: Título del alojamiento.
5. **RatingAndReviews**: Valoración y número de reseñas.
6. **LocationInfo**: Ciudad/región/dirección.
7. **HostInfo**: Avatar, nombre, antigüedad como anfitrión.
8. **AmenitiesGrid** con **AmenityItem**: Cuadrícula de servicios.
9. **BookingCard**:
   - **PricePerNight**: Precio por noche.
   - **GuestCounter**: Controles +/- para número de huéspedes (mínimo 1, máximo definido).
   - **BookingCTA**: Botón "Reservar".

**Componentes:** Navbar (compartido), BackNavigation, PhotoGallery, GalleryNavigation, RoomHeader, RatingAndReviews, LocationInfo, HostInfo, HostAvatar, AmenitiesGrid, AmenityItem, BookingCard, PricePerNight (compartido), GuestCounter, BookingCTA, LoadingState (compartido).

**Funcionalidades:**

- Carga simulada de datos usando el `id` de la URL.
- Navegación entre fotos de la galería (anterior/siguiente).
- GuestCounter: incrementar/decrementar (mín. 1, sin definir máximo).
- BookingCTA: Click muestra mensaje/acción simulada.
- BackNavigation: Vuelve a página anterior.

**Estados:**

- **Cargando:** LoadingState mientras se obtienen datos.
- **Cargado:** Toda la info visible.
- **Galería:** Imagen actual visible, controles habilitados/deshabilitados en extremos.
- **Huéspedes:** Valor mínimo 1, sin máximo especificado.

**Responsive:**

- Móvil: Contenido apilado en una columna. BookingCard al final.
- Desktop: BookingCard puede posicionarse como sidebar sticky.

---

## 6. Functional Specifications

### 6.1 Búsqueda (SearchBar)

| Atributo | Descripción |
|---|---|
| **Páginas** | Home, Catalog, Room Detail (en Navbar) |
| **Descripción** | Campo de texto que permite filtrar alojamientos por palabra clave en tiempo real |
| **Comportamiento** | El usuario escribe; los alojamientos se filtran mientras escribe (sin botón de envío) |
| **Estado** | `searchQuery: string` — valor del campo de texto |
| **Resultado** | Home y Catalog muestran solo alojamientos cuyo título coincide (parcialmente, case-insensitive) con el texto ingresado |

### 6.2 Filtrado por categorías (CategoriesNavigation + CategoryItem)

| Atributo | Descripción |
|---|---|
| **Páginas** | Home |
| **Descripción** | Fila horizontal de categorías seleccionables |
| **Comportamiento** | Click en CategoryItem: selecciona/deselecciona. Solo una categoría activa a la vez. Al seleccionar, filtra los alojamientos. Al deseleccionar, muestra todos |
| **Estado** | `selectedCategory: string \| null` |
| **Resultado** | Grid filtrado por categoría seleccionada. Home y Catalog son independientes (cada uno filtra su propio grid) |

### 6.2.1 Búsqueda por label de categoría

Además del filtro por título, el campo de búsqueda también busca coincidencias en el **label de la categoría** a la que pertenece cada alojamiento. Por ejemplo, buscar "playa" encuentra alojamientos de la categoría "Playa 🏖️" aunque el título no contenga la palabra "playa". Esto aplica tanto en Home como en Catalog.

### 6.3 Ordenación (SortingControl)

| Atributo | Descripción |
|---|---|
| **Páginas** | Catalog |
| **Descripción** | Control para ordenar resultados por precio |
| **Comportamiento** | Toggle o selector entre "Precio: ascendente" y "Precio: descendente". Al cambiar, la lista se reordena |
| **Estado** | `sortOrder: 'asc' \| 'desc'` |
| **Resultado** | Lista reordenada según selección |

### 6.4 Navegación entre páginas

| Atributo | Descripción |
|---|---|
| **Páginas** | Todas |
| **Descripción** | Navegación entre Home, Catalog y Room Detail |
| **Comportamiento** | Home → Catalog por búsqueda o categoría. Catalog → Room Detail por click en tarjeta. BackNavigation en Room Detail vuelve atrás. Logo navega a Home |
| **Estado** | Ninguno (usa Link de Next.js) |
| **Resultado** | Transición sin recarga completa |

### 6.5 Estados de carga simulados (LoadingState)

| Atributo | Descripción |
|---|---|
| **Páginas** | Home, Room Detail |
| **Descripción** | Simulación de carga de datos al montar la página |
| **Comportamiento** | Al cargar la página, se muestra LoadingState durante un tiempo simulado (~1-2s), luego se renderizan los datos |
| **Estado** | `isLoading: boolean` |
| **Resultado** | Transición visual de loading a contenido |

### 6.6 Galería de imágenes (PhotoGallery + GalleryNavigation)

| Atributo | Descripción |
|---|---|
| **Páginas** | Room Detail |
| **Descripción** | Galería de fotos navegable |
| **Comportamiento** | Botones anterior/siguiente cambian la imagen mostrada. Si está en primera imagen, botón anterior se deshabilita. Si está en última, botón siguiente se deshabilita |
| **Estado** | `currentImageIndex: number` |
| **Resultado** | Imagen actual visible; controles habilitados/deshabilitados según posición |

### 6.7 Gestión de huéspedes (GuestCounter)

| Atributo | Descripción |
|---|---|
| **Páginas** | Room Detail (BookingCard) |
| **Descripción** | Control para seleccionar número de huéspedes |
| **Comportamiento** | Botón "+": incrementa. Botón "-": decrementa. Mínimo: 1. Máximo: 10 |
| **Estado** | `guestCount: number` |
| **Resultado** | Número actualizado visible. Botón "-" deshabilitado en mínimo. Botón "+" deshabilitado en máximo |

### 6.8 Reserva (BookingCTA)

| Atributo | Descripción |
|---|---|
| **Páginas** | Room Detail (BookingCard) |
| **Descripción** | Botón de llamada a la acción |
| **Comportamiento** | Click: muestra alerta o mensaje simulando inicio de reserva |
| **Estado** | Ninguno |
| **Resultado** | Mensaje de confirmación simulado |

### 6.9 Barra de Filtros (SearchFilters)

| Atributo | Descripción |
|---|---|
| **Páginas** | Home |
| **Descripción** | Barra horizontal segmentada con 3 paneles desplegables: Destino, Fechas, Viajeros, más botón "Buscar" |
| **Comportamiento** | Click en segmento abre panel y cierra otros. Click fuera cierra todo. "Buscar" redirige a `/catalog?q={destino}` |
| **Estado** | `activePanel: 'destination' \| 'dates' \| 'guests' \| null`, `destination: string`, `checkIn: string \| null`, `checkOut: string \| null`, `guests: { adults, children, infants, pets }` |
| **Resultado** | Filtro combinado con categorías y búsqueda por texto en Home. Redirección a Catalog con query params |

#### DestinationPanel

| Atributo | Descripción |
|---|---|
| **Ciudades** | "Cualquier destino", "Madrid", "Barcelona", "Sevilla", "Valencia", "Granada", "Málaga", "Bilbao", "París", "Roma", "Lisboa" |
| **Comportamiento** | Click selecciona ciudad y cierra panel. Se muestra en el segmento "Destino" |
| **Props** | `value: string`, `onSelect: (city: string) => void` |

#### DatePanel

| Atributo | Descripción |
|---|---|
| **Descripción** | Calendario casero en grilla con vista de dos meses consecutivos |
| **Comportamiento** | Primer click → selecciona check in. Segundo click → selecciona check out. El rango entre ambos se resalta visualmente. Inputs `date` nativos como fallback en móvil |
| **Props** | `checkIn: string \| null`, `checkOut: string \| null`, `onChange: (in, out) => void` |

#### GuestsPanel

| Atributo | Descripción |
|---|---|
| **Categorías** | Adultos (min 1, max 10), Niños (min 0, max 10), Bebés (min 0, max 5), Mascotas (min 0, max 5) |
| **Comportamiento** | Controles +/- independientes. Botón "-" se deshabilita en el mínimo. Botón "+" se deshabilita en el máximo |
| **Props** | `value: GuestCounts`, `onChange: (guests) => void` |

---

## 7. UI/UX and Visual Specifications

### Diseño general

- Fondo predominantemente blanco.
- Texto oscuro (casi negro, ~#171717 / zinc-900).
- Esquinas redondeadas en tarjetas, inputs y botones (radius suave, ~8-12px según el elemento).
- Sombras sutiles en elementos elevados (SearchBar, BookingCard).
- Iconografía simple y monocromática.

### Navbar / Cabecera

- **Mobile (inferido de la referencia):** Búsqueda compacta en cápsula centrada. Logo y UserMenu no visibles en captura móvil (pendiente de definir si se muestran).
- **Desktop:** Dos niveles: (1) Logo izquierda, modos centro, UserMenu derecha; (2) Barra de búsqueda segmentada debajo.

> **Pending confirmation:** La presencia y posición exacta de Logo y UserMenu en mobile no está visualmente confirmada. Se mantienen por requisito funcional.

### Categorías

- Fila horizontal desplazable (scroll horizontal en móvil).
- Cada categoría: icono + etiqueta textual.
- Categoría activa: resaltada visualmente (texto más oscuro o indicador inferior).

### Tarjetas de alojamiento (AccommodationCard)

- Imagen prominente con esquinas redondeadas (~8-12px).
- Bloque de texto debajo: título, precio por noche, valoración.
- Corazón (favorito) superpuesto en esquina superior derecha de la imagen (inferred — opcional).
- Las tarjetas tienen ancho consistente dentro del grid.

### Galería de fotos (PhotoGallery)

- Imagen grande como elemento dominante.
- Botones de navegación circulares superpuestos (anterior/siguiente).

### Booking Card

- Fondo blanco con sombra suave.
- Precio destacado.
- Controles de huéspedes con botones circulares +/-.
- Botón CTA de color rosa/acento (similar al de la referencia desktop).

### Colores

- **Fondo:** `#ffffff` (blanco), `bg-gray-50` para fondos secundarios.
- **Texto principal:** `text-gray-900` (~#171717 / casi negro).
- **Texto secundario:** `text-gray-500` (~#6b7280 / gris).
- **Acento:** `rose-500` (Tailwind) para botones y elementos destacados.
- **Bordes:** `border-gray-200` (gris claro sutil).

### Tipografía

- **Definida:** Geist Sans (variable) como `--font-geist-sans` para texto general. Geist Mono para código (uso marginal).
- Fuente establecida mediante `next/font/google` en layout.tsx.

### Iconografía

- **Emojis** para toda la iconografía (categorías, amenities, etc.).
- Sin librería de iconos externa.

### Grid

- Home: Grid CSS (Tailwind: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` o similar).
- Catalog: Lista vertical + MapPlaceholder en desktop.

### Footer (Opcional)

- Fondo gris claro (`bg-gray-50` o similar).
- Enlaces organizados en columnas en desktop, apilados en mobile.
- Selector de idioma/moneda, iconos sociales, copyright.

---

## 8. Component Specifications

### 8.1 Componentes Compartidos (Shared)

#### Navbar

| Atributo | Descripción |
|---|---|
| **Uso** | Home, Catalog, Room Detail |
| **Responsabilidad** | Barra de navegación superior persistente |
| **Contenido** | Logo (izquierda), SearchBar (centro/derecha), UserMenu (derecha) |
| **Estructura** | Fila horizontal con flexbox; layout cambia en móvil/desktop |
| **Comportamiento** | Persistente; no tiene estado propio |
| **Props** | `searchQuery: string`, `onSearchChange: (value: string) => void` |
| **Componentes relacionados** | Logo, SearchBar, UserMenu |

#### AccommodationCard

| Atributo | Descripción |
|---|---|
| **Uso** | Home (en Grid), Catalog (en List) |
| **Responsabilidad** | Resumir visualmente un alojamiento |
| **Contenido** | AccommodationImage, AccommodationInfo (título, PricePerNight, Rating) |
| **Estructura** | Contenedor vertical: imagen arriba, info debajo |
| **Comportamiento** | Click navega a `/rooms/[id]` mediante Link de Next.js |
| **Props** | `accommodation: Accommodation` |
| **Reutilización** | Mismo componente en Home y Catalog; cada vista lo coloca en su propio layout |

#### PricePerNight

| Atributo | Descripción |
|---|---|
| **Uso** | AccommodationCard, BookingCard |
| **Responsabilidad** | Mostrar precio formateado |
| **Props** | `price: number`, `currency?: string` (default: EUR) |
| **Formato** | Ej: "120€ / noche" |

#### Rating

| Atributo | Descripción |
|---|---|
| **Uso** | AccommodationCard, RatingAndReviews |
| **Responsabilidad** | Mostrar valoración con estrella |
| **Props** | `rating: number`, `reviewCount?: number` |
| **Formato** | Icono estrella + valor numérico |

#### LoadingState

| Atributo | Descripción |
|---|---|
| **Uso** | Home, Room Detail |
| **Responsabilidad** | Placeholder visual durante carga |
| **Props** | `count?: number` (número de skeletons a mostrar) |
| **Comportamiento** | Skeleton/spinner animado |

### 8.2 Componentes de Home

#### Logo

| Atributo | Descripción |
|---|---|
| **Responsabilidad** | Marca que enlaza a Home |
| **Props** | Ninguna |
| **Comportamiento** | Click navega a `/` |

#### SearchBar

| Atributo | Descripción |
|---|---|
| **Responsabilidad** | Capturar texto de búsqueda |
| **Props** | `value: string`, `onChange: (value: string) => void` |
| **Comportamiento** | Input controlado; búsqueda en tiempo real |

#### UserMenu

| Atributo | Descripción |
|---|---|
| **Responsabilidad** | Mostrar iconos de usuario |
| **Props** | Ninguna |
| **Comportamiento** | Click: placeholder (mejora futura) |

#### CategoriesNavigation

| Atributo | Descripción |
|---|---|
| **Responsabilidad** | Fila horizontal de categorías |
| **Contenido** | Array de CategoryItem |
| **Props** | `categories: Category[]`, `selected: string \| null`, `onSelect: (id: string \| null) => void` |
| **Comportamiento** | Scroll horizontal en móvil |

#### CategoryItem

| Atributo | Descripción |
|---|---|
| **Responsabilidad** | Categoría individual |
| **Props** | `category: Category`, `isActive: boolean`, `onClick: () => void` |
| **Comportamiento** | Click selecciona/deselecciona; estado visual activo |

#### AccommodationGrid

| Atributo | Descripción |
|---|---|
| **Responsabilidad** | Contenedor grid de tarjetas |
| **Props** | `accommodations: Accommodation[]` |
| **Estructura** | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` |

#### SearchFilters

| Atributo | Descripción |
|---|---|
| **Uso** | Home |
| **Responsabilidad** | Barra de filtros tipo Airbnb (Destino, Fechas, Viajeros) |
| **Contenido** | DestinationPanel, DatePanel, GuestsPanel |
| **Comportamiento** | Filtra alojamientos según selección |
| **Props** | `onSearch: (filters: Filters) => void` |

#### DestinationPanel

| Atributo | Descripción |
|---|---|
| **Uso** | Home |
| **Responsabilidad** | Panel de selección de ciudad |
| **Props** | `destinations: string[]`, `onSelect: (destination: string) => void` |
| **Comportamiento** | Click en ciudad la selecciona; puede haber búsqueda dentro del panel |

#### DatePanel

| Atributo | Descripción |
|---|---|
| **Uso** | Home |
| **Responsabilidad** | Selector de fechas (check-in, check-out) |
| **Props** | `onDatesChange: (startDate: Date, endDate: Date) => void` |
| **Comportamiento** | Abre calendario al hacer click; permite seleccionar rango de fechas |

#### GuestsPanel

| Atributo | Descripción |
|---|---|
| **Uso** | Home |
| **Responsabilidad** | Controles de número de viajeros (adultos, niños, bebés, mascotas) |
| **Props** | `guestCounts: GuestCountConfig`, `onChange: (counts: GuestCountConfig) => void` |
| **Comportamiento** | Botones +/- para cada tipo de viajero; mínimo 1 adulto |

### 8.3 Componentes de Catalog

#### ResultsHeader

| Atributo | Descripción |
|---|---|
| **Responsabilidad** | Encabezado del catálogo |
| **Props** | `count: number` |
| **Contenido** | Título + número de resultados |

#### ResultsCounter

| Atributo | Descripción |
|---|---|
| **Responsabilidad** | Mostrar cuántos alojamientos coinciden |
| **Props** | `count: number` |

#### SortingControl

| Atributo | Descripción |
|---|---|
| **Responsabilidad** | Control de ordenación |
| **Props** | `sortOrder: 'asc' \| 'desc'`, `onChange: (order: 'asc' \| 'desc') => void` |
| **Comportamiento** | Toggle o selector |

#### AccommodationList

| Atributo | Descripción |
|---|---|
| **Responsabilidad** | Lista vertical de tarjetas |
| **Props** | `accommodations: Accommodation[]` |
| **Estructura** | Contenedor flex-col con scroll |

#### MapPlaceholder

| Atributo | Descripción |
|---|---|
| **Responsabilidad** | Placeholder visual de mapa |
| **Props** | Ninguna |
| **Comportamiento** | Visual estático; integración futura |

### 8.4 Componentes de Room Detail

#### BackNavigation

| Atributo | Descripción |
|---|---|
| **Responsabilidad** | Botón de retroceso |
| **Props** | Ninguna (usa `useRouter` o `Link`) |

#### PhotoGallery

| Atributo | Descripción |
|---|---|
| **Responsabilidad** | Galería de imágenes navegable |
| **Props** | `images: string[]` |
| **Estado interno** | `currentIndex: number` |
| **Comportamiento** | Muestra imagen actual |

#### GalleryNavigation

| Atributo | Descripción |
|---|---|
| **Responsabilidad** | Controles anterior/siguiente |
| **Props** | `currentIndex: number`, `total: number`, `onPrev: () => void`, `onNext: () => void` |

#### RoomHeader

| Atributo | Descripción |
|---|---|
| **Responsabilidad** | Título del alojamiento |
| **Props** | `title: string` |

#### RatingAndReviews

| Atributo | Descripción |
|---|---|
| **Responsabilidad** | Mostrar valoración y reseñas |
| **Props** | `rating: number`, `reviewCount: number` |

#### LocationInfo

| Atributo | Descripción |
|---|---|
| **Responsabilidad** | Mostrar ubicación |
| **Props** | `location: string` |

#### HostInfo

| Atributo | Descripción |
|---|---|
| **Responsabilidad** | Presentar perfil del anfitrión |
| **Props** | `host: Host` |

#### HostAvatar

| Atributo | Descripción |
|---|---|
| **Responsabilidad** | Foto de perfil del anfitrión |
| **Props** | `avatar: string`, `name: string` |

#### AmenitiesGrid

| Atributo | Descripción |
|---|---|
| **Responsabilidad** | Cuadrícula de servicios |
| **Props** | `amenities: Amenity[]` |

#### AmenityItem

| Atributo | Descripción |
|---|---|
| **Responsabilidad** | Servicio individual |
| **Props** | `amenity: Amenity` |

#### BookingCard

| Atributo | Descripción |
|---|---|
| **Responsabilidad** | Tarjeta de acciones de reserva |
| **Props** | `price: number`, `onBook: () => void` |
| **Estado interno** | `guestCount: number` |
| **Contenido** | PricePerNight, GuestCounter, BookingCTA |
| **Estructura** | Card con sombra, posiblemente sticky en desktop |

#### GuestCounter

| Atributo | Descripción |
|---|---|
| **Responsabilidad** | Control de número de huéspedes |
| **Props** | `value: number`, `min: number`, `max?: number`, `onChange: (value: number) => void` |
| **Comportamiento** | Botones +/-; mínimo 1 |

#### BookingCTA

| Atributo | Descripción |
|---|---|
| **Responsabilidad** | Botón de llamada a la acción |
| **Props** | `label?: string`, `onClick: () => void` |
| **Comportamiento** | Muestra mensaje de reserva simulada |

---

## 9. Data Models and TypeScript

### Interfaces y tipos

> **Nota:** Las siguientes son especificaciones de las estructuras de datos. No generan código directamente; sirven como referencia para la implementación.

#### Category

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | `string` | Identificador único |
| `label` | `string` | Nombre visible (ej. "Playa", "Mansiones") |
| `icon` | `string` | Ruta o identificador del icono |

#### Host

| Campo | Tipo | Descripción |
|---|---|---|
| `name` | `string` | Nombre del anfitrión |
| `avatar` | `string` | URL de la imagen de perfil |
| `yearsHosting` | `number` | Antigüedad como anfitrión (en años) |

#### Amenity

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | `string` | Identificador único |
| `label` | `string` | Nombre visible (ej. "WiFi", "Cocina") |
| `icon` | `string` | Ruta o identificador del icono |

#### Accommodation

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | `string` | Identificador único |
| `title` | `string` | Título del alojamiento |
| `image` | `string` | URL de la imagen miniatura |
| `images` | `string[]` | Array de URLs para la galería de Room Detail |
| `pricePerNight` | `number` | Precio por noche |
| `rating` | `number` | Valoración media (ej. 4.8) |
| `reviewCount` | `number` | Número de reseñas |
| `categoryId` | `string` | ID de la categoría a la que pertenece |
| `location` | `string` | Ubicación (ciudad, región) |
| `host` | `Host` | Información del anfitrión |
| `amenities` | `Amenity[]` | Lista de servicios disponibles |
| `description` | `string` | (Opcional) Descripción del alojamiento |

#### GuestConfig

| Campo | Tipo | Descripción |
|---|---|---|
| `min` | `number` | Mínimo de huéspedes (1) |
| `max` | `number` | Máximo de huéspedes (10) |

### Relaciones entre entidades

- `Accommodation` contiene un `Host` (relación 1:1).
- `Accommodation` contiene un array de `Amenity`.
- `Accommodation.categoryId` se relaciona con `Category.id`.
- `Accommodation.images` se usa en la galería de Room Detail.
- `Accommodation.image` es la miniatura para cards.

### Datos necesarios por página

- **Home:** Lista de `Accommodation[]`, lista de `Category[]`.
- **Catalog:** Lista de `Accommodation[]` (filtrada y ordenada).
- **Room Detail:** Un `Accommodation` completo (con host, amenities, images[]).

### Decisiones tomadas (actualizaciones post-aprobación)

- `icon` en Category y Amenity: **emoji**.
- `max` en GuestConfig: **10** huéspedes.
- Moneda: **EUR** con formato "120€ / noche".
- Imágenes: **picsum.photos** (configurado en `next.config.ts` como `remotePatterns`).
- Estructura de carpetas: **raíz** (sin `src/`).
- Home y Catalog: **independientes** (sin search params entre ellos, cada uno filtra su propio grid).
- Iconos de UserMenu: **decorativos** (sin funcionalidad).

---

## 10. State Management and React Hooks

### Estados identificados

| Estado | Tipo | Dónde se gestiona | Propósito |
|---|---|---|---|
| `searchQuery` | `string` | Navbar / Layout o página Home | Búsqueda en tiempo real |
| `selectedCategory` | `string \| null` | Home | Categoría activa para filtrar |
| `isLoading` | `boolean` | Home, Room Detail | Control de carga simulada |
| `sortOrder` | `'asc' \| 'desc'` | Catalog | Ordenación por precio |
| `currentImageIndex` | `number` | Room Detail | Imagen actual en galería |
| `guestCount` | `number` | Room Detail (BookingCard) | Número de huéspedes |

### Flujo de estado

- **En Home:** `searchQuery` (compartido via SearchContext) + `selectedCategory` (local) + `destination`/`checkIn`/`checkOut`/`guests` (local en SearchFilters) definen qué alojamientos se muestran.
- **Al navegar a Catalog:** Se usa `useSearchParams` para leer `?q=` desde la URL. Catalog es independiente de Home (cada uno filtra su propio grid). Además, busca coincidencias por label de categoría para mejorar resultados. El SearchContext mantiene el query compartido entre páginas.
- **En Catalog:** `sortOrder` modifica el orden de la misma lista filtrada. El `searchQuery` se sincroniza con `?q=` de la URL.
- **En Room Detail:** `currentImageIndex` y `guestCount` son estados locales independientes.

### Hooks

- `useState` para todos los estados anteriores.
- `useEffect` para simular carga (setTimeout con cambio de estado).
- `useParams` de Next.js para obtener `[id]` en Room Detail.
- `useSearchParams` para leer `?q=` en Catalog.
- `useRouter` para navegación programática.

### SearchContext

Se utiliza un `SearchContext` (Provider + hook `useSearch`) para compartir el `searchQuery` entre todas las páginas. El Navbar accede a `searchQuery` y `setSearchQuery` mediante este contexto, permitiendo que la SearchBar esté siempre sincronizada sin necesidad de pasar props manualmente.

---

## 11. Navigation and Routing

### Mapa de navegación

```
Home (/)  ←──→  Catalog (/catalog)  ←──→  Room Detail (/rooms/[id])
  ↑                                          ↓
  └────────── Logo siempre navega a Home ────┘
```

### Reglas de navegación

1. **Home → Catalog:** Ocurre cuando el usuario hace clic en "Buscar" desde el SearchFilters (barra de filtros tipo Airbnb). Redirige a `/catalog?q={destino}&checkIn={...}&checkOut={...}&adults={...}&children={...}`. También se puede acceder directamente a `/catalog` como URL independiente.
2. **Catalog → Room Detail:** Click en AccommodationCard → navegación a `/rooms/${id}`.
3. **Room Detail → Catalog/Home:** Botón BackNavigation (historial anterior) o Logo (Home).
4. **Logo:** Siempre navega a `/`.
5. **Todas las navegaciones internas** usan `<Link>` de Next.js — no `<a href>`.
6. **Sin recarga completa:** App Router maneja las transiciones.
7. **SearchContext:** El `searchQuery` se comparte mediante SearchContext, no mediante URL, permitiendo que Home y Catalog tengan búsquedas independientes.

---

## 12. Responsive Design

### Reglas base

- **Mobile First:** Diseño inicial para 375px de ancho.
- **Breakpoint de escritorio:** ≥768px (md en Tailwind).
- **Contenedores flexibles:** Sin anchos rígidos para evitar desbordamiento.

### Adaptaciones por página

| Elemento | Móvil (<768px) | Escritorio (≥768px) |
|---|---|---|
| **Navbar** | Layout compacto. Logo puede ocultarse o ser pequeño. SearchBar puede ser compacta | Two-level: logo + modos + user menu arriba; búsqueda segmentada debajo |
| **SearchFilters** | Barra compacta de ancho completo, paneles en modo modal/pantalla completa | Segmentos con más espacio, paneles desplegables posicionados |
| **Categories** | Scroll horizontal, íconos pequeños | Más espacio entre items |
| **Home Grid** | `grid-cols-1` | `grid-cols-2`, `lg:grid-cols-3` o `4` |
| **Catalog layout** | Lista vertical, MapPlaceholder debajo | Split: lista izquierda (60-70%), mapa derecha (30-40%) |
| **Room Detail** | Contenido apilado, BookingCard al final | BookingCard puede ser sticky sidebar |
| **PhotoGallery** | Imagen ancho completo | Tamaño controlado, posiblemente más grande |
| **Footer** (opcional) | Listas apiladas | Columnas (3 o 4) |
| **Espaciados** | Márgenes laterales constantes (~16px) | Márgenes más amplios |

### Elementos que cambian de posición

- MapPlaceholder: debajo de la lista en móvil → a la derecha en desktop.
- BookingCard: flujo normal en móvil → sticky sidebar en desktop (pendiente de confirmar).

---

## 13. Loading States and Data Simulation

### Estado inicial

- Al cargar Home, `isLoading = true`. Se muestra `LoadingState`.
- Después de ~1-2 segundos (simulado con `setTimeout`/`useEffect`), `isLoading = false` y se renderizan las tarjetas.
- Lo mismo para Room Detail: se carga según `[id]` de la URL.

### Datos simulados

- Archivo `data/accommodations.ts` con array de objetos `Accommodation`.
- Archivo `data/categories.ts` con array de `Category`.
- Sin backend, sin API, sin base de datos.

### Comportamiento sin datos

- Si no hay alojamientos tras filtro, se muestra un mensaje como "No se encontraron alojamientos" o grid vacío.

---

## 14. Development Rules and Constraints

### Obligatorias

1. **Componentes funcionales** con `const`.
2. **TypeScript** estricto en todos los archivos.
3. **Componentes pequeños y enfocados** (única responsabilidad).
4. **Máximo ~80 líneas** de JSX y lógica por componente (orientativo).
5. **Tailwind CSS** para estilos. **No estilos inline** (`style={{}}`).
6. **No librerías UI externas:** No shadcn/ui, No MUI, No Ant Design, No Chakra UI.
7. **`<Link>` de Next.js** para navegación interna.
8. **Cada componente en su propio archivo** cuando corresponda.
9. **Evitar duplicación de código** y lógica.
10. **Estructura de carpetas clara** (páginas en `app/`, componentes en `components/`, datos en `data/`, tipos en `types/`).
11. **AccommodationCard reutilizado** en Home y Catalog.

---

## 15. Acceptance Criteria

### Technical Requirements

- [ ] Proyecto configurado con Next.js 16, TypeScript y Tailwind CSS 4.
- [ ] App Router implementado con rutas `/`, `/catalog`, `/rooms/[id]`.
- [ ] Sin librerías de UI externas.
- [ ] Sin errores de compilación ni TypeScript.
- [ ] Build exitoso (`next build`).

### Functional Requirements

- [ ] Navbar con Logo, SearchBar y UserMenu visible en las tres páginas.
- [ ] Búsqueda en tiempo real filtra alojamientos en Home (por título y label de categoría).
- [ ] Categorías navegables con selección visual activa.
- [ ] Catalog muestra resultados con contador y ordenación por precio.
- [ ] SearchFilters visible en Home con segmentos Destino, Fechas, Viajeros y botón Buscar.
- [ ] DestinationPanel muestra 11 ciudades fijas y al seleccionar se actualiza el segmento.
- [ ] DatePanel con calendario en grilla, selección de check-in/check-out y resaltado de rango.
- [ ] GuestsPanel con controles +/- para adultos, niños, bebés y mascotas con límites definidos.
- [ ] Botón "Buscar" redirige a `/catalog?q={destino}`.
- [ ] Room Detail carga datos por ID de URL.
- [ ] Galería de fotos navegable (anterior/siguiente).
- [ ] GuestCounter funcional (incremento/decremento, mínimo 1).
- [ ] BookingCTA con respuesta simulada.
- [ ] LoadingState visible durante simulación de carga.
- [ ] MapPlaceholder estático visible en Catalog.

### UI Requirements

- [ ] Fidelidad visual con las referencias de Airbnb (mobile y desktop).
- [ ] AccommodationCard reutilizado en Home y Catalog.
- [ ] Componentes con responsabilidad única.
- [ ] Tipografía Geist implementada correctamente.

### Responsive Requirements

- [ ] Layout funcional en viewport móvil (375px).
- [ ] Layout funcional en viewport desktop (≥768px).
- [ ] Grid de Home adapta columnas según viewport.
- [ ] Catalog cambia layout (lista sola o split con mapa).
- [ ] Navbar se adapta (compacta en móvil, completa en desktop).

### Code Quality

- [ ] Componentes funcionales con `const`.
- [ ] TypeScript en todos los archivos.
- [ ] Componentes ≤80 líneas aprox.
- [ ] Sin estilos inline.
- [ ] Navegación con `<Link>` de Next.js.
- [ ] Sin duplicación de componentes.

---

## 16. Decisiones Tomadas (historial de aprobaciones)

| # | Asunto | Decisión | Fecha |
|---|---|---|---|
| 1 | **📁 Estructura** | Raíz (sin `src/`): `app/`, `components/`, `types/`, `data/` | 2026-11-23 |
| 2 | **📸 Imágenes** | `https://picsum.photos/...` con `remotePatterns` en next.config.ts | 2026-11-23 |
| 3 | **🔤 Iconos** | **Emoji** para categorías y amenities | 2026-11-23 |
| 4 | **💰 Moneda** | **EUR**, formato `"120€ / noche"` | 2026-11-23 |
| 5 | **🔝 Máx. huéspedes** | **10** | 2026-11-23 |
| 6 | **🏠 Home → Catalog** | **Independientes.** Home filtra su propio grid. Catalog es URL directa | 2026-11-23 |
| 7 | **🗺️ Mapa** | Placeholder estático (sin mapa real) | 2026-11-23 |
| 8 | **🎨 Colores** | `bg-white`, `text-gray-900`, `text-gray-500`, `border-gray-200`, acento `rose-500` | 2026-11-23 |
| 9 | **📦 BookingCard** | Flujo normal (no sticky sidebar) | 2026-11-23 |
| 10 | **🦶 Footer** | ❌ No implementar | 2026-11-23 |
| 11 | **👤 UserMenu** | Solo iconos decorativos (sin funcionalidad) | 2026-11-23 |
| 12 | **🔍 SearchModeSelector** | ❌ No implementar | 2026-11-23 |
| 13 | **❤️ Heart/favorito** | ❌ No implementar | 2026-11-23 |
| 14 | **➕ Secciones extra Home** | ❌ No implementar | 2026-11-23 |
| **NUEVAS DECISIONES (2026-11-24)** ||||
| 15 | **🏙️ Destino (SearchFilters)** | Ciudades **fijas** (lista predefinida: Madrid, Barcelona, etc.) | 2026-11-24 |
| 16 | **📅 Fechas (SearchFilters)** | Calendario casero en grilla (sin librería externa). Inputs `date` nativos como fallback móvil | 2026-11-24 |
| 17 | **👥 Viajeros (SearchFilters)** | Adultos min 1 / max 10. Niños min 0 / max 10. Bebés min 0 / max 5. Mascotas min 0 / max 5 | 2026-11-24 |
| 18 | **🔍 Botón Buscar** | Redirige a `/catalog?q={destino}` con parámetros adicionales | 2026-11-24 |

---

## 17. Implementation Checklist

### Fase 1: Project Setup

- [ ] Inicializar/configurar Next.js 16 con TypeScript ✅ *(ya existe)*
- [ ] Configurar Tailwind CSS 4 ✅ *(ya existe)*
- [ ] Configurar estructura de carpetas (components/, data/, types/)
- [ ] Configurar path alias `@/*` ✅ *(ya en tsconfig)*

### Fase 2: Data Layer

- [ ] Definir tipos e interfaces (Accommodation, Category, Host, Amenity, etc.)
- [ ] Crear datos simulados (accommodations, categories)

### Fase 2.5: Search Filters

- [ ] SearchFilters (barra horizontal con 3 segmentos + botón Buscar)
- [ ] DestinationPanel (lista de 11 ciudades fijas)
- [ ] DatePanel (calendario casero en grilla con dos meses)
- [ ] GuestsPanel (controles adultos/niños/bebés/mascotas)
- [ ] Integración en app/page.tsx (filtro combinado)

### Fase 3: Shared Components

- [ ] Navbar (Logo + SearchBar + UserMenu)
- [ ] AccommodationCard (AccommodationImage + AccommodationInfo + PricePerNight + Rating)
- [ ] LoadingState

### Fase 4: Home Page

- [ ] CategoriesNavigation + CategoryItem
- [ ] AccommodationGrid
- [ ] Estados de carga simulada
- [ ] Filtrado por búsqueda
- [ ] Filtrado por categoría
- [ ] SearchFilters (DestinationPanel + DatePanel + GuestsPanel)

### Fase 5: Catalog Page

- [ ] ResultsHeader + ResultsCounter
- [ ] SortingControl
- [ ] AccommodationList (con AccommodationCard reutilizado)
- [ ] MapPlaceholder
- [ ] Integración de filtros desde Home (search params)

### Fase 6: Room Detail Page

- [ ] BackNavigation
- [ ] PhotoGallery + GalleryNavigation
- [ ] RoomHeader + RatingAndReviews + LocationInfo
- [ ] HostInfo + HostAvatar
- [ ] AmenitiesGrid + AmenityItem
- [ ] BookingCard (PricePerNight + GuestCounter + BookingCTA)
- [ ] Carga simulada por ID

### Fase 7: Navigation

- [ ] Enlaces entre páginas (Link de Next.js)
- [ ] Logo → Home
- [ ] AccommodationCard → Room Detail
- [ ] BackNavigation en Room Detail
- [ ] Search params entre Home y Catalog

### Fase 8: Responsive

- [ ] Grid adaptable en Home
- [ ] Split layout en Catalog (desktop)
- [ ] Galería y BookingCard responsive
- [ ] Navbar responsive
- [ ] Verificar breakpoints (375px → 768px+)

### Fase 9: Polish & Validation

- [ ] Verificar estado de carga en Home y Room Detail
- [ ] Verificar ordenación en Catalog
- [ ] Verificar navegación sin recarga
- [ ] Build exitoso (`next build`)
- [ ] Sin errores TypeScript

---

## Leyenda de etiquetas

| Etiqueta | Significado |
|---|---|
| **Required** | Requisito explícito del challenge o del contexto |
| **Optional** | Funcionalidad derivada del análisis visual, no obligatoria |
| **Inferred** | Inferido de las referencias visuales pero no confirmado funcionalmente |
| **Pending confirmation** | Requiere revisión o decisión antes de implementar |