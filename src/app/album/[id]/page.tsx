import { DB } from "@/lib/db-types";
import { Kysely, SqliteDialect } from "kysely";
import SQLite from "better-sqlite3";
export default async function AlbumDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dialect = new SqliteDialect({
    database: new SQLite("db.sqlite")
  })
  const db = new Kysely<DB>({dialect,});

  const songs =await db.selectFrom("songs").where('songs.album_id', '==', `${id}`).select(["songs.id", 'songs.duration',"songs.name"]).execute()
  console.log(songs)

  console.log("Album detail id:", id);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>ALBUM DETAIL: {id}
        </div>
        <div className="spotify-container">
          {songs.map((song) => (

            <div className="album-card" key={song.id}>
              <div className="album-name">{song.name}</div>
              <div className="author-name">ID: {song.id}</div>
              <div className="author-name">DURATION: {Math.floor(song.duration/60)}:{song.duration%60 }min</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}