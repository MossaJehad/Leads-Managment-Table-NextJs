	import React from 'react'
	import { ClipboardList, Pencil, Trash2 } from 'lucide-react'

	export default function Table({leads}) {
		return (
			<table className="min-w-full text-sm text-left">
				<thead className="bg-gray-100 border-b text-gray-600">
					<tr>
					<th className="p-4"><input type="checkbox" /></th>
					<th className="p-4">Name</th>
					<th className="p-4">Company</th>
					<th className="p-4">Phone Number</th>
					<th className="p-4">Email</th>
					<th className="p-4">Collected by</th>
					<th className="p-4">Notes</th>
					<th className="p-4 text-right">Actions</th>
					</tr>
				</thead>
				<tbody>
					{leads.map((lead, i) => (
					<tr key={i} className="border-b hover:bg-gray-50">
						<td className="p-4"><input type="checkbox" /></td>
						<td className="p-4">{lead.name}</td>
						<td className="p-4">{lead.company}</td>
						<td className="p-4">{lead.phone}</td>
						<td className="p-4">{lead.email}</td>
						<td className="p-4">{lead.collectedBy}</td>
						<td className="p-4">{lead.notes}</td>
						<td className="p-4 text-right space-x-2">
						<button title="Copy"><ClipboardList className="w-4 h-4 text-gray-500 hover:text-black" /></button>
						<button title="Edit"><Pencil className="w-4 h-4 text-gray-500 hover:text-black" /></button>
						<button title="Delete"><Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" /></button>
						</td>
					</tr>
					))}
				</tbody>
			</table>
		)
	}
