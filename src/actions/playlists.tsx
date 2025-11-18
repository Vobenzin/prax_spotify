"use server";

import { getDB } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function removeSongFromPlaylist(
  playlistId: number,
  songId: number
) {
  const db = getDB();
  await db
    .deleteFrom("playlists_songs")
    .where("playlist_id", "=", Number(playlistId))
    .where("song_id", "=", Number(songId))
    .execute();

  revalidatePath("playlist/" + playlistId);
  console.log(`Removing song ${songId} from playlist ${playlistId}`);
}
