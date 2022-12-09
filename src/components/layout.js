export default function Layout({ children }) {
	return (
		<div className="flex h-full flex-col bg-slate-900">
			<main>{children}</main>
		</div>
	);
}
