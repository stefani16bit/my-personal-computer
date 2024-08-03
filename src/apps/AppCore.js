import React, { useEffect, useImperativeHandle, useRef, useState } from "react";

import IconsDisplay from "../components/IconDisplay";
import AppDisplay from "../components/AppDisplay";

import { useAppsManager } from "../context/AppsManagerContext";

const AppCore = React.forwardRef(({ AppRenderer, iconX, iconY, title, icon, width, height, backgroundColor, topBarColor, titleColor, parentRef }, ref) => {
	const { openApp, closeApp, focusApp } = useAppsManager();

	const [isOpened, setIsOpened] = useState(false);

	const currentX = useRef(0);
	const currentY = useRef(0);

	const appDisplayRef = useRef(null);

	let pinXOffset = 0;
	let pinYOffset = 0;

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

	function onAppClick() {
		focusApp(appDisplayRef);
	}

	function getDragTargetPosition(screenX, screenY) {
		const { x: appX, y: appY, left: appLeft, top: appTop } = appDisplayRef.current.getBoundingClientRect();
		const { width: parentWidth, height: parentHeight, x: parentX, y: parentY, left: parentLeft, top: parentTop } = parentRef.current.getBoundingClientRect();

		const targetX = screenX - parentWidth / 2;
		const targetY = screenY - parentHeight / 2 - 30;

		return {
			targetX,
			targetY,
			pinX: targetX - (parentX - appX) - (appLeft - parentLeft) * 2,
			pinY: targetY - (parentY - appY) - (appTop - parentTop) * 2,
			parentWidth,
			parentHeight,
			parentX,
			parentY,
			parentLeft,
			parentTop,
		};
	}

	function onAppDragBegin(event) {
		focusApp(appDisplayRef);

		const { pinX, pinY } = getDragTargetPosition(event.screenX, event.screenY);

		pinXOffset = pinX;
		pinYOffset = pinY;

		event.dataTransfer.setDragImage(new Image(), 0, 0);
	}

	function onAppDragEnd(event) {
		event.preventDefault();
	}

	function onAppDrag(event) {
		if (!appDisplayRef?.current || !parentRef?.current) {
			return;
		}

		let { targetX, targetY, parentWidth, parentHeight } = getDragTargetPosition(event.screenX, event.screenY);
		targetX -= pinXOffset;
		targetY -= pinYOffset;

		if (targetX <= 0 || targetY <= 0 || targetX >= parentWidth - 20 || targetY >= parentHeight - 20) {
			return;
		}

		appDisplayRef.current.style.left = `${targetX}px`;
		appDisplayRef.current.style.top = `${targetY}px`;

		currentX.current = targetX;
		currentY.current = targetY;
	}

	useImperativeHandle(
		ref,
		() => ({
			appearence: { icon, title },

			onAppCoreOpenStateChanged(callback) {
				addOnAppCoreOpenStateChangedListener(callback);
				return () => {
					removeOnAppCoreOpenStateChangedListener(callback);
				};
			},

			open() {
				focusApp(appDisplayRef);
				openApp(ref.current);
				callOnAppCoreOpenStateChangedListeners(true);
				setIsOpened(true);

				requestAnimationFrame(() => {
					ref.current.minimize(true);
				});
			},
			close() {
				closeApp(ref.current);
				callOnAppCoreOpenStateChangedListeners(false);
				setIsOpened(false);
			},

			minimize(state) {
				appDisplayRef.current.style.display = (state == true || appDisplayRef.current.style.display === "none") ? "block" : "none";
			},

			isOpened: isOpened,

			currentX: currentX,
			currentY: currentY,

			render() {
				{
					const { width: parentWidth, height: parentHeight } = parentRef.current.getBoundingClientRect();
					currentX.current = (parentWidth - width) / 2;
					currentY.current = (parentHeight - height) / 2;
				}

				return (
					<AppDisplay
						title={title}
						icon={icon}
						width={width}
						height={height}
						x={currentX?.current || 0}
						y={currentY?.current || 0}
						titleColor={titleColor}
						backgroundColor={backgroundColor}
						topBarColor={topBarColor}
						onClick={onAppClick}
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
