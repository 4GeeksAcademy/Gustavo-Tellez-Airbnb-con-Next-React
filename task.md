# TAREAS VERIFICABLES — Airbnb Clone

> Cada tarea debe poder marcarse como completada solo cuando se cumpla el criterio de verificación.

---

## FASE 1: Data Layer

### 1.1 Crear tipos TypeScript
- [X] **T1.1** — `types/index.ts` creado con las interfaces `Category`, `Host`, `Amenity`, `Accommodation`
  - *Verificación:* El archivo existe y define todos los tipos con los campos especificados en specs.md sección 9

### 1.2 Crear datos simulados
- [X] **T1.2** — `data/accommodations.ts` creado con array de alojamientos mock
  - *Verificación:* Contiene al menos 8 alojamientos con todos los campos requeridos (id, title, image, images[], pricePerNight, rating, reviewCount, categoryId, location, host, amenities[])
- [X] **T1.3** — `data/categories.ts` creado con las 8 categorías (Playa, Mansiones, Tendencias, Casas rurales, Piscina, Frente al mar, Vistas espectaculares, Habitaciones) usando emoji como icono
  - *Verificación:* Cada categoría tiene id, label y un emoji como icon

---

## FASE 2: Shared Components

### 2.1 PricePerNight
- [X] **T2.1** — `components/shared/PricePerNight.tsx` creado
  - *Verificación:* Acepta `price: number`, renderiza formato "120€ / noche"

### 2.2 Rating
- [X] **T2.2** — `components/shared/Rating.tsx` creado
  - *Verificación:* Acepta `rating: number` y opcional `reviewCount: number`, muestra estrella + valor numérico

### 2.3 AccommodationImage
- [X] **T2.3** — `components/shared/AccommodationImage.tsx` creado
  - *Verificación:* Acepta `src: string` y `alt: string`, renderiza imagen con esquinas redondeadas (Tailwind)

### 2.4 AccommodationInfo
- [X] **T2.4** — `components/shared/AccommodationInfo.tsx` creado
  - *Verificación:* Acepta `title`, `price`, `rating`. Utiliza PricePerNight y Rating internamente

### 2.5 AccommodationCard
- [X] **T2.5** — `components/shared/AccommodationCard.tsx` creado
  - *Verificación:* Acepta `accommodation: Accommodation`. Renderiza AccommodationImage + AccommodationInfo. Envuelve en `<Link>` a `/rooms/${id}`. Sin estilos inline. Menos de 80 líneas.

### 2.6 LoadingState
- [X] **T2.6** — `components/shared/LoadingState.tsx` creado
  - *Verificación:* Acepta `count?: number`. Renderiza skeletons animados con Tailwind. Sin estilos inline.

---

## FASE 3: Layout Components (Navbar)

### 3.1 Logo
- [X] **T3.1** — `components/layout/Logo.tsx` creado
  - *Verificación:* Renderiza texto "Airbnb" o SVG. Envuelto en `<Link>` a `/`. Sin estilos inline.

### 3.2 SearchBar
- [X] **T3.2** — `components/layout/SearchBar.tsx` creado
  - *Verificación:* Acepta `value: string` y `onChange: (value: string) => void`. Input controlado con placeholder. Sin estilos inline.

### 3.3 UserMenu
- [X] **T3.3** — `components/layout/UserMenu.tsx` creado
  - *Verificación:* Renderiza 3 iconos decorativos (🌐, 👤, ☰). Sin funcionalidad. Sin estilos inline.

### 3.4 Navbar
- [X] **T3.4** — `components/layout/Navbar.tsx` creado
  - *Verificación:* Contiene Logo, SearchBar, UserMenu. Layout flexbox responsive. Acepta `searchQuery` y `onSearchChange` como props.

### 3.5 Actualizar layout.tsx
- [X] **T3.5** — `app/layout.tsx` modificado para incluir Navbar
  - *Verificación:* Navbar visible en las tres páginas. Layout.tsx importa Navbar y envuelve children. Sin errores de compilación.

---

## FASE 4: Home Page

### 4.1 CategoryItem
- [X] **T4.1** — `components/home/CategoryItem.tsx` creado
  - *Verificación:* Acepta `label: string`, `icon: string`, `isActive: boolean`, `onClick: () => void`. Muestra emoji + label. Estado visual activo/inactivo con Tailwind. Sin estilos inline.

### 4.2 CategoriesNavigation
- [X] **T4.2** — `components/home/CategoriesNavigation.tsx` creado
  - *Verificación:* Acepta `categories: Category[]`, `selected: string | null`, `onSelect: (id: string | null) => void`. Fila horizontal con scroll. Renderiza CategoryItem[].

### 4.3 AccommodationGrid
- [X] **T4.3** — `components/home/AccommodationGrid.tsx` creado
  - *Verificación:* Acepta `accommodations: Accommodation[]`. Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`. Renderiza AccommodationCard[].

### 4.4 Home Page principal
- [X] **T4.4** — `app/page.tsx` actualizado con toda la lógica de Home
  - *Verificación:* 
    - Estado `isLoading` con simulación de carga (~1.5s)
    - Estado `searchQuery` para filtro de búsqueda en tiempo real
    - Estado `selectedCategory` para filtro por categoría
    - Muestra LoadingState mientras carga
    - Muestra CategoriesNavigation + AccommodationGrid cuando carga
    - Filtrado combinado (búsqueda y categoría funcionan juntos)
    - Mensaje "No se encontraron alojamientos" cuando no hay resultados
    - Sin estilos inline. Sin errores TypeScript.

---

## FASE 5: Catalog Page

### 5.1 ResultsCounter
- [X] **T5.1** — `components/catalog/ResultsCounter.tsx` creado
  - *Verificación:* Acepta `count: number`. Muestra "X alojamientos encontrados".

### 5.2 ResultsHeader
- [X] **T5.2** — `components/catalog/ResultsHeader.tsx` creado
  - *Verificación:* Contiene título y ResultsCounter. Acepta `count: number`.

### 5.3 SortingControl
- [X] **T5.3** — `components/catalog/SortingControl.tsx` creado
  - *Verificación:* Acepta `sortOrder: 'asc' | 'desc'` y `onChange: (order: 'asc' | 'desc') => void`. Botones/toggle para cambiar orden.

### 5.4 AccommodationList
- [X] **T5.4** — `components/catalog/AccommodationList.tsx` creado
  - *Verificación:* Acepta `accommodations: Accommodation[]`. Lista vertical. Reutiliza AccommodationCard.

### 5.5 MapPlaceholder
- [X] **T5.5** — `components/catalog/MapPlaceholder.tsx` creado
  - *Verificación:* Div con fondo gris, texto e icono 🗺️. Placeholder estático sin funcionalidad de mapa real.

### 5.6 Catalog Page
- [X] **T5.6** — `app/catalog/page.tsx` creado
  - *Verificación:*
    - Carga todos los alojamientos de datos mock
    - Estado `sortOrder` para ordenar por precio
    - Renderiza ResultsHeader, SortingControl, AccommodationList, MapPlaceholder
    - Layout responsive: móvil vertical / desktop split (grid-cols-[1fr_400px] o similar)
    - Sin errores TypeScript. Sin estilos inline.

---

## FASE 6: Room Detail Page

### 6.1 BackNavigation
- [X] **T6.1** — `components/room/BackNavigation.tsx` creado
  - *Verificación:* Botón o link para volver atrás. Usa `useRouter().back()` o Link.

### 6.2 PhotoGallery y GalleryNavigation
- [X] **T6.2** — `components/room/PhotoGallery.tsx` creado
  - *Verificación:* Acepta `images: string[]`. Estado `currentIndex` interno. Muestra imagen actual.
- [X] **T6.3** — `components/room/GalleryNavigation.tsx` creado
  - *Verificación:* Acepta `onPrev`, `onNext`, `hasPrev`, `hasNext`. Botones anterior/siguiente. Se deshabilitan en extremos.

### 6.3 Room Header
- [X] **T6.4** — `components/room/RoomHeader.tsx` creado
  - *Verificación:* Acepta `title: string`. Muestra el título.
- [X] **T6.5** — `components/room/RatingAndReviews.tsx` creado
  - *Verificación:* Acepta `rating: number` y `reviewCount: number`. Formato "4.8 — 120 reseñas".
- [X] **T6.6** — `components/room/LocationInfo.tsx` creado
  - *Verificación:* Acepta `location: string`. Muestra ubicación.

### 6.4 Host Info
- [X] **T6.7** — `components/room/HostAvatar.tsx` creado
  - *Verificación:* Acepta `avatar: string` y `name: string`. Imagen circular.
- [X] **T6.8** — `components/room/HostInfo.tsx` creado
  - *Verificación:* Acepta `host: Host`. Muestra HostAvatar + nombre + antigüedad.

### 6.5 Amenities
- [X] **T6.9** — `components/room/AmenityItem.tsx` creado
  - *Verificación:* Acepta `amenity: Amenity`. Muestra emoji + label.
- [X] **T6.10** — `components/room/AmenitiesGrid.tsx` creado
  - *Verificación:* Acepta `amenities: Amenity[]`. Grid de AmenityItem.

### 6.6 Booking Card
- [X] **T6.11** — `components/room/GuestCounter.tsx` creado
  - *Verificación:* Acepta `value`, `min(1)`, `max(10)`, `onChange`. Botones + y -. Mínimo 1, máximo 10.
- [X] **T6.12** — `components/room/BookingCTA.tsx` creado
  - *Verificación:* Acepta `onClick`. Botón con texto "Reservar". Click muestra alerta simulada.
- [X] **T6.13** — `components/room/BookingCard.tsx` creado
  - *Verificación:* Acepta `price` y `onBook`. Contiene PricePerNight + GuestCounter + BookingCTA.

### 6.7 Room Detail Page
- [X] **T6.14** — `app/rooms/[id]/page.tsx` creado
  - *Verificación:*
    - Obtiene `id` con `useParams()`
    - Estado `isLoading` con simulación de carga (~1s)
    - Busca alojamiento en datos mock por `id`
    - Si no existe → "Alojamiento no encontrado"
    - Si existe → renderiza: BackNavigation, PhotoGallery, GalleryNavigation, RoomHeader, RatingAndReviews, LocationInfo, HostInfo, AmenitiesGrid, BookingCard
    - Sin errores TypeScript. Sin estilos inline.

---

## FASE 7: Navigation

- [X] **T7.1** — Logo en Navbar navega a `/`
  - *Verificación:* Click en Logo → URL cambia a `/`
- [X] **T7.2** — AccommodationCard navega a `/rooms/[id]`
  - *Verificación:* Click en tarjeta → URL cambia a `/rooms/{id}`
- [X] **T7.3** — BackNavigation en Room Detail funciona
  - *Verificación:* Click en botón → navega hacia atrás
- [X] **T7.4** — Catalog es accesible directamente en `/catalog`
  - *Verificación:* Navegar a `/catalog` muestra la página sin errores
- [X] **T7.5** — Todas las navegaciones usan `<Link>` de Next.js
  - *Verificación:* Sin etiquetas `<a href>` para rutas internas

---

## FASE 8: Responsive Design

- [X] **T8.1** — Navbar se adapta en móvil y desktop
  - *Verificación:* En viewport <768px layout compacto. En ≥768px layout completo.
- [X] **T8.2** — Home Grid responsive
  - *Verificación:* `grid-cols-1` en móvil. Múltiples columnas en desktop.
- [X] **T8.3** — Catalog layout responsive
  - *Verificación:* Móvil: lista vertical + mapa debajo. Desktop: split lado a lado.
- [X] **T8.4** — Room Detail contenido apilado correctamente
  - *Verificación:* Sin superposición ni desbordamiento en 375px y 768px+.
- [X] **T8.5** — CategoriesNavigation con scroll horizontal en móvil
  - *Verificación:* Las categorías se desplazan horizontalmente sin romper el layout.

---

## FASE 9: Polish & Validation

- [X] **T9.1** — `next build` exitoso
  - *Verificación:* Comando `next build` finaliza sin errores
- [X] **T9.2** — Sin errores TypeScript
  - *Verificación:* `npx tsc --noEmit` sin errores
- [X] **T9.3** — Sin errores de lint
  - *Verificación:* `npm run lint` sin errores
- [X] **T9.4** — Estados de carga funcionales en Home y Room Detail
  - *Verificación:* Al cargar Home y Room Detail se muestra LoadingState, luego desaparece
- [X] **T9.5** — Búsqueda en tiempo real filtra correctamente
  - *Verificación:* Escribir en SearchBar → solo aparecen alojamientos cuyo título coincide
- [X] **T9.6** — Selección de categoría filtra correctamente
  - *Verificación:* Click en categoría → solo aparecen alojamientos de esa categoría. Click otra vez → todos
- [X] **T9.7** — Ordenación en Catalog funciona
  - *Verificación:* Click "ascendente" → precios de menor a mayor. Click "descendente" → mayor a menor
- [X] **T9.8** — Galería de fotos navegable
  - *Verificación:* Botones anterior/siguiente cambian la imagen. Botones se deshabilitan en extremos
- [X] **T9.9** — GuestCounter funcional
  - *Verificación:* Botón + incrementa, botón - decrementa. Mínimo 1. Máximo 10
- [X] **T9.10** — BookingCTA responde
  - *Verificación:* Click en "Reservar" muestra alerta o mensaje simulado

---

## 📊 RESUMEN DE TAREAS

| Fase | Tareas | Total |
|---|---|---|
| F1 - Data Layer | T1.1 a T1.3 | 3 |
| F2 - Shared Components | T2.1 a T2.6 | 6 |
| F3 - Layout | T3.1 a T3.5 | 5 |
| F4 - Home | T4.1 a T4.4 | 4 |
| F5 - Catalog | T5.1 a T5.6 | 6 |
| F6 - Room Detail | T6.1 a T6.14 | 14 |
| F7 - Navigation | T7.1 a T7.5 | 5 |
| F8 - Responsive | T8.1 a T8.5 | 5 |
| F9 - Validation | T9.1 a T9.10 | 10 |
| **Total** | | **58 tareas verificables** |