import React, { useState } from "react";
import YouTube from "react-youtube";
import "./Volume.css";

function Volume() {
	const [isVolumeOn, setIsVolumeOn] = useState(false);

	const toggleVolume = () => {
		setIsVolumeOn(!isVolumeOn);
	};

	const onPlayerReady = (event) => {
		event.target.setVolume(5);
		event.target.playVideo();
	};

	return (
		<div className="volume-icon-container" >
			{isVolumeOn ? (
				<>
					<img className="volume-on-icon" onClick={toggleVolume} src="icons/volume-on.png" alt="Volume On" />
					<YouTube videoId="o2dPCkh78qo" opts={{ width: "0", height: "0", playerVars: { autoplay: 0 } }} onReady={onPlayerReady} />
					<div className="easter-egg">
						<img src="icons/laindancing.gif" style={{ width: "100px", height: "93px" }}></img>
					</div>
				</>
			) : (
				<img className="volume-off-icon" onClick={toggleVolume} src="icons/volume-off.png" alt="Volume Off" />
			)}
		</div>
	);
}

export default Volume;
