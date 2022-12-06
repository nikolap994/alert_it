import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import Image from "next/image";
import { md5 } from "request/lib/helpers";

import logoImg from "../public/images/logo.png";
import HamburgerIcon from "../public/images/icons/hamburger-menu.svg";

function Navigation() {
	const { data: session } = useSession();
	const router = useRouter();

	return (
		<nav className="max-w-7xl w-full mx-auto px-4 md:px-6 py-4 pb-8 flex flex-col lg:flex-row items-start hh-screen">
			<Link className="flex" href="/">
				<Image
					className="h-full"
					src={logoImg}
					alt="Evil Bees logo; Golden been with white text that reads Evil Bees"
					width={100}
					height={75}
				/>
			</Link>
			<Image
				className="hidden lg:block"
				src={HamburgerIcon}
				alt="Two white dashes"
			/>
			{session ? (
				<ul className="flex flex-col lg:flex-row text-lg items-left gap-8 text-white">
					<li className="border border-white border-md p-3 w-[200px] active:bg-white active:text-black focus:bg-white focus:text-black  focus-within:bg-white focus-within:text-black ">
						<Link href="/dashboard"> Dashboard </Link>
					</li>
					<li className="border border-white border-md p-3 w-[200px] active:bg-white active:text-black focus:bg-white focus:text-black  focus-within:bg-white focus-within:text-black ">
						<Link className="flex items-center gap-6" href="/dashboard/user">
							{"Edit profile"}
							<Image
								alt="profile-pic"
								src={
									"https://www.gravatar.com/avatar/" + md5(session.user.email)
								}
								width={50}
								height={50}
								className="w-8 h-8 rounded-full"
							></Image>
						</Link>
					</li>
					<li className="border border-white border-md p-3 w-[200px] active:bg-white active:text-black focus:bg-white focus:text-black  focus-within:bg-white focus-within:text-black ">
						<button onClick={() => signOut()}>Log out</button>
					</li>
				</ul>
			) : (
				<ul className="flex gap-4 text-white">
					<li>
						<Link href="/register">
							<button
								onClick={() => {
									router.push("/api/auth/signin");
								}}
							>
								Account
							</button>
						</Link>
					</li>
				</ul>
			)}
		</nav>
	);
}

export default Navigation;
