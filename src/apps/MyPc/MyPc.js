import React from "react";

import AppCore from "../AppCore";

import MyPcConfigRenderer from "./Pages/MyPcConfigRenderer";
import MyPcSetupRenderer from "./Pages/MyPcSetupRenderer";
import MyPcSleeperRenderer from "./Pages/MyPcSleeperRenderer";

const MyPc = React.forwardRef(({ iconX, iconY, parentRef }, ref) => {
	return (
		<AppCore
			AppRenderer={{
				config: MyPcConfigRenderer,
				setup: MyPcSetupRenderer,
				sleeper: MyPcSleeperRenderer,
			}}
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
			options={["config", "setup", "sleeper"]}
			initialOption="config"
		/>
	);
});

export default MyPc;
