import { useState } from "react";

import "./PageWithOptions.css";

function PageWithOptions({ appCoreRef, AppRenderer, options, initialOption, appDisplayRef }) {
	const [currentOption, setCurrentOption] = useState(initialOption);

	function makeOnOptionClickedHandler(option) {
		return () => {
			setCurrentOption(option);
		};
	}

	return (
		<div style={{ width: "calc(100% - 2px)", height: `${appCoreRef.current.appearence.height - 30 - 30 - 2}px` }}>
			<div className="app-options-bar">
				{options.map((option, index) => {
					return (
						<button
							key={index}
							onClick={makeOnOptionClickedHandler(option)}
							className="app-options-button"
							style={
								currentOption === option
									? {
											backgroundColor: "#cbcbcb",
											borderBottom: "20px #cbcbcb",
											zIndex: 50000,
											height: "28px",
									  }
									: {}
							}
						>
							{option}
						</button>
					);
				})}
			</div>

			<div style={{ width: "100%", height: "100%" }}>{AppRenderer[currentOption]({ appRef: appCoreRef })}</div>
		</div>
	);
}

export default PageWithOptions;
