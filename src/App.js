import React, { useEffect, useState } from "react";
import "./App.css";
import IconsDisplay from "./components/IconsDisplay";

function App() {
	const [currentDate, setCurrentDate] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentDate(new Date());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [currentDate]);

	return (
		<div className="main">
			<div className="computer-crt-container">
				<div className="computer-screen-container">
					<div className="computer-screen">
						<img className="computer-screen-background" src="icons/bg.png" style={{ width: "100%", height: "100%", overflow: "hidden" }} />
						<div className="computer-screen-icons-container" style={{ position: "absolute", width: "800px", height: "600px" }}>
							<IconsDisplay icon="icons/explorer.png" title="internet" x={0} y={0} />
							<IconsDisplay icon="icons/instagram.png" title="instagram" x={0} y={1} />
							<IconsDisplay icon="icons/x.png" title="twitter" x={0} y={2} />
							<IconsDisplay icon="icons/pc.png" title="meu setup" x={0} y={4} />
							<IconsDisplay icon="icons/spotify.png" title="spotify" x={0} y={3} />
							<IconsDisplay icon="icons/windows-folder.png" title="pastinha" x={0} y={5} />
							<IconsDisplay icon="icons/msn.png" title="msn" x={1.5} y={0} />
							<IconsDisplay icon="icons/cmd.png" title="cmd" x={18} y={0} />
							<IconsDisplay icon="icons/txt.png" title="sobre mim" x={8} y={3} />
							<IconsDisplay icon="icons/bin.png" title="lixeira" x={18} y={6} />
						</div>
						<div className="date-time-container">
							<span style={{fontSize:"11px", color:"black", fontWeight:"bold"}}>{`${currentDate.toLocaleTimeString()}`}</span>
							<span style={{fontSize:"11px", color:"black", fontWeight:"bold"}}>{`${currentDate.toLocaleDateString()}`}</span>
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
