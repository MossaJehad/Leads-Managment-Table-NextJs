import { useState } from "react";
import Link from "next/link";
import {
	UserRound, BellRing, Video, Calendar,
	Book, FileText, Settings
} from 'lucide-react';

const nLinks = [
	{ label: "Personal details", href: "/", icon: UserRound },
	{ label: "Notification", href: "/", icon: BellRing },
	{ label: "Videos", href: "/", icon: Video },
	{ label: "Calendar", href: "/", icon: Calendar },
	{ label: "Leads", href: "/", icon: Book },
	{ label: "Documents", href: "/", icon: FileText },
	{ label: "Settings", href: "/", icon: Settings },
];

export default function NavbarLinks({ activeTab, setActiveTab }) {
	return (
		<nav className="flex flex-row items-center gap-12">
			{nLinks.map((link) => {
				const Icon = link.icon;
				const isActive = activeTab === link.label;

				return (
					<button
						key={link.label}
						onClick={() => setActiveTab(link.label)}
						className={`flex items-center gap-2 focus:outline-none ${
							isActive ? 'text-purple-800 font-semibold' : 'text-muted-foreground'
						} transition-colors hover:text-primary cursor-pointer`}
					>
						<Icon className="size-5" />
						<span className="text-base">{link.label}</span>
					</button>
				);
			})}
		</nav>
	);
}

