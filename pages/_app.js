import "../styles/globals.css";
import Layout from "../src/components/layout";
import { SessionProvider } from "next-auth/react";
import Header from "../components/header";
import { useState } from "react";
import Alert from "../components/Alert";

function MyApp({ Component, pageProps }) {
	const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
	return (
		<SessionProvider>
			<Alert alert={alert}/>
			<Layout >
				<Header />
				<Component {...pageProps} />
			</Layout>
		</SessionProvider>
	);
}

export default MyApp;

