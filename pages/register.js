export default function Register() {
	const onSubmit = event => {
		event.preventDefault();

		const firstName = event.target.firstname.value;
		const lastName = event.target.lastname.value;
		const email = event.target.email.value;
		const password = event.target.password.value;
		const repeatPassword = event.target.repeatpassword.value;

		console.log(firstName, lastName, email, password, repeatPassword);
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div>
					<label htmlFor="firstname">First name</label>
					<input type="text" name="firstname"></input>
				</div>
				<div>
					<label htmlFor="lastname">Last name</label>
					<input type="text" name="lastname"></input>
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<input type="email" name="email"></input>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input type="password" name="password"></input>
				</div>
				<div>
					<label htmlFor="repeatpassword">Repeat Password</label>
					<input type="password" name="repeatpassword"></input>
				</div>
				<button type="submit">Sign in</button>
			</form>
		</div>
	);
}
