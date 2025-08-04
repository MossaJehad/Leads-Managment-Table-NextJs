import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function SearchInput() {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <Input
        type="search"
        placeholder="Search..."
        className="pl-10"
      />
    </div>
  )
}
