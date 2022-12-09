export default function Layout({ children }) {
	return (
		<div className="flex h-screen flex-col bg-slate-900">
			<main className="bg-slate-900">{children}</main>
		</div>
	);
}
