import { expect } from 'vitest'
import { Slug } from './slug'

describe('Create Slug', () => {
  it('should be able to create a new slug from text', () => {
    const slug = Slug.createFromText('Slug text')

    expect(slug.toString()).toEqual('slug-text')
  })

  it('should be able to create a new slug from slug formatted text', () => {
    const slug = Slug.createFromText('slug-text')

    expect(slug.toString()).toEqual('slug-text')
  })

  it('should be able to create a new slug from invalid text', () => {
    const slug = Slug.createFromText('Slug--text-')

    expect(slug.toString()).toEqual('slug-text')
  })
})
