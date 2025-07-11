import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const PROMPT = `
Generate Learning Course based on the following details. Make sure to include: Course Name, Description, Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing the user's Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to the user's Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in the user's Course) for Course Banner in 3D format. Also include Chapter Names, Topics under each chapter, Duration for each chapter, etc. in JSON format only. Schema:
{
    "course": {
        "name": "string",
        "description": "string",
        "category": "string",
        "level": "string",
        "include Video": "boolean",
        "noOfChapters": "number",
        "bannerImagePrompt": "string",
        "chapters": [
            {
                "chapterName": "string",
                "duration": "string",
                "topics": [
                    "string"
                ]
            }
        ]
    }
}

User Input:
`;

export async function POST(req) {
    try {
        const { courseId, ...formData } = await req.json();
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ status: 401, message: 'Unauthorized user', data: null });
        }

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });

        const config = {
            thinkingConfig: {
                thinkingBudget: -1,
            },
            responseMimeType: 'text/plain',
        };

        const model = 'gemini-2.5-pro';

        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        text: `${PROMPT + JSON.stringify(formData)}`,
                    },
                ],
            },
        ];

        const response = await ai.models.generateContent({
            model,
            config,
            contents,
        });

        const responseText = response.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!responseText) {
            return NextResponse.json({ status: 500, message: 'Failed to generate course layout', data: null });
        }

        const rawJSON = responseText.replace('```json', '').replace('```', '');
        const JSONResponse = JSON.parse(rawJSON);

<<<<<<< HEAD
        // Generate Banner Image

=======
>>>>>>> origin/develop
        // Uncomment when ready to persist to DB
        const result = await db.insert(coursesTable).values({
            ...formData,
            courseJSON: JSONResponse,
            userEmail: user.primaryEmailAddress?.emailAddress,
            cid: courseId
        });

        return NextResponse.json({
            status: 201,
            message: 'Course Layout Generated Successfully',
            data: { courseId: courseId },
        });

    } catch (error) {
        console.error('Error generating course:', error);
        return NextResponse.json({
            status: 500,
            message: 'Internal Server Error',
            error: error.message || error.toString(),
        });
    }
}
