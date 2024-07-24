import Link from "next/link";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Chip,
} from "../../material-tailwind/page";
import Moment from "./Moment";

export async function CardHome({ note }) {

    // if (notes.status !== "fulfilled") {
    //     return <CardSkeleton />
    // }

    return (
        <>
            <Card className="mt-6 w-auto">
                <CardBody>
                    {
                        note?.categories?.map((chip, index) => (
                            <div key={index} className={`inline-block mr-2 mb-4`}>
                                <Chip variant="gradient" value={chip?.value} className="rounded-full from-blue-gray-900 to-blue-gray-800" />
                            </div>
                        ))
                    }
                    <Typography variant="h5" color="blue-gray" className="mb-3">
                        <Moment specificDate={note?.date} />
                    </Typography>
                    <Typography variant="h6" color="blue-gray" className="mb-1">
                        Completed: {note?.completedCount}
                    </Typography>
                    <Typography variant="h6" color="blue-gray" className="mb-1">
                        InCompelete: {note?.incompleteCount}
                    </Typography>
                    <Typography variant="h6" color="blue-gray" className="mb-0">
                        Total: {note?.totalCount}
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <Link href={`/notes/${note?.date}`} className="inline-block">
                        <Button size="sm" variant="text" className="flex items-center gap-2">
                            Read More
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-4 w-4"              >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                />
                            </svg>
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </>
    );
}