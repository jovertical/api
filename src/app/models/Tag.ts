import { Column, Entity } from 'typeorm'
import Model from './Model'

@Entity({ name: 'tags' })
export default class Tag extends Model {
  @Column()
  name: string

  @Column({ nullable: true })
  description?: string
}
