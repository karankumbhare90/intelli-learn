import React from 'react'
import WelcomeBanner from '../_components/WelcomeBanner'
import EnrollCourseList from '../_components/EnrollCourseList'

export default function MyCourses() {
    return (
        <div>
            <WelcomeBanner />
            <h2 className='font-bold text-2xl pb-7 pt-5'>My Courses</h2>
            <EnrollCourseList />
        </div>
    )
}
