# Comercializadora Francisco Madariaga SpA — versión 1

Sitio web de una página para presentar Carnicería Los Vilos y Recarga Ecológica. Está hecho con HTML, CSS y JavaScript sin compilación ni dependencias de proyecto.

## Abrir y publicar

1. Abre `index.html` para una vista rápida. Para probar los mapas y enlaces, sirve esta carpeta con un servidor local (por ejemplo `npx serve .`).
2. Sube **todo el contenido de `version 1`** a la raíz de un repositorio de GitHub. `index.html` debe quedar en la raíz del repositorio.
3. En Vercel, importa ese repositorio. Selecciona **Other** como framework, activa la anulación de **Build Command** y déjalo vacío. Sin carpeta `public`, Vercel sirve los archivos desde la raíz (`.`).
4. Cuando tengas el dominio definitivo, agrega la URL absoluta a `canonical`, Open Graph, `robots.txt` y `sitemap.xml`. Después podrás enviar el sitemap a Google Search Console.

## Archivos

- `index.html`: estructura, texto, enlaces y datos estructurados.
- `styles.css`: diseño responsive y animaciones.
- `script.js`: apariciones al hacer scroll, menú móvil, barra de avance y consulta por WhatsApp.
- `assets/`: logos reales entregados por el usuario, fotografías públicas de ambos Instagram optimizadas a WebP y favicon SVG. No hay subcarpetas.
- `brief-marca.md`: fuentes, decisiones visuales y limitaciones.

## Imágenes

Los logos son los archivos entregados por el usuario. Las fotografías proceden de publicaciones públicas de `@carniceria_losvilos` y `@recargaecologica` consultadas el 8 de octubre de 2026. Se optimizaron a WebP; las fotos de locales recibieron ajustes leves de color, contraste y nitidez, y tres piezas de productos se recortaron para retirar texto promocional. No se usaron imágenes generadas por IA ni fotos de otras carnicerías o tiendas.

## Datos comerciales

El número **+56 9 9438 9822** aparece en las biografías actuales de ambas cuentas. Los horarios de Carnicería Los Vilos se tomaron de su biografía y publicaciones. El horario de Recarga Ecológica se tomó de publicaciones de 2026; su biografía lo resume de otra manera. Conviene confirmar horarios y stock antes de publicar campañas. No se muestran precios, reseñas ni stock no verificados.

## Actualizaciones

Para la versión 2 crea una carpeta hermana `version 2` y guarda solo los archivos modificados, conservando la misma ruta relativa de cada archivo. No subas las dos carpetas a la raíz del mismo deploy: integra los cambios de la versión 2 sobre una copia de la versión 1 antes de publicar.
