import Image from "next/image";

import loginBg from "../../public/images/landscape.png";

function SignInCTA(props) {
	return (
		<div className="w-1/2 sm:hidden lg:block relative bg-slate-400 bg-cover object-cover lg:block">
			<Image
				className="mix-blend-multiply absolute h-full object-cover bg-cover"
				src={loginBg}
				alt="Log in image"
				priority={true}
				quality={100}
			/>
			<div className="flex justify-center	items-center h-full px-20 bg-gray-900 bg-opacity-40 text-white">
				<div className="z-10 w-1/2">
					<h2 className="text-4xl font-bold ">Uptime Monitor</h2>
					<p className="max-w-xl mt-3 py-7">{props.highlightText}</p>
					<span className="block">{props.highlightBtn}</span>
				</div>
			</div>
		</div>
	);
}

export default SignInCTA;
