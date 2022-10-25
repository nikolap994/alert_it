import Image from "next/image";

import loginBg from "../../public/images/login-bg.jpg";

function SignInCTA() {
	return (
		<div className="w-1/2 hidden lg:block relative bg-slate-400 bg-cover lg:block">
			<Image
				className="mix-blend-multiply absolute"
				src={loginBg}
				alt="Log in image"
				layout="fill"
				priority={true}
				quality={100}
			/>
			<div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
				<div className="z-10">
					<h2 className="text-4xl font-bold text-white">Uptime Monitor</h2>
					<p className="max-w-xl mt-3 text-gray-300">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem
						ipsa, nulla laboriosam dolores, repellendus perferendis libero
						suscipit nam temporibus molestiae
					</p>
				</div>
			</div>
		</div>
	);
}

export default SignInCTA;
