import { getSession } from "next-auth/react";

import HomepageHero from "../components/HomepageHero";

export default function HomePage() {
	return (
		<main className="bg-indigo-700">
			<HomepageHero />

			<section className="h-24 w-full	bg-indigo-400 py-12"></section>
		</main>
	);
}

export async function getServerSideProps(context) {
	const { req } = context;
	const session = await getSession({ req });
	if (session) {
		return {
			redirect: { destination: "/dashboard" },
		};
	}

	return {
		props: {},
	};
}
