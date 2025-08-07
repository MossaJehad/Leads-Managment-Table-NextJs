import React from 'react';
import LeadsHeader from './LeadsHeader';
import MyTable from './MyTable';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { useState, useEffect } from 'react';

export default function Leads() {
	const [search, setSearch] = useState("");
	const [leads, setLeads] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	useEffect(() => {
		fetch('/mock/file.json')
			.then(res => res.json())
			.then(data => setLeads(data))
			.catch(err => console.error("Error fetching leads:", err));
	}, []);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentLeads = leads.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(leads.length / itemsPerPage);

	return (
	<div>
		<LeadsHeader leads={leads} search={search} setSearch={setSearch}/>
		<div className="bg-white rounded-md shadow-sm overflow-hidden border">
			<MyTable leads={currentLeads} setLeads={setLeads} search={search} setSearch={setSearch}/>
			
			<Pagination className="p-2 w-full dark:bg-gray-900 dark:text-white">
				<PaginationContent className="w-full flex justify-between items-center">
					<PaginationItem>
						<PaginationPrevious
							href=""
							onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
							className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
						/>
					</PaginationItem>
					<div className="flex gap-1">
						{Array.from({ length: totalPages }, (_, i) => (
							<PaginationItem key={i}>
								<PaginationLink
									href=""
									onClick={() => setCurrentPage(i + 1)}
									isActive={currentPage === i + 1}
									className={`cursor-pointer ${
										currentPage === i + 1 ? 'bg-gray-200 text-black dark:text-white' : ''
									}`}
								>
									{i + 1}
								</PaginationLink>
							</PaginationItem>
						))}
					</div>
					<PaginationItem>
						<PaginationNext
							href=""
							onClick={() =>
								setCurrentPage((prev) => Math.min(prev + 1, totalPages))
							}
							className={
								currentPage === totalPages ? "pointer-events-none opacity-50" : ""
							}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	</div>
  )
}
