import "./Clippy.css";

import { useState, useEffect } from "react";

function Clippy() {
	const [isClippyOpened, setIsClippyOpened] = useState(false);

	useEffect(() => {
		if (document.visibilityState === "visible") {
			const timer = setTimeout(() => {
				setIsClippyOpened(true);
			}, 5000);
		}
	}, []);

	return (
		<div>
			{isClippyOpened && (
				<div className="clippy-container">
					<div className="clippy-balloon">
						<a className="clippy-balloon-text">Hello, piece of human flesh.</a>
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
