import React from 'react'

export default function Separator() {
	return (
		<div
			data-orientation="horizontal"
			role="none"
			data-slot="separator"
			className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
		/>
	)
}