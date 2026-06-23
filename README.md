<p align="center">
  <img src="./src/assets/colony-combo.png" alt="Colony Combo" width="720" />
</p>

# Colony Combo

Juego de mesa digital mobile first inspirado mecanicamente en **Castle Combo**, reimaginado como una colonia de supervivientes. El objetivo de la primera fase es construir una partida funcional de 9 cartas, manteniendo la logica data-driven y una arquitectura preparada para crecer sin acoplar el dominio a Vue, LocalStorage o cualquier backend futuro.

## Estado actual

El proyecto ya cuenta con un scaffold funcional basado en:

- Vite + Vue 3 + TypeScript
- Pinia
- Vue Router
- vue-i18n
- Tailwind CSS
- Vitest
- Vue Testing Library

La base arquitectonica esta separada en capas:

- `domain`: reglas puras del juego.
- `application`: casos de uso y puertos.
- `infrastructure`: adaptadores concretos como JSON y LocalStorage.
- `presentation`: Vue, rutas, stores y vistas.
- `i18n`: textos visibles de la interfaz.

## Principios del proyecto

- El dominio no importa Vue, Pinia, Tailwind, LocalStorage ni APIs del navegador.
- Las cartas se cargan desde JSON.
- Los textos visibles deben venir de i18n.
- La UI debe ser mobile first, vertical y pensada para una partida sin scroll.
- Los componentes Vue no deben hardcodear habilidades de cartas.
- La persistencia inicial usa LocalStorage, pero debe poder sustituirse por API, SQLite, Supabase u otra solucion sin tocar el dominio.

## Scripts

Instalar dependencias:

```bash
npm install
```

Levantar entorno de desarrollo:

```bash
npm run dev
```

Ejecutar tests:

```bash
npm run test:run
```

Generar build de produccion:

```bash
npm run build
```

Previsualizar la build:

```bash
npm run preview
```

## Nota de desarrollo

Este proyecto debe ejecutarse con Vite durante el desarrollo.

No uses Go Live ni Live Server para abrir directamente el HTML: no procesan correctamente los Single File Components de Vue ni los imports TypeScript dentro de `src/`, por lo que la aplicacion puede aparecer en blanco.

## Roadmap inicial

- Crear casos de uso de aplicacion.
- Conectar un store Pinia a esos casos de uso.
- Montar la UI base de partida.
- Preparar modal de carta ampliada.
- Preparar vista de oponentes.
- Implementar compra, colocacion y fin de turno.
- Introducir IA facil, normal y dificil.
- Anadir tests de dominio y aplicacion.
