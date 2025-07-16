import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"
import { PlayCircle } from "lucide-react";
import Image from "next/image"
import Link from "next/link";

export default function EnrollCourseCard({ course, enrollCourse }) {
    const courseJSON = course?.courseJSON?.course;

    function CalculateProgress() {
        return (enrollCourse?.completedChapters?.length ?? 0 / course?.courseContent?.length) * 100;
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
                    <div className="w-full flex flex-col gap-4">
                        <div className="flex flex-col items-center justify-start w-full gap-2">

                            <div className="w-full flex justify-between items-center text-sm text-primary">
                                <h2>Progress</h2>
                                <p>{CalculateProgress()}% Progress</p>
                            </div>
                            <Progress value={CalculateProgress()} />
                        </div>
                        <Link href={`/workspace/course/${course?.cid}`}>
                            <Button className={'w-full'}><PlayCircle /> Continue Learning</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
