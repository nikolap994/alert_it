import Link from "next/link";

function OpenSource() {
	return (
		<section className="relative lg:pb-12 bg-gradient-to-l to-purple-600 from-blue-600">
			<div className="hidden lg:block absolute top-0 bottom-0 mb-24 inset-x-0 z-10 bg-gradient-to-r from-purple-600 to-blue-600 w-1/2"></div>
			<div className="relative z-10 pt-12 lg:pt-20">
				<div className="px-4 text-center mb-16 w-full lg:w-9/12 mx-auto">
					<div className="max-w-4xl mx-auto">
						<h2 className="mt-8 mb-6 text-4xl lg:text-5xl font-bold text-white pb-4">
							Why Open Source?
						</h2>
						<p className="lg:max-w-xl mx-auto mb-10 text-lg text-white text-left px-4">
							As developers, we believe in being a part of something greater,
							and take great pride in our community. That's why Alertit, as
							other{" "}
							<Link className="text-yellow-400" href="https://evilbees.com/">
								Evil Bees
							</Link>{" "}
							projects is completely <span>free</span>!
						</p>

						<p className="lg:max-w-xl mx-auto mb-10 text-lg text-white text-left px-4">
							{" "}
							This project is built a community, with community in mind, and
							will always be updated and upgraded in a timely manner.
						</p>
						<Link
							className="inline-block w-full md:w-auto py-5 px-8 text-sm font-bold uppercase bg-yellow-500 hover:bg-yellow-400 text-blue-800 transition duration-200"
							href="/signin"
						>
							Get started
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

export default OpenSource;
