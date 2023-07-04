import { randomUUID } from 'crypto'
import { Slug } from './value-objects/slug'

interface RoleProps {
  slug: Slug
  title: string
  description: string
  permissions?: string[]
}

export class Role {
  public id: string
  public slug: Slug
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
