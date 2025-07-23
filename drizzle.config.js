import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './config/schema.js',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL || process.env.NEXT_PUBLIC_DATABASE_URL,
    },
});
