import { useEffect } from "react";
import "./PopUp.css";
import { useState } from "react";
import React from "react";
import { useImperativeHandle } from "react";
import { useRef } from "react";

const PopUp = React.forwardRef(({ timeToFill = 10, maxDots = 10, popUpLoaded = () => {} }, ref) => {
	const [dots, setDots] = useState(0);

	const realRef = useRef(null);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setDots((dots + 1) % (maxDots + 1));
		}, (timeToFill / maxDots) * 1000);

		return () => {
			clearInterval(intervalId);
		};
	});

	useEffect(() => {
		popUpLoaded(realRef);
	}, []);

	useImperativeHandle(ref, () => ({
		ref: realRef,
	}));

	return (
		<div className="pop-up-screen-lock" ref={realRef}>
			<div className="pop-up-container">
				<div className="pop-up-body">
					<div className="pop-up-topbar">
						<div className="pop-up-title">Doom.exe</div>
						<div className="pop-up-close-icon">
							<img src="icons/Exit.png" className="app-interface-top-bar-close-icon" />
						</div>
					</div>
					<div className="pop-up-content">
						The app is launching... Please wait.
						<div className="loading-container">
							{new Array(dots).fill(0).map((_, index) => {
								return <div key={index} className="loading"></div>;
							})}
						</div>
						<button className="pop-up-button-container">Cancel</button>
					</div>
				</div>
			</div>
		</div>
	);
});

export default PopUp;
