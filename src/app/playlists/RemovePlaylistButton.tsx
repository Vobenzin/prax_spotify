"use client";

import { removePlaylist } from "@/actions/playlists";

export function RemovePlaylistButton(props: { playlistId: number }) {
  return (
    <button
      className="btn btn-xs"
      onClick={(e) => {
        console.log("Remove playlist");
        removePlaylist(props.playlistId);
      }}
    >
      Remove
    </button>
  );
}
