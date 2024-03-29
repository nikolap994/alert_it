import { getSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

export default function Dashboard(props) {
	return (
		<>
			<Head>
				<title>Dashboard</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			<section
				className={`max-w-7xl mx-auto px-4 md:px-6 text-white bg-slate-900 ${
					props.monitors.length == 0 ? "h-screen" : ""
				} `}
			>
				<div className="pt-10 flex flex-col md:flex-row max-w-lg justify-between md:items-center mb-8 lg:mb-12 lg:mb-0">
					<h1 className="text-5xl my-8 md:my-16">Dashboard</h1>

					<Link
						className="text-white bg-blue-700 rounded px-8 py-4 text-center mb-5 md:mb-0"
						href="/dashboard/monitor/create"
					>
						Add Monitor
					</Link>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 pb-16">
					{props.monitors.length > 0 &&
						props.monitors.map(monitor => (
							<div
								key={monitor._id}
								className={`text-lg max-w-sm rounded overflow-hidden shadow-2xl mx-auto mb-12 lg:mb-7 ${
									monitor.upCheckStatus ? "shadow-green-500" : "shadow-red-500"
								} ${monitor.enabled ? "" : "grayscale"}`}
							>
								<Image
									className="w-full p-2 rounded"
									key={monitor._id + "_IMAGE"}
									width={300}
									height={300}
									src={"data:image/gif;base64," + monitor.image}
									alt="monitor"
								/>
								<div className="px-6 py-4">
									<p key={monitor._id + "_ID"}>Monitor ID: {monitor._id}</p>
									<p key={monitor._id + "_Enabled"}>
										Enabled: {monitor.enabled ? "ON" : "OFF"}
									</p>
									<p key={monitor._id + "_lastCheck"}>
										Last check: {monitor.lastCheck}
									</p>
									<p key={monitor._id + "_Name"}>Name: {monitor.name}</p>
									<p key={monitor._id + "_acceptedStatusCodes"}>
										Accepted Status Codes: {monitor.acceptedStatusCodes}
									</p>
									<p key={monitor._id + "_URL"}>URL: {monitor.url}</p>
									<p key={monitor._id + "_heartbeat"}>
										heartbeat: {monitor.heartbeat}
									</p>
									<p key={monitor._id + "_monitorType"}>
										Monitor type: {monitor.monitorType}
									</p>
									<p key={monitor._id + "_port"}>Port: {monitor.port}</p>
									<p key={monitor._id + "_message"}>
										Message: {monitor.message}
									</p>
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
			</section>
		</>
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
			},
		};

		var requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		const monitors = await fetch(
			process.env.SITE_URI + "/api/monitors?userId=" + session._doc._id,
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
