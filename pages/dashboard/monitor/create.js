import { useSession, getSession } from "next-auth/react";
import Router from "next/router";

export default function CreateMonitor(props) {
	const { data: session } = useSession();

	const submitForm = e => {
		e.preventDefault();

		const name = e.target.name.value;
		const url = e.target.url.value;
		const heartbeat = e.target.heartbeat.value;
		const acceptedStatusCodes = e.target.acceptedStatusCodes.value;
		const monitorType = e.target.monitorType.value;
		const owner = session._doc._id;
		const enabled = e.target.enabled.value;
		const port = e.target.port.value;

		const raw = JSON.stringify({
			port,
			enabled,
			name,
			url,
			heartbeat,
			acceptedStatusCodes,
			monitorType,
			owner,
		});
		const myHeaders = new Headers();

		myHeaders.append("Content-Type", "application/json");

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch(props.SITE_URI + "/api/monitors", requestOptions)
			.then(response => response.json())
			.then(result => {
				if (result.success === true) {
					Router.push("/");
				}
			})
			.catch(error => console.log("error", error));
	};

	return (
		<div className="mt-10 max-w-7xl mx-auto px-4 md:px-6">
			<div className="block mb-2 dark:text-white">Create Monitor</div>

			<form className="w-full max-w-lg" method="POST" onSubmit={submitForm}>
				<div className="mb-6">
					<label className="block mb-2 dark:text-white" htmlFor="enabled">
						Enabled
					</label>
					<select
						id="enabled"
						required
						className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						name="enabled"
					>
						<option defaultValue="true">true</option>
						<option defaultValue="false">false</option>
					</select>
				</div>

				<div className="mb-6">
					<label className="block mb-2 dark:text-white" htmlFor="name">
						Name
					</label>
					<input
						required
						id="name"
						className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						type="text"
						name="name"
					/>
				</div>

				<div className="mb-6">
					<label className="block mb-2 dark:text-white" htmlFor="url">
						URL
					</label>
					<input
						id="url"
						required
						className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						type="url"
						name="url"
					/>
				</div>

				<div className="mb-6">
					<label className="block mb-2 dark:text-white" htmlFor="heartbeat">
						Heartbeat
					</label>
					<select
						id="heartbeat"
						required
						className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						name="heartbeat"
					>
						<option defaultValue="1">1</option>
						<option defaultValue="5">5</option>
						<option defaultValue="10">10</option>
						<option defaultValue="30">30</option>
						<option defaultValue="60">60</option>
					</select>
				</div>

				<div className="mb-6">
					<label
						className="block mb-2 dark:text-white"
						htmlFor="acceptedStatusCodes"
					>
						Accepted Status Codes
					</label>
					<select
						required
						id="acceptedStatusCodes"
						className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						name="acceptedStatusCodes"
					>
						<option>Choose acceptedStatusCodes</option>
						<option defaultValue="any">Any</option>
						<option defaultValue="0-199">0-199</option>
						<option defaultValue="200-299">200-299</option>
						<option defaultValue="200-299">300-399</option>
						<option defaultValue="200-299">400-499</option>
						<option defaultValue="200-299">500-599</option>
					</select>
				</div>

				<div className="mb-6">
					<label className="block mb-2 dark:text-white" htmlFor="monitorType">
						Monitor Type
					</label>
					<select
						id="monitorType"
						required
						className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						name="monitorType"
					>
						<option>Choose a monitor type</option>
						<option defaultValue="https">https</option>
						<option defaultValue="tcp">tcp</option>
					</select>
				</div>

				<div className="mb-6">
					<label className="block mb-2 dark:text-white" htmlFor="port">
						Port
					</label>
					<input
						id="port"
						required
						className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						type="number"
						name="port"
					/>
				</div>

				<button
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					type="submit"
				>
					Save
				</button>
			</form>
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
		return {
			props: {
				SITE_URI: process.env.SITE_URI,
			},
		};
	}
}
