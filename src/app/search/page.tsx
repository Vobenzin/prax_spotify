import Link from 'next/link';
import './style.css';
import { getDB } from "@/lib/db";

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {

  const { q }= await searchParams;
  const db = getDB()

  const all_albums_search = await db.selectFrom("albums").where('albums.name',"like",`%${q}%`).select(["albums.id", "albums.name", "albums.release_date"]).execute()
  const all_authors_search = await db.selectFrom("authors").where('authors.name',"like",`%${q}%`).select(["authors.id","authors.name","authors.bio"]).execute()
  const all_songs_search = await db.selectFrom("songs").where('songs.name' ,"like",`%${q}%`).select(["songs.id","songs.name","songs.duration"]).execute()
  return (
    <>
    <h1 className='title-name'>ALBUMS: </h1>
    <div className='spotify-container'>
        {all_albums_search.map((album) => (
            <div key={album.id} className="album-card">
              {/* <p className="author-name">Id: {album.id}</p> */}
              <p className="album-name">Name: {album.name}</p>
              <p className="author-name">ReleaseDate: {new Date(album.release_date).toDateString()}</p>
              <Link
                    className="spodny btn btn-primary btn-block"
                    href={`/album/${album.id}`}
                  >
                    Album Detail
                </Link>
            </div>

        ))}
    </div>
    <h1 className='title-name'>AUTHORS: </h1>
    <div className='spotify-container'>
        {all_authors_search.map((author) => (
            <div key={author.id} className="album-card">
              {/* <p className="author-name">Id: {author.id}</p> */}
              <p className="album-name">Name: {author.name}</p>
              <p className="author-name">Bio: {author.bio}</p>
              <Link
                    className="spodny btn btn-primary btn-block "
                    href={`/author/${author.id}`}
                  >
                    Album Detail
                </Link>
            </div>

        ))}
    </div>
    <h1 className='title-name'>SONGS: </h1>
    <div className='spotify-container'>
        {all_songs_search.map((song) => (
            <div key={song.id} className="album-card">
              {/* <p className="author-name">Id: {song.id}</p> */}
              <p className="album-name">Name: {song.name}</p>
              <p className="author-name">Duration: {Math.floor(song.duration/60)}:{song.duration%60 < 10 ? "0"+(song.duration%60).toString(): song.duration%60 }</p>
            </div>

        ))}
    </div>
    </>
  )
}