import { useState } from "react";
import { getCsrfToken, getSession } from "next-auth/react";
import SignInCTA from "../src/components/signin-cta";
import { useRouter } from "next/router";
import Image from "next/legacy/image";
import Link from "next/link";

import eyeIcon from "../public/images/icons/eye-open.png";
import eyeHideIcon from "../public/images/icons/eye-close.png";
import funEyeIcon from "../public/images/icons/fun-eye.png";

export default function SignIn({ csrfToken }) {
	const [value, setValue] = useState("");
	const [buttonClass, setButtonClass] = useState(0);
	const [showPassword, setShowPassword] = useState(0);
	const [isEyeOpen, toggleEye] = useState(0);
	const [funEyeClass, setFununEyeClass] = useState(0);
	const router = useRouter();

	const handleClick = () => {
		toggleEye(!isEyeOpen);
		const type =
			document.getElementById("password").getAttribute("type") === "password"
				? "text"
				: "password";
		document.getElementById("password").setAttribute("type", type);
	};

	return (
		<section className="bg-gray-900 absolute w-full">
			<div className="flex justify-center h-screen overflow-hidden">
				<SignInCTA
					className="absolute"
					highlightText="AlertIt is an uptime monitoring service by Evil Bees. Monitoring is performed through HTTP/S or TCP protocol, and allows you to check for a specific service — and be the first to get notified if service is down. Sounds useful?"
					highlightBtn="Let's get started."
				/>

				<div
					className={`text-4xl font-bold text-center text-white top-[10%] ${
						router.query.success ? "absolute" : "hidden"
					}`}
				>
					Account created, please log in
				</div>
				<div className="flex items-center px-6 mx-auto w-full md:w-1/2 max-w-[500px]">
					<div className="flex-1">
						<div className="text-center">
							<h2 className="text-4xl font-bold text-center text-white">
								Log In
							</h2>
						</div>

						<form
							method="post"
							action="/api/auth/callback/credentials"
							className="flex flex-col mt-8"
						>
							<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
							<label className="block mb-2 text-lg text-white">
								Email
								<input
									placeholder="Enter your email"
									className="emailInput bg-gray-200 block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md placeholder-gray-600 bg-gray-900 border-gray-700 focus:border-blue-400 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
									autoComplete="email"
									name="email"
									title="Must be a registered email address."
									type="email"
									required
									minLength="4"
									onChange={(e) => {
										setValue(e.currentTarget.value);
										const userEmail = JSON.stringify(e.currentTarget.value);

										userEmail.length - 2 >= 4
											? setButtonClass(
													"bg-gradient-to-r from-indigo-600 via-indigo-100 to-white"
											  )
											: "";

										userEmail.length <= 2 ? setButtonClass("bg-white") : "";

										let usernameRegex = /^[a-zA-Z0-9]+$/;
										return usernameRegex.test(userEmail);
									}}
								/>
							</label>
							<label className="relative flex flex-col block mt-8 mb-4 text-lg text-white">
								Password
								<input
									placeholder="Enter your password"
									className="block w-full bg-gray-200 px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md placeholder-gray-600 bg-gray-900 border-gray-700 focus:border-blue-400 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
									autoComplete="current-password"
									name="password"
									type={showPassword ? "text" : "password"}
									required
									minLength="4"
									onChange={(e) => {
										setButtonClass("bg-white");
									}}
								/>
								<button
									className="absolute bottom-0 right-4"
									type="button"
									onClick={() => setShowPassword(!showPassword)}
								>
									<Image
										className="h-auto w-auto"
										src={isEyeOpen ? eyeIcon : eyeHideIcon}
										alt="Eye icon"
										width={25}
										height={25}
										onClick={() => toggleEye(!isEyeOpen)}
									/>
								</button>
							</label>

							<div className="flex relative">
								<div className={`absolute left-[59%] top-1/4 ${funEyeClass}`}>
									<Image
										className="h-auto w-auto"
										src={funEyeIcon}
										alt="Eye icon"
										width={30}
										height={30}
									/>
								</div>
								<button
									className={`text-lg mt-8 py-2 px-8 mx-auto border-none rounded-md bg-white fade-out hover:bg-indigo-600 hover:text-white ${buttonClass}`}
									type="submit"
									href="/"
									onClick={() => {
										setFununEyeClass(
											"transition-transform duration-1000	translate-y-[100vh]"
										);
									}}
								>
									Sign in
								</button>
							</div>
							<p className="mt-8 text-lg text-center text-gray-400">
								Don&#39;t have an account yet?
								<Link
									className="text-blue-400 focus:outline-none focus:underline hover:underline"
									href="/register"
								>
									<span className="ml-2">Sign up.</span>
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
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
		props: {
			csrfToken: await getCsrfToken(context),
		},
	};
}
