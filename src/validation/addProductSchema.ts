import { z } from "zod";

// const MAX_FILE_SIZE = 5000000;
// function checkFileType(file: File) {
//     if (file?.name) {
//         const fileType = file.name.split(".").pop();
//         if (fileType === "jpg" || fileType === "png") return true;
//     }
//     return false;
// }

const addProductSchema = z
  .object({
    ProductName: z
      .string()
      .min(4, { message: "Title must be at least 4 characters" }),
     Price:z.coerce.number().gte(1, "Price must be greater than zero"),

      // Price: z.string({
      //   invalid_type_error: "Price can't be empty",
      // }).transform((val) => parseFloat(val)).refine(val => !isNaN(val) && val > 0 , { message: "Price can't be empty" }),

      // the answer above instead of solution below to fixed Error Expect Number but get String at the case of type num
      // Price:z.number().min(1,{message:"Stock can't be empty"}),

      ProductDescription:z.string().min(1,{message:"Please, add description for product"}),
      // StockQuantity: z.string({
      //   invalid_type_error: "Quantity can't be empty",
      // }).transform((val) => parseFloat(val)).refine(val => !isNaN(val) && val > 0, { message: "Quantity can't be empty" }),
      StockQuantity: z.coerce.number().gte(1, "Stock must be greater than zero"),
      primaryImage: z.custom<File[]>().refine((file)=> file.length !== 0,{message:"Primary image is required"}),
      Image_2: z.custom<File[]>(),
      Image_3: z.custom<File[]>(),
      Image_4: z.custom<File[]>(),
      // Image_5: z.custom<File[]>(),
      
      // CategoryId:z.string().transform((val) => parseFloat(val)).refine(val => !isNaN(val)  , { message: "Category must be selected" }),
      CategoryId:z.coerce.number().gte(0,{message:"Category must be selected"}),
    })



type TAddProductForm = z.infer<typeof addProductSchema>;

export { addProductSchema, type TAddProductForm };
