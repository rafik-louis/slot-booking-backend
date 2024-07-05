module.exports = {
  "type": "postgres",
  "host": process.env.DATABASE_HOST || "localhost",
  "port": 5432,
  "username": "loreal",
  "password": "loreal",
  "database": "loreal",
  "synchronize": false,
  "logging": false,
  "entities": [
    "src/database/entity/**/*.ts"
  ],
  "migrations": [
    "src/database/migration/**/*.ts"
  ],
  "subscribers": [
    "src/database/subscriber/**/*.ts"
  ],
  "cli": {
    "entitiesDir": "src/database/entity",
    "migrationsDir": "src/database/migration",
    "subscribersDir": "src/database/subscriber"
  }
}