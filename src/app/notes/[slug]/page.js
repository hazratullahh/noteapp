import DateTaskCard from "@/app/components/DateTaskCard";
import { Button } from "../../../material-tailwind/page";
import { Suspense } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import AddNewNote from "@/app/components/AddNewNote";
import Note from "@/app/models/Note";
import connectDB from "@/app/lib/connectDB";
import TimeAgo from "@/app/components/Moment";
import { revalidatePath } from "next/cache";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

async function fetchNotesBySlug(slug) {
    "use server";
    try {
        await connectDB();

        // Fetch notes where slug matches the given value
        const notes = await Note.find({ date: slug });

        // Return the fetched notes
        return notes;

    } catch (error) {
        console.error('Error fetching notes by slug:', error);
        return {
            status: 'rejected',
            error: error.message
        };
    }
}

const Page = async ({ params }) => {
    const notes = await fetchNotesBySlug(params.slug);

    async function create(formData) {
        "use server"
        try {
            await connectDB();

          const data=  await Note.create({
                date: params.slug,
                details: [
                    {
                        title: formData["title"],
                        content: formData["content"],
                        category: {
                            label: formData["category"]["label"],
                            value: formData["category"]["value"]
                        },
                        status: formData["completed"] ? "Completed" : "InComplete"
                    }
                ]
            });

            revalidatePath(`/notes/${data.date}`)
            redirect(`/notes/${data.date}`)
        } catch (error) {
            // toast.error(error)
            console.error("Error Creating Note:", error);
            // redirect('/dashboard')
        }
    }

    return (
        <section className="mx-auto max-w-screen-2xl my-5 px-4 lg:px-0">
            <Suspense fallback="Loading Details">
                <Link href="/" className="my-3">
                    <Button size="sm" variant="text" className="text-sm border lg:text-md flex items-center justify-between gap-2 mb-4">
                        <FaArrowLeft /> Go Back
                    </Button>
                </Link>
                <div className="flex justify-between items-center">
                    <h4 className="font-bold text-sm lg:text-lg"><TimeAgo specificDate={params.slug} /> </h4>
                    <AddNewNote create={create} isSetp={false} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full my-5 lg:my-10">
                    {
                        notes?.map(note => <DateTaskCard key={note?._id} note={note} />)
                    }
                </div>
            </Suspense>
        </section>
    );
}

export default Page;