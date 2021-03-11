import { Model, DataTypes, Sequelize, Optional } from 'sequelize'

import { sequelize } from '../config'

interface UserAttributes {
  id: string
  name: string
  email: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string
  public name!: string
  public email!: string

  // timestamps!
  public readonly created_at!: Date
  public readonly updated_at!: Date
}

User.init({
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
	}
}, {
	tableName: 'users',
	sequelize
})

export default User