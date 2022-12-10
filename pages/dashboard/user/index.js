import { signOut, useSession, getSession } from "next-auth/react";
import Link from "next/link";

function User(props) {
	const { data: session } = useSession();

	const submitForm = e => {
		e.preventDefault();

		const firstName = e.target.firstName.value;
		const lastName = e.target.lastName.value;
		const email = e.target.email.value;
		const id = session._doc._id;

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			id,
			update: {
				firstName,
				lastName,
				email,
			},
		});

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch(props.SITE_URI + "/api/users", requestOptions)
			.then(response => response.json())
			.then(result => {
				if (result.success === true) {
					signOut();
				}
			})
			.catch(error => console.log("error", error));
	};

	return (
		<div className="mt-10 max-w-7xl mx-auto px-4 md:px-6">
			<div className="block mb-2 dark:text-white">User Page</div>
			<form
				className="w-full max-w-lg"
				method="POST"
				action=""
				onSubmit={submitForm}
			>
				<div className="mb-6">
					<label htmlFor="firstName" className="block mb-2 dark:text-white">
						Firstname
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

				<div className="mb-6">
					<label htmlFor="lastName" className="block mb-2 dark:text-white">
						Lastname
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

				<div className="mb-6">
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

				<button
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					type="submit"
				>
					Save
				</button>
			</form>
			<Link
				className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
				href="#"
			>
				Delete Account
			</Link>
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
		const response = {
			props: {
				email: session._doc.email,
				firstName: session._doc.firstName,
				lastName: session._doc.lastName,
				id: session._doc._id,
				SITE_URI: process.env.SITE_URI,
			},
		};

		return response;
	}
}

export default User;
