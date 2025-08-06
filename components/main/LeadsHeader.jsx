import React from 'react';
import SearchInput from '../ui/SearchInput';
import {CloudDownload, UserRound} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '../ui/button';

export default function LeadsHeader({leads, search, setSearch}) {
	return (
		<header className="flex items-center justify-between mb-6 p-6 px-8 rounded-md border bg-white">
			<h1 className="text-2xl font-semibold text-gray-800 whitespace-nowrap">Leads</h1>
			<div className="flex gap-4 items-center w-full ml-6">
				<SearchInput search={search} setSearch={setSearch} />
				<Select>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="All team members" />
					</SelectTrigger>
					<SelectContent className="w-[180px]">
						<SelectItem value="light" className="whitespace-nowrap"><UserRound />All team members</SelectItem>
					</SelectContent>
				</Select>
				<Button 
				className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 whitespace-nowrap rounded-md text-sm hover:bg-purple-700 cursor-pointer"
				onClick={() => {
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
				}}
				>
					<CloudDownload />
					<span>Export Data</span>
				</Button>
			</div>
		</header>
	)
}
