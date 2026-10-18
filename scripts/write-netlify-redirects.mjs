import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const apiOrigin = process.env.API_ORIGIN;

if (!apiOrigin) {
  throw new Error(
    'API_ORIGIN must be set to the public HTTPS origin of the deployed API.',
  );
}

let apiUrl;
try {
  apiUrl = new URL(apiOrigin);
} catch {
  throw new Error('API_ORIGIN must be a valid HTTPS origin.');
}

if (
  apiUrl.protocol !== 'https:' ||
  apiUrl.username ||
  apiUrl.password ||
  apiUrl.pathname !== '/' ||
  apiUrl.search ||
  apiUrl.hash
) {
  throw new Error(
    'API_ORIGIN must be an HTTPS origin without a path, query, or credentials.',
  );
}

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publishDirectory = path.join(
  projectRoot,
  'dist',
  'ai-message-polisher',
  'browser',
);

await mkdir(publishDirectory, { recursive: true });
await writeFile(
  path.join(publishDirectory, '_redirects'),
  `/api/* ${apiUrl.origin}/api/:splat 200\n/* /index.html 200\n`,
);
