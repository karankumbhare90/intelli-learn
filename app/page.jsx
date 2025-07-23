import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="h-screen w-full">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full h-full mx-auto container sm:px-0">
            <div className="w-full gap-5 h-full flex flex-col items-center justify-center">
              <h1 className="text-4xl font-bold text-center">Welcome to Intelli Learn</h1>

              <Image
                src={'/learning.jpg'}
                alt="Banner"
                height={450}
                width={600}
                className="w-3/4 max-h-[400px] object-cover rounded-2xl"
              />

              <Link href={'/workspace'}>
                <Button>
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div >

    </>
  );
}