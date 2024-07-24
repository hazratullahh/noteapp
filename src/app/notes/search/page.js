import DateTaskCard from "@/app/components/DateTaskCard";
import { Button } from "../../../material-tailwind/page";
import { Suspense } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Note from "@/app/models/Note";
import connectDB from "@/app/lib/connectDB";

async function searchByName(name) {
    "use server";
    try {
        await connectDB();

        const notes = await Note.find({
            'details.title': { $regex: new RegExp(name, 'i') }
        })

        // Return the fetched notes
        return notes;

    } catch (error) {
        console.error('Error fetching notes by name:', error);
        return {
            status: 'rejected',
            error: error.message
        };
    }
}

const Page = async ({ searchParams }) => {
    const notes = await searchByName(searchParams.query);

    return (
        <section className="mx-auto max-w-screen-2xl my-5 px-4 lg:px-0">
            <Suspense fallback="Loading Details">
                {
                    notes.length === 0 &&
                    <>
                        <h2 className="text-center text-lg mt-10 lg:text-5xl">Not Found!</h2>
                        <h6 className="text-center text-md mt-10 lg:text-3xl">Try Again</h6>

                        <Link href="/" className="my-3">
                            <Button size="sm" variant="text" className="text-sm border lg:text-md flex items-center justify-between gap-2 mt-5 mx-auto">
                                <FaArrowLeft /> Go Back
                            </Button>
                        </Link>
                    </>
                }

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