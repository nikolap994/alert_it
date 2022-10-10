import Image from "next/image";
import Link from "next/link";

import Navigation from "./nav";

import logoImg from "../public/images/gold.png";

function Header() {
	return (
		<header className="bg-slate-800">
			<div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
				<Link href="/">
					<a className="flex">
						<Image
							className="h-full"
							src={logoImg}
							alt="Logo image"
							width={100}
							height={75}
						/>
					</a>
				</Link>

				<Navigation />
			</div>
		</header>
	);
}

export default Header;
