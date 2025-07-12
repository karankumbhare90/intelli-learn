"use client";
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect } from 'react'
import { useState } from 'react';
import { toast } from 'sonner';
import CourseInfo from '../_components/CouseInfo';
import ChapterTopicList from '../_components/ChapterTopicList';

export default function EditCourse() {
    const { courseId } = useParams();
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState(null);

    const fetchCourseInfo = useCallback(async () => {
        if (!courseId) return;

        setLoading(true);
        try {
            const { data } = await axios.get(`/api/courses?courseId=${courseId}`);

            if (data?.success) {
                setCourse(data?.data || {});
                toast.success(data?.message || "Course data fetched successfully.");
            } else {
                toast.error(data?.message || "Failed to fetch course data.");
            }
        } catch (error) {
            console.error("Error fetching course:", error);
            toast.error("Something went wrong while fetching the course.");
        } finally {
            setLoading(false);
        }
    }, [courseId]);

    useEffect(() => {
        fetchCourseInfo();
    }, [courseId]);

    return (
        <div>
            {course && (
                <>
                    <CourseInfo course={course} />
                    <ChapterTopicList course={course} />
                </>
            )}
        </div>
    )
}
