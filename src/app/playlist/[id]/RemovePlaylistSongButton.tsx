"use client";

import { removeSongFromPlaylist } from "@/actions/playlists";



export function RemovePlaylistSongButton(props: {
  playlistId: number;
  songId: number;
}) {
  return (
    <button
      className="btn btn-xs"
      onClick={(e) => {
        console.log("Remove song");
        removeSongFromPlaylist(props.playlistId, props.songId);
      }}
    >
      Remove S
    </button>
  );
}
