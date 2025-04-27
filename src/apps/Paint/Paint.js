import React from "react";

import AppCore from "../AppCore";
import PaintRenderer from "./PaintRenderer";

const Paint = React.forwardRef(({ iconX, iconY, parentRef, ...others }, ref) => {
	return (
		<AppCore
			AppRenderer={PaintRenderer}
			iconX={iconX}
			iconY={iconY}
			title="paint"
			icon="icons/paint.png"
			width={400}
			height={490}
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

export default Paint;
