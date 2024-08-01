import React from "react";

import AppCore from "../AppCore";
import TxtRenderer from "./TxtRenderer";

const Txt = React.forwardRef(({ iconX, iconY, parentRef }, ref) => {
	return (
		<AppCore
			AppRenderer={TxtRenderer}
			iconX={iconX}
			iconY={iconY}
			title="sobre mim"
			icon="icons/txt.png"
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

export default Txt;
