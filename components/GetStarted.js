function GetStarted() {
	return (
		<section className=" bg-black">
			<div className="max-w-7xl mx-auto p-8 lg:px-12 py-16 lg:py-36 flex flex-col items-center">
				<h2 className="mb-16 font-heading font-bold text-6xl text-white">
					Three steps to get started
				</h2>
				<div>
					<div className="flex flex-col gap-16 max-w-lg text-justify">
						<div className="flex flex-wrap -m-4">
							<div className="w-auto p-4">
								<div className="p-px max-w-max rounded-full">
									<div className="flex justify-center items-center font-heading text-xl bg-gray-900 w-12 h-12 text-white rounded-full">
										1
									</div>
								</div>
							</div>
							<div className="p-4">
								<h3 className="mb-4 font-heading font-medium text-xl text-white">
									Create a free Account
								</h3>
								<p className="text-gray-400 text-base">
									Open source paragraph.
								</p>
							</div>
						</div>
						<div>
							<div className="flex flex-wrap -m-4">
								<div className="w-auto p-4">
									<div className="p-px max-w-max bg-gradient-cyan2 rounded-full">
										<div className="flex justify-center items-center font-heading text-xl bg-gray-900 w-12 h-12 text-white rounded-full">
											2
										</div>
									</div>
								</div>
								<div className="flex-1 p-4">
									<h3 className="mb-4 font-heading font-medium text-xl text-white">
										Add the sites you want to monitor
									</h3>
									<p className="text-gray-400 text-base">
										Amet minim mollit non deserunt ullamco est sit aliqua dolor
										do amet sint. Velit officia consequat duis enim velit
										mollit.
									</p>
								</div>
							</div>
						</div>
						<div className="lg:max-w-sm">
							<div className="flex flex-wrap -m-4">
								<div className="w-auto p-4">
									<div className="p-px max-w-max bg-gradient-cyan2 rounded-full">
										<div className="flex justify-center items-center font-heading text-xl bg-gray-900 w-12 h-12 text-white rounded-full">
											3
										</div>
									</div>
								</div>
								<div className="flex-1 p-4">
									<h3 className="mb-4 font-heading font-medium text-xl text-white">
										Start getting alerts
									</h3>
									<p className="text-gray-400 text-base">
										Well, hopefully your sites won't have{" "}
										<span className="italic">any</span> downtime; but, in case
										they do - we've got you covered!
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default GetStarted;
