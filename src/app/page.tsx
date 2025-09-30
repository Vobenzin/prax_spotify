import './style.css';
import Link from "next/link";
import { getDB } from "@/lib/db";

export default async function Home() {

  const db = getDB()

  const authors =await db.selectFrom("authors").innerJoin("albums","albums.author_id","authors.id").select(["albums.id as al_id","albums.release_date","albums.name as al_name","authors.name as au_name"]).execute()
  console.log(authors)
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="relative flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p className="text-4xl font-bold ">Spotify</p>
        <div className="spotify-container">
          {authors.map((AlbumAuthor) => (
            <div className="album-card" key={AlbumAuthor.al_id}>
              <div className="album-name">{AlbumAuthor.al_name}</div>
              <div className="release-date">
                Rel Date: {new Date(AlbumAuthor.release_date).toDateString()}
              </div>
              <div className="author-name">Author: {AlbumAuthor.au_name}</div>
              <div className="mt-6">
                  <Link
                    className="btn btn-primary btn-block"
                    href={`/album/${AlbumAuthor.al_id}`}
                  >
                    Detail
                  </Link>
                </div>
            </div>
          ))}
        </div>
      </main>


      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>Footer</p>
        
      </footer>
    </div>
  );
}
