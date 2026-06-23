export type CardGroup = 'refugio' | 'yermo'

export type ShieldType = 'comunidad' | 'exploracion' | 'recursos' | 'seguridad' | 'liderazgo' | 'oficios'

export type RadioMovement = 'none' | 'to_refugio' | 'to_yermo'

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