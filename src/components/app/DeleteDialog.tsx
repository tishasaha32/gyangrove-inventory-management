import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface DeleteDialogProps {
    openDialog: boolean
    setOpenDialog: (open: boolean) => void,
    deleteProduct: Product
}

const DeleteDialog = ({ openDialog, setOpenDialog, deleteProduct }: DeleteDialogProps) => {

    const handleDelete = () => {
        const products = localStorage.getItem("products");
        let updatedProducts = [];
        if (products) {
            updatedProducts = JSON.parse(products);
        }
        updatedProducts = updatedProducts.filter((product: Product) => product.uuid !== deleteProduct.uuid);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        setOpenDialog(false);
    }
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="flex flex-col gap-4">
                <p>Are you sure you want to delete this product?</p>
                <div className="w-full flex justify-end">
                    <Button variant="destructive" onClick={() => handleDelete()}>Delete</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteDialog