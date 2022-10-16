import { getCsrfToken, getProviders } from "next-auth/react";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import loginBg from "../public/images/login-bg.jpg";
import eyeIcon from "../public/images/icons/eye.png";
import eyeHideIcon from "../public/images/icons/n-eye-hide.png";

export default function SignIn({ csrfToken }) {
	const [value, setValue] = useState("");
	const [buttonClass, setButtonClass] = useState(0);
	const [showPassword, setShowPassword] = useState(0);
	const [isEyeOpen, toggleEye] = useState(0);

	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="flex justify-center h-screen">
				<div className="hidden lg:block relative bg-slate-400 bg-cover lg:block xl:w-2/3">
					<Image
						className="mix-blend-multiply"
						src={loginBg}
						alt="Log in image"
						layout="fill"
						objectFit="cover"
						priority={true}
						quality={100}
					/>
					<div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
						<div className="z-10">
							<h2 className="text-4xl font-bold text-white">Uptime Monitor</h2>
							<p className="max-w-xl mt-3 text-gray-300">
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
								autem ipsa, nulla laboriosam dolores, repellendus perferendis
								libero suscipit nam temporibus molestiae
							</p>
						</div>
					</div>
				</div>
				<div className="flex items-center w-full max-w-md px-6 mx-auto xl:w-2/6">
					<div className="flex-1">
						<div className="text-center">
							<h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
								Log In
							</h2>

							<p className="mt-3 text-gray-500 dark:text-gray-300">
								Sign in to access your account
							</p>
						</div>

						<form
							method="post"
							action="/api/auth/callback/credentials"
							className="flex flex-col mt-8"
						>
							<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
							<label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
								Username
								<input
									placeholder="Enter your username"
									className="usernameInput dark:bg-gray-200 dark:text-black block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
									autoComplete="username"
									name="username"
									type="text"
									onChange={(e) => {
										setValue(e.currentTarget.value);
										const userName = JSON.stringify(e.currentTarget.value);

										userName.length - 2 >= 4
											? setButtonClass(
													"bg-gradient-to-r from-indigo-600 via-indigo-100 to-white"
											  )
											: "";

										userName.length <= 2 ? setButtonClass("bg-white") : "";

										let usernameRegex = /^[a-zA-Z0-9]+$/;
										return usernameRegex.test(userName);
									}}
								/>
							</label>

							<label className="relative flex flex-col block mt-8 mb-4 text-sm text-gray-600 dark:text-gray-200">
								Password
								<input
									placeholder="Enter your password"
									className="block w-full dark:bg-gray-200 dark:text-black px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
									autoComplete="current-password"
									name="password"
									type={showPassword ? "text" : "password"}
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
									className="absolute -bottom-2 right-4"
									type="button"
									onClick={() => setShowPassword(!showPassword)}
								>
									<Image
										className="h-auto w-auto"
										src={isEyeOpen ? eyeIcon : eyeHideIcon}
										alt="Eye icon"
										width={35}
										height={35}
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

							<button
								className={`mt-8 py-2 px-8 mx-auto border border-transparent	rounded-md bg-white fade-out hover:bg-indigo-600 hover:text-white ${buttonClass}`}
								type="submit"
							>
								Sign in
							</button>

							<p className="mt-6 text-sm text-center text-gray-400">
								Don&#39;t have an account yet?
								<Link href="/register">
									<a className="text-blue-400 focus:outline-none focus:underline hover:underline">
										{" "}
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
	return {
		props: {
			providers: await getProviders(context),
			csrfToken: await getCsrfToken(context),
		},
	};
}
