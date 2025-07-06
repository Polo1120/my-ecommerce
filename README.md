# 🛒 Sistema de Detalle de Producto y Carrito

Este proyecto implementa una página de producto con variantes, selección de cantidad y un carrito lateral (MiniCart), utilizando React y Context API.

---

## 📦 Componentes Principales

### `ProductPage.tsx`

Contiene la página principal del producto. Incluye:

- `ProductGallery`: galería de imágenes con miniaturas.
- `SkuSelector`: permite seleccionar color y talla.
- `QuantitySelector`: selector de cantidad.
- `AddToCartButton`: botón para agregar al carrito.
- `DiscountBadge`: muestra el porcentaje de descuento.
- `ProductShelf`: carrusel de productos relacionados.
- Estado centralizado con:
  - SKU seleccionado
  - Color y talla
  - Imagen principal
  - Cantidad

---

### `ProductGallery.tsx`

Galería de imágenes del producto.

- Usa `react-slick` para sliders.
- En desktop incluye miniaturas verticales sincronizadas.
- Al seleccionar una imagen, actualiza la imagen principal.

---

### `SkuSelector.tsx`

Permite seleccionar combinaciones válidas de color y talla.

- Muestra error textual si no se selecciona alguna variante requerida.
- Cambia el SKU seleccionado dinámicamente.
- Los valores se actualizan en el estado principal de `ProductPage`.

---

### `AddToCartButton.tsx`

Botón para agregar al carrito:

- Valida si se seleccionó color y talla.
- Agrega al carrito: SKU, cantidad, color y talla.
- Abre automáticamente el `MiniCart`.

---

### `MiniCart.tsx`

Carrito tipo drawer (desplegable desde el lado derecho).

- Contenido:
  - Imagen
  - Nombre
  - Color y talla
  - Cantidad
  - Precios (con y sin descuento)
- Funcionalidad:
  - Eliminar productos del carrito.
  - Mostrar subtotal, total y total ahorrado.
  - Botón para ir al carrito completo.
- Cierre al hacer clic fuera del drawer.

---

### `QuantitySelector.tsx`

Permite seleccionar la cantidad deseada antes de agregar al carrito.

---

### `DiscountBadge.tsx`

Componente visual que muestra el porcentaje de descuento si existe diferencia entre `listPrice` y `price`.

---

### `ProductPrice.tsx`

Componente reutilizable que muestra:

- Precio anterior tachado (`listPrice`)
- Precio actual (`price`)

---

## ⚙️ Contextos Globales

### `CartContext.tsx`

Maneja el carrito global:

- Estado persistente en `localStorage`.
- Métodos:
  - `addToCart(sku, quantity, color, talla)`
  - `removeFromCart(item)`

### `MiniCartContext.tsx`

Controla el estado de visibilidad del `MiniCart`.

- Métodos:
  - `openMiniCart()`
  - `closeMiniCart()`

---

## 🔄 Lógica de Estado

- `ProductPage` mantiene el estado central del producto seleccionado.
- `SkuSelector` actualiza `sku`, `color`, y `talla`.
- `QuantitySelector` actualiza la cantidad.
- Al hacer clic en `AddToCartButton`, se actualiza el carrito global.
- El MiniCart se abre automáticamente.

---

## 💾 Persistencia

- El carrito se guarda y recupera desde `localStorage` automáticamente.

---

## 🧠 Consideraciones Técnicas

- Se usaron `useMemo` y `useCallback` para evitar renders innecesarios.
- Se manejó un control cuidadoso de dependencias en `useEffect`.
- Los errores de validación se muestran en la UI, no como alertas.
- El proyecto está preparado para escalar fácilmente con múltiples variantes o atributos adicionales.

---

## 🚀 Librerías Usadas

- `react-slick`: sliders para galería de imágenes y vitrinas.
- `classnames`: manejo dinámico de clases (opcional).
- `localStorage`: persistencia de carrito.

---

## 📌 Futuras Mejoras

- Página completa de carrito.
- Integración con checkout.
- Manejo de stock por SKU.
- Agregar animaciones de entrada/salida en el MiniCart.

---

## 🧑‍💻 Autor

Desarrollado por Edgardo Polo.
