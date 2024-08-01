import React from "react";

import AppCore from "../AppCore";
import TerminalRenderer from "./TerminalRenderer";

const Terminal = React.forwardRef(({ iconX, iconY, parentRef }, ref) => {
	return (
		<AppCore
            AppRenderer={TerminalRenderer}
			iconX={iconX}
			iconY={iconY}
			title="terminal"
			icon="icons/cmd.png"
			width={530}
			height={350}
			backgroundColor="white"
			topBarColor="#0078d7"
			titleColor="white"
			ref={ref}
            parentRef={parentRef}
		/>
	);
});

export default Terminal;
