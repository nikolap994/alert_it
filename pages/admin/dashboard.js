import { getSession } from "next-auth/react";

function Dashboard({ dashboardData }) {
  return <h1>Dashboard Page - {dashboardData}</h1>;
}

export default Dashboard;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);
  return {
    props: {
      dashboardData: session ? "Logged in" : "Not Logged in",
    },
  };
}
