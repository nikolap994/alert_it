import SignInCTA from "../src/components/signin-cta";
import SignInForm from "../src/components/sign-in-form";

export default function SignIn() {
	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="flex justify-center h-screen">
				<SignInCTA />
				<SignInForm />
			</div>
		</section>
	);
}
