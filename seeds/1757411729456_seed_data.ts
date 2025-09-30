import { DB } from "@/lib/db-types";
import type { Kysely } from "kysely";
import { faker } from "@faker-js/faker";

export async function seed(db: Kysely<DB>): Promise<void> {
  await db.deleteFrom("albums").execute();
  await db.deleteFrom("authors").execute();

  for (let i = 0; i < 20; i += 1) {
    await db
      .insertInto("authors")
      .values({
        name: faker.music.artist(),
        bio: faker.lorem.paragraph(),
      })
      .execute();
  }

  const authors = await db.selectFrom("authors").selectAll().execute();


  for (const author of authors) {
    const numAlbums = faker.number.int({ min: 0, max: 10 });

    for (let i = 0; i < numAlbums; i += 1) {
      await db
        .insertInto("albums")
        .values({
          author_id: author.id,
          name: faker.music.album(),
          release_date: faker.date.past().getTime(),
        })
        .execute();

    }

  }
  const albums = await db.selectFrom("albums").selectAll().execute();

  for(const album in albums){
    const typeOfAlbum=faker.number.int({min:0,max:9})
    let  numSongs;
    if (typeOfAlbum<=2){
      numSongs=1

    } else if(typeOfAlbum<5){
      numSongs=faker.number.int({min:4,max:7})
    }else{
      numSongs=faker.number.int({min:10,max:20})
    }
    for(let i=0; i<numSongs; i++){
      await db.insertInto("songs").values({
        album_id: album.id ,
        name: faker.music.songName(),
        duration: faker.number.int({min:80,max:240})
      })
      .execute();
    }

  }
}

