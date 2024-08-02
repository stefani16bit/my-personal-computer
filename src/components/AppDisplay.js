import "./AppDisplay.css";

import React, { useEffect, useRef } from "react";

const AppDisplay = React.forwardRef(
	(
		{
			title,
			icon,
			width,
			height,
			x,
			y,
			backgroundColor,
			topBarColor,
			titleColor,
			children,
			onMinimizeButtonClick,
			onCloseButtonClick,
			onTopBarDragStart,
			onTopBarDragEnd,
			onTopBarDrag,
			setDisplayRef,
		},
		ref
	) => {
		const appDisplayRef = useRef(null);

		useEffect(() => {
			setDisplayRef(appDisplayRef);
		}, [appDisplayRef]);

		return (
			<div
				className="app-interface-container"
				style={{ left: `${x}px`, top: `${y}px`, height: height, width: width, position: "absolute", backgroundColor: backgroundColor }}
				ref={appDisplayRef}
			>
				<div
					draggable
					className="app-interface-top-bar-container"
					style={{ backgroundColor: topBarColor, width: "100%", height: "30px" }}
					onDragStart={onTopBarDragStart}
					onDragEnd={onTopBarDragEnd}
					onDrag={onTopBarDrag}
				>
					<div className="app-interface-top-bar-left-icons-container">
						<img src={icon} className="app-interface-top-bar-icon" />
						<div className="app-interface-top-bar-title" style={{ color: titleColor }}>
							{title}
						</div>
					</div>
					<div className="app-interface-right-icons-container">
						<img src="icons/minimize.png" className="app-interface-top-bar-min-icon" onClick={onMinimizeButtonClick} />
						<img src="icons/Exit.png" className="app-interface-top-bar-close-icon" onClick={onCloseButtonClick} />
					</div>
				</div>
				<div className="app-txt-renderer-bar">
					<a>File Edit Search Help</a>
				</div>
				<div className="app-interface-content-container" style={{ width: "100%", height: `${height - 55}px`, overflow: "hidden", overflowY:"auto" }}>
					{children}
				</div>
			</div>
		);
	}
);

export default AppDisplay;
