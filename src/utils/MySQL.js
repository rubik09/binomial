import util from 'util';
import mysql from 'mysql';
import {
  MYSQL_USER, MYSQL_DATABASE, MYSQL_ROOT_PASSWORD,
  MYSQL_HOST, MYSQL_PORT,
} from '../config';

const pool = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  password: MYSQL_ROOT_PASSWORD,
  database: MYSQL_DATABASE,
  charset: 'utf8mb4',
  connectionLimit: 30,
});

pool.query = util.promisify(pool.query);
pool.queryRow = (...a) => pool.query(...a).then((r) => r[0]);

export default pool;
