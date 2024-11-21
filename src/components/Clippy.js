import "./Clippy.css";

import { useState, useEffect } from "react";

function Clippy() {
	const [isClippyOpened, setIsClippyOpened] = useState(false);
	const [clippyText, setClippyText] = useState("Hello, piece of human flesh.");

	const textSequences = [
		["When you die, you're just an innocuous lump of protein, nothing more.", 3],
		["The omniscient truth of everything is nothing but one word, it is uncomprehensible.", 10],
		["Anyway, don't mind me. I hope you like your visit here.", 16],
		["Goodbye.", 20],
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
