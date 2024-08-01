import "./App.css";

import React, { useEffect, useRef, useState } from "react";

import Terminal from "./apps/Terminal/Terminal";
import Txt from "./apps/Txt/Txt";

function App() {
	const appsDisplayParentRef = useRef(null);

	const terminalRef = useRef(null);
	const txtRef = useRef(null);

	const [isTerminalOpened, setIsTerminalOpened] = useState(false);
	const [isTxtOpened, setIsTxtOpened] = useState(false);

	const appsStateMap = {
		termainal: { ref: terminalRef, isOpened: isTerminalOpened, setIsOpened: setIsTerminalOpened },
		txt: { ref: txtRef, isOpened: isTxtOpened, setIsOpened: setIsTxtOpened },
	};

	const [currentDate, setCurrentDate] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentDate(new Date());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [currentDate]);

	useEffect(() => {
		const registeredStateListeners = [];

		for (const [key, { ref, setIsOpened }] of Object.entries(appsStateMap)) {
			if (ref?.current) {
				registeredStateListeners.push(
					ref.current.onAppCoreOpenStateChanged((isOpened) => {
						setIsOpened(isOpened);
					})
				);
			}
		}

		return () => {
			registeredStateListeners.forEach((removeListener) => removeListener());
		};
	}, [terminalRef, txtRef]);

	return (
		<div className="main">
			<div className="lock-computer-crt-container">
				<div className="lock-computer-screen-container" ref={appsDisplayParentRef}>
					{/* {apps.map((app) => (app.isOpened ? app.render() : null))} */}
					{isTerminalOpened ? terminalRef?.current?.render() : null}
					{isTxtOpened ? txtRef?.current?.render() : null}

					{/* <AppDisplay title="internet" icon="icons/explorer.png" width={530} height={350} titleColor="white" backgroundColor="white" topBarColor="#0078d7" /> */}
				</div>
			</div>
			<div className="computer-crt-container">
				<div className="computer-screen-container">
					<div className="computer-screen">
						<img className="computer-screen-background" src="icons/bg.png" style={{ width: "100%", height: "100%", overflow: "hidden" }} />
						<div className="computer-screen-icons-container" style={{ position: "absolute", width: "800px", height: "600px" }}>
							{/* <IconDisplay icon="icons/explorer.png" title="internet" x={0} y={0} />
							<IconDisplay icon="icons/instagram.png" title="instagram" x={0} y={1} />
							<IconDisplay icon="icons/x.png" title="twitter" x={0} y={2} />
							<IconDisplay icon="icons/pc.png" title="meu setup" x={0} y={4} />
							<IconDisplay icon="icons/spotify.png" title="spotify" x={0} y={3} />
							<IconDisplay icon="icons/windows-folder.png" title="pastinha" x={0} y={5} />
							<IconDisplay icon="icons/steam.png" title="steam" x={1.5} y={0} />
							<IconDisplay icon="icons/cmd.png" title="cmd" x={18} y={0} />
							<IconDisplay icon="icons/txt.png" title="sobre mim" x={8} y={3} />
							<IconDisplay icon="icons/bin.png" title="lixeira" x={18} y={6} /> */}

							{/* {apps.map((app) => app.makeIcon())} */}

							<Terminal iconX={18} iconY={0} ref={terminalRef} parentRef={appsDisplayParentRef} />
							<Txt iconX={8} iconY={3} ref={txtRef} parentRef={appsDisplayParentRef} />
						</div>
						<div className="date-time-container">
							<span style={{ fontSize: "11px", color: "black", fontWeight: "bold" }}>{`${currentDate.toLocaleTimeString()}`}</span>
							<span style={{ fontSize: "11px", color: "black", fontWeight: "bold" }}>{`${currentDate.toLocaleDateString()}`}</span>
						</div>
						<div className="shadow"></div>
					</div>
				</div>
				<div className="computer-button-container">
					<div className="computer-button-light"></div>
					<button className="computer-button"></button>
				</div>
			</div>
			<div className="computer-stand"></div>
			<div className="computer-case">
				<div className="computer-diskhat-container" style={{ height: "100%", width: "100%" }}>
					<div className="computer-diskhat">
						<div className="computer-diskhat-input-container">
							<div className="computer-diskhat-input">
								<div className="computer-diskhat-input-2"></div>
							</div>
							<div className="computer-diskhat-button-container" style={{ height: "100px", width: "300px", position: "absolute" }}>
								<div className="computer-diskhat-button"></div>
							</div>
						</div>
					</div>
				</div>
				<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", paddingTop: "30px" }}>
					<div className="computer-turn-button-container">
						<button className="computer-turn-button"></button>
					</div>
					<div className="computer-case-fans-container">
						<img src="icons/fans.png" style={{ width: "279px", height: "80px" }}></img>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
