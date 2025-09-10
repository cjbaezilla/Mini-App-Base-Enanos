# Enanos Club - MiniKit NFT Collection

Una aplicación web3 completa construida con MiniKit que presenta una colección épica de 188 NFTs únicos de enanos, cada uno con su propia historia legendaria y poderes mágicos extraordinarios. Esta aplicación funciona como un Frame de Farcaster, permitiendo a los usuarios explorar, buscar y mintear enanos únicos en un mundo de fantasía inmersivo.

## 🏔️ Sobre el Proyecto

El Enanos Club es más que una simple colección de NFTs; es una experiencia narrativa completa que transporta a los usuarios a las Montañas Legendarias, donde cada enano tiene una historia épica única, estadísticas especiales y poderes mágicos extraordinarios. Desde herreros legendarios hasta maestros de versos infinitos que controlan la realidad misma, cada personaje está cuidadosamente diseñado con metadatos ricos y lore extenso.

La aplicación está construida con las tecnologías más modernas del ecosistema web3, utilizando MiniKit de Coinbase para la integración con Farcaster y OnchainKit para las interacciones blockchain, todo sobre la red Base para transacciones rápidas y económicas.

## 🎯 Características Principales

### Colección Épica de NFTs
- **188 enanos únicos** con metadatos completos siguiendo estándares de OpenSea
- **10 series temáticas** que van desde artesanos tradicionales hasta maestros de versos infinitos
- **30+ atributos únicos** por cada enano, incluyendo estadísticas, especialidades y lore
- **Sistema de rareza** basado en especialidades y niveles de maestría
- **Lore extenso** con historias de 200+ palabras por personaje

### Experiencia de Usuario Inmersiva
- **Diseño vintage/sepia** que evoca pergaminos antiguos y libros de leyendas
- **Navegación intuitiva** con sistema de pestañas y búsqueda avanzada
- **Sistema de cache inteligente** para carga rápida y experiencia fluida
- **Responsive design** optimizado para dispositivos móviles
- **Animaciones sutiles** que mejoran la experiencia sin sobrecargar

### Integración Web3 Completa
- **Conexión de wallets** a través de OnchainKit
- **Sistema de mint** integrado con contratos inteligentes
- **Balance de USDC** en tiempo real
- **Transacciones en Base** para costos mínimos
- **Frame de Farcaster** para compartir y descubrir

## 🏗️ Arquitectura Técnica

### Stack Tecnológico
- **Frontend**: Next.js 15.3.3 con React 18 y TypeScript
- **Web3**: OnchainKit de Coinbase + Wagmi para interacciones blockchain
- **Blockchain**: Base (L2 de Ethereum) para transacciones rápidas
- **Estilos**: Tailwind CSS con tema personalizado vintage
- **Deploy**: Exportación estática optimizada para CDN

### Estructura del Proyecto
```
app/
├── api/                    # Endpoints de API
│   ├── notify/            # Sistema de notificaciones
│   └── webhook/           # Webhooks para eventos
├── components/            # Componentes React reutilizables
│   ├── ui/               # Componentes base (Button, Icon, etc.)
│   ├── NFTHeader.tsx     # Header con botón Save Frame
│   ├── NFTBottomNav.tsx  # Navegación inferior
│   ├── Home.tsx          # Página principal
│   ├── NFTBookCard.tsx   # Tarjeta de NFT estilo libro
│   └── ...               # Otros componentes especializados
├── mint/                 # Página de mint de NFTs
├── nfts/                 # Página de colección
├── layout.tsx           # Layout principal con metadatos
├── page.tsx             # Página principal de la app
├── providers.tsx        # Configuración de MiniKit
└── theme.css           # Variables CSS personalizadas
```

### Sistema de Datos
- **Metadatos estáticos**: 188 archivos JSON con metadatos completos
- **Sistema de cache**: LocalStorage con expiración de 24 horas
- **Carga optimizada**: Lazy loading y cache inteligente
- **Búsqueda avanzada**: Filtros por múltiples atributos

## 🎨 Sistema de Diseño

### Paleta de Colores Vintage
El diseño utiliza una paleta de colores cálidos que evoca pergaminos antiguos y libros de leyendas:

- **Colores principales**: Ámbar (#8b4513), naranja, marrón
- **Fondos**: Tonos sepia y beige con transparencias
- **Acentos**: Púrpura y cian para elementos especiales
- **Efectos**: Glassmorphism sutil y gradientes vintage

### Tipografía Épica
- **Títulos**: "Playfair Display" - fuente serif elegante y cursiva
- **Cuerpo**: "Crimson Text" - fuente serif legible y clásica
- **Jerarquía**: Tamaños responsivos que se adaptan al dispositivo

### Componentes Visuales
- **Tarjetas estilo libro**: Diseño que simula páginas de pergamino
- **Efectos de papel**: Texturas y sombras que evocan documentos antiguos
- **Animaciones sutiles**: Transiciones suaves que mejoran la experiencia
- **Iconografía temática**: Iconos personalizados que reflejan el mundo de fantasía

## 🎭 Colección de Enanos

### Series Temáticas

#### 1. Artesanos y Guerreros Tradicionales (1-20)
Los enanos clásicos de las montañas, especializados en herrería, minería y construcción. Incluye personajes como Gimli Piedrabrillante, maestro tallador de gemas mágicas, y Balin Rocaescudo, guardián defensivo de las fortalezas.

#### 2. Maestros Elementales (21-49)
Enanos que han dominado los elementos primordiales: fuego, hielo, viento, tierra, agua, rayo, luna, sol y estrellas. Cada uno controla un elemento específico con poderes únicos.

#### 3. Maestros de Runas y Especialistas (50-74)
Especialistas en artes mágicas avanzadas: runas, armaduras, venenos, pociones, bestias y escudos. Incluye maestros del tiempo, la muerte, la vida y otros conceptos abstractos.

#### 4. Maestros de Magia Avanzada (75-99)
Enanos que han trascendido los límites de la magia tradicional, controlando dimensiones, realidades y universos completos.

#### 5. Maestros de Versos Infinitos (100-188)
Los enanos más poderosos, capaces de controlar versos infinitos y realidades múltiples. Cada uno representa un nivel diferente de poder cósmico.

### Sistema de Atributos
Cada enano tiene más de 30 atributos únicos:

- **Estadísticas básicas**: Fuerza, Resistencia, Inteligencia, Sabiduría, Carisma, Destreza
- **Información personal**: Edad, Altura, Peso, Clan, Montaña Natal
- **Especialidades**: Habilidades únicas y herramientas favoritas
- **Poderes mágicos**: Elementos controlados y resistencias especiales
- **Lore personal**: Títulos honoríficos, enemigos jurados, historias épicas

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js 18+ 
- npm, yarn, pnpm o bun
- Cuenta de Farcaster
- Wallet compatible (MetaMask, Coinbase Wallet, etc.)

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd mini_app

# Instalar dependencias
npm install
# o
yarn install
# o
pnpm install
# o
bun install
```

### Configuración de Variables de Entorno
Crea un archivo `.env.local` con las siguientes variables:

```bash
# Configuración de OnchainKit
NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME=Enanos Club
NEXT_PUBLIC_URL=https://tu-dominio.com
NEXT_PUBLIC_ICON_URL=https://tu-dominio.com/icon.png
NEXT_PUBLIC_ONCHAINKIT_API_KEY=tu_api_key

# Metadatos del Frame de Farcaster
FARCASTER_HEADER=tu_header
FARCASTER_PAYLOAD=tu_payload
FARCASTER_SIGNATURE=tu_signature
NEXT_PUBLIC_APP_ICON=https://tu-dominio.com/icon.png
NEXT_PUBLIC_APP_SUBTITLE=Bienvenido a las Montañas Legendarias
NEXT_PUBLIC_APP_DESCRIPTION=188 enanos únicos con historias épicas
NEXT_PUBLIC_APP_SPLASH_IMAGE=https://tu-dominio.com/splash.png
NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR=#8b4513
NEXT_PUBLIC_APP_PRIMARY_CATEGORY=Gaming
NEXT_PUBLIC_APP_HERO_IMAGE=https://tu-dominio.com/hero.png
NEXT_PUBLIC_APP_TAGLINE=Explora el Enanos Club
NEXT_PUBLIC_APP_OG_TITLE=Enanos Club - Colección NFT
NEXT_PUBLIC_APP_OG_DESCRIPTION=188 enanos únicos con historias épicas
NEXT_PUBLIC_APP_OG_IMAGE=https://tu-dominio.com/og-image.png

# Configuración de Redis (opcional)
REDIS_URL=tu_redis_url
REDIS_TOKEN=tu_redis_token
```

### Ejecución en Desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### Build para Producción
```bash
npm run build
npm run export
```

Los archivos estáticos se generarán en la carpeta `out/`

## 🎮 Funcionalidades

### Exploración de la Colección
- **Vista general**: Estadísticas de la colección y enanos destacados
- **Búsqueda avanzada**: Por nombre, clase, atributos y más
- **Filtros múltiples**: Por especialidad, montaña, clan, etc.
- **Ordenamiento**: Por edad, fuerza, inteligencia, maestría
- **Vista detallada**: Página individual para cada enano

### Sistema de Mint
- **Interfaz intuitiva**: Selección de cantidad y confirmación
- **Integración Web3**: Conexión de wallet y transacciones
- **Estado en tiempo real**: Balance de USDC y disponibilidad
- **Feedback visual**: Estados de carga y confirmación

### Navegación y UX
- **Navegación por pestañas**: Inicio, Mint, Colección
- **Sistema de cache**: Carga rápida y experiencia fluida
- **Responsive design**: Optimizado para todos los dispositivos
- **Animaciones sutiles**: Mejoran la experiencia sin distraer

## 🔧 Desarrollo y Personalización

### Estructura de Componentes
Los componentes están organizados siguiendo principios de reutilización y mantenibilidad:

- **Componentes base**: Button, Icon, Slider en `components/ui/`
- **Componentes específicos**: NFTHeader, NFTBottomNav, etc.
- **Páginas**: Home, Mint, NFTs con lógica específica
- **Hooks personalizados**: useNFTsCache, useNFTContract, etc.

### Sistema de Temas
El tema está centralizado en `theme.css` con variables CSS que permiten:

- **Personalización fácil**: Cambiar colores y estilos
- **Consistencia visual**: Variables reutilizables
- **Modo oscuro/claro**: Soporte automático
- **Responsive**: Adaptación a diferentes pantallas

### Integración Web3
La integración blockchain está manejada por:

- **OnchainKit**: Conexión de wallets y transacciones
- **Wagmi**: Hooks para interacciones con contratos
- **Base**: Red L2 para transacciones rápidas
- **Contratos inteligentes**: Sistema de mint y gestión

## 📊 Metadatos y Datos

### Estructura de Metadatos
Cada NFT sigue el estándar de OpenSea con:

```json
{
  "name": "Gimli Piedrabrillante",
  "description": "Historia épica del personaje...",
  "image": "/metadata/imgs/1.png",
  "external_url": "https://tu-dominio.com/nfts/1",
  "background_color": "8b4513",
  "attributes": [
    {
      "trait_type": "Clase",
      "value": "Tallador de Gemas"
    },
    {
      "trait_type": "Fuerza",
      "value": 95,
      "display_type": "number",
      "max_value": 100
    }
    // ... más atributos
  ]
}
```

### Sistema de Cache
- **Cache local**: LocalStorage con expiración de 24 horas
- **Carga optimizada**: Solo carga datos cuando es necesario
- **Indicador visual**: Muestra si los datos vienen del cache
- **Refresh manual**: Botón para actualizar datos

## 🤝 Contribución

### Cómo Contribuir
1. Fork del repositorio
2. Crear rama para nueva funcionalidad
3. Implementar cambios con tests
4. Crear Pull Request con descripción detallada

### Estándares de Código
- **TypeScript**: Tipado estricto para mejor mantenibilidad
- **ESLint**: Linting automático para consistencia
- **Prettier**: Formateo automático del código
- **Conventional Commits**: Mensajes de commit descriptivos

## 📚 Recursos y Documentación

### Documentación Técnica
- [MiniKit Documentation](https://docs.base.org/builderkits/minikit/overview)
- [OnchainKit Documentation](https://www.base.org/builders/onchainkit/getting-started)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Recursos del Proyecto

Si quieres profundizar en los detalles técnicos o entender mejor cómo está estructurado todo, aquí tienes los archivos de documentación:

- **[Documentación completa de los NFTs](NFTs_Enanos_Documentacion.md)** - Aquí encontrarás toda la información sobre los 188 enanos, sus historias, atributos y el sistema de rareza que implementamos
- **[Guía de estilo y diseño](STYLE_GUIDE.md)** - Los principios de diseño, paleta de colores y cómo mantener la consistencia visual en el proyecto
- **[Documentación técnica del proyecto](PROJECT.md)** - Detalles sobre la arquitectura, decisiones técnicas y cómo está organizado todo el código

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.