import { FilterIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface FilterProps {
    handleFilterByCategory: (category: string) => void
}
const Filter = ({ handleFilterByCategory }: FilterProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="flex justify-center cursor-pointer hover:bg-muted border border-input py-2 px-2 rounded-md items-center gap-2">
                    <p className="font-semibold">
                        Filter
                    </p>
                    <FilterIcon size={16} />
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
    )
}

export default Filter