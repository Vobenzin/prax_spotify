"use client";

import { addSongToPlaylist } from "@/actions/playlists";

export function AddSongToPlaylistButton(props: { songId: number }) {
  return (
    <button
      className="btn btn-xs"
      onClick={(e) => {
        console.log("Add song to playlist");
        addSongToPlaylist(props.songId);
      }}
    >
      Remove
    </button>
  );
}
