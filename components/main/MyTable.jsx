import React from 'react';
import { Copy, PenLine, Trash2 } from 'lucide-react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';

export default function MyTable({ leads, search, setSearch }) {
	if (!Array.isArray(leads)) return <p className="text-xl p-4 text-gray-500">Loading...</p>;
	const filteredLeads = search ? leads.filter((lead) =>
		lead.name.toLowerCase().includes(search.toLowerCase()) ||
		lead.company.toLowerCase().includes(search.toLowerCase()) ||
		lead.email.toLowerCase().includes(search.toLowerCase()))
		: leads;

	return (
		<Table className="min-w-full text-sm text-left">
			<TableHeader className="bg-gray-100 border-b text-gray-600">
				<TableRow>
					<TableHead className="p-4">
						<Checkbox
							type="checkbox"
							className="data-[state=checked]:border-purple-600 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white dark:data-[state=checked]:border-purple-700 dark:data-[state=checked]:bg-purple-700 w-5 h-5"
							onClick={() => {
								let checkboxs = document.querySelectorAll("#checkbox");
								checkboxs.forEach(cb => cb.click());
							}}
						/>
					</TableHead>
					<TableHead className="p-4 text-gray-500">Name</TableHead>
					<TableHead className="p-4 text-gray-500">Company</TableHead>
					<TableHead className="p-4 text-gray-500">Phone Number</TableHead>
					<TableHead className="p-4 text-gray-500">Email</TableHead>
					<TableHead className="p-4 text-gray-500">Collected by</TableHead>
					<TableHead className="p-4 text-gray-500">Notes</TableHead>
					<TableHead className="p-4 text-right"></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{filteredLeads.map((lead, i) => (
					<TableRow key={i} className="odd:bg-muted/50 border-b hover:bg-gray-50">
						<TableCell className="p-4">
							<Checkbox
								type="checkbox"
								className="data-[state=checked]:border-purple-600 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white dark:data-[state=checked]:border-purple-700 dark:data-[state=checked]:bg-purple-700 w-5 h-5"
								id="checkbox"
							/>
						</TableCell>
						<TableCell className="p-4 font-semibold">{lead.name}</TableCell>
						<TableCell className="p-4">{lead.company}</TableCell>
						<TableCell className="p-4">{lead.phone}</TableCell>
						<TableCell className="p-4">{lead.email}</TableCell>
						<TableCell className="p-4">{lead.collectedBy}</TableCell>
						<TableCell className="p-4">{lead.notes}</TableCell>
						<TableCell className="p-4 text-right space-x-2">
							<Button title="Copy" className="cursor-pointer bg-transparent hover:bg-gray-200"
								onClick={() => {
									const rowText = `
										Name: ${lead.name}
										Company: ${lead.company}
										Phone: ${lead.phone}
										Email: ${lead.email}
										Collected by: ${lead.collectedBy}
										Notes: ${lead.notes}
									`.trim();
									navigator.clipboard.writeText(rowText);
								}}>
								<Copy className="w-4 h-4 text-gray-500 hover:text-black" />
							</Button>
							<Button title="Edit" className="cursor-pointer bg-transparent hover:bg-gray-200">
								<PenLine className="w-4 h-4 text-gray-500 hover:text-black" />
							</Button>
							<Button title="Delete" className="cursor-pointer bg-transparent hover:bg-red-200">
								<Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
