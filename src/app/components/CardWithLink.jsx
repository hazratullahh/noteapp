import Link from "next/link";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "../../material-tailwind/page";
import ChipPills from "./ChipPills";

export function CardWithLink() {
    return (
        <Card className="mt-6 w-auto">
            <CardBody>
                <ChipPills />
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    UI/UX Review Check
                </Typography>
                <Typography>
                    Because it&apos;s about motivating the doers. Because I&apos;m here to
                    follow my dreams and inspire others.
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Link href="#" className="inline-block">
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
    );
}