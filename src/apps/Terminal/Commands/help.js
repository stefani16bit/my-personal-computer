module.exports = {
	name: "help",
	description: "List all available commands",
	exec: (terminalRef) => {
		for (const [key, value] of Object.entries(terminalRef.current.commands)) {
			terminalRef.current.writeToTerminal(`${value.name} - ${value.description}`, false, false);
		}

		terminalRef.current.writeToTerminal(null, false, true);
	},
};
