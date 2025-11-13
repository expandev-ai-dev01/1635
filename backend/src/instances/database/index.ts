import sql, { ConnectionPool } from 'mssql';
import { config } from '@/config';
import { logger } from '@/utils/logger/logger';

let pool: ConnectionPool;

const dbConfig = {
  server: config.database.server,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  options: {
    encrypt: config.database.options.encrypt,
    trustServerCertificate: config.database.options.trustServerCertificate,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

export async function connectToDatabase(): Promise<void> {
  try {
    if (!pool) {
      logger.info('Initializing database connection pool...');
      pool = await new ConnectionPool(dbConfig).connect();
      logger.info('✅ Database connection pool established successfully.');

      pool.on('error', (err) => {
        logger.error('Database pool error:', err);
      });
    }
  } catch (err) {
    logger.error('❌ Failed to establish database connection pool:', err);
    throw err;
  }
}

export async function getPool(): Promise<ConnectionPool> {
  if (!pool) {
    await connectToDatabase();
  }
  return pool;
}
