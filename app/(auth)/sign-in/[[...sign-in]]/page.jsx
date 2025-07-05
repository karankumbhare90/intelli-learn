// import { useAuth } from "@clerk/nextjs"
// import { useRouter } from "next/router"
// import { useEffect } from "react"
import Image from "next/image"
import { SignIn } from "@clerk/nextjs"


export default function SignInPage() {
    // const { isSignedIn } = useAuth()
    // const router = useRouter()

    // useEffect(() => {
    //     if (isSignedIn) {
    //         router.push("/")
    //     }
    // }, [isSignedIn])
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