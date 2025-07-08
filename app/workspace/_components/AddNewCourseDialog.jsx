import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Sparkle } from 'lucide-react'
import { useState } from 'react'

export default function AddNewCourseDialog({ children }) {

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        includeVideo: false,
        noOfChapters: 1,
        level: '',
        category: ''
    });

    const onHandleInputChange = (field, value) => {
        setFormData(preValue => ({
            ...preValue,
            [field]: value
        }))
    }

    const onGenerate = () => {
        console.log(formData);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Course Using AI</DialogTitle>
                    <DialogDescription asChild>
                        <div className='flex flex-col gap-4 pt-4'>
                            <div className='flex flex-col gap-3'>
                                <label className="text-primary font-semibold">Course Name</label>
                                <Input placeholder="Course Name" onChange={(event) => { onHandleInputChange('name', event.target.value) }} />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <label className="text-primary font-semibold">Course Description (Optional)</label>
                                <Input placeholder="Course Description" onChange={(event) => { onHandleInputChange('description', event.target.value) }} />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <label className="text-primary font-semibold">No. Of Chapters</label>
                                <Input placeholder="No. Of Chapters" type={'number'} onChange={(event) => { onHandleInputChange('noOfChapters', event.target.value) }} />
                            </div>
                            <div className='flex items-center gap-3'>
                                <label className="text-primary font-semibold">Include Video</label>
                                <Switch
                                    checked={formData.includeVideo}
                                    onCheckedChange={(checked) => onHandleInputChange('includeVideo', checked)}
                                />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <label className="text-primary font-semibold">Difficulty Level</label>
                                <Select onValueChange={(value) => { onHandleInputChange('level', value) }} >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Difficulty Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="beginner">Beginner</SelectItem>
                                        <SelectItem value="moderate">Moderate</SelectItem>
                                        <SelectItem value="advance">Advance</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <label className="text-primary font-semibold">Category</label>
                                <Input placeholder="Category (Separated By Comma)" onChange={(event) => { onHandleInputChange('category', event.target.value) }} />
                            </div>
                            <div className='mt-5'>
                                <Button className={'w-full'} onClick={onGenerate}><Sparkle /> Generate Course</Button>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog >
    )
}
