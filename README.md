# Wedding Site Backend

This project requires and external API to work. Otherwise it can be tested with the local dummy models in `invitation-dummy.ts`.

Provide API url by creating env file

```ini
PORT=3000
API_URL=https://something.com/api/
```

Available API path:

- http://localhost:3000/wedding/invitations
- http://localhost:3000/wedding/invitation/:id

## Running the project

Setup

```sh
npm install
```

Run in production

```sh
npm start
```

Run in dev

```sh
npm run dev
```

Build / clean build

```sh
npm run build
# or
npm run build-clean
```
