import './style.css';
import Link from "next/link";
import { getDB } from "@/lib/db";

export default async function UsersPlaylist({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const db = getDB()

  const playlists = await db.selectFrom("playlists").where("user_id","=", Number(id)).selectAll().execute()

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        
        <div>PLAYLISTS FOR USER WITH ID {id}:
        </div>
        <div>
            {playlists.map((playlist) => (
                <div key={playlist.id}>
                  <p className="">Id: {playlist.id}</p>
                  <p className="">Name: {playlist.name}</p>
                  <div className="mt-6">
                  <Link
                    className="btn btn-primary btn-block"
                    href={`/playlist/${playlist.id}`}
                  >
                    PLAYLIST more `{`>`}`
                  </Link>
                </div>
                </div>

            ))}
        </div>
      </main>
    </div>
  );
}