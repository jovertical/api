import { Repository } from 'typeorm'
import Project from 'app/models/Project'
import Tag from 'app/models/Tag'
import { getRepository, slugify } from 'helpers/utils'

/**
 * Seed sample tags
 */
export const seedTags = (): Promise<any> => {
  return getRepository(Tag).then((repo: Repository<Tag>) =>
    repo.save([{ name: 'website' }, { name: 'android' }, { name: 'ios' }])
  )
}

/**
 * Seed sample projects.
 */
export const seedProjects = (): Promise<any> => {
  return getRepository(Project).then((repo: Repository<Project>) =>
    repo.save([
      {
        slug: slugify('Workgalore'),
        name: 'Workgalore',
        startDate: '2019-06-16'
      },
      {
        slug: slugify('Caribbean Waterpark'),
        name: 'Caribbean Waterpark',
        startDate: '2018-01-22'
      }
    ])
  )
}

/**
 * Find a Tag, if no key is specified, give the last one.
 *
 * @param id The key of the model
 */
export const findTag = (id = undefined): Promise<Tag> => {
  return getRepository(Tag).then((repo: Repository<Tag>) =>
    repo.findOneOrFail(id)
  )
}

/**
 * Find a Project, if no key is specified, give the last one.
 *
 * @param id The key of the model
 */
export const findProject = (id = undefined): Promise<Project> => {
  return getRepository(Project).then((repo: Repository<Project>) =>
    repo.findOneOrFail(id)
  )
}
