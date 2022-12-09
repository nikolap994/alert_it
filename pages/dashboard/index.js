import { getSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Dashboard(props) {
	return (
		<div className="max-w-7xl mx-auto px-4 md:px-6 bg-slate-900 text-white">
			<div className="pt-10 flex justify-between items-center max-w-xl">
				<h1 className="text-5xl my-16">Dashboard Page</h1>

				<Link
					className="text-white bg-blue-700 rounded h-16 p-6 text-center"
					href="/dashboard/monitor/create"
				>
					Create new Monitor
				</Link>
			</div>
			<div>
				<h2 className="text-3xl mb-10">Monitors:</h2>

				{props.monitors.length > 0 &&
					props.monitors.map((monitor) => (
						<div key={monitor._id} className="flex mb-12">
							<div className="w-1/2 flex flex-col gap-4">
								<p key={monitor._id + "_Name"}>Name: {monitor.name}</p>
								<p key={monitor._id + "_URL"}>URL: {monitor.url}</p>
								<p key={monitor._id + "_heartbeat"}>
									heartbeat: {monitor.heartbeat}
								</p>
								<p key={monitor._id + "_monitorType"}>
									monitorType: {monitor.monitorType}
								</p>
								<p key={monitor._id + "_retries"}>retries: {monitor.retries}</p>
								<Link
									className="text-white bg-blue-700 rounded w-24 text-center p-2"
									href={"/dashboard/monitor/edit/" + monitor._id}
								>
									Edit
								</Link>
							</div>
							<Image
								className="w-1/2"
								key={monitor._id + "_IMAGE"}
								width={300}
								height={300}
								src={"data:image/gif;base64," + monitor.image}
								alt="monitor"
							/>
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
