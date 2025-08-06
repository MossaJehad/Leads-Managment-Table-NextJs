export default function ProfileChip() {
  return (
	<div className="flex items-center gap-4">
		<span data-slot="avatar" className="relative flex size-8 shrink-0 overflow-hidden rounded-full">
			<img data-slot="avatar-image" className="aspect-square size-full" alt="avatar" src="https://i.pravatar.cc/100" width={100} height={100} />
			</span>
		<div>
			<p className="text-base font-medium whitespace-nowrap">Olivia Martin</p>
		</div>
	</div>
	)
}