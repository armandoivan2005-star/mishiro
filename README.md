# MISHIRO — PWA informativa

Sitio estático del videojuego educativo MISHIRO construido con HTML semántico, CSS, Tailwind CSS y JavaScript nativo. Presenta su universo, biomas, mecánicas, propuesta de aprendizaje, estado de desarrollo y equipo creador.

## Tecnologías

- HTML5 sin frameworks.
- Tailwind CSS compilado localmente.
- CSS propio para el pixel art, la dirección visual y las animaciones.
- JavaScript nativo para navegación, instalación y estado de conexión.
- Service worker y manifiesto web para su funcionamiento como PWA.

## Preparar el proyecto

```powershell
npm.cmd install
npm.cmd run build:css
```

Para trabajar en los estilos de Tailwind en modo continuo:

```powershell
npm.cmd run watch:css
```

## Ejecutar localmente

La PWA necesita un servidor HTTP para registrar el service worker. Desde esta carpeta:

```powershell
python -m http.server 4173 --directory dist
```

Después abre `http://127.0.0.1:4173`.

## Contenido

- Presentación general de MISHIRO.
- Icono SVG del pez dorado reproducido a partir de la referencia original del proyecto.
- Icono pixel art del checkpoint luminoso basado en la referencia visual del proyecto.
- Icono oficial de MISHIRO con versiones optimizadas de 192 y 512 píxeles.
- Premisa, escenarios y peces dorados coleccionables.
- Tres biomas observados en el prototipo: bosque luminoso, bosque del ocaso y cordillera helada.
- Ciclo de juego y sistemas principales.
- Explicación de la mecánica educativa.
- Presentación de Armando Iván Castillo Ramírez, Jesús D. Chávez Rojas y Gerardo I. Ruiz Soto.
- Identidad técnica, estado del prototipo y resultados iniciales de aceptación.
- Navegación adaptable, modo offline e instalación como PWA.
