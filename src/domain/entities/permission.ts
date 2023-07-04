import { Entity } from '@/shared/entities/entity'
import { Slug } from './value-objects/slug'

interface PermissionProps {
  slug: Slug
  title: string
  description: string
}

export class Permission extends Entity<PermissionProps> {}
