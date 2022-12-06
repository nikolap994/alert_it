import { getSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Dashboard(props) {
	return (
		<main className="mt-10 max-w-7xl mx-auto px-4 md:px-6">
			<h1>Dashboard Page</h1>

			<Link
				className="text-white bg-blue-700 rounded"
				href="/dashboard/monitor/create"
			>
				Create new Monitor
			</Link>
			<div>
				<br />
				Monitors:
				{props.monitors.length > 0 &&
					props.monitors.map(monitor => (
						<div key={monitor._id}>
							<p key={monitor._id + "_ID"}>Monitor ID: {monitor._id}</p>
							<p key={monitor._id + "_Name"}>Name: {monitor.name}</p>
							<p key={monitor._id + "_URL"}>URL: {monitor.url}</p>
							<p key={monitor._id + "_heartbeat"}>
								heartbeat: {monitor.heartbeat}
							</p>
							<p key={monitor._id + "_monitorType"}>
								monitorType: {monitor.monitorType}
							</p>
							<p key={monitor._id + "_retries"}>retries: {monitor.retries}</p>
							<Image
								key={monitor._id + "_IMAGE"}
								width={300}
								height={300}
								src={"data:image/gif;base64," + monitor.image}
								alt="monitor"
							/>
							<Link
								className="text-white bg-blue-700 rounded"
								href={"/dashboard/monitor/edit/" + monitor._id}
							>
								Edit
							</Link>
							<br />
						</div>
					))}
			</div>
		</main>
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
			.then(response => response.json())
			.then(result => {
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
			.catch(error => console.log("error", error));

		const monitors = await fetch(
			process.env.SITE_URI + "/api/monitors?userId=" + response.props.id,
			requestOptions
		)
			.then(response => response.json())
			.then(result => {
				return result.data;
			})
			.catch(error => console.log("error", error));

		response.props.monitors = monitors;
		return response;
	}
}
