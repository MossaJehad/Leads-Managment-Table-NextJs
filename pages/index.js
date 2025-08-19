import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react"
import Header from "@/components/header/Header";
import Leads from "@/components/main/Leads";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function Home() {
	const [activeTab, setActiveTab] = useState("Leads"); // Use route instead \ Tabs from shadcn - for better perf

	return (
		<>
			<header>
				<Header activeTab={activeTab} setActiveTab={setActiveTab}/>
			</header>
			<main className="p-8 bg-gray-100 min-h-screen dark:bg-gray-900 dark:text-white">
				{activeTab === "Leads" ?
				<Leads /> :
				<h1 class="mb-4 text-xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl dark:text-white">{activeTab}</h1>}
			</main>
		</>
	)
}
