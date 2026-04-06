# Finance Dashboard Backend

## Tech Stack

* Node.js + Express
* SQLite
* JWT Authentication

## Setup

1. Run `npm install`
2. Create `.env` file:

```
PORT=3000
JWT_SECRET=supersecretkey123
```

3. Run `node index.js`

## Roles

* admin → full access
* analyst → create + view transactions
* viewer → view own transactions

## API Endpoints

* POST /api/auth/register
* POST /api/auth/login
* GET /api/transactions
* POST /api/transactions
* GET /api/transactions/analytics/summary

## Features

* Role-based access control
* JWT authentication
* Transaction management
* Basic analytics
