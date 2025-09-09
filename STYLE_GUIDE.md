# Manual de Estilo NFT - MiniKit App

## 🎨 Visión General

Este manual de estilo define el sistema de diseño para una aplicación NFT construida con MiniKit, enfocada en una experiencia móvil inmersiva y moderna. El diseño utiliza un tema oscuro por defecto con efectos glassmorphism y colores vibrantes que evocan el mundo de los NFTs.

## 🎯 Principios de Diseño

### 1. **Mobile-First**
- Diseño optimizado para dispositivos móviles
- Navegación inferior intuitiva
- Componentes táctiles con áreas de toque adecuadas

### 2. **Inmersión Digital**
- Efectos glassmorphism y transparencias
- Animaciones sutiles y fluidas
- Gradientes y efectos de brillo (glow)

### 3. **Identidad NFT**
- Colores vibrantes y contrastantes
- Tipografía distintiva
- Elementos visuales que evocan blockchain y digital art

## 🎨 Paleta de Colores

### Colores Primarios
```css
--app-accent: #ff6b35        /* Naranja vibrante - Acciones principales */
--app-purple: #8b5cf6        /* Púrpura - Elementos secundarios */
--app-cyan: #06b6d4          /* Cian - Información y datos */
--app-green: #10b981         /* Verde - Éxito y confirmaciones */
```

### Colores de Fondo
```css
--app-background: #0a0a0f           /* Fondo principal oscuro */
--app-background-secondary: #111118 /* Fondo secundario */
--app-background-tertiary: #1a1a24  /* Fondo terciario */
```

### Colores de Texto
```css
--app-foreground: #ffffff           /* Texto principal */
--app-foreground-muted: #a0a0b8     /* Texto secundario */
--app-foreground-dim: #6b6b7a       /* Texto deshabilitado */
```

### Superficies y Efectos
```css
--app-surface: rgba(255, 255, 255, 0.05)     /* Superficie base */
--app-surface-hover: rgba(255, 255, 255, 0.08) /* Superficie hover */
--app-glass-bg: rgba(255, 255, 255, 0.02)    /* Efecto cristal */
--app-card-bg: rgba(255, 255, 255, 0.03)     /* Fondo de tarjetas */
```

## 🔤 Tipografía

### Fuentes
- **Títulos (H1, H2, H3)**: [Barriecito](https://fonts.google.com/specimen/Barriecito) - Fuente display creativa
- **Texto General**: [Funnel Sans](https://fonts.google.com/specimen/Funnel+Sans) - Fuente moderna y legible

### Jerarquía Tipográfica
```css
/* Títulos */
.font-display {
  font-family: "Barriecito", cursive;
  font-weight: 400;
}

/* Texto del cuerpo */
.font-body {
  font-family: "Funnel Sans", sans-serif;
}
```

### Tamaños
- **H1**: `text-4xl md:text-5xl` (32px - 48px)
- **H2**: `text-2xl` (24px)
- **H3**: `text-lg` (18px)
- **Body**: `text-sm` (14px)
- **Small**: `text-xs` (12px)

## 🧩 Componentes

### 1. Botones

#### Variantes Disponibles
```tsx
<Button variant="primary">    // Naranja con glow
<Button variant="gradient">   // Gradiente naranja-púrpura
<Button variant="nft">        // Estilo NFT con glassmorphism
<Button variant="secondary">  // Superficie con borde
<Button variant="outline">    // Solo borde
<Button variant="ghost">      // Transparente
```

#### Tamaños
- `sm`: Pequeño (12px, padding 8px 12px)
- `md`: Mediano (14px, padding 12px 16px) - **Por defecto**
- `lg`: Grande (16px, padding 16px 24px)

### 2. Tarjetas NFT

```tsx
<NFTCard
  id={1}
  name="Cosmic Dragon"
  price="1 USDC"
  rarity="legendary"
/>
```

#### Niveles de Rareza
- **Common**: Gris - `from-foreground-muted/20 to-foreground-muted/10`
- **Rare**: Cian - `from-cyan/20 to-cyan/10`
- **Epic**: Púrpura - `from-purple/20 to-purple/10`
- **Legendary**: Naranja con animación - `from-accent/20 to-accent/10`

### 3. Navegación

#### Header Superior
- Logo a la izquierda con icono de diamante

#### Navegación Inferior
- 4 elementos principales: Inicio, Colección, Buscar, Perfil
- Efecto glassmorphism
- Estado activo con color accent

### 4. Iconos

#### Iconos Disponibles
```tsx
<Icon name="home" />         // Inicio
<Icon name="collection" />   // Colección
<Icon name="search" />       // Buscar
<Icon name="profile" />      // Perfil
<Icon name="diamond" />      // Diamante (NFT)
<Icon name="heart" />        // Favoritos
<Icon name="check" />        // Confirmación
<Icon name="plus" />         // Agregar
```

## 🎭 Efectos Visuales

### Glassmorphism
```css
.glass {
  background: var(--app-glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--app-glass-border);
}
```

### Gradientes
```css
.gradient-primary {
  background: linear-gradient(135deg, #ff6b35 0%, #8b5cf6 100%);
}

.gradient-secondary {
  background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%);
}
```

### Efectos de Brillo
```css
.glow-primary {
  box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
}

.glow-text {
  text-shadow: 0 0 10px var(--app-accent-glow);
}
```

### Animaciones
```css
.animate-fade-in     // Aparición suave
.animate-fade-out    // Desvanecimiento
.animate-glow        // Brillo pulsante
.animate-float       // Flotación suave
```

## 📱 Layout y Espaciado

### Grid System
- **Contenedor principal**: `max-w-md mx-auto` (448px máximo)
- **Padding**: `px-4` (16px) para contenido
- **Gap**: `gap-4` (16px) entre elementos

### Espaciado Vertical
- **Secciones**: `space-y-6` (24px)
- **Elementos**: `space-y-4` (16px)
- **Componentes pequeños**: `space-y-2` (8px)

### Navegación
- **Bottom nav**: `fixed bottom-0` con `pb-20` en contenido
- **Header**: `fixed top-0` con padding superior en contenido

## 🎨 Estados Interactivos

### Hover States
```css
.nft-button:hover {
  background: var(--app-surface-hover);
  border-color: var(--app-accent);
  box-shadow: 0 0 20px var(--app-accent-light);
}
```

### Active States
```css
.nft-button:active {
  background: var(--app-surface-active);
  transform: translateY(1px);
}
```

### Focus States
```css
focus:ring-2 focus:ring-offset-2 focus:ring-accent
```

## 📐 Responsive Design

### Breakpoints
- **Mobile**: `< 768px` - Diseño principal
- **Tablet**: `768px - 1024px` - Ajustes menores
- **Desktop**: `> 1024px` - No soportado (mobile-first)

### Adaptaciones
- Texto responsive: `text-4xl md:text-5xl`
- Grid adaptativo: `grid-cols-2` en móvil
- Espaciado dinámico: `py-8` en móvil, `py-12` en tablet

## 🚀 Implementación

### Variables CSS
Todas las variables están definidas en `app/theme.css` y son accesibles globalmente.

### Clases de Utilidad
Las clases personalizadas están disponibles en Tailwind:
- `.font-display` - Tipografía de títulos
- `.font-body` - Tipografía del cuerpo
- `.glass` - Efecto cristal
- `.glass-card` - Tarjeta con cristal
- `.gradient-primary` - Gradiente principal
- `.glow-primary` - Brillo principal
- `.nft-button` - Botón estilo NFT
- `.nav-glass` - Navegación con cristal

### Componentes React
Todos los componentes están en `app/components/DemoComponents.tsx`:
- `Button` - Botón con múltiples variantes
- `Icon` - Iconos SVG
- `Home` - Página principal
- `NFTHeader` - Header con logo
- `NFTBottomNav` - Navegación inferior
- `NFTCard` - Tarjeta de NFT

## 🎯 Mejores Prácticas

1. **Consistencia**: Usar siempre las variables CSS definidas
2. **Accesibilidad**: Mantener contraste adecuado y áreas de toque
3. **Performance**: Usar `transform` y `opacity` para animaciones
4. **Mobile-First**: Diseñar primero para móvil, luego adaptar
5. **Glassmorphism**: Usar con moderación para no sobrecargar
6. **Colores**: Mantener la paleta limitada y consistente

## 🔧 Personalización

Para personalizar el tema:
1. Modificar variables CSS en `app/theme.css`
2. Actualizar colores en `tailwind.config.ts`
3. Ajustar componentes en `DemoComponents.tsx`
4. Mantener la coherencia visual en todos los cambios

---

*Este manual de estilo está diseñado para crear una experiencia NFT inmersiva y moderna, optimizada para dispositivos móviles con un enfoque en la usabilidad y la estética digital.*
