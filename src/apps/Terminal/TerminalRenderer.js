import React, { useState, useEffect, useRef, useImperativeHandle } from "react";

import "./TerminalRenderer.css";

import help from "./Commands/help";
import ask from "./Commands/ask";
import cls from "./Commands/cls";
import color from "./Commands/color";
import exit from "./Commands/exit";
import { useAppsManager } from "../../context/AppsManagerContext";

const commands = {
	[help.name]: help,
	[ask.name]: ask,
	[cls.name]: cls,
	[color.name]: color,
	[exit.name]: exit,
};

const DIRECTORY = "C:\\Users\\Stefani>";
const COLORS = ["red", "green", "blue", "purple", "pink", "white", "yellow"];

function TerminalRenderer({ appCoreRef }) {
	const { focusedApp } = useAppsManager();

	const [terminalLog, setTerminalLog] = useState([]);
	const [inputColor, setInputColor] = useState("white");

	const terminalInput = useRef();
	const terminalRef = useRef();
	const terminalInputRef = useRef();
	const terminalContainerRef = useRef();

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
		appCoreRef: appCoreRef,
		commands: commands,
		clearTerminal: clearTerminal,
		writeToTerminal: writeToTerminal,
		setTerminalText: setTerminalText,
		setTerminalColor: setTerminalColor,
	}));

	useEffect(() => {
		setTerminalLog(["type /help to see all commands available."]);
	}, []);

	useEffect(() => {
		terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
	}, [terminalLog]);

	useEffect(() => {
		if (terminalInputRef.current) {
			function onKeyDown(event) {
				if (event.key != "Enter") {
					return;
				}

				const input = terminalInputRef.current.value;
				terminalInput.current = input;

				const command = input.split(" ")[0];
				if (command in commands) {
					writeToTerminal(null, true, false);
					commands[command].exec(terminalRef, input);
				} else {
					writeToTerminal(`The provided command ${command} does not exist. Type /help to see the list of commands available.`, true, true);
				}

				setTerminalText();
			}

			// Focus the terminal input when the terminal is opened
			terminalInputRef.current.focus();

			window.addEventListener("keydown", onKeyDown);
			return () => {
				window.removeEventListener("keydown", onKeyDown);
			};
		}
	}, [terminalInputRef]);

	return (
		<div className="terminal-renderer-container" ref={terminalContainerRef}>
			{terminalLog.map((line, index) => (
				<div style={{ color: inputColor, fontSize: "16px", lineHeight: "1.5" }} key={index}>
					{line}
				</div>
			))}

			<div className="input-container">
				<span className="fixed-text" style={{ color: inputColor }}>
					{DIRECTORY}&nbsp;
				</span>
				<input className="terminal-input" ref={terminalInputRef} style={{ color: inputColor }}></input>
			</div>
		</div>
	);
}

export default TerminalRenderer;
