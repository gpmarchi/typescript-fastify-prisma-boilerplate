import { randomUUID } from 'crypto'

interface PermissionProps {
  slug: string
  title: string
  description: string
}

export class Permission {
  public id: string
  public slug: string
  public title: string
  public description: string

  constructor(props: PermissionProps, id?: string) {
    this.slug = props.slug
    this.title = props.title
    this.description = props.description
    this.id = id ?? randomUUID()
  }
}
