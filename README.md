# FastBoosty – Frontend Prototype

A minimal React prototype that consumes Auth, Profile and Content services. It is part of the **FastBoosty** app.

## Prerequisites

- Node.js v23+
- Running Auth, Profile and Content services (via [`fastboosty-deployment`](https://github.com/fastboosty/fastboosty-deployment))

## Getting Started

### 1. Clone repository & install

```bash
git clone https://github.com/fastboosty/fastboosty-frontend.git
cd fastboosty-frontend
npm install
```

### 2. Configure

```bash
cp .env.sample .env
```
> Change varibles before `docker-compose up`

### 3. Run frontend

```bash
npm run dev
```

## License

This repository is licensed under the terms of the MIT license.
