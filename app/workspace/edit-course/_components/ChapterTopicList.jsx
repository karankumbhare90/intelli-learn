import { Gift } from 'lucide-react';
import React from 'react'

export default function ChapterTopicList({ course }) {

    const courseLayout = course?.courseJSON?.course;

    if (!courseLayout) {
        return;
    }


    return (
        <div className=''>
            <h2 className='pt-10 text-xl lg:text-3xl font-bold'>Chapters & Topics</h2>

            <div className='flex flex-col items-center justify-center pt-10'>
                {courseLayout?.chapters.map((chapter, index) => (
                    <div key={index} className='flex flex-col items-center'>
                        <div className='p-4 border shadow rounded-xl bg-gray-100 text-black'>
                            <h2 className='text-center'>Chapter {index + 1}</h2>
                            <h2 className='font-bold text-lg text-center'>{chapter.chapterName}</h2>
                            <h2 className='text-xs flex justify-between gap-16'>
                                <span>Duration: {chapter?.duration}</span>
                                <span>No. Of Chapters: {chapter?.topics?.length}</span>
                            </h2>
                        </div>

                        <div>
                            {chapter?.topics.map((topic, index) => (
                                <div className='flex flex-col items-center' key={index}>
                                    <div className='h-10 bg-gray-300 w-1'></div>
                                    <div className='flex items-center gap-5'>
                                        <span className={`${index % 2 === 0 && 'text-transparent'} max-w-xs`}>{topic}</span>
                                        <h2 className={`text-center rounded-full bg-gray-300 px-6 text-gray-500 p-4`}>{index + 1}</h2>
                                        <span className={`${index % 2 !== 0 && 'text-transparent'} max-w-xs`}>{topic}</span>
                                    </div>
                                    {index !== chapter?.topics?.length - 1 && <div className='h-10 bg-gray-300 w-1'></div>}
                                    {index === chapter?.topics?.length - 1 && (
                                        <div className='flex flex-col items-center'>
                                            <div className='h-10 bg-gray-300 w-1' />
                                            <Gift className='text-center rounded-full bg-gray-300 h-14 w-14 text-gray-500 p-4' />
                                        </div>
                                    )}
                                    {index === chapter?.topics?.length - 1 && <div className='h-10 bg-gray-300 w-1'></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className='w-auto px-6 py-2 border shadow rounded-md bg-green-600 text-white'>
                    <h2>Finish</h2>
                </div>
            </div>

        </div>
    )
}
