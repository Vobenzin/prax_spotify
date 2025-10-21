import './style.css';
import Link from "next/link";
import { getDB } from "@/lib/db";

export default async function AuthorDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const db = getDB()

  const author = await db.selectFrom("authors").where('authors.id', '=', Number(id)).select(["authors.id", "authors.name", "authors.bio"]).execute()

  const authors_albums = await db.selectFrom("albums").innerJoin("authors","authors.id","albums.author_id").where('authors.id', '=', Number(id)).select(["albums.id as al_id","albums.release_date","albums.name as al_name","authors.name as au_name","authors.id as au_id"]).execute()
  console.log(author)

  console.log("Author detail id:", id);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className='color:#1db954'><Link href={`/`} >Back To Menu</Link></div>
        <div>AUTHOR DETAIL:
        </div>
        <div>
            {author.map((author) => (
                <div key={author.id}>
                  <p className="">Id: {author.id}</p>
                  <p className="">Name: {author.name}</p>
                  <p className="">Bio: {author.bio}</p>
                </div>

            ))}
        </div>

        <div>AUTHORs ALBUMS:
        </div>
        <div className="spotify-container">
          {authors_albums.map((AlbumAuthor) => (
            <div className="album-card" key={AlbumAuthor.al_id}>
              <div className="album-name">{AlbumAuthor.al_name}</div>
              <div className="release-date">
                Rel Date: {new Date(AlbumAuthor.release_date).toDateString()}
              </div>
              <div className="mt-6">
                  <Link
                    className="btn btn-primary btn-block"
                    href={`/album/${AlbumAuthor.al_id}`}
                  >
                    Album Detail
                  </Link>
                </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}