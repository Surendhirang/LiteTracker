import { neon } from '@neondatabase/serverless';

export default function NeonPage() {
  async function create(formData: FormData) {
    'use server';

    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not configured.');
    }

    const commentValue = formData.get('comment');
    const comment = typeof commentValue === 'string' ? commentValue.trim() : '';

    if (!comment) {
      throw new Error('Comment is required.');
    }

    const sql = neon(databaseUrl);

    await sql`
      create table if not exists comments (
        id bigserial primary key,
        comment text not null,
        created_at timestamptz not null default now()
      )
    `;

    await sql`insert into comments (comment) values (${comment})`;
  }

  return (
    <main style={{ maxWidth: 640, margin: '48px auto', padding: '0 16px' }}>
      <h1>Neon Comment Demo</h1>
      <form action={create} style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          placeholder="Write a comment"
          name="comment"
          required
          style={{ flex: 1, padding: '8px 12px' }}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
