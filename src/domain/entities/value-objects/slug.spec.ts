import { expect, test } from 'vitest'
import { Slug } from './slug'

test('it should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('Slug text')

  expect(slug.value).toEqual('slug-text')
})

test('it should be able to create a new slug from invalid text', () => {
  const slug = Slug.createFromText('Slug--text-')

  expect(slug.value).toEqual('slug-text')
})
