import { randomUUID } from 'crypto'

interface RoleProps {
  slug: string
  title: string
  description: string
  permissions?: string[]
}

export class Role {
  public id: string
  public slug: string
  public title: string
  public description: string
  public permissions: string[]

  constructor(props: RoleProps, id?: string) {
    this.slug = props.slug
    this.title = props.title
    this.description = props.description
    this.permissions = props.permissions ?? []
    this.id = id ?? randomUUID()
  }
}
