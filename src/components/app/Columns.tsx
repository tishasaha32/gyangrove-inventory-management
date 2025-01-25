import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ColumnsProps {
    item: Product;
    handleUpdateClick: (item: Product) => void;
    handleDeleteClick: (item: Product) => void;
}

const Columns = ({ item, handleUpdateClick, handleDeleteClick }: ColumnsProps) => {
    return (
        <TableRow
            key={item.uuid}
            className={
                item.stock < 10 ? "bg-red-100 hover:bg-red-400 hover:text-white" : ""
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
    );
};

export default Columns;
