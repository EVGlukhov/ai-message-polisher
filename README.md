<div align="center">
  <img src="docs/images/message-polisher.png" alt="Screenshot of the Message Polisher web app" width="900">

  <h1>Message Polisher</h1>
  <p><strong>Make every message clear.</strong></p>
  <p>Polish grammar, spelling, and tone while keeping the meaning of your message.</p>

  <p>
    <img src="https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white" alt="Angular 21">
    <img src="https://img.shields.io/badge/Node.js-24-339933?logo=nodedotjs&logoColor=white" alt="Node.js 24">
    <img src="https://img.shields.io/badge/Docker%20Compose-ready-2496ED?logo=docker&logoColor=white" alt="Docker Compose">
    <img src="https://img.shields.io/badge/AI-GigaChat-6B4EFF" alt="GigaChat">
  </p>
</div>

## What it does

Message Polisher is a small web app for improving written messages. Choose a language and tone, paste a draft, and get an edited version with a breakdown of the changes.

- **Languages:** Russian and English
- **Tones:** preserve your tone, neutral, friendly, formal, or vulgar
- **Change explanations:** review what changed and why
- **Copy-ready result:** copy the polished message with one click
- **Shared contracts:** TypeScript request and response types are shared between the web app and API

## Run with Docker Compose

### Requirements

- Docker Desktop (or Docker Engine with the Compose plugin)
- A GigaChat API authorization key

Create `apps/api/.env` and add your key:

```env
GIGACHAT_AUTH_KEY=your-gigachat-authorization-key
```

Then, from the repository root, build and start the web app and API:

```bash
docker compose up --build
```

Open [http://localhost:4200](http://localhost:4200). The API is also available at [http://localhost:3000](http://localhost:3000).

Stop the services with:

```bash
docker compose down
```

The API container trusts the Russian CA certificate shipped in `apps/api/certificates`. TLS certificate verification remains enabled. Keep `apps/api/.env` private; it is excluded from Git.

## Local development

Install dependencies from the repository root:

```bash
npm ci
```

Create `apps/api/.env` as shown above. In separate terminals, start the API and web app:

```bash
npm run start:api
```

```bash
npm run start:web
```

The local Angular development proxy forwards `/api` requests to `http://localhost:3000`.

## Build and test

```bash
npm run build:web
npm run test:web
npm run build --workspace @ai-message-polisher/api
```

## Project structure

```text
apps/
  api/        Express API and GigaChat integration
  web/        Angular application
packages/
  contracts/  Shared TypeScript request and response types
```

The browser sends polish requests to `POST /api/polish`. The API validates the request, calls GigaChat, and returns the edited text and its changes.

## Privacy

Text submitted for polishing is sent to this app's API and then to GigaChat to generate a result. Do not submit sensitive information unless you have reviewed and are comfortable with the applicable service policies.

## License

See [LICENSE](./LICENSE).
