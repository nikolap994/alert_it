export default function Custom500() {
	return (
		<section className="bg-gray-900 text-white text-center">
			<div className="h-screen pt-[10%] max-w-7xl mx-auto">
				<h1 className="text-9xl text-indigo-200">5oo</h1>
				<div>
					<h1 className="text-3xl pt-12">A Server-side error has occurred.</h1>
					<p className="pt-8 max-w-[500px] mx-auto">
						Ironically, <span className="italic">our</span> server is going
						through some things. Rest assured we&apos;re on it, and it will be
						back up in no time!
					</p>
				</div>
			</div>
		</section>
	);
}
