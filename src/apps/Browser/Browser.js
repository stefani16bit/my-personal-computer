import React from "react";

import AppCore from "../AppCore";
import BrowserRenderer from "./BrowserRenderer";

const Browser = React.forwardRef(({ iconX, iconY, parentRef, ...others }, ref) => {
	return (
		<AppCore
			AppRenderer={BrowserRenderer}
			iconX={iconX}
			iconY={iconY}
			title="internet"
			icon="icons/explorer.png"
			width={530}
			height={350}
			backgroundColor="white"
			topBarColor="#01009b"
			titleColor="white"
			ref={ref}
			parentRef={parentRef}
			overflowY="hidden"
			{...others}
		/>
	);
});

export default Browser;
