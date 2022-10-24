import { useState } from "react";
import { getCsrfToken, getSession } from "next-auth/react";
import SignInCTA from "../src/components/signin-cta";

import Image from "next/image";
import Link from "next/link";

import eyeIcon from "../public/images/icons/eye-open.png";
import eyeHideIcon from "../public/images/icons/eye-close.png";
import funEyeIcon from "../public/images/icons/fun-eye.png";

export default function SignIn({ csrfToken }) {
	const [value, setValue] = useState("");
	const [buttonClass, setButtonClass] = useState(0);
	const [showPassword, setShowPassword] = useState(0);
	const [isEyeOpen, toggleEye] = useState(0);

	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="flex justify-center h-screen">
				<SignInCTA />
				<div className="flex items-center w-full max-w-md px-6 mx-auto xl:w-2/6">
					<div className="flex-1">
						<div className="text-center">
							<h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
								Log In
							</h2>

							<p className="mt-3 text-gray-500 dark:text-gray-300">
								Log in to access your account
							</p>
						</div>

						<form
							method="post"
							action="/api/auth/callback/credentials"
							className="flex flex-col mt-8"
						>
							<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
							<label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
								Email
								<input
									placeholder="Enter your email"
									className="emailInput dark:bg-gray-200 block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
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
							<label className="relative flex flex-col block mt-8 mb-4 text-sm text-gray-600 dark:text-gray-200">
								Password
								<input
									placeholder="Enter your password"
									className="block w-full dark:bg-gray-200 px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
									autoComplete="current-password"
									name="password"
									type={showPassword ? "text" : "password"}
									required
									minLength="4"
									onChange={(e) => {
										setValue(e.currentTarget.value);
										const passwordInput = JSON.stringify(e.currentTarget.value);

										passwordInput.length - 2 >= 4
											? setButtonClass("bg-indigo-400 text-white")
											: "";

										passwordInput.length <= 2 ? setButtonClass("bg-white") : "";
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
							<a
								href="/forgotten-password"
								className="text-sm self-end text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
							>
								Forgot password?
							</a>
							<div className="flex relative">
								<div className="absolute left-[59%] top-1/4">
									<Image
										className="h-auto w-auto"
										src={funEyeIcon}
										alt="Eye icon"
										width={30}
										height={30}
									/>
								</div>
								<button
									className={`mt-8 py-2 px-8 mx-auto border-none rounded-md bg-white fade-out hover:bg-indigo-600 hover:text-white ${buttonClass}`}
									type="submit"
									href="/"
								>
									Sign in
								</button>
							</div>
							<p className="mt-6 text-sm text-center text-gray-400">
								Don&#39;t have an account yet?
								<Link href="/register">
									<a className="text-blue-400 focus:outline-none focus:underline hover:underline">
										Sign up.
									</a>
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
