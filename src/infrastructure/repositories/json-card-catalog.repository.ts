import shelterCards from '@/infrastructure/cards/shelter.cards.json'
import wastelandCards from '@/infrastructure/cards/wasteland.cards.json'
import type { CardCatalogPort } from '@/application/persistence/card-catalog.port'
import type { CardDefinition, CardGroup } from '@/domain/card/card-definition'

const cardCatalog: Record<CardGroup, CardDefinition[]> = {
  shelter: shelterCards as CardDefinition[],
  wasteland: wastelandCards as CardDefinition[],
}

export class JsonCardCatalogRepository implements CardCatalogPort {
  async getAll(): Promise<CardDefinition[]> {
    return [...cardCatalog.shelter, ...cardCatalog.wasteland]
  }

  async getByGroup(group: CardGroup): Promise<CardDefinition[]> {
    return [...cardCatalog[group]]
  }
}
