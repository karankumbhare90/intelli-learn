import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center gap-2 mt-2.5">
        <div className="flex items-center justify-center gap-2 mt-2.5">
          <h1>Hello Developer 👨‍💻</h1> <Button>Get Started</Button>
        </div>
        <UserButton />
      </div>

    </>
  );
}
