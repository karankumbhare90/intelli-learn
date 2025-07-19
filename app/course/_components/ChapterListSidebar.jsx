import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";
import { CheckCircle } from "lucide-react";
import { useContext } from "react";


export default function ChapterListSidebar({ courseInfo }) {

    const { enrollCourse } = courseInfo
    const courseContent = courseInfo?.courses?.courseContent;
    const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext);
    const completedChapters = enrollCourse?.completedChapters ?? [];


    return (
        <div className='min-w-80 bg-secondary h-screen p-5'>
            {courseContent?.length &&

                <h2 className="font-bold">Chapters ({courseContent?.length})</h2>

            }
            <Accordion type="single" collapsible>
                {courseContent?.map((chapter, index) => (
                    <AccordionItem value={`item-${index}`} key={index}
                        onClick={() => setSelectedChapterIndex(index)}>
                        <AccordionTrigger className={'text-base font-medium'}>{!completedChapters.includes(index) ? <span>{index + 1}.</span> : <span><CheckCircle className="text-green-600 w-5 h-5" /></span>} {chapter?.courseData?.chapterName}</AccordionTrigger>
                        <AccordionContent asChild>
                            <div className="flex flex-col items-start justify-center gap-1.5">
                                {chapter?.courseData?.topics?.map((topic, idx) => (
                                    <h2 key={idx} className={`w-full p-2.5 rounded-lg my-1.5 ${completedChapters.includes(index)
                                        ? "bg-green-100 text-green-600"
                                        : "bg-white"
                                        }`}>{`${index + 1}.${idx + 1} ${topic?.topic}`}</h2>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
