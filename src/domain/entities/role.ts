import { Entity } from '@/shared/entities/entity'
import { Slug } from './value-objects/slug'

interface RoleProps {
  slug: Slug
  title: string
  description: string
  permissions?: string[]
}

export class Role extends Entity<RoleProps> {}
