import { sql, type Kysely } from 'kysely'

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<unknown>): Promise<void> {
	await sql`CREATE TABLE users (
		id integer primary key autoincrement not null,
		email text not null,
		password text not null,
		name text
	) STRICT`.execute(db);
	// For more info, see: https://kysely.dev/docs/migrations

	await sql`ALTER TABLE playlists 
						ADD COLUMN user_id integer 
						REFERENCES users (id)`.execute(db);
}
