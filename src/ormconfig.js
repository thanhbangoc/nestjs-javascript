module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE_NAME || 'db',
  entities: [__dirname + '/**/*.entity.js'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
