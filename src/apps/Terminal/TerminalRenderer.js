import React, { useState, useEffect, useRef } from "react";

import "./TerminalRenderer.css";

import commands from "./terminal-commands.json";

function TerminalRenderer({ appCoreRef }) {
	const [terminalLog, setTerminalLog] = useState([]);

	useEffect(() => {
		setTerminalLog(["type /help to see all commands avaliable."]);
	}, []);

	useEffect(() => {
		function handleInputChange(event) {}
		
		window.addEventListener("keydown", handleInputChange);

		return () => {
			window.removeEventListener("keydown", handleInputChange);
		};
	}, []);

	return (
		<div className="terminal-renderer-container">
			{terminalLog.map((line, index) => (
				<div key={index}>{line}</div>
			))}
		</div>
	);
}

export default TerminalRenderer;
