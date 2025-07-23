"use client";
import axios from "axios"
import { useEffect, useState } from "react";
import EnrollCourseCard from "./EnrollCourseCard";


export default function EnrollCourseList() {

    const [enrollCourseList, setEnrollCourseList] = useState([]);
    const [loading, setLoading] = useState(true);

    async function GetEnrollCourse() {
        try {
            const response = await axios.get(`/api/enroll-course`);
            const { data } = response;

            console.log(data)

            if (data.success) {
                setEnrollCourseList(data?.data);
            } else {
                toast.error(data.message || "Failed to fetch enrolled courses.");
            }
        } catch (error) {
            console.error("Error fetching enrolled courses:", error);
            toast.error("An error occurred while fetching enrolled courses.");
        }
    }

    useEffect(() => {
        GetEnrollCourse().finally(() => setLoading(false));
    }, []);


    return enrollCourseList.length > 0 && (
        <div className="pt-5">
            <h2 className="font-bold text-3xl">Continue Learning Your Courses</h2>
            <div className='pt-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
                {enrollCourseList?.map((course, index) => (
                    <EnrollCourseCard course={course?.courses} enrollCourse={course?.enrollCourse} key={index} />
                ))}
            </div>
        </div>
    )
}
