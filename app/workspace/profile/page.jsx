import { UserProfile } from '@clerk/nextjs'
import React from 'react'

export default function Profile() {
    return (
        <div>
            <h2 className='text-2xl font-bold pb-7'>Manage your profile</h2>
            <UserProfile />
        </div>
    )
}
