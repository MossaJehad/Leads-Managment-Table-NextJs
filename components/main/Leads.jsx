import React from 'react';
import {
	ClipboardList,
	Pencil,
	Trash2,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";

export default function Leads({leads, search, setSearch}) {
  return (
	<>
		<div className="flex items-center justify-between mb-6">
			<h1 className="text-2xl font-semibold text-gray-800">Leads</h1>
			<div className="flex gap-2">
			<input
				type="text"
				placeholder="Search..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="border border-gray-300 rounded-md px-3 py-2 text-sm w-64"
			/>
			<select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
				<option>All Team Members</option>
			</select>
			<button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700">
				Export Data
			</button>
			</div>
		</div>

		<div className="bg-white rounded-xl shadow-sm overflow-hidden border">
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

			{/* Pagination */}
			<div className="flex justify-between items-center p-4 bg-white border-t">
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
			</div>
		</div>
	</>
  )
}
