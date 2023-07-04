import { randomUUID } from 'crypto'
import { Slug } from './value-objects/slug'

interface PermissionProps {
  slug: Slug
  title: string
  description: string
}

export class Permission {
  public id: string
  public slug: Slug
  public title: string
  public description: string

  constructor(props: PermissionProps, id?: string) {
    this.slug = props.slug
    this.title = props.title
    this.description = props.description
    this.id = id ?? randomUUID()
  }
}
