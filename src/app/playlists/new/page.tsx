import "./style.css";
import Link from "next/link";
import { getDB } from "@/lib/db";
import { createPlaylist } from "@/actions/playlists";

export default async function PlaylistPage() {
  const db = getDB();

  // const playlists = await db.selectFrom("playlists").selectAll().execute();

  return (
    <div>
      <main>
        <p>New Playlist</p>
          <form action = {createPlaylist}>
            <input className="input" id="playlist_name" name="playlist_name" type="text"></input>
            <input className="btn" type="submit"></input>
          </form>
        
      </main>
    </div>
  );
}
