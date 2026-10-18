import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Agent, setGlobalDispatcher } from 'undici';
import { handlePolishRequest } from '../../apps/api/polish/polish-request.ts';

const certificatePath = path.resolve(
  process.env.LAMBDA_TASK_ROOT ?? process.cwd(),
  'apps/api/certificates/Russian_Trusted_CA.pem',
);
const ca = await readFile(certificatePath, 'utf8');
setGlobalDispatcher(new Agent({ connect: { ca } }));

export default async (request) => {
  if (request.method !== 'POST') {
    return Response.json(
      { error: 'Метод не поддерживается.' },
      { status: 405, headers: { Allow: 'POST' } },
    );
  }

  const contentLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(contentLength) && contentLength > 32 * 1024) {
    return Response.json(
      { error: 'Размер запроса превышает допустимый.' },
      { status: 413 },
    );
  }

  const bodyText = await request.text();
  if (Buffer.byteLength(bodyText, 'utf8') > 32 * 1024) {
    return Response.json(
      { error: 'Размер запроса превышает допустимый.' },
      { status: 413 },
    );
  }

  let body;
  try {
    body = JSON.parse(bodyText);
  } catch {
    return Response.json({ error: 'Некорректный запрос.' }, { status: 400 });
  }

  const result = await handlePolishRequest(body, {
    completionTimeoutMs: 40_000,
  });
  return Response.json(result.body, { status: result.status });
};

export const config = {
  path: '/api/polish',
};
