const express = require('express');
const { authenticateJWT, authorizeRoles } = require('../middleware/auth');
const { getRepository } = require('typeorm');
const Task = require('../entity/Task');

const router = express.Router();

router.post('/', authenticateJWT, authorizeRoles('admin', 'user'), async (req, res) => {
  try {
    const taskRepo = getRepository(Task);
    const task = taskRepo.create(req.body);
    task.assignedTo = req.user.id;
    await taskRepo.save(task);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', authenticateJWT, authorizeRoles('admin', 'user'), async (req, res) => {
  const taskRepo = getRepository(Task);
  const tasks = await taskRepo.find(req.query);
  res.json(tasks);
});

router.put('/:id', authenticateJWT, authorizeRoles('admin', 'user'), async (req, res) => {
  try {
    const taskRepo = getRepository(Task);
    const task = await taskRepo.findOne(req.params.id);
    if (task) {
      taskRepo.merge(task, req.body);
      await taskRepo.save(task);
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', authenticateJWT, authorizeRoles('admin'), async (req, res) => {
  try {
    const taskRepo = getRepository(Task);
    const result = await taskRepo.delete(req.params.id);
    if (result.affected) {
      res.json({ message: 'Task deleted' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
