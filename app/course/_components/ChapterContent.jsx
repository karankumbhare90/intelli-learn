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


    return (
        <div className='p-5'>
            {courseContent?.[selectedChapterIndex]?.courseData?.chapterName
                &&
                <>
                    <h2 className='font-bold text-xl'>{selectedChapterIndex + 1}. {courseContent?.[selectedChapterIndex]?.courseData?.chapterName}</h2>

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
        </div>
    )
}
