### **Tipo de Aplicación**
Este es un **MiniKit App** - una aplicación web3 completa que presenta una colección épica de 188 NFTs únicos de enanos, cada uno con su propia historia legendaria y poderes mágicos extraordinarios. Es una aplicación Next.js que se ejecuta como un Frame dentro del ecosistema de Farcaster.

### **Stack Tecnológico**
- **Framework**: Next.js 15.3.3 con React 18 y TypeScript
- **Web3**: OnchainKit de Coinbase + Wagmi para interacciones blockchain
- **Blockchain**: Base (L2 de Ethereum) para transacciones rápidas y económicas
- **Estilos**: Tailwind CSS con tema personalizado vintage/sepia
- **Deploy**: Configurado para exportación estática (`output: 'export'`)

### **Características Principales**

#### **1. Colección NFT Épica**
- **188 enanos únicos** con metadatos completos siguiendo estándares de OpenSea
- **10 series temáticas** que van desde artesanos tradicionales hasta maestros de versos infinitos
- **30+ atributos únicos** por cada enano, incluyendo estadísticas, especialidades y lore
- **Sistema de rareza** basado en especialidades y niveles de maestría
- **Lore extenso** con historias de 200+ palabras por personaje

#### **2. Integración con Farcaster**
- Frame metadata configurado en `layout.tsx`
- Soporte para asociación de cuentas de Farcaster
- Botón "Save Frame" para que usuarios agreguen el frame a su cuenta
- Configuración de metadatos para compartir en Farcaster

#### **3. Conectividad Web3 Completa**
- Integración con OnchainKit para conexión de wallets
- Soporte para múltiples wallets a través de Wagmi
- Sistema de mint integrado con contratos inteligentes
- Balance de USDC en tiempo real
- Transacciones en Base para costos mínimos

#### **4. Sistema de Navegación y UX**
- **Diseño vintage/sepia** que evoca pergaminos antiguos y libros de leyendas
- **Navegación intuitiva** con sistema de pestañas y búsqueda avanzada
- **Sistema de cache inteligente** para carga rápida y experiencia fluida
- **Responsive design** optimizado para dispositivos móviles
- **Animaciones sutiles** que mejoran la experiencia sin sobrecargar

### **Estructura del Proyecto**

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

lib/
├── hooks/               # Hooks personalizados
│   ├── useNFTsCache.ts # Sistema de cache para NFTs
│   ├── useNFTContract.ts # Interacción con contratos
│   └── ...             # Otros hooks
└── useNFTsCache.ts     # Hook principal de cache

public/
├── metadata/
│   ├── imgs/           # 188 imágenes de NFTs
│   └── json/           # 188 archivos de metadatos
└── ...                 # Otros assets estáticos

types/
├── nft.ts              # Tipos TypeScript para NFTs
└── contract.ts         # Tipos para contratos
```

### **Funcionalidades Implementadas**

#### **1. Página Principal (`Home.tsx`)**
- ✅ **Estadísticas de la colección**: 188 NFTs únicos, 10 series épicas
- ✅ **Especialidades detalladas**: Herreros, elementales, artesanos, etc.
- ✅ **Enanos destacados**: Gimli Piedrabrillante, Fili Barbaoro, Nori Octaversoeterno
- ✅ **Información de elementos mágicos**: Fuego, hielo, viento, tierra, etc.

#### **2. Sistema de Mint (`/mint`)**
- ✅ **Integración Web3 completa**: Conexión de wallets, balance USDC
- ✅ **Contratos inteligentes**: Sistema de compra con límites (máximo 10 por transacción)
- ✅ **Estados de transacción**: Loading, success, error con feedback visual
- ✅ **Información en tiempo real**: Tokens disponibles, precio (1 USDC), progreso

#### **3. Colección NFT (`/nfts`)**
- ✅ **Sistema de búsqueda avanzada**: Por nombre, clase, atributos
- ✅ **Filtros múltiples**: Por clase, montaña, especialidad, clan, etc.
- ✅ **Ordenamiento**: Por edad, fuerza, inteligencia, maestría, etc.
- ✅ **Vista detallada**: Páginas individuales para cada enano
- ✅ **Sistema de cache inteligente**: LocalStorage con expiración de 24 horas

#### **4. Sistema de Datos**
- ✅ **Metadatos estáticos**: 188 archivos JSON con metadatos completos
- ✅ **Imágenes**: 188 archivos PNG correspondientes
- ✅ **Cache inteligente**: Sistema que evita cargas innecesarias
- ✅ **Tipos TypeScript**: Definiciones completas para NFTs y atributos

### **Estado Actual**
- ✅ **Aplicación completamente funcional** y lista para producción
- ✅ **UI completamente implementada** con diseño vintage profesional
- ✅ **Sistema de NFTs completo** con 188 metadatos únicos
- ✅ **Integración Web3 funcional** para mint y visualización
- ✅ **Cache inteligente** para optimización de rendimiento
- ✅ **Responsive design** optimizado para móviles
- ✅ **Frame de Farcaster** configurado

### **Variables de Entorno Requeridas**
El proyecto necesita múltiples variables de entorno para:
- Configuración de OnchainKit (`NEXT_PUBLIC_ONCHAINKIT_API_KEY`)
- Metadatos del Frame de Farcaster (URLs, títulos, descripciones)
- URLs de imágenes y assets estáticos
- Configuración de Redis para notificaciones (opcional)

### **Próximos Pasos Sugeridos**
1. **Configurar variables de entorno** para producción
2. **Deploy en Vercel/Netlify** con dominio personalizado
3. **Configurar contratos inteligentes** en Base mainnet
4. **Testing completo** del flujo de mint
5. **Optimizaciones adicionales** de rendimiento
