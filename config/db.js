import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

const pool = mysql.createPool(dbConfig);

pool.getConnection()
  .then(() => {
    console.log('Database Terhubung');
  })
  .catch((err) => {
    console.error('Tidak dapat terhubung ke database:', err);
  });

export default pool;
