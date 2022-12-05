import Image from "next/image";
import Link from "next/link";

import Navigation from "./nav";

import logoImg from "../public/images/logo.png";

function Header() {
	return (
		<header className="sticky z-50 w-full bg-slate-800">
			<div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
				<Link className="flex" href="/">
					<Image
						className="h-full"
						src={logoImg}
						alt="Logo image"
						width={100}
						height={75}
					/>
				</Link>

				<Navigation />
			</div>
		</header>
	);
}

export default Header;
