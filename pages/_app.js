import "../styles/globals.css";
import Layout from "../src/components/layout";
import { SessionProvider } from "next-auth/react";
import Header from "../components/header";

function MyApp({ Component, pageProps }) {
	return (
		<SessionProvider>
			<Layout>
				<Header />
				<Component {...pageProps} />
			</Layout>
		</SessionProvider>
	);
}

export default MyApp;
