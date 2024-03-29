const config = require("../nodemysql/nodemysql.js");

const Sequelize = require('sequelize')
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
  
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
  });

  const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize



// Paniers
db.panier = require("./Panier.js")(sequelize, Sequelize);
module.exports = db