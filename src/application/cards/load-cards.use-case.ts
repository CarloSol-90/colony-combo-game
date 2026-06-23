import type { CardCatalogPort } from '@/application/persistence/card-catalog.port'
import type { CardDefinition, CardGroup } from '@/domain/card/card-definition'

export class LoadCardsUseCase {
  private readonly cardCatalog: CardCatalogPort

  constructor(cardCatalog: CardCatalogPort) {
    this.cardCatalog = cardCatalog
  }

  async execute(group?: CardGroup): Promise<CardDefinition[]> {
    if (group) {
      return this.cardCatalog.getByGroup(group)
    }

    return this.cardCatalog.getAll()
  }
}
