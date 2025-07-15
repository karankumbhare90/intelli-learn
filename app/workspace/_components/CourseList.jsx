"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react'
import AddNewCourseDialog from './AddNewCourseDialog';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import CourseCard from './CourseCard';

export default function CourseList() {
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useUser();

    const fetchCourses = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/courses");

            const { data } = response;

            console.log(data);

            if (data?.success) {
                setCourseList(data?.data || []);
                toast.success(data.message || "Courses fetched successfully");
            } else {
                toast.error(data?.message || "Failed to fetch courses");
            }
        } catch (error) {
            console.error("Failed to fetch courses:", error);
            toast.error(
                error?.response?.data?.message || "An unexpected error occurred"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user) fetchCourses();
    }, [user, fetchCourses]);



    return (
        <div className="pt-10">
            <h2 className='font-bold text-3xl'>Course List</h2>

            {courseList.length == 0
                ? <div className="flex flex-col items-center justify-center gap-2 bg-secondary p-7 border rounded-xl !mt-2">
                    <Image src={'/education.png'} alt="Education Logo" width={80} height={80} />
                    <h2 className='text-xl font-semibold'>Look like you haven't created any course yet ?</h2>

                    <AddNewCourseDialog>
                        <Button>+ Create your first course</Button>
                    </AddNewCourseDialog>
                </div>
                : <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
                    {courseList?.map((course, index) => (
                        <CourseCard course={course} key={index} />
                    ))}
                </div>}
        </div >
    )
}
