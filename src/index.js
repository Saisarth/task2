require('reflect-metadata');
const express = require('express');
const { createConnection } = require('typeorm');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

createConnection().then(() => {
  const app = express();
  app.use(express.json());

  app.use('/api/users', userRoutes);
  app.use('/api/tasks', taskRoutes);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(error => console.log(error));
