"use client";
import AppHeader from '@/app/workspace/_components/AppHeader';
import { AppSidebar } from '@/app/workspace/_components/AppSidebar';
import { useParams } from 'next/navigation'

export default function Course() {
    const { courseId } = useParams();
    return (
        <div>
            <AppHeader hideSidebar={true} />
            Course : {courseId}
        </div>
    )
}
