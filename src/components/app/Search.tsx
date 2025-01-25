import { Input } from "@/components/ui/input"

interface SearchProps {
    handleSearch: (value: string) => void
}

const Search = ({ handleSearch }: SearchProps) => {
    return (
        <Input
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
        />
    )
}

export default Search