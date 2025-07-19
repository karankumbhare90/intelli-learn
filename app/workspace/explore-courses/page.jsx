"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Search } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export default function ExploreCourses() {
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useUser();

    const fetchCourses = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/courses?courseId=0");

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
        <div>
            <h2 className='font-bold text-2xl pb-7'>ExploreCourses</h2>
            <div className='w-full flex gap-5 max-w-md'>
                <Input placeholder='Search Courses' />
                <Button><Search /> Search</Button>
            </div>

            {loading ? (
                <div className='pt-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
                    {[...Array(6)].map((_, index) => (
                        <Skeleton key={index} className='w-full h-[240px]' />
                    ))}
                </div>
            ) : courseList.length > 0 ? (
                <div className='pt-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
                    {courseList.map((course, index) => (
                        <CourseCard course={course} key={index} />
                    ))}
                </div>
            ) : (
                <p className="pt-5 text-muted-foreground">No courses found.</p>
            )}

        </div>
    )
}
