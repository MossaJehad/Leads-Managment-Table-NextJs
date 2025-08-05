import React from 'react'
import SearchInput from '../ui/SearchInput'

export default function LeadsHeader({search, setSearch}) {
	return (
		<header className="flex items-center justify-between mb-6 p-6 px-8 rounded-md border bg-white">
			<h1 className="text-2xl font-semibold text-gray-800 whitespace-nowrap">Leads</h1>
			<div className="flex gap-4 items-center w-full ml-6">
				<SearchInput search={search} setSearch={setSearch} />
				<select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
					<option>All Team Members</option>
				</select>
				<button className="bg-purple-600 text-white px-4 py-2 whitespace-nowrap rounded-md text-sm hover:bg-purple-700">
					Export Data
				</button>
			</div>
		</header>
	)
}
