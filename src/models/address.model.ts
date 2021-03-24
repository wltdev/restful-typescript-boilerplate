import { 
  Model, 
  DataTypes, 
  Optional,
  Association,
  BelongsToGetAssociationMixin
} from 'sequelize'

import { sequelize } from '../config'
import User from './user.model'

interface Attributes {
  id: string
  user_id: string
  zipcode: string
  street: string
  number: string
}

interface CreationAttributes extends Optional<Attributes, 'id'> {}

class Address extends Model<Attributes, CreationAttributes> implements Attributes {
  public id!: string
  public user_id!: string
  public zipcode!: string
  public street!: string
  public number!: string
  public readonly created_at!: Date
  public readonly updated_at!: Date

  public getUser!: BelongsToGetAssociationMixin<User>
  public readonly user?: User[]

  public static associations: {
    user: Association<Address, User>
  }
}

Address.init({
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true
	},
	user_id: {
		type: DataTypes.UUID,
		allowNull: false
	},
	zipcode: {
		type: DataTypes.STRING,
		allowNull: false
	},
	street: {
		type: DataTypes.STRING,
		allowNull: false
	},
	number: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	tableName: 'addresses',
	sequelize
})

export default Address