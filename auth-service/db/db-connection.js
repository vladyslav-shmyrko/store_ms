const { Sequelize } = require('sequelize');
const config = require('../db/config/config');

class DatabaseConnector {
  settings;
  stage;
  constructor(settings, stage = 'development') {
    this.settings = settings;
    this.stage = stage;
    if (!DatabaseConnector.instance) {
      this.init();
      DatabaseConnector.instance = this;
    }
    return DatabaseConnector.instance;
  }
  init() {
    this.sequelize = new Sequelize(
      this.settings[this.stage].database,
      this.settings[this.stage].username,
      this.settings[this.stage].password,
      {
        dialect: this.settings[this.stage].dialect,
        host: this.settings[this.stage].host,
      },
    );
  }

  getSequelize() {
    return this.sequelize;
  }
}

const dbConnection = new DatabaseConnector(config, 'development');
module.exports = dbConnection.getSequelize.bind(dbConnection);
