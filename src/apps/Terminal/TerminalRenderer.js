import React, { useState, useEffect, useRef } from "react";

import "./TerminalRenderer.css";

function TerminalRenderer({ appCoreRef }) {
	const [terminalLog, setTerminalLog] = useState(["type /ask for help"]);
	const [currentCommand, setCurrentCommand] = useState("");
	const [mode, setMode] = useState("initial");
	const inputRef = useRef(null);

	useEffect(() => {
		setTerminalLog(["type /ask for help"]);
	}, []);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const handleInputChange = (event) => {
		setCurrentCommand(event.target.value);
	};

	const handleCommandSubmit = () => {
		const command = currentCommand.trim();
		setCurrentCommand("");

		if (command === "/ask") {
			processAskCommand();
		} else if (command === "cls") {
			clearTerminal();
		} else if (mode === "asking") {
			processOptionSelection(command);
		} else {
			setTerminalLog([...terminalLog, `Unknown command: ${command}`]);
		}
	};

	const clearTerminal = () => {
		setTerminalLog(["type /ask for help"]);
		setMode("initial");
	};

	const processAskCommand = () => {
		setTerminalLog([...terminalLog, "(1) How old are you?", "(2) When you started programming?", "(3) What's your sign and MBTI?"]);
		setMode("asking");
	};

	const processOptionSelection = (option) => {
		let response;
		switch (option) {
			case "1":
				response = "I'm currently 22.";
				break;
			case "2":
				response = "I have started programming in 2022.";
				break;
			case "3":
				response = "Cancer and INFJ.";
				break;
			default:
				response = "Invalid option";
		}
		setTerminalLog([...terminalLog, ` ${option}: ${response}`]);
		setMode("initial");
	};

	return (
		<div className="terminal-renderer-container">
			{terminalLog.map((line, index) => (
				<div key={index}>{line}</div>
			))}
			<input
				type="text"
				value={currentCommand}
				onChange={handleInputChange}
				onKeyPress={(e) => {
					if (e.key === "Enter") {
						handleCommandSubmit();
					}
				}}
				className="terminal-input"
				ref={inputRef}
			/>
		</div>
	);
}

export default TerminalRenderer;
