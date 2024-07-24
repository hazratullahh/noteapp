import { object, string } from "yup"

export const noteSchema = object({
    title: string("")
        .required("Title is required"),
    content: string()
        .required('Content is required')
        .test("content", "Content is required", function (content) {
            if (content.length === 0) {
                return false;
            }
            return true;
        }),
    category: object().shape({
        label: string().trim().required("Category is required"),
        value: string().trim().required("Category is required"),
    }),
})