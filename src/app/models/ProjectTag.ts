import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'project_tag' })
export default class ProjectTag {
  @PrimaryGeneratedColumn()
  id?: number
}
