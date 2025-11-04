import { sql, type Kysely } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<unknown>): Promise<void> {
	await sql`CREATE TABLE playlists (
		id integer primary key autoincrement not null,
		name text not null
	) STRICT`.execute(db);

	await sql`CREATE TABLE playlists_songs (
		id integer primary key autoincrement not null,
		playlist_id integer not null,
		song_id integer not null,
		foreign key (playlist_id) references playlists (id),
		foreign key (song_id) references songs (id)
	) STRICT`.execute(db);
	// For more info, see: https://kysely.dev/docs/migrations
}

