import { getDB } from "@/lib/db";

export default async function AlbumDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const db = getDB()

  const songs =await db.selectFrom("songs").where('songs.album_id', '=', Number(id)).select(["songs.id", 'songs.duration',"songs.name"]).execute()
  console.log(songs)

  console.log("Album detail id:", id);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>ALBUM DETAIL: {id}
        </div>
        <div>
          <table className="table">
            <thead>
              <th>#</th>
              <th>Name</th>
              <th>Duration</th>
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