import { signOut, useSession, getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Router from "next/router";

function User(props) {
	const { data: session } = useSession();
	const router = useRouter();

	const submitForm = (e) => {
		e.preventDefault();

		const firstName = e.target.firstName.value;
		const lastName = e.target.lastName.value;
		const email = e.target.email.value;
		const id = session._doc._id;
		const SMTP_HOST = e.target.SMTP_HOST.value;
		const SMTP_PORT = e.target.SMTP_PORT.value;
		const SMTP_EMAIL = e.target.SMTP_EMAIL.value;
		const SMTP_PASSWORD = e.target.SMTP_PASSWORD.value;
		const ENABLE_SLACK = e.target.ENABLE_SLACK.value;
		const SLACK_WEBHOOK_URL = e.target.SLACK_WEBHOOK_URL.value;
		const ENABLE_WEBHOOK = e.target.ENABLE_WEBHOOK.value;
		const CUSTOM_WEBHOOK_URL = e.target.CUSTOM_WEBHOOK_URL.value;
		const ENABLE_SMTP = e.target.ENABLE_SMTP.value;

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			id,
			update: {
				firstName,
				lastName,
				email,
				SMTP_HOST,
				SMTP_PORT,
				SMTP_EMAIL,
				SMTP_PASSWORD,
				ENABLE_SLACK,
				SLACK_WEBHOOK_URL,
				ENABLE_WEBHOOK,
				CUSTOM_WEBHOOK_URL,
				ENABLE_SMTP,
			},
		});

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch(props.SITE_URI + "/api/users", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.success === true) {
					router.reload(window.location.pathname);
				}
			})
			.catch((error) => console.log("error", error));
	};

	const deleteAccount = (e, remove) => {
		e.preventDefault();

		if (confirm("Do you want to delete ?") == true) {
			const raw = JSON.stringify({
				id: remove,
			});
			const myHeaders = new Headers();

			myHeaders.append("Content-Type", "application/json");

			const requestOptions = {
				method: "DELETE",
				headers: myHeaders,
				body: raw,
				redirect: "follow",
			};

			fetch(props.SITE_URI + "/api/users", requestOptions)
				.then((response) => response.json())
				.then((result) => {
					if (result.success === true) {
						signOut();
						Router.push("/");
					}
				})
				.catch((error) => console.log("error", error));
		}
	};

	return (
		<div className="mt-10 max-w-7xl mx-auto px-4 md:px-6 text-white flex flex-col">
			<Head>
				<title>Profile</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			<div className="mb-10 flex items-center justify-between border-b border-white pb-8">
				{" "}
				<h3 className="block text-white text-2xl xl:text-3xl">
					User Information
				</h3>
				<button
					className="py-2 bg-white text-black self-end rounded-lg w-36 hover:bg-black hover:text-white"
					onClick={() => signOut()}
				>
					Log out
				</button>
			</div>

			<form
				className="grid md:grid-cols-2 gap-x-12 w-full px-4 lg:px-12 md:px-0 lg:ml-0 mx-auto text-lg xl:text-xl"
				method="POST"
				action=""
				onSubmit={submitForm}
			>
				<div className="pb-12 md:pb-0 border-b border-white flex flex-col gap-5">
					<div>
						<label htmlFor="firstName" className="block mb-2 dark:text-white">
							First Name
						</label>
						<input
							className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							type="text"
							name="firstName"
							required
							id="firstName"
							defaultValue={props.firstName}
						/>
					</div>

					<div>
						<label htmlFor="lastName" className="block mb-2 dark:text-white">
							Last Name
						</label>
						<input
							className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							type="text"
							id="lastName"
							required
							name="lastName"
							defaultValue={props.lastName}
						/>
					</div>

					<div>
						<label htmlFor="email" className="block mb-2 dark:text-white">
							Email
						</label>
						<input
							className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							type="email"
							name="email"
							required
							id="email"
							defaultValue={props.email}
						/>
					</div>
				</div>

				<div className="pt-12 pb-8 md:pt-0 md:pb-16 border-b border-white flex flex-col gap-5">
					<div>
						<label className="block mb-2 dark:text-white" htmlFor="ENABLE_SMTP">
							ENABLE SMTP
						</label>
						<select
							id="ENABLE_SMTP"
							defaultValue={props.ENABLE_SMTP}
							className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							name="ENABLE_SMTP"
						>
							<option defaultValue="true">true</option>
							<option defaultValue="false">false</option>
						</select>
					</div>

					<div>
						<label htmlFor="SMTP_HOST" className="block mb-2 dark:text-white">
							SMTP HOST
						</label>
						<input
							className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							type="text"
							name="SMTP_HOST"
							id="SMTP_HOST"
							defaultValue={props.SMTP_HOST}
						/>
					</div>

					<div>
						<label htmlFor="SMTP_PORT" className="block mb-2 dark:text-white">
							SMTP PORT
						</label>
						<input
							className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							type="text"
							name="SMTP_PORT"
							id="SMTP_PORT"
							defaultValue={props.SMTP_PORT}
						/>
					</div>

					<div>
						<label htmlFor="SMTP_EMAIL" className="block mb-2 dark:text-white">
							SMTP EMAIL
						</label>
						<input
							className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							type="email"
							name="SMTP_EMAIL"
							id="SMTP_EMAIL"
							defaultValue={props.SMTP_EMAIL}
						/>
					</div>

					<div>
						<label
							htmlFor="SMTP_PASSWORD"
							className="block mb-2 dark:text-white"
						>
							SMTP PASSWORD
						</label>
						<input
							className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							type="text"
							name="SMTP_PASSWORD"
							id="SMTP_PASSWORD"
							defaultValue={props.SMTP_PASSWORD}
						/>
					</div>

					<div>
						<label
							className="block mb-2 dark:text-white"
							htmlFor="ENABLE_SLACK"
						>
							ENABLE SLACK
						</label>
						<select
							id="ENABLE_SLACK"
							defaultValue={props.ENABLE_SLACK}
							className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							name="ENABLE_SLACK"
						>
							<option defaultValue="true">true</option>
							<option defaultValue="false">false</option>
						</select>
					</div>

					<div>
						<label
							htmlFor="SLACK_WEBHOOK_URL"
							className="block mb-2 dark:text-white"
						>
							SLACK WEBHOOK URL
						</label>
						<input
							className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							type="url"
							name="SLACK_WEBHOOK_URL"
							id="SLACK_WEBHOOK_URL"
							defaultValue={props.SLACK_WEBHOOK_URL}
						/>
					</div>

					<div>
						<label
							className="block mb-2 dark:text-white"
							htmlFor="ENABLE_WEBHOOK"
						>
							ENABLE WEBHOOK
						</label>
						<select
							id="ENABLE_WEBHOOK"
							defaultValue={props.ENABLE_WEBHOOK}
							className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							name="ENABLE_WEBHOOK"
						>
							<option defaultValue="true">true</option>
							<option defaultValue="false">false</option>
						</select>
					</div>

					<div>
						<label
							htmlFor="CUSTOM_WEBHOOK_URL"
							className="block mb-2 dark:text-white"
						>
							CUSTOM WEBHOOK URL
						</label>
						<input
							className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							type="url"
							name="CUSTOM_WEBHOOK_URL"
							id="CUSTOM_WEBHOOK_URL"
							defaultValue={props.CUSTOM_WEBHOOK_URL}
						/>
					</div>
				</div>
			</form>
			<div className="w-full px-8 lg:px-12 md:px-0 mx-auto my-2">
				<button
					className="mt-6 w-36 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					type="submit"
				>
					Save
				</button>
			</div>
			<div className="text-red-600 my-10 text-white border-t border-b border-white py-8">
				<h3 className="text-2xl mb-4">Danger zone!</h3>
				<button
					onClick={(event) => deleteAccount(event, session._doc._id)}
					className="text-lg hover:cursor-pointer  text-red-900 hover:text-red-500"
				>
					Delete Account
				</button>
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: { destination: "/" },
		};
	} else {
		var requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		const response = await fetch(
			process.env.SITE_URI + "/api/users?email=" + session._doc.email,
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				return result.data[0];
			})
			.catch((error) => console.log("error", error));

		response.SITE_URI = process.env.SITE_URI;
		return { props: response };
	}
}

export default User;
