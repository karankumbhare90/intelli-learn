import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

export default function AppHeader() {
    return (
        <div className='p-4 flex justify-between items-center border-b border-sidebar-border'>
            <SidebarTrigger />
            <UserButton />
        </div>
    )
}
