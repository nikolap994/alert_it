function EditMonitor() {
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
		<main className="mt-10 max-w-7xl mx-auto px-4 md:px-6">
			<div>Edit Monitor Page</div>

			<form method="POST" action="" onSubmit={submitForm}>
				<div>
					<label>Name</label>
					<input type="text" name="name" />
				</div>

				<div>
					<label>URL</label>
					<input type="text" name="url" />
				</div>

				<div>
					<label>Heartbeat</label>
					<input type="text" name="heartbeat" />
				</div>

				<div>
					<label>Retries</label>
					<input type="text" name="retries" />
				</div>

				<div>
					<label>Accepted Status Codes</label>
					<input type="text" name="acceptedStatusCodes" />
				</div>

				<div>
					<label>Monitor Type</label>
					<input type="text" name="monitorType" />
				</div>

				<button type="submit">Save</button>
			</form>
		</main>
	);
}

export async function getServerSideProps(context) {
	const monitorId = context.query.page;
	console.log(monitorId);
	return {
		props: {},
	};
}

export default EditMonitor;
