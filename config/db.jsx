import { drizzle } from 'drizzle-orm/neon-http';

export const db = drizzle(process.env.DATABASE_URL || process.env.NEXT_PUBLIC_DATABASE_URL);


// For Syncronization connection
// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';
// const pg = neon(process.env.DATABASE_URL);
// const db = drizzle({ client: pg });