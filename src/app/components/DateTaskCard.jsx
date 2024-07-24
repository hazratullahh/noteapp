import { Card, CardBody, CardFooter, Chip, Typography } from "../../material-tailwind/page";
import CardSkeleton from "./skeleton/CardSkeleton";
import ActionBtn from "./DeleteActionBtn";
import UpdateNoteForm from "./UpdateNoteForm";
import Note from "../models/Note";
import { getByDetailsId } from "../actions";
import connectDB from "../lib/connectDB";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const DateTaskCard = async ({ note }) => {

    if (!true) {
        return <CardSkeleton />
    }

    const { details } = note;
    const { _id, category, title, content, status } = details[0];

    const NoteDetails = await getByDetailsId(_id);
    const updateData = NoteDetails && JSON.parse(JSON.stringify(NoteDetails));

    async function update(formData) {
        "use server"
        try {
            await connectDB();
            await Note.findOneAndUpdate(
                {
                    "details._id": _id
                },
                {
                    $set: {
                        "details.$.title": formData["title"],
                        "details.$.content": formData["content"],
                        "details.$.category": {
                            label: formData["category"]["label"],
                            value: formData["category"]["value"]
                        },
                        "details.$.status": formData["completed"] ? "Completed" : "InComplete"
                    }
                },
                { new: true } // Return the updated document
            );

            revalidatePath(`/note/${note.date}`)
            // redirect(`/note/${note.date}`)

        } catch (error) {
            // toast.error(error)
            console.error("Error Creating Note:", error);
            redirect(`/note/${note.slug}`)
        }
    }

    return (
        <Card className="mt-2 w-auto">
            <CardBody>
                <div className={`inline-block mr-2 mb-4`}>
                    <Chip variant="gradient" value={category?.value} className="rounded-full from-blue-gray-900 to-blue-gray-800" />
                </div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                    {title}
                </Typography>
                <Typography variant="paragraph" color="blue-gray" className="mb-3"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
                <Typography variant="h6" color="blue-gray" className="mb-1">
                    <Chip variant="completed" value={status} className={`rounded-md ${status === "Completed" ? "bg-teal-500" : "bg-red-500"} inline`} />
                </Typography>
            </CardBody>
            <CardFooter className="pt-0 flex justify-end items-center gap-2">
                <UpdateNoteForm updateData={updateData} update={update} />
                <ActionBtn recordId={_id.toString()} />
            </CardFooter>
        </Card>
    )
}

export default DateTaskCard