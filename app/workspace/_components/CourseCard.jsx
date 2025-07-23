import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Book, LoaderCircle, PlayCircle, Settings } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

export default function CourseCard({ course }) {

    const courseJSON = course?.courseJSON?.course;
    const courseContent = course?.courseContent;
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function EnrollCourse() {
        try {
            const result = await axios.post(`/api/enroll-course`, {
                courseId: course?.cid
            });

            if (result?.data?.success) {
                toast.warning(result.data.message);
                router.push(`/course/${course?.cid}`)
            } else {
                toast.error(result.data.message || "Failed to enroll");
            }

        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <div className='shadow rounded-xl'>
            <Image
                src={course?.bannerImageUrl}
                alt={course?.name}
                width={400}
                height={300}
                className='w-full aspect-video rounded-t-xl object-cover'
            />

            <div className='p-3 flex flex-col items-start justify-between gap-3 flex-1'>
                <div className='flex flex-col items-start gap-3'>
                    <h2 className='font-bold text-lg'>{course?.name}</h2>
                    {courseJSON?.description && <p className='line-clamp-2 text-sm text-gray-400'>{courseJSON?.description}</p>}
                </div>

                <div className='w-full flex justify-between items-center pt-1'>
                    <h2 className='flex items-center gap-1.5'><Book className='text-primary h-5 w-5' />{course?.noOfChapters} Chapters</h2>
                    {courseContent.length > 0 ? (
                        <>
                            <Button size={'sm'} onClick={EnrollCourse} disabled={loading}>{loading ? <LoaderCircle className='animate-spin' /> : <PlayCircle />} Start Learning</Button>
                        </>
                    )
                        :
                        <Link href={`/workspace/edit-course/${course?.cid}`}>
                            <Button size={'sm'} variant={'outlinex'}><Settings /> Generate Content</Button>
                        </Link>
                    }
                </div>
            </div>
        </div>
    )
}
