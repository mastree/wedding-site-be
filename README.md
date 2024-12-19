# Wedding Site Backend

This project requires and external API to work. Otherwise it can be tested with the local dummy models in `invitation-dummy.ts`.

Provide API url by creating env file

```ini
PORT=3000
API_URL=https://something.com/api/
ENVIRONMENT=dev
```
> **_NOTES:_**
> - `API_URL` is referring to the endpoint used to actually access/modify the data.
> - `ENVIRONMENT` can be filled with `dev` or `prod`.

Available API path:

- GET http://localhost:3000/wedding/invitations
- GET and POST http://localhost:3000/wedding/invitation/:id
- GET http://localhost:3000/wedding/invitation/pdf
- GET and POST http://localhost:3000/wedding/message/
- GET http://localhost:3000/wedding/message/size
- GET http://localhost:3000/wedding/message?page=:page&pageSize=:pageSize
- GET http://localhost:3000/wedding/message/range?offset=:offset&rangeSize=:rangeSize

## Running the project

> **_NOTE:_** this is only a template from NodeJS project creation. To properly deploy this project in **production**, you need to follow the [git submodule's parent](https://github.com/mastree/wedding-site-app) docker command.\
\
Following this setup enables for local testing.

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
