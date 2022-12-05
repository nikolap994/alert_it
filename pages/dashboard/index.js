import { getSession } from "next-auth/react";

export default function Dashboard(props) {
	return (
		<main className="mt-10 max-w-7xl mx-auto px-4 md:px-6">
			<h1>Dashboard Page</h1>
			<div>Logged in as: {props.email}</div>
			<div>ID: {props.id}</div>
			<div>
				{props.firstName} {props.lastName}
			</div>

			<div>
				<br />
				Monitors:
				{props.monitors.length > 0 &&
					props.monitors.map(monitor => (
						<div key={monitor.id}>
							<p>Monitor ID: {monitor._id}</p>
							<p>Name: {monitor.name}</p>
							<p>URL: {monitor.url}</p>
							<p>heartbeat: {monitor.heartbeat}</p>
							<p>monitorType: {monitor.monitorType}</p>
							<p>retries: {monitor.retries}</p>
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

	return {
		props: {},
	};
}
