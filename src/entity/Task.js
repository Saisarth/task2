const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Task',
  tableName: 'tasks',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    title: {
      type: 'varchar',
    },
    description: {
      type: 'text',
    },
    priority: {
      type: 'varchar',
    },
    status: {
      type: 'varchar',
    },
  },
  relations: {
    assignedTo: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: true,
    },
  },
});
