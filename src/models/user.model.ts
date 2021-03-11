import { 
  Model, 
  DataTypes,
  Optional
} from 'sequelize'
import bcrypt from 'bcrypt'

import { sequelize } from '../config'
import Address from './address.model'

interface UserAttributes {
  id: string
  name: string
  email: string
  password: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string
  public name!: string
  public email!: string
  password!: string

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  validPassword: (candidatePassword: string) => Promise<boolean>
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
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	tableName: 'users',
	sequelize,
  defaultScope: {
    attributes: { exclude: ['password'] }
  },
  scopes: {
    withPassword: {
      attributes: { include: ['password'] }
    }
  }
})

User.hasMany(Address, {
  sourceKey: "id",
  foreignKey: "user_id",
  as: "addresses", // this determines the name in `associations`!
});

User.addHook('beforeCreate', async (fields: any) => {  
	fields.password = await bcrypt.hash(fields.password, 8)
})

User.prototype.validPassword = function(candidatePassword: string) {
  const passwordHash = this.password
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, passwordHash, (err: any, same: boolean) => {
      if (err) {
        return reject(err)
      }

      resolve(same)
    })
  })
}

export default User