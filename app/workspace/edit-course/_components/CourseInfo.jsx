
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Book, Clock, Loader2Icon, PlayCircle, Settings, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

export default function CourseInfo({ course, viewCourse }) {

    const courseLayout = course?.courseJSON?.course;
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    if (!courseLayout) {
        return;
    }

    async function GenerateCourseContent() {
        // Call the API to generate course courseIdcontent
        setLoading(true);
        try {
            const result = await axios.post(`/api/generate-course-content`, {
                courseJSON: courseLayout,
                courseTitle: course?.name,
                courseId: course?.cid
            });

            if (result?.success) {
                router.replace('/workspace');
                toast.success(result?.message);
            }

        } catch (error) {
            toast.error(error?.message || `Something went wrong !!`);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex lg:flex-row flex-col justify-between items-stretch gap-5 p-5 rounded-xl shadow'>
            <div className='flex lg:order-1 order-2 flex-col items-start justify-between gap-3'>
                <h2 className='font-bold text-xl md:text-3xl'>{courseLayout?.name}</h2>
                <p className='line-clamp-2 text-gray-500'>{courseLayout?.description}</p>
                <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-5'>
                    <div className='flex items-center gap-5 p-3 rounded-lg shadow'>
                        <Clock className='text-blue-600' />
                        <section>
                            <h2 className='font-bold'>Duration</h2>
                            <h2>2 Hours</h2>
                        </section>
                    </div>
                    <div className='flex items-center gap-5 p-3 rounded-lg shadow'>
                        <Book className='text-green-600' />
                        <section>
                            <h2 className='font-bold'>Chapters</h2>
                            <h2>{courseLayout?.chapters?.length || 0} Chapters</h2>
                        </section>
                    </div>
                    <div className='flex items-center gap-5 p-3 rounded-lg shadow'>
                        <TrendingUp className='text-red-600' />
                        <section>
                            <h2 className='font-bold'>Difficulty Level</h2>
                            <h2>{courseLayout?.level}</h2>
                        </section>
                    </div>

                </div>
                {!viewCourse ?

                    <Button onClick={GenerateCourseContent} disabled={loading} className={'w-auto cursor-pointer'}>{loading ? <Loader2Icon className='animate-spin' /> : <Settings />}Generate Content</Button>
                    :
                    <Link href={`/course/${course.cid}`}>
                        <Button><PlayCircle />Contine Learning</Button>
                    </Link>
                }
            </div>
            {/* <div className='relative overflow-hidden'> */}
            <Image
                src={course.bannerImageUrl}
                alt={courseLayout.name}
                width={400}
                height={400}
                className="object-cover w-full max-h-[280px] aspect-auto lg:order-2 order-1 rounded-2xl shadow"
            />
            {/* </div> */}
        </div>
    )
}
