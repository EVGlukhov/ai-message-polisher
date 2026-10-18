import { Router } from 'express';
import { handlePolishRequest } from '../polish/polish-request';

export const polishRouter = Router();

polishRouter.post('/polish', async (req, res) => {
  const result = await handlePolishRequest(req.body);
  res.status(result.status).json(result.body);
});
