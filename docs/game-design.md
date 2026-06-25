# Colony Combo Game Design Notes

## Identity

Colony Combo is a post-apocalyptic, pixel-art card and board game with light humor and caricatured survivors. Its inspirations include Fallout, Caravan, Borderlands, and Castle Combo, but its terminology and worldbuilding should remain specific to Colony Combo.

## Resources

### Scrap

Scrap is the main resource.

- Icon: pixel-art gear.
- Function: buy cards.
- Mechanical role: same role gold had in Castle Combo.

Use `scrap` in English documentation and `chatarra` in Spanish UI copy.

Do not use gold terminology except when explaining Castle Combo inspiration.

### Batteries

Batteries are the secondary resource.

- Activate effects.
- Satisfy card requirements.
- Support secondary card mechanics.

Batteries replace keys.

## Zones

### Shelter

Shelter is the strategic colony zone.

- Castle Combo reference: Castle.
- Spanish UI term: Refugio.

### Wasteland

Wasteland is the survival and resource zone.

- Castle Combo reference: Village.
- Spanish UI term: Yermo.

## Walkie-Talkie

The walkie-talkie replaces the messenger.

Moving the messenger is now described as switching the walkie-talkie between Shelter and Wasteland.

## Card Structure

Cards keep this structure:

- Scrap cost.
- Faction.
- Character.
- Immediate action.
- End-game scoring rule.

Card text should use post-apocalyptic terminology and tone.

## Face-Down Cards

When a player does not buy a card, they gain:

- 6 scrap.
- 2 batteries.

Then they place a Shelter or Wasteland card back face down in their 3x3 colony grid.

Face-down cards count as valid cards. Some future cards can score from them.

## Future Mechanics

These mechanics are approved for a later larger version of the game, around a 100-card card pool. Do not implement them yet.

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
