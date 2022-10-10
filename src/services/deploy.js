const { execSync } = require("child_process");

const url = "nikola@192.168.0.16";
const path = "/home/nikola_server/test/";

let tasks = ["git status", "git pull", "ls -la", "pwd"];

tasks.forEach(command => {
	command = "'cd " + path + " ; " + command + "'";

	let finalCommand = "ssh " + url + " " + command;
	let response = execSync(finalCommand).toString();

	console.log("----------------------------------");
	console.log(response);
});
