import { randomUUID } from 'crypto'

interface PermissionProps {
  slug: string
  name: string
  description: string
}

export class Permission {
  public id: string
  public slug: string
  public name: string
  public description: string

  constructor(props: PermissionProps, id?: string) {
    this.slug = props.slug
    this.name = props.name
    this.description = props.description
    this.id = id ?? randomUUID()
  }
}
