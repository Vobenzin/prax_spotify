import "./style.css";
import Link from "next/link";
import { getDB } from "@/lib/db";
import { createPlaylist, editPlaylist } from "@/actions/playlists";

export default async function PlaylistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = getDB();

  const playlist = await db.selectFrom("playlists").where("playlists.id", "=" , Number(id)).selectAll().execute();
  return (
    <div>
      <main>
        <p>Edit Playlist : {playlist[0].name}</p>
          <form action = {editPlaylist}>
            <input className="input" id="playlist_id" name="playlist_id" type="number" value={playlist[0].id} hidden readOnly></input>
            <input className="input" id="playlist_name" name="playlist_name" type="text" defaultValue={playlist[0].name}></input>
            <input className="btn" type="submit"></input>
          </form>
        
      </main>
    </div>
  );
}