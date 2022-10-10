import { getCsrfToken, getProviders } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import loginBg from "../public/images/login-bg.jpg";

export default function SignIn({ csrfToken }) {
	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="flex justify-center h-screen">
				<div className="relative bg-slate-400 bg-cover lg:block lg:w-2/3">
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

				<div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
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
							className="flex flex-col mt-8"
							method="post"
							action="/api/auth/callback/credentials"
						>
							<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
							<label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
								Username
								<input
									className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
									autoComplete="username"
									name="username"
									type="text"
								/>
							</label>

							<label className="flex flex-col block mt-8 mb-4 text-sm text-gray-600 dark:text-gray-200">
								Password
								<input
									className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
									autoComplete="current-password"
									name="password"
									type="password"
								/>
							</label>
							<a
								href="/forgotten-password"
								className="text-sm self-end text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
							>
								Forgot password?
							</a>

							<button
								className="mt-8 py-2 px-8 mx-auto rounded-md bg-white fade-out hover:bg-slate-600 hover:text-white"
								type="submit"
							>
								Sign in
							</button>

							<p className="mt-6 text-sm text-center text-gray-400">
								Don&#39;t have an account yet?{" "}
								<Link
									href="/register"
									className="text-blue-400 focus:outline-none focus:underline hover:underline"
								>
									<a> Sign up. </a>
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
