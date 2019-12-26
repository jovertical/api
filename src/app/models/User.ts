import { Column, Entity } from 'typeorm'
import Model from './Model'

@Entity({ name: 'users' })
export default class User extends Model {
  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string
}
