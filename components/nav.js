import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import Image from "next/image";
import { md5 } from "request/lib/helpers";

function Navigation() {
	const { data: session } = useSession();
	const router = useRouter();

	return (
		<nav>
			{session ? (
				<ul className="flex gap-4 text-white">
					<li className="">
						<Link href="/dashboard"> Dashboard </Link>
					</li>
					<li className="">
						<Link href="/dashboard/user">
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
					<li className="">
						<button onClick={() => signOut()}>Log out</button>
					</li>
				</ul>
			) : (
				<ul className="flex gap-4 text-white">
					<li className="">
						<Link href="/"> Home </Link>
					</li>
					<li className="">
						<Link href="/signin">
							<button
								onClick={() => {
									router.push("/api/auth/signin");
								}}
							>
								Sign in
							</button>
						</Link>
					</li>
				</ul>
			)}
		</nav>
	);
}

export default Navigation;
