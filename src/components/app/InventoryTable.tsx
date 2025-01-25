import { useState } from "react"
import AddDialog from "./AddDialog"
import { Ellipsis } from "lucide-react"
import UpdateDialog from "./UpdateDialog"
import DeleteDialog from "./DeleteDialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
const InventoryTable = () => {

    //get items from localStorage
    const data = JSON.parse(localStorage.getItem("products") || "[]");
    const [openAddDialog, setOpenAddDialog] = useState<boolean>(false)
    const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
    const [editProduct, setEditProduct] = useState<Product>({} as Product)
    const [deleteProduct, setDeleteProduct] = useState<Product>({} as Product)

    const handleUpdateClick = (item: Product) => {
        setEditProduct(item)
        setOpenUpdateDialog(true)
    }

    const handleDeleteClick = (item: Product) => {
        setDeleteProduct(item)
        setOpenDeleteDialog(true)
    }

    return (
        <>
            {openAddDialog && (<AddDialog openDialog={openAddDialog} setOpenDialog={setOpenAddDialog} />)}
            {openUpdateDialog && (<UpdateDialog openDialog={openUpdateDialog} setOpenDialog={setOpenUpdateDialog} editProduct={editProduct} />)}
            {openDeleteDialog && (<DeleteDialog openDialog={openDeleteDialog} setOpenDialog={setOpenDeleteDialog} deleteProduct={deleteProduct} />)}
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
                            {data.map((item: Product) => (
                                <TableRow key={item.uuid} className={item.stock < 10 ? "bg-red-100 hover:bg-red-400 hover:text-white" : ""}>
                                    <TableCell className="text-md">{item.name}</TableCell>
                                    <TableCell className="text-md">{item.category}</TableCell>
                                    <TableCell className="text-md">{item.stock}</TableCell>
                                    <TableCell className="text-md">{item.price}</TableCell>
                                    <TableCell className="text-md">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Ellipsis size={16} />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-40">
                                                <div className="flex flex-col gap-2">
                                                    <Button variant="outline" size="sm" onClick={() => handleUpdateClick(item)}>Update</Button>
                                                    <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(item)}>Delete</Button>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
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