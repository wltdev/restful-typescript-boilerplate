require('dotenv/config');

const env = process.env;

module.exports = {
	dialect: env.DB_DIALECT,
	host: env.DB_HOST,
	username: env.DB_USER,
	password: env.DB_PASS,
	database: env.DB_DATABASE,
	port: env.DB_PORT || 5432,
  define: {
		timestamps: true,
		underscored: true
  },
};