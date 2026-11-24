# Contexto del Proyecto — Airbnb Clone

## 1. Resumen del Proyecto

Este proyecto consiste en construir un clon visual de la interfaz de navegación y reserva de alojamientos de Airbnb.com utilizando Next.js 16, TypeScript y Tailwind CSS. El proyecto incluye tres vistas interconectadas — una página de inicio, una página de catálogo de búsqueda y una página de detalle de habitación — que permiten a los usuarios descubrir, explorar, comparar y evaluar alojamientos. Todos los componentes se construyen desde cero utilizando componentes funcionales de React y clases de utilidad de Tailwind, sin depender de librerías de UI preconstruidas.

## 2. Descripción de las Páginas

### 2.1 Home (`/`)

La página de inicio es el punto de entrada de la plataforma. Su propósito es presentar a los usuarios una visión general navegable y visualmente atractiva de los alojamientos disponibles, fomentando la exploración y el descubrimiento.

La página muestra una barra de navegación superior con el logo de Airbnb, un campo de búsqueda funcional y un menú de usuario con iconos. Debajo de la barra de navegación, una fila horizontal de categorías (como Playa, Mansiones, Tendencias, etc.) permite a los usuarios filtrar alojamientos por tipo. Cada categoría está representada por un icono y una etiqueta, y la categoría activa se resalta visualmente cuando está seleccionada.

El área de contenido principal consiste en una cuadrícula responsive de tarjetas de alojamiento. Cada tarjeta muestra una imagen, el título del alojamiento, el precio por noche y una valoración. Mientras los datos de los alojamientos se están obteniendo (simulado), se muestra un estado de carga.

El diseño sigue un enfoque mobile-first: en viewports móviles la cuadrícula muestra una sola columna de tarjetas, y en viewports de escritorio se expande a múltiples columnas.

### 2.2 Catálogo (`/catalog`)

La página de catálogo presenta los resultados de una búsqueda o filtro de categoría en un diseño estructurado y comparativo. Su propósito es ayudar a los usuarios a revisar y comparar múltiples opciones de alojamiento una al lado de la otra.

Un encabezado de resultados muestra el número total de alojamientos encontrados. Un control de ordenación permite a los usuarios ordenar los resultados por precio de forma ascendente o descendente. Las tarjetas de alojamiento de la página de inicio se reutilizan aquí, listadas en una disposición vertical.

En escritorio, la página se divide en dos áreas: la lista de alojamientos a la izquierda y un placeholder de mapa a la derecha. En móvil, el placeholder del mapa aparece debajo de la lista. Inicialmente, el área del mapa muestra un placeholder visual estático.

### 2.3 Detalle de Habitación (`/rooms/[id]`)

La página de detalle de habitación proporciona información completa sobre un alojamiento específico, permitiendo al usuario evaluar la propiedad antes de tomar una decisión de reserva. Los datos se cargan utilizando el identificador de la habitación desde la URL, mostrando un estado de carga mientras se obtienen los datos.

La página incluye una galería de fotos con controles de navegación (botones anterior y siguiente) para explorar las imágenes. Debajo de la galería, se muestran el título del alojamiento, la valoración, el número de reseñas y la ubicación.

Una sección de información del anfitrión muestra el avatar del anfitrión, su nombre y su antigüedad como anfitrión. Una sección de servicios (amenities) lista los servicios y características disponibles en el alojamiento.

Una tarjeta de reserva muestra el precio por noche, un contador de huéspedes con controles para aumentar o disminuir el número de huéspedes, y un botón de llamada a la acción (CTA) para iniciar el proceso de reserva. Elementos de navegación como un botón de retroceso o breadcrumb permiten al usuario volver al catálogo o a la página de inicio.

## 3. Inventario de Componentes

### 3.1 Componentes de la Home

| Componente | Responsabilidad | Información que Muestra | Interacciones |
|---|---|---|---|
| **Navbar** | Barra de navegación superior que persiste en todas las páginas. Contiene el logo, la barra de búsqueda y el menú de usuario. | Logo, campo de búsqueda, iconos del menú de usuario. | Ninguna (contenedor externo). |
| **Logo** | Identificador de la marca que enlaza de vuelta a la página de inicio. | Logo o marca de Airbnb. | Click navega a la home. |
| **SearchBar** | Permite a los usuarios buscar alojamientos por texto en tiempo real. | Campo de texto con placeholder. | El usuario escribe para filtrar resultados; se actualiza en tiempo real. |
| **UserMenu** | Muestra acciones e iconos de navegación relacionados con el usuario. | Iconos (ej. globo, perfil, menú). | Click para revelar opciones (mejora futura). |
| **CategoriesNavigation** | Fila horizontal desplazable de categorías de alojamiento. | Fila de elementos de categoría. | Scroll horizontal en móvil. |
| **CategoryItem** | Representa una categoría de alojamiento individual. | Icono y etiqueta (ej. Playa, Mansiones). | Click selecciona/deselecciona la categoría; estado visual activo. |
| **AccommodationGrid** | Contenedor de cuadrícula responsive para las tarjetas de alojamiento. | Cuadrícula de tarjetas. | Adapta las columnas según el ancho del viewport. |
| **AccommodationCard** | Muestra un resumen de un alojamiento. | Imagen, título, precio por noche, valoración. | Click navega a la página de detalle de la habitación. |
| **AccommodationImage** | Renderiza la miniatura del alojamiento. | Fotografía de la propiedad. | Ninguna (solo visual). |
| **AccommodationInfo** | Bloque de información textual de un alojamiento. | Título, precio por noche, valoración. | Ninguna (presentacional). |
| **PricePerNight** | Muestra la tarifa por noche. | Precio formateado con moneda. | Ninguna (presentacional). |
| **Rating** | Muestra la valoración media de los usuarios. | Icono de estrella y valor numérico de la valoración. | Ninguna (presentacional). |
| **LoadingState** | Placeholder que se muestra mientras se obtienen los datos. | Animación de esqueleto o spinner. | Ninguna (visual temporal). |

**Componentes reutilizables:** `Navbar`, `Logo`, `SearchBar`, `UserMenu`, `AccommodationCard`, `AccommodationImage`, `AccommodationInfo`, `PricePerNight`, `Rating`, `LoadingState`.

### 3.2 Componentes del Catálogo

| Componente | Responsabilidad | Información que Muestra | Interacciones |
|---|---|---|---|
| **Navbar** | Igual que en Home. Componente compartido. | Logo, barra de búsqueda, menú de usuario. | Igual que en Home. |
| **ResultsHeader** | Sección superior de la vista de catálogo. | Título de página o encabezado contextual. | Ninguna (presentacional). |
| **ResultsCounter** | Muestra cuántos alojamientos coinciden con la búsqueda o filtro actual. | Número de resultados encontrados. | Ninguna (presentacional). |
| **SortingControl** | Permite a los usuarios cambiar el orden de los resultados. | Desplegable o toggle con opciones de ordenación (precio ascendente / descendente). | El usuario selecciona el orden; la lista se reordena en consecuencia. |
| **AccommodationList** | Contenedor para la lista de tarjetas de alojamiento en el catálogo. | Lista de componentes `AccommodationCard`. | Lista con scroll. |
| **AccommodationCard** | Mismo componente usado en la página Home. Reutilizado para garantizar consistencia y evitar duplicación. | Imagen, título, precio por noche, valoración. | Click navega a la página de detalle de la habitación. |
| **MapPlaceholder** | Placeholder visual para el área del mapa. | Visual o mensaje estático similar a un mapa. | Ninguna (placeholder visual; integración de mapa futura). |

**Componentes compartidos:** `Navbar` y `AccommodationCard` se reutilizan desde la página Home. Reutilizar `AccommodationCard` garantiza la consistencia visual entre la página de inicio y los resultados de búsqueda, evitando la duplicación de código.

### 3.3 Componentes del Detalle de Habitación

| Componente | Responsabilidad | Información que Muestra | Interacciones |
|---|---|---|---|
| **Navbar** | Igual que en Home. Componente compartido. | Logo, barra de búsqueda, menú de usuario. | Igual que en Home. |
| **BackNavigation** | Permite al usuario volver al catálogo o a la página de inicio. | Rastro de breadcrumb o botón/flecha de retroceso. | Click navega hacia atrás. |
| **RoomHeader** | Sección superior de la vista de detalle de la habitación. | Título del alojamiento. | Ninguna (presentacional). |
| **RatingAndReviews** | Muestra la valoración del alojamiento y el número de reseñas. | Valoración con estrellas y número de reseñas (ej. "4.8 — 120 reseñas"). | Ninguna (presentacional). |
| **LocationInfo** | Muestra dónde está ubicado el alojamiento. | Ciudad, región o dirección. | Ninguna (presentacional). |
| **PhotoGallery** | Galería de imágenes que muestra fotografías del alojamiento. | Presentación de diapositivas de imágenes. | El usuario navega entre fotos. |
| **GalleryNavigation** | Controles para moverse entre las imágenes de la galería. | Botones/flechas anterior y siguiente. | Click cambia la foto mostrada. |
| **HostInfo** | Sección que presenta el perfil del anfitrión. | Avatar del anfitrión, nombre y antigüedad como anfitrión. | Ninguna (presentacional). |
| **HostAvatar** | Muestra la foto de perfil del anfitrión. | Imagen circular del anfitrión. | Ninguna (presentacional). |
| **AmenitiesGrid** | Cuadrícula que lista los servicios del alojamiento. | Cuadrícula de elementos de servicio. | Ninguna (presentacional). |
| **AmenityItem** | Un servicio o amenidad individual. | Icono y etiqueta (ej. WiFi, Cocina). | Ninguna (presentacional). |
| **BookingCard** | Tarjeta flotante o en barra lateral para acciones de reserva. | Precio por noche, contador de huéspedes, botón CTA. | El usuario interactúa con el contador de huéspedes y el CTA. |
| **PricePerNight** | Muestra la tarifa por noche en la tarjeta de reserva. | Precio formateado con etiqueta de moneda. | Ninguna (presentacional). |
| **GuestCounter** | Permite al usuario seleccionar el número de huéspedes. | Visualización numérica con controles de incremento/decremento. | Botones para aumentar o disminuir el número de huéspedes. |
| **BookingCTA** | Botón de llamada a la acción para iniciar una reserva. | Texto del botón (ej. "Reservar" o "Reserva ahora"). | Click activa la acción de reserva. |
| **LoadingState** | Se muestra mientras se obtienen los datos de la habitación. | Animación de esqueleto o spinner. | Ninguna (visual temporal). |

**Componentes reutilizables:** `Navbar`, `Rating` (o `RatingAndReviews`), `PricePerNight`, `LoadingState` se comparten con otras páginas.

### 3.4 Componentes Compartidos

Los siguientes componentes se utilizan en múltiples vistas y deben implementarse una vez y reutilizarse:

- **Navbar** — Presente en las tres páginas. Contiene el logo, la barra de búsqueda y el menú de usuario.
- **AccommodationCard** — Utilizado en la cuadrícula de la Home y en la lista del Catálogo. Garantiza la consistencia visual.
- **PricePerNight** — Utilizado en `AccommodationCard` y `BookingCard`.
- **Rating** — Utilizado en `AccommodationCard` y en la página de detalle de habitación.
- **LoadingState** — Utilizado en la Home (carga inicial de datos) y en la página de detalle de habitación (carga de datos de la habitación).
- **Logo** — Presente en la Navbar, enlaza a la página de inicio.
- **SearchBar** — Presente en la Navbar, impulsa la funcionalidad de búsqueda en todas las páginas.

Este enfoque compartido sigue una arquitectura de componentes modular donde cada componente tiene una única responsabilidad, minimizando la duplicación y maximizando la reutilización.

## 4. Perfil del Usuario y Objetivos

El usuario de esta plataforma es un viajero o visitante que busca alojamiento temporal. Su objetivo principal es descubrir, explorar, comparar y evaluar lugares para hospedarse. Comienza navegando por la página de inicio para ver las opciones disponibles y explorar diferentes categorías (Playa, Mansiones, Tendencias, etc.). Puede buscar alojamientos escribiendo palabras clave y filtrar resultados seleccionando una categoría. Una vez que encuentra opciones interesantes, pasa a la vista de catálogo para comparar múltiples alojamientos lado a lado, utilizando la ordenación por precio para reducir las opciones. Cuando una propiedad específica capta su atención, visita la página de detalle para examinar las fotografías, consultar la valoración y las reseñas, conocer al anfitrión, revisar los servicios disponibles, verificar el precio por noche y seleccionar el número de huéspedes. Finalmente, inicia el proceso de reserva a través del botón de llamada a la acción.

## 5. Restricciones de Diseño y Desarrollo

### Diseño Responsive y Mobile-First

- La interfaz está diseñada inicialmente para un viewport móvil de 375 px.
- La adaptación a escritorio comienza a partir de 768 px.
- La página Home muestra una columna de alojamientos en móvil y múltiples columnas en escritorio.
- La página de Catálogo muestra el mapa debajo de la lista en móvil y a la derecha de la lista en escritorio.
- Todos los componentes deben adaptarse a diferentes tamaños de pantalla.

### Arquitectura de Componentes

- Los componentes deben ser pequeños, enfocados y tener una única responsabilidad.
- Los componentes reutilizables deben compartirse entre las vistas cuando corresponda.
- El componente `AccommodationCard` debe reutilizarse tanto en la Home como en el Catálogo.
- Se debe evitar la duplicación de código y lógica.

### Tecnologías y Estilos

- Construido con Next.js 16.
- Escrito en TypeScript.
- Estilizado exclusivamente con clases de utilidad de Tailwind CSS.
- Utiliza App Router de Next.js para el enrutamiento.
- Todos los componentes son componentes funcionales de React definidos con `const`.
- No se permiten estilos inline mediante `style={{}}`.

### Restricciones de Librerías UI

- **No se permiten librerías de componentes preconstruidos.**
- Esto incluye shadcn/ui, Material UI (MUI), Ant Design, Chakra UI y librerías similares.
- Todos los componentes visuales deben construirse desde cero utilizando componentes de React y clases de utilidad de Tailwind CSS.

### Navegación

- La navegación entre las tres páginas debe funcionar sin recargar completamente el navegador.
- Utilizar el componente `Link` de Next.js para la navegación interna.
- No utilizar etiquetas `<a href>` planas para rutas internas.

### Interactividad

La interfaz debe incluir las siguientes interacciones:

- Filtro de búsqueda en tiempo real.
- Selección de categoría con estado visual activo.
- Ordenación de resultados por precio (ascendente / descendente).
- Estados de carga simulados.
- Navegación en galería de fotos (anterior / siguiente).
- Ajuste del número de huéspedes (incremento / decremento).
- Navegación entre páginas.

# Home — Visual Analysis & Component Specification

## A. Visual Overview

La referencia `airbnb-home.jpg` muestra una captura móvil vertical de la Home de Airbnb en español. La página utiliza un fondo predominantemente blanco, texto oscuro y secciones apiladas en una sola columna. La parte superior visible comienza con un control de búsqueda en forma de cápsula; no se ven un logo ni un menú de usuario en esta captura, por lo que su presencia en la composición no puede confirmarse visualmente.

Debajo de la búsqueda aparece un selector de tres modos ("Todo", "Alojamientos" y "Experiencias"). El contenido continúa como una secuencia extensa de secciones temáticas. Cada sección combina un título alineado a la izquierda, un botón circular con flecha a la derecha y una fila horizontal de tarjetas visuales. Se ven dos tarjetas completas y parte de una tercera en varias filas, lo que indica que el contenido continúa horizontalmente más allá del ancho mostrado. Las fotografías grandes, las etiquetas superpuestas y los títulos de sección organizan la jerarquía visual.

La captura incluye secciones de experiencias, alojamientos por ciudad o destino, hoteles, servicios y recomendaciones de viaje. Al final, el contenido cambia a un bloque de inspiración con pestañas y enlaces, seguido de grupos de enlaces informativos y una franja de idioma, moneda, redes sociales y datos legales.

## B. Layout Structure

- **Cabecera:** control de búsqueda centrado y ancho, con forma de cápsula y sombra/borde sutil; debajo, selector horizontal de modos. No se aprecia una navegación de marca separada.
- **Contenido principal:** una columna de secciones apiladas. Cada encabezado comparte la alineación izquierda; su botón de flecha se alinea a la derecha.
- **Filas de tarjetas:** carruseles horizontales con tarjetas de ancho consistente, separación estrecha y esquinas redondeadas en las imágenes. El borde derecho deja ver parcialmente la tarjeta siguiente, señal visual de contenido desplazable o recortado por el viewport.
- **Información de las tarjetas:** aparece inmediatamente bajo cada imagen, en bloques de texto compactos. Las imágenes pueden llevar una insignia en la esquina superior izquierda y un icono de corazón en la superior derecha.
- **Secciones visibles:** experiencias cercanas; alojamientos populares o estancias en Budapest, Granada, Lisboa, Oporto, Sevilla, Alicante, Madrid, Londres, Roma y París; experiencias en Valencia; hoteles en Madrid; servicios cercanos; inspiración para futuras escapadas.
- **Pie de página:** bloque de fondo gris muy claro, visualmente separado del contenido. Incluye pestañas de inspiración y enlaces en listas verticales, divididos por líneas finas; al final aparecen idioma, moneda, iconos sociales, copyright y enlaces legales.
- **Espaciado y medidas:** los márgenes laterales son constantes y las secciones tienen separación vertical amplia. Las dimensiones exactas no se deducen con precisión y no deben fijarse a partir de esta captura.

## C. Component Breakdown

### SearchHeader

- **Responsabilidad:** ofrecer el punto de entrada visual para iniciar una búsqueda.
- **Elementos que contiene:** campo o botón de búsqueda con icono de lupa y el texto "Empieza a buscar".
- **Estructura visual:** cápsula blanca horizontal, centrada, con bordes muy redondeados y sombra/borde discreto.
- **Distribución y alineación:** ocupa casi todo el ancho disponible, con márgenes laterales; icono y texto aparecen agrupados en el centro.
- **Estilo visual:** superficie clara, texto oscuro y tratamiento elevado sutil.
- **Comportamiento:** la captura no permite determinar qué sucede al activarlo. La búsqueda en tiempo real se mantiene como requisito funcional del proyecto, no como interacción demostrada por la imagen.
- **Relación con otros componentes:** encabeza el selector de modos y el contenido de la Home.
- **Posible reutilización:** el control de búsqueda puede compartirse con el catálogo si se mantiene la misma función.

### SearchModeSelector

- **Responsabilidad:** presentar los modos visibles de exploración.
- **Elementos que contiene:** opciones "Todo", "Alojamientos" y "Experiencias", con pequeños iconos ilustrativos.
- **Estructura visual:** fila horizontal de controles tipo píldora; "Todo" aparece visualmente resaltado frente a las otras opciones.
- **Distribución y alineación:** fila debajo de la búsqueda, alineada a la izquierda; el último elemento queda parcialmente fuera del borde de la captura.
- **Estilo visual:** fondos claros, contornos/sombras suaves y etiquetas oscuras.
- **Comportamiento:** se infiere que las opciones son seleccionables por su forma de control, aunque la captura no demuestra su resultado.
- **Relación con otros componentes:** precede y contextualiza las secciones de contenido.
- **Posible reutilización:** puede ser un control de navegación de Home independiente; no se observa en las otras páginas requeridas.

### ContentSection

- **Responsabilidad:** agrupar contenido relacionado bajo un título y presentar sus elementos en una fila horizontal.
- **Elementos que contiene:** encabezado, botón circular con flecha y carrusel de tarjetas.
- **Estructura visual:** título a la izquierda y flecha a la derecha en la misma línea; tarjetas inmediatamente debajo.
- **Distribución y alineación:** se repiten márgenes laterales y alineaciones a lo largo de la página. Las filas exceden el ancho visible.
- **Estilo visual:** encabezados oscuros de peso destacado; botón de flecha en un círculo gris claro.
- **Comportamiento:** la flecha sugiere acceso a más elementos o navegación del carrusel; la acción exacta no puede confirmarse. El desplazamiento horizontal es una inferencia basada en la tarjeta parcialmente visible.
- **Relación con otros componentes:** contiene tarjetas de alojamiento, experiencia, hotel o servicio, según la sección.
- **Posible reutilización:** patrón reutilizable para las distintas secciones de Home; no implica que todos los tipos de tarjeta tengan que compartir el mismo componente.

### AccommodationCard

- **Responsabilidad:** resumir visualmente un alojamiento o estancia dentro de una sección.
- **Elementos que contiene:** fotografía; en algunos casos, insignia "Recomendación del viajero"; icono de corazón; título; fechas; tipo de anfitrión; precio total y valoración.
- **Estructura visual:** imagen prominente con esquinas redondeadas; insignias y corazón superpuestos sobre ella; bloque de texto compacto debajo. Los datos se presentan en varias líneas.
- **Distribución y alineación:** tarjetas repetidas en filas horizontales; dos se ven completas y una tercera parcialmente en la captura.
- **Estilo visual:** fotografía como elemento dominante; textos oscuros; insignia clara en forma de píldora; corazón delineado blanco sobre la imagen. Se observan variaciones de recomendación entre tarjetas.
- **Comportamiento:** el corazón parece un control para guardar/favorito; es una inferencia por el icono. La navegación al detalle no se demuestra en la imagen, pero sí está definida en los requisitos funcionales del proyecto.
- **Relación con otros componentes:** compone las secciones de alojamientos y contiene información de precio y valoración.
- **Posible reutilización:** debe reutilizarse en Home y Catálogo, de acuerdo con los requisitos existentes. En Catálogo puede adaptarse el contenedor sin duplicar la tarjeta.

### ExperienceCard

- **Responsabilidad:** presentar una experiencia o actividad ofrecida en un destino.
- **Elementos que contiene:** fotografía, posible etiqueta "Popular", corazón, título, tipo de anfitrión, precio por viajero y valoración.
- **Estructura visual:** sigue el patrón de imagen con elementos superpuestos y texto inferior visto en las tarjetas de alojamiento, pero con datos de experiencia.
- **Distribución y alineación:** se presenta en fila horizontal dentro de una sección temática.
- **Estilo visual:** esquinas redondeadas, etiqueta clara y texto compacto; la fotografía identifica la actividad.
- **Comportamiento:** el corazón sugiere guardar la experiencia; es una inferencia visual.
- **Relación con otros componentes:** se aloja en secciones de experiencias, separadas de las secciones de alojamiento.
- **Posible reutilización:** puede compartir patrones visuales con otras tarjetas, pero sus datos (precio por viajero y anfitrión) difieren de los de un alojamiento.

### HotelCard

- **Responsabilidad:** mostrar una opción de hotel destacada.
- **Elementos que contiene:** fotografía, nombre del hotel, fechas, precio total y valoración.
- **Estructura visual:** imagen redondeada y bloque de información debajo; en la sección se antepone un título y una breve descripción.
- **Distribución y alineación:** forma parte de una fila horizontal de tarjetas.
- **Estilo visual:** coherente con el resto de las tarjetas, con fotografía dominante y texto compacto.
- **Comportamiento:** la captura no permite determinar interacciones específicas.
- **Relación con otros componentes:** aparece en una sección específica de hoteles.
- **Posible reutilización:** comparte presentación general con otras tarjetas, aunque la captura no confirma que deba ser el mismo componente de alojamiento.

### ServiceCard

- **Responsabilidad:** representar servicios cercanos disponibles.
- **Elementos que contiene:** ilustración o imagen pequeña y etiqueta, con ejemplos visibles como alquiler de coches, fotografía y chefs.
- **Estructura visual:** elemento cuadrado de fondo gris claro, con imagen centrada y etiqueta debajo.
- **Distribución y alineación:** fila horizontal de opciones.
- **Estilo visual:** fondo claro y esquinas redondeadas; menos prominente que las fotografías de alojamiento.
- **Comportamiento:** no se puede determinar a partir de la captura.
- **Relación con otros componentes:** se agrupa en la sección "Encuentra servicios cerca de ti".
- **Posible reutilización:** puede reutilizarse dentro de la sección de servicios, pero no se requiere en Catálogo o detalle según los requisitos descritos.

### TravelInspiration

- **Responsabilidad:** mostrar enlaces para explorar destinos o tipos de alojamiento.
- **Elementos que contiene:** título "Inspiración para futuras escapadas", pestañas como Populares, Playa, Ciudades e Histórico, y una lista de destinos con subtítulos descriptivos.
- **Estructura visual:** bloque de fondo gris claro; pestañas en una fila horizontal con la opción activa subrayada; enlaces organizados en dos columnas visibles.
- **Distribución y alineación:** ocupa el ancho de la página y precede a los grupos de enlaces del pie.
- **Estilo visual:** título destacado, pestañas y enlaces de texto; divisor sutil bajo la navegación.
- **Comportamiento:** las pestañas parecen seleccionables por su presentación, pero el resultado no se confirma en la imagen.
- **Relación con otros componentes:** transición entre las tarjetas de contenido y el pie de página informativo.
- **Posible reutilización:** componente específico de la Home, salvo que otras vistas incorporen una zona equivalente.

### Footer

- **Responsabilidad:** agrupar enlaces de ayuda, información para anfitriones e información corporativa, además de preferencias y datos legales.
- **Elementos que contiene:** grupos titulados "Asistencia", "Cómo ser anfitrión" y "Airbnb"; separadores; selector de idioma y moneda; iconos de redes sociales; copyright y enlaces de privacidad, condiciones y datos de la empresa.
- **Estructura visual:** listas verticales apiladas en móvil, separadas por líneas finas; bloque final de preferencias y enlaces legales.
- **Distribución y alineación:** ocupa todo el ancho y cierra la página.
- **Estilo visual:** fondo gris muy claro, tipografía oscura y enlaces con espaciado vertical.
- **Comportamiento:** los elementos se presentan como enlaces o controles, pero sus destinos y acciones no se determinan mediante la captura.
- **Relación con otros componentes:** aparece después de la inspiración para viajes.
- **Posible reutilización:** el pie de página puede compartirse entre vistas, aunque los enlaces concretos visibles corresponden a esta captura.

## D. Component Hierarchy

```text
HomePage
├── SearchHeader
├── SearchModeSelector
├── MainContent
│   ├── ContentSection (experiencias cercanas)
│   │   └── ExperienceCard
│   ├── ContentSection (alojamientos por destino)
│   │   └── AccommodationCard
│   ├── ContentSection (experiencias populares)
│   │   └── ExperienceCard
│   ├── ContentSection (hoteles)
│   │   └── HotelCard
│   ├── ContentSection (servicios cercanos)
│   │   └── ServiceCard
│   └── ContentSection (alojamientos por fechas/destino)
│       └── AccommodationCard
├── TravelInspiration
│   ├── InspirationTabs
│   └── DestinationLinks
└── Footer
	├── HelpLinks
	├── HostLinks
	├── CompanyLinks
	└── LocaleSocialAndLegal
```

La jerarquía agrupa las tarjetas por sección, en vez de crear un único grid continuo, porque así está organizado el contenido visible en la captura.

## E. Reusable Components

- **AccommodationCard:** compartida entre Home y Catálogo, tal como establece el contexto previo. Debe conservar la presentación de imagen e información, aunque cada vista puede ubicarla en un layout distinto.
- **Presentación de precio y valoración:** son piezas de información dentro de la tarjeta y también aparecen en los requisitos de detalle. Conviene mantener una presentación coherente; la captura no permite determinar si requieren componentes independientes.
- **ContentSection y carrusel horizontal:** patrón repetido en múltiples filas de Home; se pueden reutilizar para evitar duplicar estructura, manteniendo el tipo de tarjeta correspondiente a cada sección.
- **Footer:** su estructura puede compartirse si se incluye en las demás vistas; esto no se especifica como requisito funcional.
- **Búsqueda y navegación:** el control de búsqueda está visible, pero el logo y el menú global de navegación no. El buscador puede reutilizarse si conserva el comportamiento funcional acordado para Home y Catálogo.

Las tarjetas de experiencias, hoteles y servicios deben permanecer diferenciadas si sus contenidos y responsabilidades no coinciden con `AccommodationCard`. Evitar fragmentar en componentes diminutos los elementos puramente decorativos; separar únicamente elementos con contenido o comportamiento propio, como una tarjeta, una sección o un control de navegación.

## F. Responsive Considerations

### Requisitos del proyecto

- Mantener el enfoque Mobile First con referencia inicial de 375 px y adaptación de escritorio desde 768 px.
- Usar contenedores flexibles y evitar anchos rígidos que causen desbordamiento.
- Adaptar el grid de alojamientos al viewport: una columna en móvil y varias en escritorio, según el contexto existente.
- Asegurar que búsqueda, categorías, tarjetas y espaciados se ajusten a distintos tamaños.

### Observaciones e inferencias de la captura

- La captura muestra una composición móvil con contenido de ancho limitado y márgenes laterales constantes.
- Las filas de tarjetas parecen carruseles horizontales: la siguiente tarjeta queda parcialmente visible. En móvil se puede conservar ese patrón con desplazamiento horizontal; la interacción exacta no se confirma visualmente.
- El selector superior es una fila horizontal y su última opción aparece recortada. Debe evitarse que el recorte impida acceder a las opciones requeridas; el desplazamiento horizontal es una adaptación posible, inferida del encuadre.
- El pie de página presenta sus grupos en una sola columna. En escritorio podrían reorganizarse en columnas; esa disposición es una inferencia responsive, no observable en esta imagen.
- En escritorio podrían mostrarse más tarjetas por fila o sustituirse algunas filas deslizables por cuadrículas, pero la captura móvil por sí sola no determina ese comportamiento. Debe respetarse el requisito de cuadrícula responsive de Home.
- La captura no permite establecer cómo se reorganizan el logo, la búsqueda o el menú de usuario en escritorio. No definir ese comportamiento como hecho observado.

## G. Functional Requirements Mapping

| Requisito existente | Evidencia en la captura | Implicación para el proyecto |
|---|---|---|
| Navbar | Solo se ve el control de búsqueda; no se distinguen logo ni menú de usuario. | Mantener logo, búsqueda y menú de usuario como requisitos previos aunque no estén visibles en esta referencia. |
| Logo y navegación | No se observan. | No inferir diseño ni ubicación exactos; conservar navegación interna con `Link` según el contexto del proyecto. |
| Barra de búsqueda | Se ve una cápsula con lupa y "Empieza a buscar". No se muestra un campo de texto abierto. | La apariencia compacta sirve de referencia visual; la entrada de texto y su estado deben satisfacer el requisito funcional aunque no se vean en la captura. |
| Búsqueda con estado y filtrado en tiempo real | No se puede verificar visualmente. | Se conserva como requisito funcional; la imagen no demuestra el mecanismo ni el resultado. |
| Navegación de categorías | Se ve un selector "Todo / Alojamientos / Experiencias", no las categorías Playa, Mansiones, Tendencias, etc. | El selector visual de modos no sustituye las categorías requeridas en el proyecto; documentar e implementar esas categorías según los requisitos originales. |
| Categoría seleccionada | "Todo" aparece resaltado en el selector de modos. | Existe una diferencia visual de estado activo, pero no confirma el comportamiento de selección de las categorías funcionales requeridas. |
| Grid y tarjetas de alojamiento | Se ven tarjetas por secciones y en filas horizontales; no un grid continuo. | Reutilizar la tarjeta en Home y Catálogo; mantener el layout responsive exigido, usando la captura como referencia visual y no como sustitución del requisito de grid. |
| Imagen e información del alojamiento | Se ven fotografías, títulos, fechas, tipo de anfitrión y precios totales. | El contexto funcional exige al menos imagen, título, precio por noche y valoración; los campos adicionales visibles pertenecen a la referencia y no deben convertirse en requisitos no solicitados. |
| Precio por noche | La captura presenta precios totales para periodos/fechas, no una tarifa claramente indicada por noche. | Mostrar precio por noche según el requisito funcional original; no confundirlo con los totales visibles de esta referencia. |
| Valoración | Se ven estrellas y puntuaciones en las tarjetas. | La presentación de valoración sí tiene correspondencia visual; los valores concretos de la captura son ejemplos, no datos del proyecto. |
| Estado de carga | No aparece un estado de carga en la captura. | Mantener la carga simulada requerida; esta ausencia no elimina el requisito. |
| Responsive | La captura representa un viewport móvil y muestra filas de contenido parcialmente cortadas a la derecha. | Tomar como referencia la densidad, márgenes y tarjetas móviles, pero cumplir además los breakpoints y el grid definidos previamente. |

## H. Implementation Notes

- `airbnb-home.jpg` es la única fuente visual de este análisis. Las descripciones de estructura y contenido anteriores son observaciones de esa captura; las acciones de controles y los comportamientos en otros tamaños se indican como inferencias cuando corresponde.
- La página capturada contiene más tipos de contenido y secciones que los requisitos funcionales mínimos de Home. Estas secciones se documentan para representar la referencia, pero no amplían por sí solas el alcance funcional acordado.
- La captura está en español y muestra fechas, destinos, precios y valoraciones concretos. Son contenido de referencia, no datos fijos que deban copiarse al proyecto.
- Existe una diferencia importante entre la composición visual observada (secciones con filas horizontales de tarjetas) y el requisito previo de una cuadrícula responsive de alojamientos. La implementación debe preservar el requisito de grid y reutilización, usando el estilo visual de tarjetas y secciones de la captura sin asumir que una interacción de carrusel está confirmada.
- El control visible "Empieza a buscar" no demuestra por sí solo el flujo de búsqueda en tiempo real requerido. El estado de carga y las interacciones funcionales deben diseñarse conforme al contexto original, pues no aparecen en esta referencia.
- El proyecto establece Tailwind CSS, componentes React propios y ausencia de librerías UI preconstruidas; este análisis no introduce cambios a esas restricciones ni especifica medidas exactas que la imagen no permita determinar.

### Complemento de la referencia desktop

La captura `airbnb-desktop.jpg` permite precisar la cabecera y la distribución en escritorio. Presenta la misma familia visual de Airbnb, pero no muestra exactamente el mismo contenido que la captura móvil: en desktop está seleccionado el modo **Experiencias** y las secciones visibles se centran en actividades en Valencia y Airbnb Originals. Por tanto, las diferencias de contenido pueden deberse al modo activo y no solo al ancho de pantalla.

#### Elementos desktop observados

- **Cabecera en dos niveles:** en la primera fila, el logo de Airbnb queda a la izquierda; la navegación por modos ocupa la zona central; los controles de cuenta y menú aparecen a la derecha. Una línea divisoria separa la cabecera del contenido.
- **Navegación por modos:** se ven Todo, Alojamientos, Experiencias y Servicios, cada uno con un icono ilustrativo. Experiencias está activa y se identifica mediante una línea oscura debajo de su etiqueta. Los controles de perfil y menú son botones circulares en el extremo derecho.
- **Búsqueda segmentada:** debajo de la navegación hay una barra ancha con tres segmentos visibles: Destino ("Busca por ciudad o monumento"), Fechas ("Introduce las fechas") y Viajeros ("Añade viajeros"). Un botón circular rosa con lupa cierra la barra. La captura muestra estos controles, pero no demuestra sus interacciones.
- **Contenido de experiencias:** se observan filas tituladas "Experiencias populares en Valencia", "Disponibles hoy en Valencia", "Mañana en Valencia", "Experiencias para este fin de semana" y "Airbnb Originals". La última incluye una descripción breve bajo el título.
- **Carruseles en escritorio:** cada fila presenta cinco tarjetas visibles de ancho similar. Sus imágenes tienen esquinas redondeadas; se muestran controles circulares anterior/siguiente al extremo derecho del encabezado de cada sección. En la primera fila, el control anterior parece atenuado y el siguiente tiene mayor contraste.
- **Tarjetas de experiencia:** además de imagen, título, anfitrión, precio por viajero y valoración, pueden mostrar una etiqueta Popular u Originals, una hora o fecha en una insignia clara y un corazón superpuesto. Una tarjeta indica que la experiencia "Se activará pronto".
- **Pie de página en escritorio:** el bloque de inspiración muestra sus pestañas en una fila y enlaces en tres columnas. Los grupos Asistencia, Cómo ser anfitrión y Airbnb también se distribuyen en tres columnas. Idioma, moneda, redes sociales y enlaces legales se alinean en una franja inferior.

#### Especificación adicional de componentes

**DesktopNavigation**

- **Responsabilidad:** mostrar la marca, los modos principales de exploración y los controles de usuario en la cabecera de escritorio.
- **Elementos que contiene:** logo, opciones Todo/Alojamientos/Experiencias/Servicios con iconos, botón de perfil y botón de menú.
- **Estructura visual:** una fila horizontal; la opción activa tiene un subrayado oscuro. La marca y los controles de usuario quedan en extremos opuestos.
- **Distribución y alineación:** logo a la izquierda, modos en la zona central y controles a la derecha.
- **Estilo visual:** fondo claro, iconos y texto oscuros; botones de usuario en círculos gris muy claro.
- **Comportamiento:** Experiencias aparece activa; la selección de los demás modos no se observa. El perfil y el menú parecen controles interactivos, pero sus acciones no se deducen de la imagen.
- **Relación con otros componentes:** es la parte superior de la cabecera, separada de la búsqueda segmentada que aparece debajo.
- **Posible reutilización:** patrón de navegación global que puede compartirse entre páginas si el diseño final mantiene esta cabecera.

**SegmentedSearchBar**

- **Responsabilidad:** agrupar parámetros de búsqueda y una acción para iniciar la búsqueda.
- **Elementos que contiene:** segmentos Destino, Fechas y Viajeros, separadores verticales y botón circular de búsqueda.
- **Estructura visual:** cápsula blanca horizontal con sombra suave; cada segmento tiene una etiqueta y una descripción secundaria; botón rosa al extremo derecho.
- **Distribución y alineación:** centrada debajo de la navegación, con segmentos en línea y anchos visualmente equilibrados.
- **Estilo visual:** texto principal oscuro, texto secundario gris, divisores sutiles y acción de búsqueda rosa.
- **Comportamiento:** la captura muestra los campos y el botón, pero no revela desplegables, selección ni resultados. Fechas y viajeros son elementos visibles en la referencia, no requisitos funcionales añadidos al proyecto.
- **Relación con otros componentes:** completa la cabecera desktop y complementa el control compacto observado en móvil.
- **Posible reutilización:** puede ser parte de Navbar/encabezado si se adopta esa estructura; su adaptación móvil debe considerar el control compacto que aparece en `airbnb-home.jpg`.

**CarouselControls**

- **Responsabilidad:** ofrecer controles visuales para navegar por una fila de tarjetas.
- **Elementos que contiene:** botones circulares de anterior y siguiente.
- **Estructura visual:** controles agrupados al extremo derecho del encabezado de sección; el anterior puede aparecer atenuado.
- **Distribución y alineación:** alineados con el título y separados del carrusel de tarjetas.
- **Estilo visual:** círculos gris claro con flechas de contraste variable.
- **Comportamiento:** la disposición sugiere navegación entre elementos, pero el cambio de tarjetas no se demuestra en una imagen fija.
- **Relación con otros componentes:** asociado a `ContentSection` y a sus filas horizontales.
- **Posible reutilización:** reutilizable para todas las secciones que presenten este patrón.

#### Actualización responsive y de requisitos

- En escritorio, la captura muestra cinco tarjetas de experiencia por fila y controles de carrusel; en móvil se ven aproximadamente dos tarjetas completas y parte de otra. Esto confirma la adaptación del número visible de tarjetas, pero no sustituye el requisito previo de una cuadrícula responsive de alojamientos.
- La navegación de modos de escritorio incluye Servicios y la barra de búsqueda incluye Destino, Fechas y Viajeros. Estos elementos describen la referencia visual; los requisitos funcionales del proyecto siguen siendo búsqueda textual en tiempo real y categorías de alojamiento, y no deben ampliarse automáticamente con filtros de fechas, viajeros o servicios.
- La captura desktop sí muestra logo y controles de perfil/menú, mientras que la captura móvil comienza directamente con el control compacto de búsqueda y no muestra esos elementos. Se documenta como una diferencia entre capturas; no puede determinarse solo con ellas si la cabecera móvil los oculta o si quedaron fuera del encuadre.
- En ambas referencias se observan tarjetas agrupadas por secciones y carruseles, mientras que el requisito de Home pide un grid de alojamientos. La implementación debe conservar dicho requisito; el patrón de carrusel puede servir como referencia visual para secciones adicionales, no como reemplazo obligatorio del grid.
- El pie de página cambia de listas apiladas en la captura móvil a columnas en desktop. Es la adaptación responsive más clara del pie observada entre las dos referencias.
