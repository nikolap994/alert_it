import { useSession, getSession } from "next-auth/react";
import Router from "next/router";
import Head from "next/head";

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
		<div className="md:w-3/4 lg:w-1/2 max-w-[700px] py-16 px-8 md:px-12 text-white mx-auto overflow-hidden">
			<Head>
				<title>Create new Monitor</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<h1 className="mb-2 text-4xl mb-12">Create Monitor</h1>

			<form
				className="w-full flex flex-col gap-5"
				method="POST"
				onSubmit={submitForm}
			>
				
				<div>
					<label className="block mb-2 dark:text-white" htmlFor="name">
						Name
					</label>
					<input
						required
						className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:border-blue-500 transition-colors cursor-pointer block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Add a name"
						type="text"
						name="name"
					/>
				</div>

				<div>
					<label className="block mb-2 dark:text-white" htmlFor="url">
						URL
					</label>
					<input
						id="url"
						required
						className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:outline-none focus:border-blue-500 transition-colors cursor-pointer block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Add a url"
						type="url"
						name="url"
					/>
				</div>

				<div>
					<label className="block mb-2 dark:text-white" htmlFor="heartbeat">
						Heartbeat
					</label>
					<select
						
						id="heartbeat"
						required
						className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:outline-none focus:border-blue-500 transition-colors cursor-pointer block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
						name="heartbeat"
					>
						<option className="bg-slate-800" defaultValue="1">
							1
						</option>
						<option className="bg-slate-800 text-white" defaultValue="5" >
							5
						</option>
						<option className="bg-slate-800 text-white" defaultValue="10">
							10
						</option>
						<option className="bg-slate-800 text-white" defaultValue="30">
							30
						</option>
						<option className="bg-slate-800 text-white" defaultValue="60">
							60
						</option>
					</select>
				</div>

				<div>
					<label
						className="block mb-2 text-white"
						htmlFor="acceptedStatusCodes"
					>
						Accepted Status Codes
					</label>
					<select
						required
						id="acceptedStatusCodes"
						className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:outline-none focus:border-blue-500 transition-colors cursor-pointer block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
						name="acceptedStatusCodes"
					>
						<option className="bg-slate-800 text-white" defaultValue="any">
							Any
						</option>
						<option className="bg-slate-800 text-white" defaultValue="0-199">
							0-199
						</option>
						<option className="bg-slate-800 text-white" defaultValue="200-299">
							200-299
						</option>
						<option className="bg-slate-800 text-white" defaultValue="200-299">
							300-399
						</option>
						<option className="bg-slate-800 text-white" defaultValue="200-299">
							400-499
						</option>
						<option className="bg-slate-800 text-white" defaultValue="200-299">
							500-599
						</option>
					</select>
				</div>

				<div>
					<label className="block mb-2 dark:text-white" htmlFor="monitorType">
						Monitor Type
					</label>
					<select
						id="monitorType"
						required
						className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:outline-none focus:border-blue-500 transition-colors cursor-pointer block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
						name="monitorType"
					>
						<option className="bg-slate-800 text-white" defaultValue="https">
							https
						</option>
						<option className="bg-slate-800 text-white" defaultValue="tcp">
							tcp
						</option>
					</select>
				</div>

				<div>
					<label className="block mb-2 dark:text-white" htmlFor="port">
						Port
					</label>
					<input
						id="port"
						required
						className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:outline-none focus:border-blue-500 transition-colors cursor-pointer block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Choose port number"
						type="number"
						name="port"				
					/>
				</div>

				<div>
					<label className="block mb-2 dark:text-white" htmlFor="enabled">
						Enabled
					</label>
					<select
						id="enabled"
						required
						className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:border-blue-500 transition-colors cursor-pointer block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
						name="enabled"
					>
						<option className="bg-slate-800 text-white" defaultValue="true">
							true
						</option>
						<option className="bg-slate-800 text-white" defaultValue="false">
							false
						</option>
					</select>
				</div>

				<button
					className="w-1/2 mx-auto mt-6 text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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