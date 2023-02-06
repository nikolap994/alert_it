import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function StatusPage(props) {
	const [isStatusTrue] = useState(props.upCheckStatus);
	const moment = require("moment");

	return (
		<div className="py-20 max-w-7xl mx-auto h-full lg:h-screen">
			<div
				class={` border-l-8 ${
					isStatusTrue
						? "bg-green-900/20 border-green-500"
						: "bg-red-900/20 border-red-500"
				} rounded p-4 mx-10`}
				role="alert"
			>
				<div className="flex flex-col gap-16 justify-between box-border lg:flex-row lg:items-center lg:gap-16 mx-auto p-4">
					<ul className="text-2xl flex flex-col gap-4 lg:mt-0">
						<li className="text-slate-400">
							Site Name: <span className="text-white">{props.name}</span>
						</li>
						<li className="text-slate-400">
							<Link href={props.url}>
								Site URL:{" "}
								<span className="text-white hover:underline">{props.url}</span>{" "}
							</Link>
						</li>
						<li className="text-slate-400">
							Accepted Status code:{" "}
							<span className="text-white">{props.acceptedStatusCodes}</span>
						</li>
						<li className="text-slate-400">
							Port: <span className="text-white">{props.port}</span>
						</li>
						<li className="text-slate-400">
							Status:{" "}
							<span
								className={isStatusTrue ? "text-green-400" : "text-red-400"}
							>
								{isStatusTrue.toString()}
							</span>
						</li>
						<li className="text-slate-400">
							Last check time:{" "}
							<span className="text-white">
								{moment(props.lastCheck).format("MMMM Do YYYY, h:mm:ss a")}
							</span>
						</li>
					</ul>
					<Image
						className="w-full lg:w-1/3 rounded"
						src={"data:image/gif;base64," + props.image}
						width={400}
						height={400}
						alt={props.name}
					/>
				</div>
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	const monitorId = context.query.page;
	if (typeof monitorId == "undefined") {
		return {
			redirect: { destination: "/404" },
		};
	} else {
		const requestOptions = {
			method: "GET",
			redirect: "follow",
		};
		try {
			const response = await fetch(
				process.env.SITE_URI + "/api/monitors?id=" + monitorId,
				requestOptions
			);
			const monitors = await response.json();
			console.log(monitors);
			if (!monitors.data[0]) {
				return {
					redirect: { destination: "/404" },
				};
			} else {
				return {
					props: {
						name: monitors.data[0].name,
						url: monitors.data[0].url,
						heartbeat: monitors.data[0].heartbeat,
						acceptedStatusCodes: monitors.data[0].acceptedStatusCodes,
						monitorType: monitors.data[0].monitorType,
						port: monitors.data[0].port,
						image: monitors.data[0].image,
						lastCheck: monitors.data[0].lastCheck,
						upCheckStatus: monitors.data[0].upCheckStatus,
					},
				};
			}
		} catch (err) {
			console.log(err);
		}
	}
	return { props: {} };
}
export default StatusPage;
