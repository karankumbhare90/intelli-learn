import { db } from '@/config/db';
import { usersTable } from '@/config/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { name, email, profileImage } = await req.json();

    // If User Already Exists
    const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if (existingUser.length > 0) {
        return NextResponse.json(
            {
                status: 409,
                message: 'User already exists !!',
                data: existingUser[0],
            }
        );
    }

    // Create New User
    const newUser = await db.insert(usersTable).values({
        name: name,
        email: email,
        profileImage: profileImage
    }).returning(usersTable);

    return NextResponse.json({ status: 201, message: 'User created successfully !!', data: newUser });
}
