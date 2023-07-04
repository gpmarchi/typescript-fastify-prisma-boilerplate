import { randomUUID } from 'crypto'

interface RoleProps {
  slug: string
  name: string
  description: string
  permissions?: string[]
}

export class Role {
  public id: string
  public slug: string
  public name: string
  public description: string
  public permissions: string[]

  constructor(props: RoleProps, id?: string) {
    this.slug = props.slug
    this.name = props.name
    this.description = props.description
    this.permissions = props.permissions ?? []
    this.id = id ?? randomUUID()
  }
}
