
import "./style.css";
import Link from "next/link";
import { getDB } from "@/lib/db";
import { RemovePlaylistSongButton } from "./RemovePlaylistSongButton";
import { RemovePlaylistButton } from "./RemovePlaylistButton";
import { AddSongToPlaylistButton } from "./AddSongToPlaylistButton";
import {  AddSongToPlaylist } from "@/actions/playlists";

export default async function PlaylistDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const db = getDB();

  const playlist = await db
    .selectFrom("playlists")
    .where("id", "=", Number(id))
    .selectAll()
    .execute();

  const playlists = await db
    .selectFrom("playlists")
    .selectAll()
    .execute();

  const songs = await db
    .selectFrom("songs")
    .innerJoin("playlists_songs", "songs.id", "playlists_songs.song_id")
    .where("playlists_songs.playlist_id", "=", Number(id))
    .select(["songs.id", "songs.name"])
    .execute();

  console.log(songs);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <RemovePlaylistButton playlistId={Number(id)}></RemovePlaylistButton>
        <div className="album-name">{playlist[0].name}</div>
        <div className="album-name">PLAYLIST`s SONGS:</div>
        <div>
          {songs.map((song) => (
            <div key={song.id}>
              <p className="">Id: {song.id}</p>
              <p className="">Name: {song.name}</p>
              <RemovePlaylistSongButton
                playlistId={Number(id)}
                songId={song.id}
              ></RemovePlaylistSongButton>
              <div className="dropdown dropdown-right dropdown-center">
                <div tabIndex={0} role="button" className="btn m-1">Add to Playlist</div>
                <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                  {playlists.map((playlist) => (
                    <li key={playlist.id+101+playlist.id }>
                      <AddSongToPlaylistButton 
                      playlistname={playlist.name}
                      playlistId={playlist.id}
                      songId={song.id}>
                      </AddSongToPlaylistButton>
                    </li>
                  ))}
                </ul></div>
              </div>
          ))}
        </div>
      </main>
    </div>
  );
}
