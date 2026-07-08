# Card Cataloging

## Purpose

The current card-content task is to catalog the 78 original Castle Combo cards before adapting them into final Colony Combo cards.

This is a source-data phase, not a final Colony Combo mechanics phase.

## Current Goal

1. Register each original card correctly.
2. Leave the future Colony Combo character name in `colonyName`.
3. Preserve original zone, cost, shields, messenger movement, immediate action, and end-game scoring.
4. After all 78 cards are reviewed, adapt theme, resources, icons, and final terminology to Colony Combo.

The working source file is `data/cards-original.json`.

Only cards explicitly reviewed and provided should be added. Do not invent the remaining entries.

## Important Rule

Do not transform mechanics while cataloging.

Source terms such as `keys`, `castle`, `village`, and `messenger` are allowed inside effect metadata while they describe source mechanics. Scrap terminology is already final and must be used for purchase costs, resource gains, storage, and scoring metadata.

## Future Equivalences

- Keys -> Batteries or an equivalent special resource, pending final review.
- Castle -> Refuge.
- Village -> Wasteland.
- Messenger -> Walkie-talkie.

Spanish UI equivalents:

- Scrap -> Chatarra.
- Batteries -> Baterias.
- Refuge -> Refugio.
- Wasteland -> Yermo.
- Walkie-talkie -> Walkie-talkie.

## Working Schema

```ts
export const cards = [
  {
    id: "V-001",
    originalName: "Bandolero",
    colonyName: "",
    originalZone: "village",
    colonyZone: "wasteland",
    cost: 7,
    futureCostResource: "scrap",
    shields: ["agriculture"],
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
    storage: null,
    reviewed: true,
    notes: "Last Village card received.",
  },
]
```

## Example Entry Notes

`V-001` tracks the original Castle Combo card `Bandolero`.

Its future Colony Combo character name lives in `colonyName`.

Mechanically, it still belongs to the original Village source data and keeps the original cost value, shield, immediate effect, and scoring structure until the full card set is reviewed.

For review rules and the JSON schema, see `docs/cards-review.md`.
