import moment from "moment"; 
import ClientComment from "./ClientCommentDel";

const Comments = ({ blogId, commentId, comment }) => {
    // const { data } = useSession();
    // const userId = data?.user?._id;

    return (
        <>
            <div className="flex justify-between bg-white my-2 rounded-md px-2 py-2">
                <div className="flex">
                    <div className="flex flex-col justify-center">
                        <p className="mx-2 overflow-hidden break-words">{comment?.content}</p>
                    </div>
                </div>

                <span>{moment(comment?.createdAt).format("LT")}</span>
            </div>

            {/* <ClientComment blogId={blogId} commentId={commentId} /> */}
        </>
    )
}

export default Comments