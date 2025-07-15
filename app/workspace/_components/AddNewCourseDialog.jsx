import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2Icon, Sparkle } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const defaultForm = {
    name: '',
    description: '',
    includeVideo: false,
    noOfChapters: 1,
    level: '',
    category: '',
};

export default function AddNewCourseDialog({ children }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(defaultForm);
    const router = useRouter();

    // Ensure stable UUID per instance
    const courseId = useMemo(() => uuidv4(), []);

    const handleInputChange = useCallback((field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    }, []);

    const handleGenerate = useCallback(async () => {
        setLoading(true);

        try {
            const payload = {
                ...formData,
                courseId,
            };

            const { data } = await axios.post('/api/generate-course-layout', payload);
            if (data?.success) {
                router.push(`/workspace/edit-course/${courseId}`);
                toast.success(data?.message);
            }
            // Optionally: route, toast, or update course state here
        } catch (err) {
            console.error('Error generating course:', err);
            toast.error(err?.message);
            // TODO: Toast or error message
        } finally {
            setLoading(false);
        }
    }, [formData, courseId]);

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Course Using AI</DialogTitle>
                    <DialogDescription asChild>
                        <form className="flex flex-col gap-4 pt-4" onSubmit={(e) => e.preventDefault()}>
                            <Field label="Course Name">
                                <Input
                                    placeholder="Course Name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                />
                            </Field>

                            <Field label="Course Description (Optional)">
                                <Input
                                    placeholder="Course Description"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                />
                            </Field>

                            <Field label="No. of Chapters">
                                <Input
                                    type="number"
                                    placeholder="Number of Chapters"
                                    min={1}
                                    value={formData.noOfChapters}
                                    onChange={(e) => handleInputChange('noOfChapters', parseInt(e.target.value, 10) || 1)}
                                />
                            </Field>

                            <div className="flex items-center justify-between">
                                <label className="text-primary font-semibold">Include Video</label>
                                <Switch
                                    checked={formData.includeVideo}
                                    onCheckedChange={(val) => handleInputChange('includeVideo', val)}
                                />
                            </div>

                            <Field label="Difficulty Level">
                                <Select
                                    value={formData.level}
                                    onValueChange={(val) => handleInputChange('level', val)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="beginner">Beginner</SelectItem>
                                        <SelectItem value="moderate">Moderate</SelectItem>
                                        <SelectItem value="advance">Advance</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>

                            <Field label="Category">
                                <Input
                                    placeholder="Category (separate by comma)"
                                    value={formData.category}
                                    onChange={(e) => handleInputChange('category', e.target.value)}
                                />
                            </Field>

                            <div className="mt-5">
                                <Button
                                    type="button"
                                    className="w-full"
                                    disabled={loading}
                                    onClick={handleGenerate}
                                >
                                    {loading ? (
                                        <Loader2Icon className="animate-spin" />
                                    ) : (
                                        <>
                                            <Sparkle className="mr-2 h-4 w-4" /> Generate Course
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

// Reusable label wrapper
function Field({ label, children }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-primary font-semibold">{label}</label>
            {children}
        </div>
    );
}
