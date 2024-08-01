import React, { useEffect, useImperativeHandle, useRef, useState } from "react";

import IconsDisplay from "../components/IconDisplay";
import AppDisplay from "../components/AppDisplay";

const AppCore = React.forwardRef(({ AppRenderer, iconX, iconY, title, icon, width, height, backgroundColor, topBarColor, titleColor, parentRef }, ref) => {
	const [isOpened, setIsOpened] = useState(false);

	const [currentX, setCurrentX] = useState(0);
	const [currentY, setCurrentY] = useState(0);

	const appDisplayRef = useRef(null);

	const onAppCoreOpenStateChangedListeners = [];

	function addOnAppCoreOpenStateChangedListener(listener) {
		onAppCoreOpenStateChangedListeners.push(listener);
	}

	function removeOnAppCoreOpenStateChangedListener(listenerToRemove) {
		const index = onAppCoreOpenStateChangedListeners.indexOf(listenerToRemove);
		if (index > -1) {
			onAppCoreOpenStateChangedListeners.splice(index, 1);
		}
	}

	function callOnAppCoreOpenStateChangedListeners(isOpened) {
		onAppCoreOpenStateChangedListeners.forEach((listener) => listener(isOpened));
	}

	function onAppDragBegin(event) {
		event.dataTransfer.setDragImage(new Image(), 0, 0);
	}

	function onAppDragEnd(event) {
	}

	function onAppDrag(event) {
		const {clientX, clientY} = event;
		setCurrentX(clientX);
		setCurrentY(clientY);

		if (!appDisplayRef?.current) {
			return;
		}

		const {x, y} = appDisplayRef.current.getBoundingClientRect()

		appDisplayRef.current.style.left = `${clientX - x}px`;
		appDisplayRef.current.style.top = `${clientY}px`;

	}

	useImperativeHandle(
		ref,
		() => ({
			onAppCoreOpenStateChanged(callback) {
				addOnAppCoreOpenStateChangedListener(callback);
				return () => {
					removeOnAppCoreOpenStateChangedListener(callback);
				};
			},

			open() {
				setIsOpened(true);
				callOnAppCoreOpenStateChangedListeners(true);
			},
			close() {
				setIsOpened(false);
				callOnAppCoreOpenStateChangedListeners(false);
			},

			minimize() {
				console.log("minimize");
			},

			isOpened: isOpened,

			currentX: currentX,
			currentY: currentY,

			render() {
				return (
					<AppDisplay
						title={title}
						icon={icon}
						width={width}
						height={height}
						x={currentX}
						y={currentY}
						titleColor={titleColor}
						backgroundColor={backgroundColor}
						topBarColor={topBarColor}
						onMinimizeButtonClick={() => {
							ref?.current?.minimize();
						}}
						onCloseButtonClick={() => {
							ref?.current?.close();
						}}
						onTopBarDragStart={onAppDragBegin}
						onTopBarDragEnd={onAppDragEnd}
						onTopBarDrag={onAppDrag}
						setDisplayRef={(ref) => {
							appDisplayRef.current = ref?.current;
						}}
					>
						<AppRenderer appCoreRef={ref} />
					</AppDisplay>
				);
			},
		}),
		[ref]
	);

	return (
		<IconsDisplay
			icon={icon}
			title={title}
			x={iconX}
			y={iconY}
			onIconClicked={() => {
				ref?.current?.open();
			}}
		/>
	);
});

export default AppCore;
