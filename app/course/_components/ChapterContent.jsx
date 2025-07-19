<<<<<<< HEAD
"use client";
import { Button } from '@/components/ui/button';
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import axios from 'axios';
import { CheckCircle, CircleCheck, Loader2Icon, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useContext, useState } from 'react'
import YouTube from 'react-youtube';
import { toast } from 'sonner';

export default function ChapterContent({ courseInfo, refreshData }) {
    const { courseId } = useParams();

    const [loading, setLoading] = useState(false);

    const { course, enrollCourse } = courseInfo
    const courseContent = courseInfo?.courses?.courseContent;

    const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext);
    const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo;
    const topics = courseContent?.[selectedChapterIndex]?.courseData?.topics;
    const completedChapters = enrollCourse?.completedChapters ?? [];

    async function MarkAsChapterCompleted() {
        if (!completedChapters.includes(selectedChapterIndex)) {
            completedChapters.push(selectedChapterIndex);
        }

        setLoading(true);
        const result = await axios.put(`/api/enroll-course`, {
            completedChapter: completedChapters,
            courseId: courseId
        })

        if (result.data.success) {
            toast.success(result.data.message)
            refreshData();
            setLoading(false);
        }
        else {
            toast.error(result.data.message)
        }
    }

    async function MarkAsChapterIncompleted() {
        const completeChap = completedChapters.filter((item) => item != selectedChapterIndex);

        setLoading(true);
        const result = await axios.put(`/api/enroll-course`, {
            completedChapter: completeChap,
            courseId: courseId
        })

        if (result.data.success) {
            toast.success("Chapter Mark Incompleted")
            setLoading(false);
            refreshData();
        }
        else {
            toast.error(result.data.message)
        }
    }
    const completedChapter = enrollCourse?.completedChapters?.includes(selectedChapterIndex);
=======
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import React, { useContext } from 'react'
import YouTube from 'react-youtube';

export default function ChapterContent({ courseInfo }) {
    const { course, enrollCourse } = courseInfo
    const courseContent = courseInfo?.courses?.courseContent;

    console.log(courseInfo);

    const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext);
    const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo;
    const topics = courseContent?.[selectedChapterIndex]?.courseData?.topics;

    console.log(topics)
>>>>>>> origin/develop


    return (
        <div className='p-5'>
            {courseContent?.[selectedChapterIndex]?.courseData?.chapterName
                &&
                <>
<<<<<<< HEAD
                    <div className='w-full flex items-center justify-between'>
                        <h2 className='font-bold text-xl'>{selectedChapterIndex + 1}. {courseContent?.[selectedChapterIndex]?.courseData?.chapterName}</h2>
                        {!completedChapter
                            ? <Button onClick={() => MarkAsChapterCompleted()} disabled={loading} className={`bg-transparent text-primary hover:text-white`}>{loading ? <Loader2Icon className='animate-spin' /> : <CheckCircle />} Mark as Completed</Button>
                            : <Button onClick={() => MarkAsChapterIncompleted()} disabled={loading} variant={'outline'} className={`bg-transparent text-primary hover:text-black`}>{loading ? <Loader2Icon className='animate-spin' /> : <X />} Mark as Incompleted</Button>
                        }
                    </div>
=======
                    <h2 className='font-bold text-xl'>{selectedChapterIndex + 1}. {courseContent?.[selectedChapterIndex]?.courseData?.chapterName}</h2>
>>>>>>> origin/develop

                    <h2 className='py-2 text-lg font-semibold'>Related Videos 🎬</h2>

                    <div className='grid grid-cols-1 lg:grid-cols-2 items-stretch gap-5 lg:gap-8 pt-7'>
                        {videoData?.map((video, index) => index < 2 && (
                            <div key={index} className='w-auto h-full'>
                                <YouTube
                                    videoId={video.videoId}
                                    className='w-full h-full'
                                    opts={
                                        {
                                            height: '280',
                                            width: '100%',
                                        }
                                    }
                                />
                            </div>
                        ))}
                    </div>
                    <div className='pt-5 lg:pt-10 w-auto flex flex-col gap-5 items-start'>
                        {topics?.map((topic, index) => (
                            <div key={index} className='p-5 bg-secondary rounded-xl'>
                                <h2 className='text-lg text-primary font-semibold'>{selectedChapterIndex + 1}.{index + 1} {topic?.topic}</h2>
                                <div dangerouslySetInnerHTML={{ __html: topic?.content }} className='text-base leading-8 pl-5'>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            }
<<<<<<< HEAD
        </div >
=======
        </div>
>>>>>>> origin/develop
    )
}
