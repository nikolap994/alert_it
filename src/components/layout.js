export default function Layout({ children }) {
	return (
		<div className="flex h-full flex-col">
			<main>{children}</main>
		</div>
	);
}
