import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { InferenceClient } from "@huggingface/inference";
import { ai } from '../generate-course-content/route';
import { eq } from 'drizzle-orm';

const PROMPT = `
Generate Learning Course based on the following details. Make sure to include:

- **Course Name**
- **Description**
- **Course Banner Image Prompt**: Create a modern, flat-style 2D digital illustration representing the user's topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to the user's course, like sticky notes, design components, and visual aids. Use a **vibrant color palette** (blues, purples, oranges) with a **clean, professional look**. The illustration should feel **creative, tech-savvy, and educational**, ideal for visualizing concepts in the course.  
⚠️ **The image should be in 3D style and always have an aspect ratio of 16:9.**

Also include:
- Chapter Names
- Topics under each chapter
- Duration for each chapter

Return the result in **JSON format only** using the following schema:

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
        const { has } = await auth()

        const hasPremiumAccess = has({ plan: 'starter' } || { plan: 'premium' })

        if (!user) {
            return NextResponse.json({ status: 401, message: 'Unauthorized user', data: null });
        }

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

        // Check if user already generated course
        if (!hasPremiumAccess) {
            const result = await db.select().from(coursesTable)
                .where(eq(coursesTable.userEmail, user?.primaryEmailAddress?.emailAddress));

            if (result.length >= 1) {
                return NextResponse.json({
                    success: true,
                    status: 201,
                    message: 'Free Limit Exceed !!'
                })
            }
        }

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

        // Generate Banner Image
        const bannerImagePrompt = JSONResponse.course?.bannerImagePrompt;

        // Generate Image Code
        const client = new InferenceClient(process.env.HF_API_KEY);

        const image = await client.textToImage({
            provider: "nebius",
            model: "black-forest-labs/FLUX.1-schnell",
            inputs: bannerImagePrompt,
            parameters: { num_inference_steps: 5 },
        });

        // Convert Blob to base64
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");


        // Uncomment when ready to persist to DB
        const result = await db.insert(coursesTable).values({
            ...formData,
            courseJSON: JSONResponse,
            userEmail: user.primaryEmailAddress?.emailAddress,
            cid: courseId,
            bannerImageUrl: `data:image/png;base64,${base64Image}`
        });

        return NextResponse.json({
            success: true,
            status: 201,
            message: 'Course Layout Generated Successfully',
            data: { courseId: courseId },
        });

    } catch (error) {
        console.error('Error generating course:', error);
        return NextResponse.json({
            success: false,
            status: 500,
            message: 'Internal Server Error',
            error: error.message || error.toString(),
        });
    }
}