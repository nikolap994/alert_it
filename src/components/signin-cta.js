import Image from "next/image";

import loginBg from "../../public/images/login-bg.jpg";

function SignInCTA() {
	return (
		<div className="w-1/2 hidden lg:block relative bg-slate-400 bg-cover object-cover lg:block">
			<Image
				className="mix-blend-multiply absolute h-full object-cover bg-cover"
				src={loginBg}
				alt="Log in image"
				priority={true}
				quality={100}
			/>
			<div className="flex justify-center	items-center h-full px-20 bg-gray-900 bg-opacity-40">
				<div className="z-10">
					<h2 className="text-4xl font-bold text-white">Uptime Monitor</h2>
					<p className="max-w-xl mt-3 text-gray-300">
						AlertIt is an uptime monitoring service by Evil Bees. Monitoring is
						performed through HTTP/S or TCP protocol, and allows you to check
						for a specific service — and be the first to get notified if service
						is down. Sounds useful?
						<span className="block py-2 mt-5 bg-indigo-700 text-center mix-blend-multiply">
							Let's get started.
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}

export default SignInCTA;
