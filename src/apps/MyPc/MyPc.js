import React from "react";

import AppCore from "../AppCore";

import MyPcConfigRenderer from "./Pages/MyPcConfigRenderer";
import MyPcSetupRenderer from "./Pages/MyPcSetupRenderer";
import MyPcSleeperRenderer from "./Pages/MyPcSleeperRenderer";

const MyPc = React.forwardRef(({ iconX, iconY, parentRef, ...others }, ref) => {
	return (
		<AppCore
			AppRenderer={{
				config: MyPcConfigRenderer,
				setup: MyPcSetupRenderer,
				sleeper: MyPcSleeperRenderer,
			}}
			iconX={iconX}
			iconY={iconY}
			title="myPc"
			icon="icons/pc.png"
			width={530}
			height={450}
			backgroundColor="#cbcbcb"
			topBarColor="#01009b"
			titleColor="white"
			ref={ref}
			parentRef={parentRef}
			overflowY="hidden"
			options={["config", "setup", "sleeper"]}
			initialOption="config"
			{...others}
		/>
	);
});

export default MyPc;
