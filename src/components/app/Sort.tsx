import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SortProps {
    handleSortByStock: () => void
}
const Sort = ({ handleSortByStock }: SortProps) => {
    return (
        <Button variant="outline" onClick={() => handleSortByStock()}>
            Sort by Stock
            <ArrowUpDown size={16} />
        </Button>
    )
}

export default Sort