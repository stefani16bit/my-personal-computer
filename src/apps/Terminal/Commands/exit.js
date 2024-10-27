module.exports = {
	name: "exit",
	description: "Exit the terminal",
	exec: (terminalRef) => {
		terminalRef.current.appCoreRef.current.close();
	},
};
