import { getCsrfToken, getProviders } from "next-auth/react";

import SignInCTA from "../src/components/signin-cta";

export default function SignIn({ csrfToken }) {
	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="flex justify-center h-screen">
				<SignInCTA />
			</div>
		</section>
	);
}

export async function getServerSideProps(context) {
	return {
		props: {
			providers: await getProviders(context),
			csrfToken: await getCsrfToken(context),
		},
	};
}
