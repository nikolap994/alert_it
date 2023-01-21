import { useState } from "react";
import { getCsrfToken, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import SignInCTA from "../src/components/signin-cta";
import Image from "next/legacy/image";
import Link from "next/link";

import loginBg from "../public/images/login-bg.jpg";
import eyeIcon from "../public/images/icons/eye-open.png";
import eyeHideIcon from "../public/images/icons/eye-close.png";
import Router from "next/router";

export default function Register() {
	const [isEyeOpen, toggleEye] = useState(0);
	const router = useRouter();

	const handleClick = () => {
		toggleEye(!isEyeOpen);
		const type =
			document.getElementById("password").getAttribute("type") === "password"
				? "text"
				: "password";
		document.getElementById("password").setAttribute("type", type);
	};

	const onSubmit = (event) => {
		event.preventDefault();

		const firstName = event.target.firstname.value;
		const lastName = event.target.lastname.value;
		const email = event.target.email.value;
		const password = event.target.password.value;
		const repeatPassword = event.target.repeatpassword.value;

		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			email: email,
			firstName: firstName,
			lastName: lastName,
			password: password,
		});

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		if (firstName && lastName && email && password && repeatPassword) {
			if (password === repeatPassword) {
				fetch(`/api/users`, requestOptions)
					.then((response) => response.json())
					.then((result) => {
						if (result.success === true) {
							Router.push("/signin?success=true");
						} else {
							const errors = JSON.parse(result);
							console.log(errors);
						}
					})
					.catch((error) => console.log("error", error));
				router.push("/signin");
			} else {
				console.log("Passwords are not the same.");
			}
		} else {
			console.log("Missing data");
		}
	};

	return (
		<section className="bg-gray-900 absolute w-full">
			<div className="flex justify-center h-screen overflow-hidden">
				<SignInCTA
					highlightText="Ready to take your monitoring to the next level? Sign up to take control of your sites and devices - all from one place!"
					highlightBtn="Let's get started."
				/>

				<div className="flex items-center px-6 mx-auto w-full md:w-3/4">
					<div className="flex-1">
						<div className="text-center">
							<h2 className="text-4xl font-bold text-center text-white">
								Sign Up
							</h2>
						</div>
						<form
							onSubmit={onSubmit}
							className="flex flex-col gap-9 mt-8"
							method="post"
							action="/api/auth/callback/credentials"
						>
							<div>
								<label
									htmlFor="firstname"
									className="text-lg flex flex-col block text-gray-600 text-gray-200"
								>
									First name
								</label>
								<input
									type="text"
									name="firstname"
									placeholder="Enter your first name"
									className="bg-gray-200 block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
								></input>
							</div>

							<div>
								<label
									htmlFor="lastname"
									className="text-lg flex flex-col block text-gray-600 text-gray-200"
								>
									Last name
								</label>
								<input
									type="text"
									name="lastname"
									placeholder="Enter your last name"
									className="bg-gray-200 block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
								></input>
							</div>

							<div>
								<label
									htmlFor="email"
									className="block text-gray-600 text-gray-200"
								>
									Email
									<input
										placeholder="ex: john@gmail.com"
										className=" bg-gray-200 block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
										autoComplete="email"
										name="email"
										type="email"
									/>
								</label>
							</div>

							<div>
								<label
									htmlFor="password"
									className="text-lg relative flex flex-col block text-white"
								>
									Password
									<input
										id="password"
										placeholder="Enter your password"
										autoComplete="current-password"
										name="password"
										type="password"
										className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
									/>
									<button className="absolute bottom-0 right-4" type="button">
										<Image
											className="h-auto w-auto"
											src={isEyeOpen ? eyeIcon : eyeHideIcon}
											alt="Eye icon"
											width={30}
											height={30}
											onClick={handleClick}
										/>
									</button>
								</label>
							</div>

							<div>
								<label
									htmlFor="repeatpassword"
									className="relative text-lg flex flex-col block text-white"
								>
									Repeat Password
									<input
										placeholder="Re-enter your password"
										autoComplete="current-password"
										name="repeatpassword"
										type="password"
										className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
									/>
								</label>
							</div>
							<button
								className="py-2 px-8 mx-auto border border-transparent	rounded-md bg-white fade-out hover:bg-indigo-600 hover:text-white"
								type="submit"
							>
								Sign Up
							</button>

							<p className="text-center text-gray-400">
								Already have an account?
								<Link
									className="text-blue-400 focus:outline-none focus:underline hover:underline ml-2"
									href="/signin"
								>
									Sign in.
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
