import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { currentUser } from '@clerk/nextjs/server';
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const user = await currentUser();

    const courseId = searchParams.get('courseId');
    if (courseId) {

        const result = await db.select().from(coursesTable)
            .where(eq(coursesTable.cid, courseId));

        return NextResponse.json({
            success: true,
            status: 201,
            data: result[0],
            message: `Course Data Fetched Successfully !!`
        });
    }
    else {
        const result = await db.select().from(coursesTable)
            .where(eq(coursesTable.userEmail, user.primaryEmailAddress?.emailAddress))
            .orderBy(desc(coursesTable.id));

        return NextResponse.json({
            success: true,
            status: 201,
            data: result,
            message: `Course Data Fetched Successfully !!`
        });
    }
}