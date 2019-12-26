import { Request, Response } from 'express'
import {
  controller,
  httpGet,
  httpPost,
  httpPatch,
  httpDelete,
  interfaces,
  request,
  response,
  requestParam
} from 'inversify-express-utils'
import { Repository } from 'typeorm'
import Project from 'app/models/Project'
import Tag from 'app/models/Tag'
import validate from 'app/middlewares/validate.middleware'
import { getRepository, slugify } from 'helpers/utils'
import { storeValidation, updateValidation } from './projects.validation'

@controller('/projects')
export default class ProjectsController implements interfaces.Controller {
  /**
   * Get a list of Project
   */
  @httpGet('/')
  public async list(
    @request() req: Request,
    @response() res: Response
  ): Promise<Response> {
    let projects = await this.repo().then(r => r.find())

    if (req.query.hasOwnProperty('tag')) {
      projects = await getRepository(Tag)
        .then(async repo =>
          repo.findOne({ name: req.query.tag }, { relations: ['projects'] })
        )
        .then((tag: Tag | undefined) => {
          if (tag === undefined) {
            return projects
          }
          return tag.projects
        })
    }

    return res.send(projects)
  }

  /**
   * Create a Project
   */
  @httpPost('/', validate(storeValidation))
  public async store(
    @request() req: Request,
    @response() res: Response
  ): Promise<Response> {
    const project = await this.repo().then(repo =>
      repo.save({
        slug: slugify(req.body.name),
        name: req.body.name,
        description: req.body.description,
        startDate: req.body.startDate,
        sourceUrl: req.body.sourceUrl,
        projectUrl: req.body.projectUrl,
        iconUrl: req.body.iconUrl
      })
    )

    return res.status(201).send(project)
  }

  /**
   * Show a Project
   */
  @httpGet('/:slug')
  public async show(
    @response() res: Response,
    @requestParam('slug') slug: string
  ): Promise<Response> {
    const projects = await this.repo().then(repo => repo.find())
    const project = await this.repo().then(repo => repo.findOneOrFail({ slug }))
    const i = projects.findIndex(p => p.id === project.id)

    return res.send({
      ...project,
      previousProject: i > 0 ? projects[i - 1] : null,
      nextProject: i + 1 < projects.length ? projects[i + 1] : null
    })
  }

  /**
   * Update a Project
   */
  @httpPatch('/:slug', validate(updateValidation))
  public async update(
    @request() req: Request,
    @response() res: Response,
    @requestParam('slug') slug: string
  ): Promise<Response> {
    const project = await this.repo().then(async repo => {
      const project = await repo.findOneOrFail({ slug })
      project.slug = slugify(req.body.name)
      project.name = req.body.name
      project.description = req.body.description
      project.startDate = req.body.startDate
      project.sourceUrl = req.body.sourceUrl
      project.projectUrl = req.body.projectUrl
      project.iconUrl = req.body.iconUrl

      return this.repo().then(repo => repo.save(project))
    })

    return res.send(project)
  }

  /**
   * Delete a Project
   */
  @httpDelete('/:slug')
  public async delete(
    @response() res: Response,
    @requestParam('slug') slug: string
  ): Promise<Response> {
    await this.repo().then(async repo => {
      const project = await repo.findOneOrFail({ slug })
      return repo.remove([project])
    })

    return res.sendStatus(200)
  }

  /**
   * The project's repository
   */
  private repo(): Promise<Repository<Project>> {
    return getRepository(Project)
  }
}
