import refugioCards from '@/infrastructure/cards/refugio.cards.json'
import yermoCards from '@/infrastructure/cards/yermo.cards.json'
import type { CardCatalogPort } from '@/application/persistence/card-catalog.port'
import type { CardDefinition, CardGroup } from '@/domain/card/card-definition'

const cardCatalog: Record<CardGroup, CardDefinition[]> = {
  refugio: refugioCards as CardDefinition[],
  yermo: yermoCards as CardDefinition[],
}

export class JsonCardCatalogRepository implements CardCatalogPort {
  async getAll(): Promise<CardDefinition[]> {
    return [...cardCatalog.refugio, ...cardCatalog.yermo]
  }

  async getByGroup(group: CardGroup): Promise<CardDefinition[]> {
    return [...cardCatalog[group]]
  }
}