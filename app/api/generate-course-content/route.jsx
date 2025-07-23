import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const PROMPT = `
Depends on Chapter name and Topic Generate content for each topic in HTML and give response in JSON format.
Schema:{
    chapterName:<>,
    {
        topic:<>,
        content:<>
    }
} : User Input:`


export const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request) {
    const { courseJSON, courseTitle, courseId } = await request.json();

    // Call the API to generate course content
    const promises = courseJSON?.chapters?.map(async (chapter) => {
        const config = {
            responseMimeType: 'text/plain',
        };

        const model = 'gemini-2.5-pro';
        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        text: `${PROMPT + JSON.stringify(chapter)}`
                    }
                ]
            }
        ];

        const response = await ai.models.generateContent({
            model,
            config,
            contents
        })
        const RawResp = response.candidates?.[0]?.content?.parts?.[0]?.text;
        const rawJSON = RawResp
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .replace(/[\u0000-\u001F\u007F-\u009F]/g, ''); // remove control characters

        let JSONResponse;
        try {
            JSONResponse = JSON.parse(rawJSON);
        } catch (e) {
            console.error("Failed to parse JSON:", rawJSON);
            throw new Error("Invalid JSON received from Gemini");
        }

        // Get Youtube video
        const youtubeData = await GetYoutubeVideo(chapter?.chapterName);

        // return
        return {
            youtubeVideo: youtubeData,
            courseData: JSONResponse,
        }
    })

    const CourseContent = await Promise.all(promises);

    // Save couresContent to DB
    const dbResponse = await db.update(coursesTable).set({
        courseContent: CourseContent
    }).where(eq(coursesTable.cid, courseId));

    return NextResponse.json({
        success: true,
        status: 200,
        message: 'Course content generated successfully',
        data: CourseContent,
        courseName: courseTitle,
    });
}

// Get Youtube Video
const YOUTUBE_BASE_URL = `https://www.googleapis.com/youtube/v3/search`;

async function GetYoutubeVideo(topic) {
    const params = {
        part: "snippet",
        q: topic,
        maxResults: 4,
        type: "video",
        key: process.env.YOUTUBE_API_KEY
    }

    const response = await axios.get(YOUTUBE_BASE_URL, { params })

    const youtubeVideoListResponse = response.data?.items;
    const youtubeVideoList = [];

    youtubeVideoListResponse.forEach((item) => {
        const data = {
            videoId: item?.id?.videoId,
            title: item?.snippet?.title
        }

        youtubeVideoList.push(data);
    });

    return youtubeVideoList;
}