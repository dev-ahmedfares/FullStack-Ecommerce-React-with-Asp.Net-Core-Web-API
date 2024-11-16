import { z } from "zod";

const addNewCategorySchema = z.object({
    categoryName:z.string().min(1,{message:"Name is required"}),
    categoryDescription:z.string().min(1,{message:"Description is required"})
})



type TAddNewCategory = z.infer<typeof addNewCategorySchema>

export {addNewCategorySchema, type TAddNewCategory}