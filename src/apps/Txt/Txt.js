import React from "react";

import AppCore from "../AppCore";
import TxtRenderer from "./TxtRenderer";

const Txt = React.forwardRef(({ iconX, iconY, parentRef, ...others }, ref) => {
	return (
		<AppCore
			AppRenderer={TxtRenderer}
			iconX={iconX}
			iconY={iconY}
			title="me.txt"
			icon="icons/txt.png"
			width={340}
			height={450}
			backgroundColor="white"
			topBarColor="#01009b"
			titleColor="white"
			ref={ref}
			parentRef={parentRef}
			overflowY="auto"
			{...others}
		/>
	);
});

export default Txt;
