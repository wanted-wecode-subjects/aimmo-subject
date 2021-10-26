import sqlite3 from "sqlite3";
import { createConnection } from "typeorm";

export default async function connect() {
  await createConnection();
}
