const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getRepository } = require('typeorm');
const User = require('../entity/User');

class AuthService {
  async register(username, password) {
    const userRepo = getRepository(User);
    
    // Check if user already exists
    const existingUser = await userRepo.findOne({ username });
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepo.create({ username, password: hashedPassword });
    await userRepo.save(user);
    return user;
  }

  async login(username, password) {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne({ where: { username }, relations: ['role'] });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, role: user.role.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return token;
  }
}

module.exports = AuthService;
