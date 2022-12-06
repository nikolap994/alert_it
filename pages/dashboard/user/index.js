import { getSession } from "next-auth/react";

function User(props) {
	const submitForm = e => {
		e.preventDefault();

		const firstName = e.target.firstName.value;
		const lastName = e.target.lastName.value;
		const email = e.target.email.value;

		console.log({
			firstName,
			lastName,
			email,
		});
	};

	return (
		<main className="mt-10 max-w-7xl mx-auto px-4 md:px-6">
			<div>User Page</div>
			<form method="POST" action="" onSubmit={submitForm}>
				<div>
					<label>Firstname</label>
					<input type="text" name="firstName" defaultValue={props.firstName} />
				</div>

				<div>
					<label>Lastname</label>
					<input type="text" name="lastName" defaultValue={props.lastName} />
				</div>

				<div>
					<label>Email</label>
					<input type="text" name="email" defaultValue={props.email} />
				</div>

				<button type="submit">Save</button>
			</form>
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

		return response;
	}
}

export default User;
