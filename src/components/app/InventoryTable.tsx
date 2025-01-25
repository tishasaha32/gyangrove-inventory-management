import { useState } from "react";
import AddDialog from "./AddDialog";
import UpdateDialog from "./UpdateDialog";
import DeleteDialog from "./DeleteDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Ellipsis, Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const InventoryTable = () => {
    const products = JSON.parse(localStorage.getItem("products") || "[]");

    //Function to handle search
    const [, setSearchTerm] = useState<string>("");
    const [filteredData, setFilteredData] = useState<Product[]>([]);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        const filterData = products.filter((item: Product) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filterData);
    };

    //Function to handle sorting
    const [sortType, setSortType] = useState<"ASC" | "DESC">("ASC");
    const handleSortByStock = () => {
        let sorted = [...products];
        if (sortType === "ASC") {
            sorted = [...products].sort(
                (a: Product, b: Product) => a.stock - b.stock
            );
            setSortType("DESC");
        } else {
            sorted = [...products].sort(
                (a: Product, b: Product) => b.stock - a.stock
            );
            setSortType("ASC");
        }
        setFilteredData(sorted);
    };

    //Function to handle filtering
    const [activeFilter, setActiveFilter] = useState<string>("");

    const handleFilterByCategory = (category: string) => {
        setActiveFilter(category);
        const filterData = products.filter((item: Product) =>
            item.category.toLowerCase() === (category.toLowerCase())
        );
        setFilteredData(filterData);
    };

    //States to handle modals
    const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
    const [editProduct, setEditProduct] = useState<Product>({} as Product);
    const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [deleteProduct, setDeleteProduct] = useState<Product>({} as Product);

    //Function to handle Update Modal
    const handleUpdateClick = (item: Product) => {
        setEditProduct(item);
        setOpenUpdateDialog(true);
    };

    //Function to handle Delete Modal
    const handleDeleteClick = (item: Product) => {
        setDeleteProduct(item);
        setOpenDeleteDialog(true);
    };

    // if (filteredData.length === 0 && activeFilter) {
    //     return (
    //         <div className="flex flex-col items-center">
    //             <h1 className="text-3xl font-bold m-4 text-center">
    //                 Inventory Management System
    //             </h1>
    //             <div className="flex flex-col items-center">
    //                 <h1 className="text-3xl font-bold m-4 text-center">
    //                     No products found
    //                 </h1>
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <>
            {openAddDialog && (
                <AddDialog
                    openDialog={openAddDialog}
                    setOpenDialog={setOpenAddDialog}
                />
            )}
            {openUpdateDialog && (
                <UpdateDialog
                    openDialog={openUpdateDialog}
                    setOpenDialog={setOpenUpdateDialog}
                    editProduct={editProduct}
                />
            )}
            {openDeleteDialog && (
                <DeleteDialog
                    openDialog={openDeleteDialog}
                    setOpenDialog={setOpenDeleteDialog}
                    deleteProduct={deleteProduct}
                />
            )}

            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold m-4 text-center">
                    Inventory Management System
                </h1>
                <div className="flex lg:w-1/2 items-center justify-between gap-5 md:gap-10 p-6">
                    <Input
                        placeholder="Search..."
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <div className="flex flex-col md:flex-row gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className="flex justify-center cursor-pointer hover:bg-muted border border-input py-2 px-2 rounded-md items-center gap-2">
                                    <p className="font-semibold">
                                        Filter
                                    </p>
                                    <Filter size={16} />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-32 cursor-pointer">
                                <p onClick={() => handleFilterByCategory("grocery")}>Grocery</p>
                                <p onClick={() => handleFilterByCategory("electronics")}>Electronics</p>
                                <p onClick={() => handleFilterByCategory("shoes")}>Shoes</p>
                                <p onClick={() => handleFilterByCategory("accessories")}>Accessories</p>
                                <p onClick={() => handleFilterByCategory("books")}>Books</p>
                                <p onClick={() => handleFilterByCategory("others")}>Others</p>
                            </PopoverContent>
                        </Popover>

                        <Button variant="outline" onClick={() => handleSortByStock()}>
                            Sort by Stock
                            <ArrowUpDown size={16} />
                        </Button>
                        <Button variant="outline" onClick={() => setOpenAddDialog(true)}>
                            Add Product
                        </Button>
                    </div>
                </div>
                <div className="lg:w-1/2">
                    <Table>
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
                            {filteredData?.length > 0
                                ? filteredData?.map((item: Product) => (
                                    <TableRow
                                        key={item.uuid}
                                        className={
                                            item.stock < 10
                                                ? "bg-red-100 hover:bg-red-400 hover:text-white"
                                                : ""
                                        }
                                    >
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
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleUpdateClick(item)}
                                                        >
                                                            Update
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => handleDeleteClick(item)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                ))
                                : products?.map((item: Product) => (
                                    <TableRow
                                        key={item.uuid}
                                        className={
                                            item.stock < 10
                                                ? "bg-red-100 hover:bg-red-400 hover:text-white"
                                                : ""
                                        }
                                    >
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
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleUpdateClick(item)}
                                                        >
                                                            Update
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => handleDeleteClick(item)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    {products?.length === 0 && (
                        <h1 className="text-xl text-center">No products found</h1>
                    )}
                </div>
            </div >
        </>
    );
};

export default InventoryTable;
