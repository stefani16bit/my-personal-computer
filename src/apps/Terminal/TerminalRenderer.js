import React, { useState, useEffect, useRef, useImperativeHandle } from "react";

import "./TerminalRenderer.css";

import help from "./Commands/help";
import cls from "./Commands/cls";
import color from "./Commands/color";

const commands = {
	[help.name]: help,
	[cls.name]: cls,
	[color.name]: color,
};

const DIRECTORY = "C:\\Users\\Stefani>";
const COLORS = ["red", "lightgreen", "blue", "purple", "pink", "white", "yellow"];

function TerminalRenderer({ appCoreRef }) {
	const [terminalLog, setTerminalLog] = useState([]);
	const [inputColor, setInputColor] = useState("white");

	const terminalInput = useRef();
	const terminalRef = useRef();
	const terminalInputRef = useRef();

	function clearTerminal() {
		setTerminalLog(["type /help to see all commands avaliable."]);
	}

	function writeToTerminal(input, showDirectory, addLineBreak) {
		setTerminalLog((prevState) => {
			return [...prevState, showDirectory && `${DIRECTORY} ${terminalInput.current}`, input, addLineBreak && "ㅤ"];
		});
	}

	function setTerminalText(input = "") {
		terminalInputRef.current.value = input;
	}

	function setTerminalColor(color) {
		if (COLORS.indexOf(color) != -1) {
			setInputColor(color);
		} else {
			writeToTerminal(`The provided color ${color} does not exist.`, false, true);
		}
	}

	useImperativeHandle(terminalRef, () => ({
		ref: terminalInputRef,
		clearTerminal: clearTerminal,
		writeToTerminal: writeToTerminal,
		setTerminalText: setTerminalText,
		setTerminalColor: setTerminalColor,
	}));

	useEffect(() => {
		setTerminalLog(["type /help to see all commands avaliable."]);
	}, []);

	useEffect(() => {
		if (terminalInputRef.current) {
			function onKeyDown(event) {
				if (event.key != "Enter") {
					return;
				}

				const input = terminalInputRef.current.value;
				if (input == "") {
					return;
				}

				terminalInput.current = input;

				const command = input.split(" ")[0];
				if (command in commands) {
					writeToTerminal(null, true, false)
					commands[command].exec(terminalRef, input);
				} else {
					writeToTerminal(`The provided command ${command} does not exist. Type /help to see the list of commands avaliable.`, true, true);
				}

				setTerminalText();
			}

			window.addEventListener("keydown", onKeyDown);

			terminalInputRef.current.focus();

			return () => {
				window.removeEventListener("keydown", onKeyDown);
			};
		}
	}, [terminalInputRef]);

	return (
		<div className="terminal-renderer-container">
			{terminalLog.map((line, index) => (
				<div style={{ color: inputColor }} key={index}>
					{line}
				</div>
			))}
			<input className="terminal-input" ref={terminalInputRef} style={{ color: inputColor }}></input>
		</div>
	);
}

export default TerminalRenderer;
