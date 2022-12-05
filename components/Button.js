import Link from "next/link";

function Button({ text, linkTo }) {
	return (
		<div className="flex flex-wrap items-center">
			<Link
				className="inline-block mr-14 px-10 py-5 text-white font-bold border border-indigo-400 rounded-full hover:bg-blue-600 rounded-full transition duration-200 hover:drop-shadow-2xl"
				href={linkTo}
			>
				{text}
			</Link>
		</div>
	);
}

export default Button;
