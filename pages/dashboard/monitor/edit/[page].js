import { getSession } from "next-auth/react";

function EditMonitor(props) {
	const submitForm = e => {
		e.preventDefault();

		const name = e.target.name.value;
		const url = e.target.url.value;
		const heartbeat = e.target.heartbeat.value;
		const retries = e.target.retries.value;
		const acceptedStatusCodes = e.target.acceptedStatusCodes.value;
		const monitorType = e.target.monitorType.value;

		console.log({
			name,
			url,
			heartbeat,
			retries,
			acceptedStatusCodes,
			monitorType,
		});
	};

	return (
		<div className="mt-10 max-w-7xl mx-auto px-4 md:px-6">
			<div className="block mb-2 dark:text-white">Edit Monitor</div>

			<form
				className="w-full max-w-lg"
				method="POST"
				action=""
				onSubmit={submitForm}
			>
				<div className="mb-6">
					<label className="block mb-2 dark:text-white" htmlFor="name">
						Name
					</label>
					<input
						id="name"
						defaultValue={props.name}
						required
						className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
						defaultValue={props.url}
						className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						type="url"
						name="url"
					/>
				</div>

				<div className="mb-6">
					<label className="block mb-2 dark:text-white" htmlFor="heartbeat">
						Heartbeat
					</label>
					<input
						id="heartbeat"
						required
						defaultValue={props.heartbeat}
						className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						type="text"
						name="heartbeat"
					/>
				</div>

				<div className="mb-6">
					<label className="block mb-2 dark:text-white" htmlFor="retries">
						Retries
					</label>
					<input
						type="number"
						id="retries"
						min={1}
						max={5}
						defaultValue={props.retries}
						required
						className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						name="retries"
					/>
				</div>

				<div className="mb-6">
					<label
						className="block mb-2 dark:text-white"
						htmlFor="acceptedStatusCodes"
					>
						Accepted Status Codes
					</label>
					<select
						id="acceptedStatusCodes"
						required
						className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						name="acceptedStatusCodes"
					>
						<option selected>Choose acceptedStatusCodes</option>
						<option selected={props.acceptedStatusCodes == "any"} value="any">
							Any
						</option>
						<option
							selected={props.acceptedStatusCodes == "0-199"}
							value="0-199"
						>
							0-199
						</option>
						<option
							selected={props.acceptedStatusCodes == "200-299"}
							value="200-299"
						>
							200-299
						</option>
						<option
							selected={props.acceptedStatusCodes == "300-399"}
							value="300-399"
						>
							300-399
						</option>
						<option
							selected={props.acceptedStatusCodes == "400-499"}
							value="400-499"
						>
							400-499
						</option>
						<option
							selected={props.acceptedStatusCodes == "500-599"}
							value="500-599"
						>
							500-599
						</option>
					</select>
				</div>

				<div className="mb-6">
					<label className="block mb-2 dark:text-white" htmlFor="monitorType">
						Monitor Type
					</label>
					<select
						id="monitorType"
						required
						className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						name="monitorType"
					>
						<option selected>Choose a monitor type</option>
						<option selected={props.monitorType == "https"} value="HTTP(s)">
							HTTP(s)
						</option>
						<option selected={props.monitorType == "ping"} value="ping">
							Ping
						</option>
						<option selected={props.monitorType == "tcp"} value="tcp">
							TCP
						</option>
					</select>
				</div>

				<button
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
		const monitorId = context.query.page;

		if (typeof monitorId == "undefined") {
			return {
				redirect: { destination: "/" },
			};
		}

		var requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		const response = await fetch(
			process.env.SITE_URI + "/api/monitors?id=" + monitorId,
			requestOptions
		)
			.then(response => response.json())
			.then(result => {
				return {
					props: {
						name: result.data[0].name,
						url: result.data[0].url,
						heartbeat: result.data[0].heartbeat,
						retries: result.data[0].retries,
						acceptedStatusCodes: result.data[0].acceptedStatusCodes,
						monitorType: result.data[0].monitorType,
					},
				};
			})
			.catch(error => console.log("error", error));

		return response;
	}

	return {
		props: {},
	};
}

export default EditMonitor;
