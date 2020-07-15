import Sequelize from 'sequelize'

const dbConfig = require('../config/database')

class Database {
  public connection: Sequelize.Sequelize;

  constructor() {
    this.init();
  }

  init(): void {
    this.connection = new Sequelize.Sequelize(dbConfig)
  }
}

const database: Database = new Database()

export default database