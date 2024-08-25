const path = require('path');

module.exports = {
  type: 'sqlite',
  database: 'task_management.db',
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, 'src/entity/*.js')],
};
