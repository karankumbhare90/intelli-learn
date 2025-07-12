import { GoogleGenAI } from "@google/genai";
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
        const rawJSON = RawResp.replace('```json', '').replace('```', '');
        const JSONResponse = JSON.parse(rawJSON);

        // Get Youtube video
        // return
        return JSONResponse
    })

    const CourseContent = await Promise.all(promises);

    // console.log(CourseContent);
    return NextResponse.json({
        success: true,
        status: 200,
        message: 'Course content generated successfully',
        data: CourseContent,
        courseName: courseTitle,
        courseContent: CourseContent
    });
}