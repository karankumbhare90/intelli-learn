import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);

    const courseId = searchParams.get('courseId');

    const result = await db.select().from(coursesTable)
        .where(eq(coursesTable.cid, courseId));

    return NextResponse.json({
        success: true,
        status: 201,
        data: result[0],
        message: `Course Data Fetched Successfully !!`
    });
}