import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography
} from "@/material-tailwind/page";
import Image from "next/image";
import { limitCharecters } from "../lib";
import Link from "next/link";

const CardItem = ({ price }) => {
  return (
    <Card className="mt-6 w-full">
      <CardHeader color="blue-gray" className="relative h-full">
        <Image
          width={1080}
          height={1080}
          src={price?.image}
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {price?.title}
        </Typography>
        <Typography>
          {limitCharecters(price?.content, 55)}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Link href={`/blogs/${price?.id}`} className="px-2.5 py-2 bg-gray-900 rounded-md text-white hover:bg-gray-800">Read More</Link>
      </CardFooter>
    </Card>
  );
}

export default CardItem;