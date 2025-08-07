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
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Toaster } from '../ui/sonner';
import { toast } from 'sonner';

export default function MyTable({ leads, setLeads, search, setSearch }) {
	const [editingLead, setEditingLead] = useState(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [leadToDelete, setLeadToDelete] = useState(null);
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

	const handleEditClick = (lead, index) => {
		setEditingLead({ ...lead, originalIndex: index });
		setIsEditDialogOpen(true);
	};

	const handleSaveChanges = () => {
		if (!editingLead) return;
		setLeads(prev =>
			prev.map((lead, index) => {
				if (index === editingLead.originalIndex) {
					const { originalIndex, ...updatedLead } = editingLead;
					return updatedLead;
				}
				return lead;
			})
		);
		toast.success("Lead updated!");
		setEditingLead(null);
		setIsEditDialogOpen(false);
	};

	const handleDeleteClick = (leadIndex) => {
		setLeadToDelete(leadIndex);
		setIsDeleteDialogOpen(true);
	};

	const handleDeleteConfirm = () => {
		if (leadToDelete !== null) {
			setLeads(prev => prev.filter((_, index) => index !== leadToDelete));
			toast.success("Lead Deleted");
		}
		setLeadToDelete(null);
		setIsDeleteDialogOpen(false);
	};
	
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
								
								<Button 
									title="Edit" 
									className="cursor-pointer bg-transparent hover:bg-gray-200"
									onClick={() => handleEditClick(lead, i)}
								>
									<PenLine className="w-4 h-4 text-gray-500 hover:text-black" />
								</Button>

								<Button 
									title="Delete" 
									className="cursor-pointer bg-transparent hover:bg-red-200"
									onClick={() => handleDeleteClick(i)}
								>
									<Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
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
									value={editingLead?.[key] || ""}
									onChange={(e) =>
										setEditingLead({ ...editingLead, [key]: e.target.value })
									}
									className="border p-2 w-full rounded"
								/>
							</div>
						))}
					</DialogHeader>
					<DialogFooter>
						<Button 
							variant="outline" 
							className="cursor-pointer"
							onClick={() => {
								setEditingLead(null);
								setIsEditDialogOpen(false);
						}}>
							Cancel
						</Button>
						<Button 
							type="submit" 
							className="bg-green-600 hover:bg-green-700 cursor-pointer"
							onClick={handleSaveChanges}
						>
							Save Changes
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<DialogContent className="dark:bg-gray-900">
					<DialogHeader>
						<DialogTitle>Are you absolutely sure?</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently delete this data.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button 
							variant="outline" 
							className="cursor-pointer"
							onClick={() => {
								setLeadToDelete(null);
								setIsDeleteDialogOpen(false);
						}}>
							Cancel
						</Button>
						<Button 
							type="submit" 
							className="bg-red-700 hover:bg-red-800 cursor-pointer dark:text-white"
							onClick={handleDeleteConfirm}
						>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
