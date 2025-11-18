"use server";

import { getDB } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

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

export async function removePlaylist(playlistId: number) {
  const db = getDB();

  await db
    .deleteFrom("playlists_songs")
    .where("playlist_id", "=", Number(playlistId))
    .execute();

  await db
    .deleteFrom("playlists")
    .where("id", "=", Number(playlistId))
    .execute();

  console.log(`Removing playlist ${playlistId}`);
  redirect("/playlists");
}

export async function addSongToPlaylist(songId: number) {
  const db = getDB();
  const playlist = await db
    .selectFrom("playlists")
    .where("user_id", "=", 5)
    .selectAll()
    .executeTakeFirstOrThrow();

  db.insertInto("playlists_songs")
    .values({
      playlist_id: playlist.id,
      song_id: songId,
    })
    .execute();
}
