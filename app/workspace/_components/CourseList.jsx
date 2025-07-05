"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react'

export default function CourseList() {
    const [courseList, setCourseList] = useState([]);
    return (
        <div className="pt-10">
            <h2 className='font-bold text-3xl'>Course List</h2>

            {courseList.length == 0
                ? <div className="flex flex-col items-center justify-center gap-2 bg-secondary p-7 border rounded-xl !mt-2">
                    <Image src={'/education.png'} alt="Education Logo" width={80} height={80} />
                    <h2 className='text-xl font-semibold'>Look like you haven't created any course yet ?</h2>

                    <Button>+ Create your first course</Button>
                </div>
                : <div>
                    List of Courses
                </div>}
        </div >
    )
}
