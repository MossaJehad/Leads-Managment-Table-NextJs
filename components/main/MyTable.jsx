import React, { useState } from 'react';
import { Copy, PenLine, Trash2 } from 'lucide-react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Toaster } from '../ui/sonner';
import { toast } from 'sonner';

export default function MyTable({ leads, setleads, search, setSearch }) {
	const [selectedLead, setSelectedLead] = useState(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	if (!Array.isArray(leads)) return <p className="text-xl p-4 text-gray-500">Loading...</p>;
	const filteredLeads = search ? leads.filter((lead) =>
		lead.name.toLowerCase().includes(search.toLowerCase()) ||
		lead.company.toLowerCase().includes(search.toLowerCase()) ||
		lead.email.toLowerCase().includes(search.toLowerCase()))
		: leads;

	const fields = [
		{ label: "Name", key: "name" },
		{ label: "Company", key: "company" },
		{ label: "Phone Number", key: "phone" },
		{ label: "Email", key: "email" },
		{ label: "Notes", key: "notes" },
	];
	
	return (
		<div className='dark:bg-gray-900'>
			<Toaster richColors position="bottom-right" />
			<Table className="min-w-full text-sm text-left">
				<TableHeader className="bg-gray-100 border-b text-gray-600">
					<TableRow className="dark:bg-gray-800">
						<TableHead className="p-4">
							<Checkbox
								type="checkbox"
								className="data-[state=checked]:border-purple-600 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white dark:data-[state=checked]:border-purple-900 dark:data-[state=checked]:bg-purple-900 w-5 h-5"
								onClick={() => {
									let checkboxs = document.querySelectorAll("#checkbox");
									checkboxs.forEach(cb => cb.click());
								}}
							/>
						</TableHead>
						<TableHead className="p-4 text-gray-500 dark:text-white">Name</TableHead>
						<TableHead className="p-4 text-gray-500 dark:text-white">Company</TableHead>
						<TableHead className="p-4 text-gray-500 dark:text-white">Phone Number</TableHead>
						<TableHead className="p-4 text-gray-500 dark:text-white">Email</TableHead>
						<TableHead className="p-4 text-gray-500 dark:text-white">Collected by</TableHead>
						<TableHead className="p-4 text-gray-500 dark:text-white">Notes</TableHead>
						<TableHead className="p-4 text-right"></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredLeads.map((lead, i) => (
						<TableRow key={i} className="odd:bg-muted/50 border-b hover:bg-gray-50 dark:hover:bg-gray-700">
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
										navigator.clipboard.writeText(rowText).then(() => {
											toast.success("Lead copied to clipboard!");
										}).catch(() => {
											toast.error("Failed to copy lead.");
										});
									}}>
									<Copy className="w-4 h-4 text-gray-500 hover:text-black" />
								</Button>
								<Dialog>
									<DialogTrigger title="Edit" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[>svg]:px-3 cursor-pointer bg-transparent hover:bg-gray-200"
									onClick={() => setSelectedLead(lead)}
									>
											<PenLine className="w-4 h-4 text-gray-500 hover:text-black" />
									</DialogTrigger>
									<DialogContent className="dark:bg-gray-900">
										<DialogHeader>
											<DialogTitle>Editing row</DialogTitle>
											{fields.map(({ label, key }) => (
												<div key={key} className="mb-4">
													<label htmlFor={key} className="block font-medium mb-1">
														{label}
													</label>
													<input
														id={key}
														type="text"
														value={selectedLead?.[key] || ""}
														onChange={(e) =>
															setSelectedLead({ ...selectedLead, [key]: e.target.value })
														}
														className="border p-2 w-full rounded"
													/>
												</div>
											))}
											<DialogClose asChild>
												<Button variant="outline" className="cursor-pointer">Cancel</Button>
											</DialogClose>
											<DialogClose asChild>
												<Button type="submit" className="bg-green-600 hover:bg-green-700 cursor-pointer"
													onClick = {() => {
														if (!selectedLead) return;

														setleads(prev =>
															prev.map(lead =>
																lead.id === selectedLead.id ? selectedLead : lead
															)
														);
														toast.success("Lead updated!");
													}}>
														Save Changes
													</Button>
											</DialogClose>
										</DialogHeader>
									</DialogContent>
								</Dialog>
								<Dialog>
									<DialogTrigger title="Delete" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[>svg]:px-3 cursor-pointer bg-transparent hover:bg-red-200">
											<Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
									</DialogTrigger>
									<DialogContent className="dark:bg-gray-900">
										<DialogHeader>
											<DialogTitle>Are you absolutely sure?</DialogTitle>
											<DialogDescription>
												This action cannot be undone. This will permanently delete this data.
											</DialogDescription>
										</DialogHeader>
										<DialogFooter>
											<DialogClose asChild>
												<Button variant="outline" className="cursor-pointer">Cancel</Button>
											</DialogClose>
											<DialogClose asChild>
												<Button type="submit" className="bg-red-700 hover:bg-red-800 cursor-pointer dark:text-white"
												onClick = {() => {
													setleads(prev => prev.filter((_, index) => index != i));
													toast.success("Lead Deleted");
												}}>
													Delete
												</Button>
											</DialogClose>
										</DialogFooter>
									</DialogContent>
								</Dialog>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
