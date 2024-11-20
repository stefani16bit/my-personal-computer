import "./Clippy.css";

import { useState, useEffect } from "react";

function Clippy() {
	const [isClippyOpened, setIsClippyOpened] = useState(false);
	const [clippyText, setClippyText] = useState("Hello, piece of human flesh.");

	const textSequences = [
		["oiii", 2],
		["ti amo mozi", 7],
		["vc quer namora comigo?", 9],
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
		}, 1000);

		const hideClippyTimeoutId = setTimeout(() => {
			setIsClippyOpened(false);
		}, 30000);

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
