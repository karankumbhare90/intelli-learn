"use client";
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Book, Compass, LayoutDashboard, PencilRulerIcon, UserCircle2Icon, WalletCards } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarOptions = [
    {
        title: 'Dashboard',
        icon: LayoutDashboard,
        path: '/workspace'
    },
    {
        title: 'My Learning',
        icon: Book,
        path: '/workspace/my-courses'
    },
    {
        title: 'Explore Courses',
        icon: Compass,
        path: '/workspace/explore-courses'
    },
    {
        title: 'AI Tools',
        icon: PencilRulerIcon,
        path: '/workspace/ai-tools'
    },
    {
        title: 'Billings',
        icon: WalletCards,
        path: '/workspace/billings'
    },
    {
        title: 'Profile',
        icon: UserCircle2Icon,
        path: '/workspace/profile'
    }
]

export function AppSidebar() {

    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarHeader className={'p-2'}>
                <div className="flex items-center justify-start gap-2">
                    <Image src={'/logo.svg'} alt="Logo" height={30} width={30} />
                    <h1 className="text-2xl font-semibold">Intelli Learn</h1>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup >
                    <Button>Create New Course</Button>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sidebarOptions?.map((items, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton asChild className={'p-5'}>
                                        <Link href={items.path} className={`text-[17px] ${pathname === items.path ? 'bg-gray-200 text-primary' : ''}`}>
                                            <items.icon className="h-7 w-7" />
                                            <span>{items.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}