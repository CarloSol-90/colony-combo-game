export type CardZone = 'castle' | 'village'

export type ColonyZone = 'refuge' | 'wasteland'

export type Shield =
  | 'military'
  | 'religion'
  | 'craft'
  | 'agriculture'
  | 'nobility'
  | 'nature'
  | 'fortification'
  | 'wealth'

export interface MessengerMove {
  moves: boolean
  to: CardZone | null
}

export interface CardEffect {
  type: string
  params: Record<string, unknown>
}

export interface OriginalCard {
  id: string
  originalName: string
  colonyName: string
  originalZone: CardZone
  colonyZone: ColonyZone
  cost: number
  futureCostResource: 'scrap'
  shields: Shield[]
  messengerMove: MessengerMove
  instantEffect: CardEffect
  endGameEffect: CardEffect
  storage: Record<string, unknown> | null
  reviewed: boolean
  notes: string
}
