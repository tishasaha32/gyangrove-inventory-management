import Sort from "./Sort";
import Filter from "./Filter";
import Search from "./Search";
import Columns from "./Columns";
import { useState } from "react";
import AddDialog from "./AddDialog";
import { Frown } from "lucide-react";
import UpdateDialog from "./UpdateDialog";
import DeleteDialog from "./DeleteDialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const InventoryTable = () => {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    console.log(products.length);

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
        if (filterData.length === 0) {
            setFilteredData([]);
        }
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
                    <Search handleSearch={handleSearch} />
                    <div className="flex flex-col md:flex-row gap-2">
                        <Filter handleFilterByCategory={handleFilterByCategory} />
                        <Sort handleSortByStock={handleSortByStock} />
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
                                && filteredData?.map((item: Product) => (
                                    <Columns key={item.uuid} item={item} handleUpdateClick={handleUpdateClick} handleDeleteClick={handleDeleteClick} />
                                ))}
                            {filteredData?.length === 0 && !activeFilter && products?.map((item: Product) => (
                                <Columns key={item.uuid} item={item} handleUpdateClick={handleUpdateClick} handleDeleteClick={handleDeleteClick} />
                            ))}
                            {products?.length === 0 || (filteredData?.length === 0 && activeFilter) ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">
                                        <div className="flex items-center justify-center flex-col gap-2">
                                            <div className="animate-nod">
                                                <Frown className="h-16 w-16 text-center" />
                                            </div>
                                            <p className="text-xl">
                                                No products found
                                            </p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : null}
                        </TableBody>
                    </Table>
                </div>
            </div >
        </>
    );
};

export default InventoryTable;
