import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";
import { useContext } from "react";


export default function ChapterListSidebar({ courseInfo }) {

    const courseContent = courseInfo?.courses?.courseContent;

    const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext);


    return (
        <div className='min-w-80 bg-secondary h-screen p-5'>
            {courseContent?.length &&

                <h2 className="font-bold">Chapters ({courseContent?.length})</h2>

            }
            <Accordion type="single" collapsible>
                {courseContent?.map((chapter, index) => (
                    <AccordionItem value={`item-${index}`} key={index}
                        onClick={() => setSelectedChapterIndex(index)}>
                        <AccordionTrigger className={'text-base font-medium'}>{index + 1}. {chapter?.courseData?.chapterName}</AccordionTrigger>
                        <AccordionContent asChild>
                            <div className="flex flex-col items-start justify-center gap-1.5">
                                {chapter?.courseData?.topics?.map((topic, idx) => (
                                    <h2 key={idx} className="w-full p-2.5 rounded-lg bg-white my-1.5">{index + 1}.{idx + 1} {topic?.topic}</h2>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
