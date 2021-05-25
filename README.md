# Server Base - Proyecto ONG


## Envinroment setup

1) Create database
2) Copy .env.example to .env and fill with database credentials.

To install dependencies, run
``` bash
npm install
```

3) Migrations:
``` bash
npx sequelize-cli db:migrate
```

4) Seeders:
``` bash
npx sequelize-cli db:seed:all
```

5) Load users (10 admins, 10 standard):
``` bash
delete all tables (if they exist, including 'sequelizemeta')

run the commands for migrating and seeding!
```

## Start local server

``` bash
npm start
```
