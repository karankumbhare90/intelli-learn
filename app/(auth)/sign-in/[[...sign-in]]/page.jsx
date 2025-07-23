import Image from "next/image"
import { SignIn } from "@clerk/nextjs"


export default function SignInPage() {
    return (
        <>
            <div className='flex flex-wrap items-center justify-between h-screen'>
                <div className='relative hidden lg:flex lg:w-1/2 h-full order-1 overflow-hidden'>
                    <Image src="/signin.jpg" className='object-cover' fill alt='Sign In' />
                </div>
                <div className='w-full lg:w-1/2 h-full flex items-center justify-center order-2'>
                    <div className='shadow-2xl rounded-xl'>
                        <SignIn />
                    </div>
                </div>
            </div>
        </>
    )
}