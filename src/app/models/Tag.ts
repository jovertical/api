import { Column, Entity, ManyToMany } from 'typeorm'
import Model from './Model'
import Project from './Project'

@Entity({ name: 'tags' })
export default class Tag extends Model {
  @Column()
  name: string

  @Column({ nullable: true })
  description?: string

  @ManyToMany(
    type => Project,
    project => project.tags
  )
  projects: Project[]
}
