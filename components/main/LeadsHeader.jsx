import React from 'react';
import SearchInput from '../ui/SearchInput';
import {CloudDownload, UserRound} from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectGroup
} from "@/components/ui/select";
import { Button } from '../ui/button';

// instead of setSearch use debounce or setState inside search input, and base on the return value trigger
export default function LeadsHeader({leads, search, setSearch}) {
	return (
		<header className="flex items-center justify-between mb-6 p-6 px-8 rounded-md border bg-white dark:bg-gray-900 dark:text-white">
			<div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-4 items-center w-full ml-6">
				<h1 className="text-xl md:text-2xl font-semibold text-gray-800 whitespace-nowrap dark:text-white">Leads</h1>
				<SearchInput search={search} setSearch={setSearch} />
				<Select className="w-full md:w-auto">
					<SelectTrigger className="md:w-[180px] w-full">
						<SelectValue placeholder="All team members" />
					</SelectTrigger>
					<SelectContent className="md:w-[180px] w-full">
						<SelectGroup>
							<SelectItem value="All" className="whitespace-nowrap"><UserRound />All team members</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				<Button 
				className="flex w-full md:w-auto items-center gap-2 bg-purple-600 text-white px-3 py-2 whitespace-nowrap rounded-md
				text-sm hover:bg-purple-700 cursor-pointer"
				onClick={() => { // make it a func
					const rows = [
							["Name", "Company", "Phone Number", "Email", "Collected by", "Notes"],
							...leads.map(lead => [
								lead.name,
								lead.company,
								lead.phone,
								lead.email,
								lead.collectedBy,
								lead.notes
							])
						];
					let csvContent = "data:text/csv;charset=utf-8,"
						+ rows.map(e => e.join(",")).join("\n");
					const encodedUri = encodeURI(csvContent);
					const link = document.createElement("a");
					link.setAttribute("href", encodedUri);
					link.setAttribute("download", "leads.csv");
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
				}}>
					<CloudDownload />
					<span>Export Data</span>
				</Button>
			</div>
		</header>
	)
}
