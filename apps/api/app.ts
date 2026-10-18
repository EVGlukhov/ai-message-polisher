import express from 'express';
import { polishRouter } from './routes/polish-route';

export function createApp() {
  const app = express();

  app.use(express.json({ limit: '32kb' }));
  app.use('/api', polishRouter);

  return app;
}
