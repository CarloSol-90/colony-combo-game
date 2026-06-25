export type CardZone = 'castle' | 'village'

export type FutureZone = 'refugio' | 'yermo'

export type Shield =
  | 'military'
  | 'religion'
  | 'craft'
  | 'agriculture'
  | 'nobility'
  | 'nature'
  | 'fortification'

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
  newName: string
  zone: CardZone
  futureZone: FutureZone
  cost: number
  currentResource: 'gold'
  futureResource: 'scrap'
  printedShields: Shield[]
  messengerMove: MessengerMove
  instantEffect: CardEffect
  endGameEffect: CardEffect
  reviewed: boolean
  notes: string
}
