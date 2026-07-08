<p align="center">
  <img src="./src/assets/colony-combo.png" alt="Colony Combo" width="720" />
</p>

# Colony Combo

Mobile-first digital board game about building a survivor colony in a hostile, post-apocalyptic world. The project started with mechanical inspiration from Castle Combo, but the goal is to evolve it into its own game identity: pixel art, relaxed dark humor, exaggerated cartoon survivors, improvised technology, and a tone inspired by Fallout, Caravan, Borderlands, and Castle Combo.

## Current Status

The project is built with:

- Vite + Vue 3 + TypeScript
- Pinia
- Vue Router
- vue-i18n
- Tailwind CSS
- Vitest
- Vue Testing Library

The architecture is split into clear layers:

- `domain`: pure game rules.
- `application`: use cases and ports.
- `infrastructure`: concrete adapters such as JSON and LocalStorage.
- `presentation`: Vue, routes, stores, and views.
- `lang`: English and Spanish translation files.

## Project Principles

- Domain code must not import Vue, Pinia, Tailwind, LocalStorage, or browser APIs.
- Cards are loaded from JSON.
- Visible UI text must come from i18n translations.
- The UI must be mobile first, vertical, and designed for one-screen gameplay.
- Vue components must not hardcode card abilities.
- Initial persistence uses LocalStorage, but the architecture must allow future migration to Laravel API, Supabase, SQLite, or another backend without changing the domain.
- Code, IDs, and internal naming use English.
- Spanish lives only in translation files.

## Definitive Game Terminology

Colony Combo uses its own post-apocalyptic vocabulary. These terms are the source of truth for documentation, UI copy, card text, and future mechanics:

- **Scrap**: main resource, represented by a pixel-art gear icon. Scrap is used to buy cards.
- **Batteries**: secondary resource. Batteries replace keys and are used to activate effects, satisfy card requirements, and support secondary mechanics.
- **Shelter**: equivalent zone to Castle. In Spanish UI copy this is `Refugio`.
- **Wasteland**: equivalent zone to Village. In Spanish UI copy this is `Yermo`.
- **Walkie-talkie**: replaces the messenger. Moving the messenger is now described as switching the walkie-talkie between zones.

Previous purchase-resource terminology must not be used in Colony Combo data, UI copy, or card text.

## Card Design

Cards keep the inherited structure from Castle Combo while using Colony Combo terminology:

- Scrap cost.
- Faction.
- Character.
- Immediate action.
- End-game scoring rule.

Example terminology:

- `Cost: 3 scrap`.
- `Gain 2 scrap`.
- `Discount 1 scrap`.

## Card Cataloging Phase

Before adapting the full card set to Colony Combo, the project is cataloging the 78 original Castle Combo cards as source material.

During this cataloging phase:

- Register each original card accurately.
- Rename each character to avoid a direct one-to-one relationship with Castle Combo.
- Preserve the original zone, cost, shields, messenger movement, immediate action, and end-game scoring.
- Do not transform mechanics to Colony Combo terminology yet.
- Apply Colony Combo resources, icons, and thematic rewrites only after the full 78-card set has been reviewed.

See [Card Cataloging](docs/card-cataloging.md) and [Cards Review](docs/cards-review.md) for the working schema and mapping rules.

## Face-Down Cards

When a player does not buy a card, they gain:

- 6 scrap.
- 2 batteries.

Then they place a Shelter or Wasteland card back face down in their 3x3 colony grid.

Face-down cards count as valid cards. Some future cards may score from having face-down cards in the colony.

## Future Mechanics

The following mechanics are approved for the larger version of the game, once the card pool grows toward roughly 100 cards. They are documented here only; they are not part of the current implementation yet.

- Radio cards.
- Majorities.
- Risk and reward.
- Evolution cards.
- Dual-category cards.
- Permanent events.
- Sacrifice cards.
- Reactions.
- Combo chains.
- Exchange cards.

## Scripts

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Run tests:

```bash
npm run test:run
```

Create production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Development Note

This project must be run with Vite during development.

Do not use Go Live or Live Server to open the HTML directly. They do not process Vue Single File Components or TypeScript imports inside `src/`, so the app can appear blank.

## Initial Roadmap

- Build application use cases.
- Connect a Pinia store to those use cases.
- Model placement rules for the 3x3 colony.
- Model players, markets, radio, and turn state.
- Implement card purchase and placement.
- Add face-down cards.
- Add scoring and AI.
- Build the mobile-first game UI.
- Add profile, achievements, statistics, audio, and local saves.
