import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'

export default function SignUpPage() {

    return (
        <>
            <div className='flex flex-wrap items-center justify-between h-screen'>
                <div className='relative hidden lg:flex lg:w-1/2 h-full order-2 overflow-hidden'>
                    <Image src="/signup.jpg" className='object-cover' fill alt='Sign In' />
                </div>
                <div className='w-full lg:w-1/2 h-full flex items-center justify-center order-1'>
                    <div className='shadow-2xl rounded-xl'>
                        <SignUp />
                    </div>
                </div>
            </div>
        </>
    )
}