import './style.css';
import Link from "next/link";
import { getDB } from "@/lib/db";

export default async function Profile() {


  const db = getDB()

  const users = await db.selectFrom("users").selectAll().execute()

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        
        <div>choose relevant user:
        </div>
        <div>
            {users.map((user) => (
                <div key={user.id}>
                  <p className="">Id: {user.id}</p>

                  <Link
                    className="btn btn-primary btn-block"
                    href={`profile/${user.id}/playlists`}
                  >
                    PLAYLISTs more `{`>`}`
                  </Link>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
}