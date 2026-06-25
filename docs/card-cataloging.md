# Card Cataloging

## Purpose

The current card-content task is to catalog the 78 original Castle Combo cards before adapting them into final Colony Combo cards.

This is a source-data phase, not a final Colony Combo mechanics phase.

## Current Goal

1. Register each original card correctly.
2. Change the character name to avoid a direct relationship with Castle Combo.
3. Preserve original zone, cost, shields, messenger movement, immediate action, and end-game scoring.
4. After all 78 cards are reviewed, adapt theme, resources, icons, and final terminology to Colony Combo.

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
    originalZone: "village",
    colonyZone: "wasteland",
    cost: 7,
    costResource: "gold",
    futureCostResource: "scrap",
    shields: ["agriculture"],
    messengerMove: null,
    instantEffect: {
      type: "gainKeysByNeighborBanner",
      target: "castleBanner",
      amount: 1,
      neighborScope: "oneNeighbor",
    },
    endGameScoring: {
      type: "pointsPerSet",
      points: 7,
      set: ["villageBanner", "villageBanner", "villageBanner"],
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
