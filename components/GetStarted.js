import Link from "next/link";

function GetStarted() {
	return (
		<section className="bg-black">
			<div className="max-w-7xl mx-auto p-8 lg:px-12 py-16 lg:py-36 flex flex-col items-center">
				<h2 className="mb-10 lg:mb-16 font-heading font-bold text-6xl text-white">
					Three steps to get started
				</h2>

				<div className="flex flex-col lg:flex-row lg:gap-16hover:bg-gray-600">
					<div className="lg:w-1/3 p-4">
						<div className="flex items-center">
							<div className="flex justify-center items-center font-heading text-xl bg-gray-900 w-12 h-12 text-white rounded-full">
								1
							</div>
							<h3 className="pl-4 font-heading font-medium text-2xl text-white">
								Create a free Account
							</h3>
						</div>
						<div className="p-4">
							<p className="text-gray-400 md:text-lg text-justify">
								As a community,
								<Link href="https://evilbees.com/"> Evil Bees</Link> believes
								that great solution should be available to all. Whether
								that&apos;s so everyone can contribute, and make the solution
								better, or get to benefit from an amazing piece of software — we
								will always stand by Open Source.
							</p>
						</div>
					</div>

					<div className="lg:w-1/3 p-4">
						<div className="flex items-center">
							<div className="flex justify-center items-center font-heading text-xl bg-gray-900 w-12 h-12 text-white rounded-full">
								2
							</div>
							<h3 className="pl-4 font-heading font-medium text-2xl text-white">
								Add sites to monitor
							</h3>
						</div>
						<div className="p-4">
							<p className="text-gray-400 md:text-lg text-justify">
								AlertIt provides you with a simple interface, allowing you to
								add any website, which you can then monitor 24/7. Additionally,
								you will be able to check for specific response codes and
								whether pages work as intended.
							</p>
						</div>
					</div>

					<div className="lg:w-1/3 p-4 max-w-lg lg:max-w-none">
						<div className="flex items-center">
							<div className="flex justify-center items-center font-heading text-xl bg-gray-900 w-12 h-12 text-white rounded-full">
								3
							</div>
							<h3 className="pl-4 font-heading font-medium text-2xl text-white">
								Start getting alerts
							</h3>
						</div>
						<div className="p-4">
							<p className="text-gray-400 md:text-lg text-justify">
								Well, hopefully your sites won&apos;t have{" "}
								<span className="italic">any</span> downtime; but, in case they
								do — we&apos;ve got you covered! You can opt to get notified via
								either Email, Slack, or Custom Webhooks.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default GetStarted;
