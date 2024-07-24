import Image from "next/image";
import { BsPencil } from "react-icons/bs";
import { formatDate } from "../lib";
import Link from "next/link";
import ActionBtn from "./DeleteActionBtn";

const BlogList = async ({ blog, index }) => {
    return (
        <>
            <tr key={blog._id} className="odd:bg-white text-black odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">

                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                    {index + 1}
                </th>
                <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                        <Link href={`/dashboard/edit/${blog?._id}`}>
                            <BsPencil color="blue" cursor="pointer" />
                        </Link>
                        <ActionBtn recordId={blog?._id?.toString()} />
                    </div>
                </td>
                <th className="p-4 py-2">
                    <Image className="rounded-lg shadow-xl dark:shadow-gray-800"
                        src={blog?.image} alt={`${blog?.image} capture`}
                        width="70" height="70" />
                </th>
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                    {blog?.title}
                </th>
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                    dangerouslySetInnerHTML={{ __html: blog?.content }}
                />
                <td className="px-6 py-4 font-medium">
                    {formatDate(blog?.createdAt)}
                </td>
            </tr>
        </>
    )
}

export default BlogList