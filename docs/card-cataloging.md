# Card Cataloging

## Purpose

The current card-content task is to catalog the 78 original Castle Combo cards before adapting them into final Colony Combo cards.

This is a source-data phase, not a final Colony Combo mechanics phase.

## Current Goal

1. Register each original card correctly.
2. Change the character name to avoid a direct relationship with Castle Combo.
3. Preserve original zone, cost, shields, messenger movement, immediate action, and end-game scoring.
4. After all 78 cards are reviewed, adapt theme, resources, icons, and final terminology to Colony Combo.

The working source file is `data/cards-original.json`.

Only cards explicitly reviewed and provided should be added. Do not invent the remaining entries.

## Important Rule

Do not transform mechanics while cataloging.

Original source terms such as `gold`, `keys`, `castle`, `village`, and `messenger` are allowed inside cataloging metadata because they describe the source game. They should not leak into final Colony Combo UI copy or final card text.

## Future Equivalences

- Gold -> Scrap.
- Keys -> Batteries or an equivalent special resource, pending final review.
- Castle -> Shelter.
- Village -> Wasteland.
- Messenger -> Walkie-talkie.

Spanish UI equivalents:

- Scrap -> Chatarra.
- Batteries -> Baterias.
- Shelter -> Refugio.
- Wasteland -> Yermo.
- Walkie-talkie -> Walkie-talkie.

## Working Schema

```ts
export const cards = [
  {
    id: "village_001",
    originalName: "Bandolero",
    newName: "Saqueador Errante",
    zone: "village",
    futureZone: "yermo",
    cost: 7,
    currentResource: "gold",
    futureResource: "scrap",
    printedShields: ["agriculture"],
    messengerMove: {
      moves: false,
      to: null,
    },
    instantEffect: {
      type: "gainKeysByNeighborBanner",
      params: {
        target: "castleBanner",
        amount: 1,
        neighborScope: "oneNeighbor",
      },
    },
    endGameEffect: {
      type: "pointsPerSet",
      params: {
        points: 7,
        set: ["villageBanner", "villageBanner", "villageBanner"],
      },
    },
    reviewed: true,
    notes: "Last Village card received.",
  },
]
```

## Example Entry Notes

`village_001` tracks the original Castle Combo card `Bandolero`.

Its temporary Colony Combo character name is `Saqueador Errante`.

Mechanically, it still belongs to the original Village source data and keeps the original gold cost, shield, immediate effect, and scoring structure until the full card set is reviewed.

For review rules and the JSON schema, see `docs/cards-review.md`.
