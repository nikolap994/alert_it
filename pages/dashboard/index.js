import { getSession } from "next-auth/react";

export default function Dashboard(props) {
	return (
		<main className="mt-10 max-w-7xl mx-auto px-4 md:px-6">
			<h1>Dashboard Page</h1>
			<div>
				Logged in as: {props.email}
			</div>
		</main>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: { destination: "/" },
		};
	} else {
		const email = session.user.email;

		return {
			props: {
				email,
			},
		};
	}

	return {
		props: {},
	};
}
