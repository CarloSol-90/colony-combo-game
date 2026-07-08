# Cards Review

## Purpose

`data/cards-original.json` is the master source file for cataloging the 78 original Castle Combo cards before adapting them into final Colony Combo cards.

At the moment, only reviewed cards that have been explicitly provided should be added. Do not invent missing cards or unclear effects.

## Field Meaning

- `originalName`: kept only as temporary internal reference to the original Castle Combo card.
- `colonyName`: the working Colony Combo character name. It can stay empty until the naming review phase.
- `originalZone`: original Castle Combo zone. Allowed values are `castle` and `village`.
- `colonyZone`: future Colony Combo zone. `castle` maps to `refuge`; `village` maps to `wasteland`.
- `cost`: original printed cost.
- `futureCostResource`: Colony Combo purchase resource. This is always `scrap`.
- `shields`: original printed shields.
- `messengerMove`: original messenger movement as structured data.
- `instantEffect`: original immediate effect as structured data.
- `endGameEffect`: original final scoring effect as structured data.
- `storage`: optional storage metadata for cards that store resources. Use `null` when the card does not store anything.
- `reviewed`: whether the card entry has been checked.
- `notes`: uncertainty, source comments, or review notes.

## Important Rules

- Do not adapt mechanics yet.
- Do not convert effects into final Colony Combo terminology yet.
- Do not use free-text effects when structured data is possible.
- If a card is unclear, set `reviewed` to `false` and explain the issue in `notes`.
- After the 78 source cards are reviewed, create `data/cards-colony.json` for the final Colony Combo adaptation.

## Future Equivalences

- Keys -> Batteries.
- Castle -> Refuge.
- Village -> Wasteland.
- Messenger -> Walkie-talkie.

Spanish UI terminology:

- Scrap -> Chatarra.
- Batteries -> Baterias.
- Refuge -> Refugio.
- Wasteland -> Yermo.

## Schema

```json
{
  "id": "V-001",
  "originalName": "",
  "colonyName": "",
  "originalZone": "village",
  "colonyZone": "wasteland",
  "cost": 0,
  "futureCostResource": "scrap",
  "shields": [],
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
    "type": "",
    "params": {}
  },
  "storage": null,
  "reviewed": true,
  "notes": ""
}
```
