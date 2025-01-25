import { z } from "zod";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { AddProductSchema } from "@/schemas/AddProduct";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "../ui/select";

interface UpdateDialogProps {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
    editProduct: Product;
}
const UpdateDialog = ({
    openDialog,
    setOpenDialog,
    editProduct,
}: UpdateDialogProps) => {
    const onOpenChange = (open: boolean) => {
        setOpenDialog(open);
    };

    const defaultValues: z.infer<typeof AddProductSchema> = {
        name: editProduct?.name || "",
        price: editProduct?.price.toString() || "",
        category: editProduct?.category || "",
        stock: editProduct?.stock.toString() || "",
    };

    const form = useForm<z.infer<typeof AddProductSchema>>({
        defaultValues: defaultValues,
        mode: "onTouched",
        resolver: zodResolver(AddProductSchema),
    });

    // Submit the form data and set it in local storage
    const onSubmit = (values: z.infer<typeof AddProductSchema>) => {
        const payload = {
            uuid: editProduct?.uuid,
            ...values,
        };
        console.log(payload);
        const products = localStorage.getItem("products");
        let updatedProducts = [];
        if (products) {
            updatedProducts = JSON.parse(products);
        }

        updatedProducts = updatedProducts.map(
            (product: {
                uuid: string;
                name: string;
                category: string;
                stock: number;
                price: number;
            }) => {
                if (product.uuid === payload.uuid) {
                    return payload;
                }
                return product;
            }
        );

        localStorage.setItem("products", JSON.stringify(updatedProducts));
        onOpenChange(false);
    };

    return (
        <Dialog open={openDialog} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl p-6">
                <Form {...form}>
                    <form
                        className="flex w-full flex-col items-center justify-center gap-3 p-6"
                        onSubmit={form.handleSubmit((values) => onSubmit(values))}
                    >
                        <div className="flex w-full flex-col gap-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <Input
                                        type="text"
                                        placeholder="Enter Product Name"
                                        {...field}
                                    />
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <Input
                                        type="number"
                                        placeholder="Enter Product Price"
                                        {...field}
                                    />
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a fruit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="Grocery">Grocery</SelectItem>
                                                <SelectItem value="Electronics">Electronics</SelectItem>
                                                <SelectItem value="Shoes">Shoes</SelectItem>
                                                <SelectItem value="Accessories">Accessories</SelectItem>
                                                <SelectItem value="Books">Books</SelectItem>
                                                <SelectItem value="Others">Others</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="stock"
                                render={({ field }) => (
                                    <Input
                                        type="number"
                                        placeholder="Enter Product Stock"
                                        {...field}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex w-full justify-end">
                            <Button type="submit" variant="ghost">
                                <Pencil />
                                Update
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateDialog;
