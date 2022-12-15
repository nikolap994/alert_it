import Link from "next/link";

function OpenSource() {
	return (
		<section className="relative lg:pb-48 bg-gradient-to-l to-purple-600 from-blue-600">
			<div className="hidden lg:block absolute top-0 bottom-0 mb-24 inset-x-0 z-10 bg-gradient-to-r from-purple-600 to-blue-600 w-1/2"></div>
			<div className="relative z-10 pt-12 lg:pt-20">
				<div className="px-4 text-center mb-16">
					<div className="w-full lg:w-9/12 mx-auto">
						<div className="max-w-4xl mx-auto">
							<h2 className="mt-8 mb-6 text-4xl lg:text-5xl font-bold text-white lg:text-gray-900">
								Why Open Source?
							</h2>
							<p className="max-w-xl mx-auto mb-10 text-lg text-white text-left px-4">
								As developers, we believe in being a part of something greater,
								and take great pride in our community. That's why Alertit, as
								other{" "}
								<Link className="text-yellow-400" href="https://evilbees.com/">
									Evil Bees
								</Link>{" "}
								projects is completely <span>free</span>!
							</p>

							<p className="max-w-xl mx-auto mb-10 text-lg text-white text-left px-4">
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
				<div className="max-w-5xl mx-auto bg-blue-900 border border-blue-700">
					<div className="flex flex-wrap">
						<div className="w-full lg:w-1/3 py-10 px-8 text-center border-b lg:border-b-0 lg:border-r border-blue-700">
							<h3 className="mb-1 text-lg text-white font-semibold uppercase">
								Spectacular team plan
							</h3>
							<p className="text-white">
								Fairly assigning daily tasks to your employees
							</p>
						</div>
						<div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-blue-700">
							<div className="py-10 px-8 text-center">
								<svg
									className="mx-auto mb-4 text-blue-300 w-8 h-8"
									viewBox="0 0 32 33"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M17.3333 0V2.66556C24.0733 3.33474 29.3333 9.01918 29.3333 15.9328C29.3333 22.8453 24.0733 28.5293 17.3333 29.1985V31.8657C25.5457 31.1877 32.0001 24.3183 32.0001 15.9328C32.0001 7.54619 25.5457 0.679536 17.3333 0Z"></path>
									<path d="M14.6668 29.1985C7.9296 28.5293 2.6668 22.8453 2.6668 15.9328C2.6668 9.01958 7.9296 3.33474 14.6668 2.66556V0C6.456 0.679536 0 7.54619 0 15.9328C0 24.3183 6.456 31.1877 14.6668 31.8657V29.1985Z"></path>
									<path d="M8.12006 14.6052C8.75526 10.8383 12.0365 7.9664 16.0001 7.9664C19.9637 7.9664 23.2449 10.8383 23.8801 14.6052H26.5741C25.9181 9.36689 21.4405 5.31079 16.0001 5.31079C10.5625 5.31079 6.08326 9.36689 5.42566 14.6052H8.12006Z"></path>
									<path d="M23.88 17.2605C23.2448 21.0258 19.9636 23.8993 16 23.8993C12.0364 23.8993 8.75522 21.0258 8.12002 17.2605H5.42603C6.08323 22.4988 10.5624 26.5549 16 26.5549C21.4404 26.5549 25.918 22.4988 26.5744 17.2605H23.88Z"></path>
									<path d="M15.9999 10.6221C13.0547 10.6221 10.6667 13 10.6667 15.9329C10.6667 18.8657 13.0547 21.2437 15.9999 21.2437C18.9463 21.2437 21.3331 18.8657 21.3331 15.9329C21.3331 13 18.9463 10.6221 15.9999 10.6221ZM15.9999 18.5885C14.5271 18.5885 13.3331 17.3995 13.3331 15.9329C13.3331 14.4663 14.5271 13.2773 15.9999 13.2773C17.4739 13.2773 18.6667 14.4663 18.6667 15.9329C18.6667 17.3995 17.4739 18.5885 15.9999 18.5885Z"></path>
								</svg>
								<h3 className="mb-1 text-lg text-white font-semibold uppercase">
									Spectacular team plan
								</h3>
								<p className="text-white">
									Fairly assigning daily tasks to your employees
								</p>
							</div>
						</div>
						<div className="w-full lg:w-1/3 py-10 px-8 text-center">
							<svg
								className="mx-auto mb-4 text-blue-300 w-8 h-8"
								viewBox="0 0 30 30"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M15 0.043335H0.333374V14.9056C0.333374 23.1132 6.90037 29.7678 15 29.7678H29.6667V14.9056C29.6667 6.6979 23.0997 0.043335 15 0.043335ZM27.2221 27.2906H15C8.26107 27.2906 2.77794 21.7344 2.77794 14.9056V2.5205H15C21.739 2.5205 27.2221 8.07711 27.2221 14.9056V27.2906Z"></path>
								<path d="M15.0001 4.99731C9.60017 4.99731 5.22217 9.43369 5.22217 14.9056C5.22217 20.3775 9.60017 24.8139 15.0001 24.8139C20.4 24.8139 24.778 20.3775 24.778 14.9056C24.778 9.43369 20.4 4.99731 15.0001 4.99731ZM15.0001 22.3367C10.9491 22.3367 7.66673 19.0094 7.66673 14.9056C7.66673 10.8018 10.9491 7.47448 15.0001 7.47448C19.0499 7.47448 22.3334 10.8018 22.3334 14.9056C22.3334 19.0094 19.0499 22.3367 15.0001 22.3367Z"></path>
								<path d="M15 9.95166C12.3002 9.95166 10.1112 12.1698 10.1112 14.9056C10.1112 17.6414 12.3002 19.8596 15 19.8596C17.6997 19.8596 19.8887 17.6414 19.8887 14.9056C19.8887 12.1698 17.6997 9.95166 15 9.95166ZM15 17.3828C13.6499 17.3828 12.5554 16.2737 12.5554 14.9056C12.5554 13.5375 13.6499 12.4284 15 12.4284C16.35 12.4284 17.4445 13.5375 17.4445 14.9056C17.4445 16.2737 16.35 17.3828 15 17.3828Z"></path>
							</svg>
							<h3 className="mb-1 text-lg text-white font-semibold uppercase">
								Spectacular team plan
							</h3>
							<p className="text-white">
								Fairly assigning daily tasks to your employees
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default OpenSource;
