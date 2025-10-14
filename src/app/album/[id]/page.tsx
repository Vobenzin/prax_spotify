import { getDB } from "@/lib/db";
import Link from "next/link";
export default async function AlbumDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const db = getDB()

  const songs = await db.selectFrom("songs").where('songs.album_id', '=', Number(id)).select(["songs.id", 'songs.duration',"songs.name"]).execute()

  const author = await db.selectFrom("authors").innerJoin("albums","authors.id","albums.author_id").where('albums.id', '=', Number(id)).select(["authors.id", "authors.name", "authors.bio", "albums.name as al_name", "albums.release_date as al_rel_date"]).execute()
  console.log(songs)

  console.log("Album detail id:", id);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div><Link href={`/`}>Back To Menu</Link></div>
        <div>ALBUM DETAIL:
          <p>Name: {author[0].al_name}</p> 
          <p>rel Date: {new Date(author[0].al_rel_date).toDateString()}</p> 
        </div>
        <div>
            {author.map((author) => (
                <div key={author.id}>
                  <p className=""><Link
                    className="btn btn-primary btn-block"
                    href={`/author/${author.id}`}
                  >
                    Author Name : {author.name}
                  </Link></p>
                </div>

            ))}
        </div>
        <div>ALBUM SONGS:</div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song) => (
                  <tr key={song.id}>
                    <td className="">{song.id}</td>
                    <td className="">{song.name}</td>
                    <td className="">{Math.floor(song.duration/60)}:{song.duration%60 }</td>
                  </tr>

              ))}
          </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}