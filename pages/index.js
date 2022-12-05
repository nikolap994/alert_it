import { getSession } from "next-auth/react";

import HomepageHero from "../components/HomepageHero";
import AboutAlertit from "../components/AboutAlertit";

export default function HomePage() {
	return (
		<main className="bg-indigo-700">
			<HomepageHero />
			<AboutAlertit />
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
