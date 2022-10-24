import { getSession } from "next-auth/react";

export default function Dashboard() {
	return <h1>Dashboard Page</h1>;
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: { destination: "/" },
		};
	}

	return {
		props: {},
	};
}
