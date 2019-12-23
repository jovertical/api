import { Request, Response } from 'express'
import {
  controller,
  httpGet,
  httpPost,
  httpPatch,
  httpDelete,
  request,
  response,
  requestParam
} from 'inversify-express-utils'
import { Repository } from 'typeorm'
import validateMiddleware from 'app/middlewares/validateMiddleware'
import Tag from 'app/models/Tag'
import { storeValidation } from 'app/validations/tagsValidation'
import { getRepository, now } from 'helpers/utils'
import Controller from './Controller'

@controller('/tags')
export default class TagsController extends Controller {
  /**
   * Get a list of Tag
   */
  @httpGet('/')
  public async list(@response() res: Response) {
    const tags = await this.repo().then(repo => repo.find())

    return res.send(tags)
  }

  /**
   * Create a Tag
   */
  @httpPost('/', validateMiddleware(storeValidation))
  public async store(@request() req: Request, @response() res: Response) {
    const tag = await this.repo().then(repo =>
      repo.save({
        name: req.body.name,
        description: req.body.description
      })
    )

    return res.status(201).send(tag)
  }

  /**
   * Show the Tag
   */
  @httpGet('/:name')
  public async show(
    @requestParam('name') name: string,
    @response() res: Response
  ): Promise<Response> {
    const tag = await this.repo().then(repo => repo.findOneOrFail({ name }))
    return res.send(tag)
  }

  /**
   * Update the Tag
   */
  @httpPatch('/:name')
  public async update(
    @request() req: Request,
    @requestParam('name') name: string,
    @response() res: Response
  ): Promise<Response> {
    const tag = await this.repo().then(async repo => {
      const tag = await repo.findOneOrFail({ name })
      tag.name = req.body.name
      tag.description = req.body.description
      tag.updatedAt = now()
      return this.repo().then(repo => repo.save(tag))
    })

    return res.send(tag)
  }

  /**
   * Delete the Tag
   */
  @httpDelete('/:name')
  public async destroy(
    @requestParam('name') name: string,
    @response() res: Response
  ): Promise<Response> {
    await this.repo().then(async repo => {
      const tag = await repo.findOneOrFail({ name })
      return repo.remove([tag])
    })

    return res.sendStatus(200)
  }

  private repo(): Promise<Repository<Tag>> {
    return getRepository(Tag)
  }
}
