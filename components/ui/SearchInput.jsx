import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function SearchInput({search, setSearch}) {
	return (
		<div className="w-full relative">
		<Search className="text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" />
		<Input
			type="search"
			placeholder="Search..."
			className="pl-10"
			value={search}
			onChange={(e) => setSearch(e.target.value)}
		/>
		</div>
	)
}
