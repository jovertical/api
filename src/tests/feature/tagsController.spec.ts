import 'reflect-metadata'
import { cleanUpMetadata } from 'inversify-express-utils'
import * as request from 'supertest'
import app from 'bootstrap'
import Tag from 'app/models/Tag'
import { getRepository } from 'helpers/utils'
import { seedTags, findTag } from 'tests/utils'
import { Repository } from 'typeorm'

describe('Tags Controller', () => {
  beforeAll(async () => {
    cleanUpMetadata()
    await seedTags()
  })

  it('should list the tags', async () => {
    await request(app)
      .get('/tags')
      .expect(200)
      .then(res => {
        expect(res.body).toHaveLength(3)
        expect(res.body).toContainEqual(
          expect.objectContaining({ name: 'website' })
        )
      })
  })

  it('should create a tag', async () => {
    const attributes = { name: 'rest' }

    await request(app)
      .post('/tags')
      .send(attributes)
      .expect(201)
      .then(res => {
        expect(res.body).toMatchObject(attributes)
      })

    await getRepository(Tag)
      .then(repo => repo.find())
      .then(tags => {
        expect(tags).toContainEqual(
          expect.objectContaining({ name: attributes.name })
        )
      })
  })

  it('should show the tag', async () => {
    const tag = await findTag()

    await request(app)
      .get(`/tags/${tag.name}`)
      .send(tag)
      .expect(200)
      .then(res => {
        expect(res.body).toMatchObject(tag)
      })
  })

  it('should update the tag', async () => {
    const tag = await findTag()
    const name = 'ai'
    const attributes = { name }

    await request(app)
      .patch(`/tags/${tag.name}`)
      .send(attributes)
      .expect(200)
      .then(res => {
        expect(res.body).toMatchObject(attributes)
      })

    await getRepository(Tag)
      .then((repo: Repository<Tag>) => repo.findOneOrFail({ name }))
      .then((updatedTag: Tag) => {
        expect(updatedTag).toMatchObject(attributes)
      })
  })

  it('should delete the tag', async () => {
    const { name } = await findTag()

    await request(app)
      .delete(`/tags/${name}`)
      .expect(200)

    const result = await getRepository(Tag).then((repo: Repository<Tag>) =>
      repo.findOne({ name })
    )

    expect(result).toBeUndefined()
  })
})
