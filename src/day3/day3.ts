import express from 'express';
import bcrypt from 'bcryptjs';
import helmet from 'helmet';
import Debugger from './logger';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'boss@hello.com',
    password: '$2a$10$JgZfS0dx3OsPO5tJ1MJ2BeTysbeZh.oJxULFB75msuxoiEYSLsr9.',
    role: 'admin',
  },
];

const app = express();
const port = 3000;

app.use(express.json(), helmet());

app.get('/test', (req, res) => {
  const { email, password } = req.query;
  const user = users.find((u: User) => u.email === email);

  if (!email || !password) {
    return res.status(400).json({
      message: 'Please provide email and password',
    });
  }

  if (!user) {
    return res.status(401).json({
      message: 'Unauthorized, user not found',
    });
  }
  if (!bcrypt.compareSync(password as string, user.password)) {
    return res.status(401).json({
      message: 'Unauthorized, wrong password',
    });
  }
  return res.status(200).json({
    message: 'Authorization: $2a$10$cl3XDPjaRjikuSVprKsuf.5xDYjElH4S/vGwQaH1ncJ7i9Fpsz8vu',
  });
});

app.post('/test', (req, res) => {
  const { email, password } = req.query;
  const user = users.find((u: User) => u.email === email);
  const token = req.headers.authorization;

  if (!password || !email) {
    return res.status(401).json({
      message: 'Unauthorized, missing email or password',
    });
  }

  if (!user || !bcrypt.compareSync(password as string, user.password)) {
    return res.status(401).json({
      message: 'Unauthorized, invalid email or password',
    });
  }

  if (!token || token !== '$2a$10$cl3XDPjaRjikuSVprKsuf.5xDYjElH4S/vGwQaH1ncJ7i9Fpsz8vu') {
    return res.status(401).json({
      message: 'Unauthorized, missing token',
    });
  }

  const generateString = (length: number = 7): string => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()[]{}-_=+;:<>,.?/';
    let result = '';
    for (let i = 0; i < length; i += 1) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  Debugger.log('User Authenticated');
  return res.status(200).json({ message: generateString(10) });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
