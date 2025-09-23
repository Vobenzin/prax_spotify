import { SqliteDialect } from "kysely";
import { Kysely } from "kysely";
import { DB } from "@/lib/db-types";
import SQLite from "better-sqlite3";
import Image from "next/image";

export default async function Home() {
  const dialect = new SqliteDialect({
    database: new SQLite("db.sqlite")
  })
  const db = new Kysely<DB>({dialect,});

  const authors =await db.selectFrom("authors").innerJoin("albums","albums.author_id","authors.id").select(["albums.id as al_id","albums.release_date","albums.name as al_name","authors.name as au_name"]).execute()
  console.log(authors)
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="relative flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p className="text-4xl font-bold">Spotify</p>
      </main>

      <div>{authors.map(AlbumAuthor=> (
      <div key={AlbumAuthor.al_id}>{AlbumAuthor.al_name} | {new Date(AlbumAuthor.release_date).toDateString()} | {AlbumAuthor.au_name}</div>))}
      </div>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>Footer</p>
        
      </footer>
    </div>
  );
}
