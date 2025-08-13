import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

interface ColumnsProps {
    item: Product;
    handleUpdateClick: (item: Product) => void;
    handleDeleteClick: (item: Product) => void;
}

const Columns = ({ item, handleUpdateClick, handleDeleteClick }: ColumnsProps) => {
    const [imageModalOpen, setImageModalOpen] = useState(false);

    return (
        <>
            <TableRow
                key={item.uuid}
                className={
                    item.stock == 1 ? "bg-red-100 hover:bg-red-400 hover:text-white" : item.stock == 0 ? "bg-red-400 hover:bg-red-500 text-white" : ""
                }
            >
                <TableCell className="text-md">
                    <Dialog open={imageModalOpen} onOpenChange={setImageModalOpen}>
                        <DialogTrigger asChild>
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-16 h-16 object-cover rounded-md border cursor-pointer hover:opacity-80 transition-opacity"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMiAyMEMyNS4zNzIgMjAgMjAgMjUuMzcyIDIwIDMyQzIwIDM4LjYyOCAyNS4zNzIgNDQgMzIgNDRDMzguNjI4IDQ0IDQ0IDM4LjYyOCA0NCAzMkM0NCAyNS4zNzIgMzguNjI4IDIwIDMyIDIwWiIgZmlsbD0iIzlDQTNBQSIvPgo8cGF0aCBkPSJNMzIgNTJDMjUuMzcyIDUyIDIwIDQ2LjYyOCAyMCA0MEMyMCAzMy4zNzIgMjUuMzcyIDI4IDMyIDI4QzM4LjYyOCAyOCA0NCAzMy4zNzIgNDQgNDBDNDQgNDYuNjI4IDM4LjYyOCA1MiAzMiA1MloiIGZpbGw9IiM5Q0EzQUEiLz4KPC9zdmc+Cg==";
                                }}
                            />
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] p-6">
                            <div className="flex flex-col items-center gap-4">
                                <h3 className="text-xl font-semibold text-center">{item.name}</h3>
                                <div className="relative">
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMiAyMEMyNS4zNzIgMjAgMjAgMjUuMzcyIDIwIDMyQzIwIDM4LjYyOCAyNS4zNzIgNDQgMzIgNDRDMzguNjI4IDQ0IDQ0IDM4LjYyOCA0NCAzMkM0NCAyNS4zNzIgMzguNjI4IDIwIDMyIDIwWiIgZmlsbD0iIzlDQTNBQSIvPgo8cGF0aCBkPSJNMzIgNTJDMjUuMzcyIDUyIDIwIDQ2LjYyOCAyMCA0MEMyMCAzMy4zNzIgMjUuMzcyIDI4IDMyIDI4QzM4LjYyOCAyOCA0NCAzMy4zNzIgNDQgNDBDNDQgNDYuNjI4IDM4LjYyOCA1MiAzMiA1MloiIGZpbGw9IiM5Q0EzQUEiLz4KPC9zdmc+Cg==";
                                        }}
                                    />
                                </div>
                                <div className="text-center text-sm text-gray-600">
                                    <p><strong>Category:</strong> {item.category}</p>
                                    <p><strong>Stock:</strong> {item.stock}</p>
                                    <p><strong>Price:</strong> {item.price}/-</p>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </TableCell>
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
        </>
    );
};

export default Columns;
