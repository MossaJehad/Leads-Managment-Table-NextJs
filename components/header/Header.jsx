import Image from "next/image";
import Separator from "../ui/Separator";
import SearchInput from "../ui/SearchInput";
import ProfileChip from "./ProfileChip";
import NavbarLinks from "../main/NavbarLinks";

export default function Header({ activeTab, setActiveTab }) {
	return (
		<header className="px-8">
			<section className="flex flex-row items-center gap-4 p-8">
				<Image src="/Sajilni.webp" width={100} height={100} alt="Sajilni" />
				<SearchInput />
				<ProfileChip />
			</section>
			<div className="-px-8">
				<Separator />
			</div>
			<nav className="flex flex-row items-center gap-4 p-6 px-8">
				<NavbarLinks activeTab={activeTab} setActiveTab={setActiveTab} />
			</nav>
			<Separator />
		</header>
	);
}

