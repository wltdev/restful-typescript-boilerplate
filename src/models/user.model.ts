import {
  DataTypes,
  Model,
  Sequelize,
  BuildOptions
} from 'sequelize'

class User extends Model {
  readonly id: string
  name: string
  email: string
  password: string
  created_at: Date
  updated_at: Date
}

type UserStatic = typeof Model & {
  new (value?: Partial<User>, options?: BuildOptions): User
}

export function build (sequelize: Sequelize) {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true
  }) as UserStatic

  return User
}