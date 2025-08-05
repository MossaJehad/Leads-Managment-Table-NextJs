import React from 'react';
import {
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import LeadsHeader from './LeadsHeader';
import Table from './Table';
//import { Pagination } from '../ui/pagination';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
export default function Leads({leads, search, setSearch}) {
  return (
	<>
		<LeadsHeader search={search} setSearch={setSearch}/>
		{/* Main Content */}
		<div className="bg-white rounded-xl shadow-sm overflow-hidden border">
			<Table leads={leads} />
			<Pagination className="p-2 w-full">
				<PaginationContent className="w-full flex justify-between">
					<PaginationItem className="border-1 rounded-md">
						<PaginationPrevious href="#" />
					</PaginationItem>
					<div className="flex gap-1">
						<PaginationItem>
							<PaginationLink href="#">1</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					</div>
					<PaginationItem className="border-1 rounded-md">
						<PaginationNext href="#" />
					</PaginationItem>
				</PaginationContent>
			</Pagination>

			{/*<div className="flex justify-between items-center p-4 bg-white border-t">
				<button className="text-sm text-gray-600 flex items-center gap-1 hover:text-black">
					<ChevronLeft className="w-4 h-4" /> Previous
				</button>
				<div className="flex gap-1">
					{[1, 2, 3, '...', 10].map((num, idx) => (
					<button
						key={idx}
						className={`px-3 py-1 text-sm rounded-md ${
						num === 1 ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700"
						}`}
					>
						{num}
					</button>
					))}
				</div>
				<button className="text-sm text-gray-600 flex items-center gap-1 hover:text-black">
					Next <ChevronRight className="w-4 h-4" />
				</button>
			</div>*/}
		</div>
	</>
  )
}
