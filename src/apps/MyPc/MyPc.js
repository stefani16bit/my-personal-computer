import React from "react";
import AppCore from "../AppCore";
import MyPcRenderer from "./MyPcRenderer";

const MyPc = React.forwardRef(({ iconX, iconY, parentRef }, ref) => {
	return (
		<AppCore
            AppRenderer={MyPcRenderer}
			iconX={iconX}
			iconY={iconY}
			title="MyPc"
			icon="icons/pc.png"
			width={530}
			height={450}
			backgroundColor="#b1b1b1"
			topBarColor="#01009b"
			titleColor="white"
			ref={ref}
            parentRef={parentRef}
            overflowY="hidden"
		/>
	);
});

export default MyPc;