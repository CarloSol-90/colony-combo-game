# Cards Review

## Purpose

`data/cards-original.json` is the master source file for cataloging the 78 original Castle Combo cards before adapting them into final Colony Combo cards.

At the moment, only reviewed cards that have been explicitly provided should be added. Do not invent missing cards or unclear effects.

## Field Meaning

- `originalName`: kept only as temporary internal reference to the original Castle Combo card.
- `newName`: the working Colony Combo character name.
- `zone`: original Castle Combo zone. Allowed values are `castle` and `village`.
- `futureZone`: future Colony Combo zone. `castle` maps to `refugio`; `village` maps to `yermo`.
- `cost`: original printed cost.
- `currentResource`: original resource. During cataloging this remains `gold`.
- `futureResource`: future Colony Combo resource. This is `scrap`.
- `printedShields`: original printed shields.
- `messengerMove`: original messenger movement as structured data.
- `instantEffect`: original immediate effect as structured data.
- `endGameEffect`: original final scoring effect as structured data.
- `reviewed`: whether the card entry has been checked.
- `notes`: uncertainty, source comments, or review notes.

## Important Rules

- Do not adapt mechanics yet.
- Do not convert effects into final Colony Combo terminology yet.
- Do not use free-text effects when structured data is possible.
- If a card is unclear, set `reviewed` to `false` and explain the issue in `notes`.
- After the 78 source cards are reviewed, create `data/cards-colony.json` for the final Colony Combo adaptation.

## Future Equivalences

- Gold -> Scrap.
- Keys -> Batteries.
- Castle -> Shelter.
- Village -> Wasteland.
- Messenger -> Walkie-talkie.

Spanish UI terminology:

- Scrap -> Chatarra.
- Batteries -> Baterias.
- Shelter -> Refugio.
- Wasteland -> Yermo.

## Schema

```json
{
  "id": "village_001",
  "originalName": "Bandolero",
  "newName": "Saqueador Errante",
  "zone": "village",
  "futureZone": "yermo",
  "cost": 7,
  "currentResource": "gold",
  "futureResource": "scrap",
  "printedShields": ["agriculture"],
  "messengerMove": {
    "moves": false,
    "to": null
  },
  "instantEffect": {
    "type": "gainKeysByNeighborBanner",
    "params": {
      "target": "castleBanner",
      "amount": 1,
      "neighborScope": "oneNeighbor"
    }
  },
  "endGameEffect": {
    "type": "pointsPerSet",
    "params": {
      "points": 7,
      "set": ["villageBanner", "villageBanner", "villageBanner"]
    }
  },
  "reviewed": true,
  "notes": "Last Village card received. Source mechanics are preserved for cataloging."
}
```
