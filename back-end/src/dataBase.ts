import { Client } from "pg";
import dotenv from 'dotenv';
dotenv.config();
const client: Client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password:String(process.env.DB_PASSWORD),
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
});
const startDataBase = async (): Promise<void> => {
  await client.connect();
  console.log("DataBase conectado!");
};

export {
  startDataBase,client
}