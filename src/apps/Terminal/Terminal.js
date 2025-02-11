import React from "react";

import AppCore from "../AppCore";
import TerminalRenderer from "./TerminalRenderer";

const Terminal = React.forwardRef(({ iconX, iconY, parentRef, ...others }, ref) => {
	return (
		<AppCore
            AppRenderer={TerminalRenderer}
			iconX={iconX}
			iconY={iconY}
			title="terminal"
			icon="icons/cmd.png"
			width={530}
			height={350}
			backgroundColor="#000000"
			topBarColor="#01009b"
			titleColor="white"
			ref={ref}
            parentRef={parentRef}
			overflowY="hidden"
			{...others}
		/>
	);
});

export default Terminal;
