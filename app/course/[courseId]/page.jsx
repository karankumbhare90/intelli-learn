"use client";
import AppHeader from '@/app/workspace/_components/AppHeader';
import { useParams } from 'next/navigation'
import ChapterListSidebar from '../_components/ChapterListSidebar';
import ChapterContent from '../_components/ChapterContent';
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Course() {
    const [courseInfo, setCourseInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const { courseId } = useParams();

    async function GetEnrollCourseById() {
        try {
            const response = await axios.get(`/api/enroll-course?courseId=${courseId}`);

            const { data } = response;

            if (data.success) {
                setCourseInfo(data?.data);
            } else {
                toast.error(data.message || "Failed to fetch enrolled courses.");
            }
        } catch (error) {
            console.error("Error fetching enrolled courses:", error);
            toast.error("An error occurred while fetching enrolled courses.");
        }
    }

    useEffect(() => {
        GetEnrollCourseById().finally(() => setLoading(false));
    }, []);
    return (
        <div>
            <AppHeader hideSidebar={true} />
            <div className='flex gap-10'>
                <ChapterListSidebar courseInfo={courseInfo} />
                <ChapterContent courseInfo={courseInfo} />
            </div>
        </div>
    )
}
