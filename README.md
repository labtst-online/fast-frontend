# Frontend Prototype

A minimal React prototype that consumes Auth, Profile and Content services. It is part of the FastAPI app.

## Prerequisites

- Node.js v23+
- Running Auth, Profile and Content services (via [`fast-deployment`](https://github.com/labtst-online/fast-deployment))

## Getting Started

### 1. Clone repository & install

```bash
git clone https://github.com/labtst-online/fast-frontend.git
cd fast-frontend
npm install
```

### 2. Configure

```bash
cp .env.sample .env
```
> Change variables before `docker-compose up`

### 3. Run frontend

```bash
npm run dev
```

## License

This repository is licensed under the terms of the MIT license.
