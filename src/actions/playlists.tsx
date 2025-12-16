"use server";

import { getDB } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

export async function createPlaylist(formData: FormData){
  const db = getDB();

  const data_name = formData.get("playlist_name")
  if (data_name == null || data_name == ""){
    throw new Error("playlist_input invalis")
  }
  const newPlaylist = await db.insertInto("playlists")
    .values({
      name: data_name.toString(),
      user_id: 1,
    }).returningAll().executeTakeFirstOrThrow();
  
  redirect(`/playlist/${newPlaylist.id}`)
}

export async function editPlaylist(formData: FormData){
  const db = getDB();

  const data_name = formData.get("playlist_name")
  if (data_name == null || data_name == ""){
    throw new Error("playlist_input invalis")
  }
  const playlist = await db.updateTable("playlists")
    .set({
      name: data_name.toString(),
      user_id: 1,
    }).where('id', '=', Number(formData.get("playlist_id"))).returningAll().executeTakeFirstOrThrow();
  
  redirect(`/playlist/${playlist.id}`)
}

export async function AddSongToPlaylist(
  playlistId: number,
  songId: number
){
  const db = getDB();
    await db
    .insertInto("playlists_songs").values({
      playlist_id : playlistId,
      song_id : songId
    }).execute();

}


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


