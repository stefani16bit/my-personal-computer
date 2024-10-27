
module.exports = {
	name: "color",
	description: "Change the terminal color",
	exec: (terminalRef, input) => {
		terminalRef.current.setTerminalColor(input.split(" ")[1]);
	},
};
