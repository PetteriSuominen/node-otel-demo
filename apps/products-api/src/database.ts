import sql from "mssql";

const config: sql.config = {
  server: process.env.DB_SERVER ?? "localhost",
  port: Number(process.env.DB_PORT ?? 1433),
  database: process.env.DB_NAME ?? "ProductsDb",
  user: process.env.DB_USER ?? "sa",
  password: process.env.DB_PASSWORD!,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30_000,
  },
};

let pool: sql.ConnectionPool | undefined;

export async function getPool(): Promise<sql.ConnectionPool> {
  if (!pool) {
    console.log("Creating new database connection pool");
    pool = await new sql.ConnectionPool(config).connect();
    console.log("Database connection pool created");
  }
  return pool;
}
