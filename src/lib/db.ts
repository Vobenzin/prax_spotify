import { DB } from "@/lib/db-types";
import { Kysely, SqliteDialect } from "kysely";
import SQLite from "better-sqlite3";

export function getDB(){
  const dialect = new SqliteDialect({
    database: new SQLite("db.sqlite")
  })
  const db = new Kysely<DB>({dialect,});
  
  return db
}
