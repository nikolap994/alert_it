import Link from "next/link";

export default function Custom404() {
	return (
		<section className="bg-gray-900 text-white text-center">
			<div className="h-screen pt-[10%] max-w-7xl mx-auto">
				<h1 className="text-9xl">
					4<span className="text-indigo-200">o</span>4
				</h1>
				<div>
					<h2 className="text-3xl pt-12">Oopsie!</h2>
					<p className="pt-8 max-w-[500px] mx-auto">
						The page you&apos;re trying to reach has been moved or doesn&apos;t
						exist. Restarting from <Link href="/">Home</Link> and you will
						undoubtedly fix the issue.
					</p>
				</div>
			</div>
		</section>
	);
}
