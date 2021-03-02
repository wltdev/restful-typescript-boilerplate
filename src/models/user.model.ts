import {
  AllowNull,
  AutoIncrement,
  Column,
  Model,
  NotEmpty,
  PrimaryKey,
  Table
} from 'sequelize-typescript'

export interface UserI {
  id?: number | string | null
  name: string
  email: string
  password: string
}

@Table({
  tableName: 'users',
  timestamps: true
})
export class User extends Model implements UserI {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?:string

  @AllowNull(false)
  @NotEmpty
  @Column
  name!: string

  @AllowNull(false)
  @NotEmpty
  @Column
  email!: string

  @AllowNull(false)
  @NotEmpty
  @Column
  password!: string
}