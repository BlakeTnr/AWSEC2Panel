# <p style="text-align: center;">EC2 Panel</p>

---

![Example of panel](/assets/images/panel_example.png)

This is a simple panel for stopping and starting your ec2 instances.

Useful for when you have someone who you want to be able to start servcies without giving access to AWS.

# How to use
Download the repo

open a terminal in the repo directory

## Backend
First setup your .env file in the Backend directory, e.g.
```
AWS_ACCESS_KEY_ID=key_here
AWS_SECRET_ACCESS_KEY=secret_here
INSTANCES=i-01111111111111111 i-01111111111111112 i-01111111111111113
```
(Multiple instances are seperated by a space)

Then start the backend

```bash
cd Backend

rm -rf built # as compiling doesn't remove previous build
npx tsc # compiles the typescript
node --env-file=.env ./built/index.js
```
This, by default, hosts the backend at `http://localhost:3000/`

## Frontend
```bash
cd Frontend

npm run build
npm run start
```

You should then be able to access the frontend at `http://localhost:80/`

(Frontend expects backend to be `http://localhost:3000/`)