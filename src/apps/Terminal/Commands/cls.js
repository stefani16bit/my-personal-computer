module.exports = {
	name: "cls",
	description: "Clean the terminal",
	exec: (terminalRef) => {
        terminalRef.current.clearTerminal();
    },
};
