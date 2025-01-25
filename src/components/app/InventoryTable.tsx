import { useState } from "react"
import { Ellipsis } from "lucide-react"
import UpsertDialog from "./UpsertDialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
const InventoryTable = () => {

    //get items from localStorage
    const data = JSON.parse(localStorage.getItem("products") || "[]");
    const [openAddDialog, setOpenAddDialog] = useState<boolean>(false)

    return (
        <>
            {openAddDialog && (<UpsertDialog openDialog={openAddDialog} setOpenDialog={setOpenAddDialog} />)}
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold m-4 text-center">Inventory Management System</h1>
                <div className="flex lg:w-1/2 justify-between gap-5 md:gap-10 p-6 mt-10">
                    <Input placeholder="Search..." />
                    <Button variant="outline" onClick={() => setOpenAddDialog(true)}>Add New Product</Button>
                </div>
                <div className="lg:w-1/2">
                    <Table >
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-xl">Product</TableHead>
                                <TableHead className="text-xl">Category</TableHead>
                                <TableHead className="text-xl">Stock</TableHead>
                                <TableHead className="text-xl">Price</TableHead>
                                <TableHead className="text-xl">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((item: { uuid: string, name: string, category: string, stock: number, price: number }) => (
                                <TableRow key={item.uuid} className={item.stock < 10 ? "bg-red-100 hover:bg-red-400 hover:text-white" : ""}>
                                    <TableCell className="text-md">{item.name}</TableCell>
                                    <TableCell className="text-md">{item.category}</TableCell>
                                    <TableCell className="text-md">{item.stock}</TableCell>
                                    <TableCell className="text-md">{item.price}</TableCell>
                                    <TableCell className="text-md">
                                        <Ellipsis size={16} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default InventoryTable
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"

// // import { toast } from "@/components/hooks/use-toast"
// import { Button } from "@/components/ui/button"
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"

// const FormSchema = z.object({
//     username: z.string().min(2, {
//         message: "Username must be at least 2 characters.",
//     }),
// })

// export default function InventoryTable() {
//     const form = useForm<z.infer<typeof FormSchema>>({
//         resolver: zodResolver(FormSchema),
//         defaultValues: {
//             username: "",
//         },
//     })

//     function onSubmit(data: z.infer<typeof FormSchema>) {
//         console.log(data)
//         // toast({
//         //     title: "You submitted the following values:",
//         //     description: (
//         //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//         //             <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//         //         </pre>
//         //     ),
//         // })
//     }

//     return (
//         <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
//                 <FormField
//                     control={form.control}
//                     name="username"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Username</FormLabel>
//                             <FormControl>
//                                 <Input placeholder="shadcn" {...field} />
//                             </FormControl>
//                             <FormDescription>
//                                 This is your public display name.
//                             </FormDescription>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <Button type="submit">Submit</Button>
//             </form>
//         </Form>
//     )
// }
