import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm'
import Model from './Model'
import ProjectImage from './ProjectImage'
import Tag from './Tag'

@Entity({ name: 'projects' })
export default class Project extends Model {
  @Column()
  slug: string

  @Column()
  name: string

  @Column({ nullable: true })
  description?: string

  @Column()
  startDate: string

  @Column({ nullable: true })
  sourceUrl?: string

  @Column({ nullable: true })
  projectUrl?: string

  @Column({ nullable: true })
  iconUrl?: string

  @Column({ nullable: true })
  featuredAt?: string

  @OneToMany(
    type => ProjectImage,
    image => image.project,
    { eager: true }
  )
  images: ProjectImage[]

  @ManyToMany(type => Tag, { eager: true })
  @JoinTable()
  tags: Tag[]
}
