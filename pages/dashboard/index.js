import { getSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Dashboard(props) {
	return (
		<div className="max-w-7xl mx-auto px-4 md:px-6 text-white">
			<div className="pt-10 lg:flex justify-between items-center max-w">
				<h1 className="text-5xl my-16">Dashboard Page</h1>

				<Link
					className="text-white bg-blue-700 rounded h-16 p-6 text-center lg:float-right mb-5"
					href="/dashboard/monitor/create"
				>
					Create new Monitor
				</Link>
			</div>
			<div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
				{props.monitors.length > 0 &&
					props.monitors.map((monitor) => (
						<div key={monitor._id} className="max-w-sm rounded overflow-hidden shadow-lg shadow-blue-500/50">
							<Image
								className="w-full p-2 rounded border-2 border-blue-500"
								key={monitor._id + "_IMAGE"}
								width={300}
								height={300}
								src={"data:image/gif;base64," + monitor.image}
								alt="monitor"
							/>
							<div className="px-6 py-4">
								<p key={monitor._id + "_Name"}>Name: {monitor.name}</p>
								<p key={monitor._id + "_URL"}>URL: {monitor.url}</p>
								<p key={monitor._id + "_heartbeat"}>
									heartbeat: {monitor.heartbeat}
								</p>
								<p key={monitor._id + "_monitorType"}>
									monitorType: {monitor.monitorType}
								</p>
								<p key={monitor._id + "_retries"}>retries: {monitor.retries}</p>
								<p className="pt-5">
								<Link
									className="text-white bg-blue-700 rounded text-center w-full inline-block pt-2 pb-2"
									href={"/dashboard/monitor/edit/" + monitor._id}
								>
									Edit
								</Link>
								</p>
							</div>
						</div>
					))}
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
		const email = session.user.email;

		var requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		const response = await fetch(
			process.env.SITE_URI + "/api/users?email=" + email,
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				const user = result.data[0];
				const firstName = user.firstName;
				const lastName = user.lastName;
				const id = user._id.toString();

				return {
					props: {
						email,
						firstName,
						lastName,
						id,
					},
				};
			})
			.catch((error) => console.log("error", error));

		const monitors = await fetch(
			process.env.SITE_URI + "/api/monitors?userId=" + response.props.id,
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				return result.data;
			})
			.catch((error) => console.log("error", error));

		response.props.monitors = monitors;
		return response;
	}
}
