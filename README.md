# Wedding Site Backend

This project requires and external API to work. Otherwise it can be tested with the local dummy models in `invitation-dummy.ts`.

Provide API url by creating env file

```ini
PORT=3000
API_URL=https://something.com/api/
ENVIRONMENT=dev
```
> **_NOTES:_**
> - `API_URL` is referring to the endpoint used to actually access/modify the storage data.
> - `ENVIRONMENT` can be filled with `dev` or `prod`.

Available API path:

- GET http://localhost:3000/wedding/invitations
- GET and POST http://localhost:3000/wedding/invitation/:id
- GET http://localhost:3000/wedding/invitation/pdf
- GET and POST http://localhost:3000/wedding/message/
- GET http://localhost:3000/wedding/message/size
- GET http://localhost:3000/wedding/message?page=:page&pageSize=:pageSize
- GET http://localhost:3000/wedding/message/range?offset=:offset&rangeSize=:rangeSize

## Google sheets storage implementation

I forked my production storage implementation in these public google sheets and appscript link for reference:
- Storage google sheets [link](https://docs.google.com/spreadsheets/d/1WQaAei843mCgEapI-Ev11O6pRD5W3wtMDljZb7hilMw/edit?usp=sharing) (note: custom script to generate data id exist inside as well)
- Storage endpoint [link](https://script.google.com/d/1_5qAn7WSTUqnANZgh0KlOMbslwa4la3nGS45PoegDpvz2igAp9No9qEi/edit?usp=sharing)

When using this endpoint, you need to deploy the script to be accessible and then use the endpoint URL as the `API_URL`, for example:

```ini
PORT=3000
API_URL="https://script.google.com/macros/s/AKfycbzLx_IdnCXupFaFxqOVN4-0wPk4J-LMEw5g6ROX0RlphEWQb0NcNWI4hQfApcW9gx0K6g/exec"
ENVIRONMENT=dev
```

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
