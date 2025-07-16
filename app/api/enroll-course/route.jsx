import { db } from "@/config/db";
import { coursesTable, enrollCourseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { courseId } = await req.json(); // ✅ Now 'req' is defined

    const user = await currentUser();
    if (!user || !user.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({
            success: false,
            status: 401,
            message: "Unauthorized",
        });
    }

    const email = user.primaryEmailAddress.emailAddress;

    // Check if already enrolled
    const enrollCourse = await db.select().from(enrollCourseTable).where(
        and(
            eq(enrollCourseTable.userEmail, email),
            eq(enrollCourseTable.cid, courseId)
        )
    );

    if (enrollCourse.length === 0) {
        const response = await db.insert(enrollCourseTable)
            .values({
                cid: courseId,
                userEmail: email,
            })
            .returning();

        return NextResponse.json({
            success: true,
            status: 201,
            data: response,
            message: 'Course Enrolled Successfully !!',
        });
    }

    return NextResponse.json({
        success: true,
        status: 200,
        message: 'Already Enrolled !!',
    });
}


export async function GET(req) {

    const user = await currentUser();

    const result = await db.select().from(coursesTable)
        .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
        .where(eq(enrollCourseTable.userEmail, user.primaryEmailAddress?.emailAddress))
        .orderBy(enrollCourseTable.id);

    return NextResponse.json({
        success: true,
        status: 201,
        data: result
    })
}