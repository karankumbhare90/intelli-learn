import { Button } from '@/components/ui/button';
import { Book, Clock, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

export default function CourseInfo({ course }) {


    const courseLayout = course?.courseJSON?.course;

    if (!courseLayout) {
        return;
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
                <Button className={'w-auto cursor-pointer'}>Generate Content</Button>
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
