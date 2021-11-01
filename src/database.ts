import { createConnection } from "typeorm";

export default async function connect() {
  await createConnection();
}
