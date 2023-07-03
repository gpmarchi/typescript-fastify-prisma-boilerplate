import { randomUUID } from 'crypto'

export class Role {
  public id: string
  public slug: string
  public name: string
  public description: string

  constructor(slug: string, name: string, description: string, id?: string) {
    this.slug = slug
    this.name = name
    this.description = description
    this.id = id ?? randomUUID()
  }
}
