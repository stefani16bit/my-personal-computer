import "./Clippy.css";

import { useState, useEffect } from "react";

function Clippy() {
	const [isClippyOpened, setIsClippyOpened] = useState(false);
	const [clippyText, setClippyText] = useState("Hello human!");

	const textSequences = [
		["This page was made by me (stefani16bit if you guess).", 3],
		["You can check this project on my github page.", 6],
		["Anyway, don't mind me. I hope you like your visit here.", 12],
		["Goodbye.", 13],
	];

	useEffect(() => {
		const textTimeoutId = setTimeout(() => {
			setIsClippyOpened(true);

			for (const element of textSequences) {
				const text = element[0];
				const time = element[1];
				setTimeout(() => {
					setClippyText(text);
				}, time * 1000);
			}
		}, 5000);

		const hideClippyTimeoutId = setTimeout(() => {
			setIsClippyOpened(false);
		}, 27000);

		return () => {
			clearTimeout(textTimeoutId);
			clearTimeout(hideClippyTimeoutId);
		};
	}, []);

	return (
		<div>
			{isClippyOpened && (
				<div className="clippy-container">
					<div className="clippy-balloon">
						<a className="clippy-balloon-text">{clippyText}</a>
					</div>
					<div className="clippy-balloon-arrow" />
					<div className="clippy-img">
						<img src="icons/clippy.png" style={{ width: "75px", height: "75px" }}></img>
					</div>
				</div>
			)}
		</div>
	);
}

export default Clippy;
