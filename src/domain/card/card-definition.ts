export type CardGroup = 'shelter' | 'wasteland'

export type ShieldType =
  | 'community'
  | 'exploration'
  | 'resources'
  | 'security'
  | 'leadership'
  | 'trades'

export type RadioMovement = 'none' | 'to_shelter' | 'to_wasteland'

export interface CardDefinition {
  id: string
  name: string
  group: CardGroup
  cost: number
  shields: ShieldType[]
  immediateAbility: string
  scoringRule: string
  radioMovement: RadioMovement
  art: string
  rarity: 'common' | 'uncommon' | 'rare'
}
