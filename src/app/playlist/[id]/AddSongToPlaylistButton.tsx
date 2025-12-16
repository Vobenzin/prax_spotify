"use client";

import { AddSongToPlaylist } from "@/actions/playlists";

export function AddSongToPlaylistButton(props: {playlistname: string, playlistId: number,  songId: number }) {
  return (
    <button
      className="btn btn-xs"
      onClick={(e) => {
        AddSongToPlaylist(props.playlistId, props.songId);
      }}
    >
      {props.playlistname}
    </button>
  );
}
