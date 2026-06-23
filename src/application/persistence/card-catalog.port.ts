import type { CardDefinition, CardGroup } from '@/domain/card/card-definition'

export interface CardCatalogPort {
  getAll(): Promise<CardDefinition[]>
  getByGroup(group: CardGroup): Promise<CardDefinition[]>
}