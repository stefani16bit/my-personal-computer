import React, { useImperativeHandle, useRef, useState } from "react";

import IconsDisplay from "../components/IconDisplay";
import AppDisplay from "../components/AppDisplay";

import { useAppsManager } from "../context/AppsManagerContext";

function a(n, mn, mx) {
	return Math.min(Math.max(0, (n - mn) / (mx - mn)), 1);
}

function p(a, mn, mx) {
	return mn + a * (mx - mn);
}

const AppCore = React.forwardRef(
	(
		{
			AppRenderer,
			iconX,
			iconY,
			title,
			icon,
			width,
			height,
			backgroundColor,
			topBarColor,
			titleColor,
			parentRef,
			overflowY,
			options,
			initialOption,
			desktopHeight,
			desktopWidth,
			taskbarHeight,
		},
		ref
	) => {
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
			let { x: appX, y: appY, left: appLeft, top: appTop, width: appWidth, height: appHeight } = appDisplayRef.current.getBoundingClientRect();
			let { left: parentLeft, right: parentRight, top: parentTop, bottom: parentBottom } = parentRef.current.getBoundingClientRect();

			const targetX = p(a(screenX, parentLeft, parentRight), parentLeft, parentLeft + desktopWidth) - parentLeft;
			const targetY = p(a(screenY, parentTop, parentBottom), parentTop, parentTop + (desktopHeight - taskbarHeight)) - parentTop;

			return {
				targetX,
				targetY,
				appX,
				appY,
				appLeft,
				appTop,
				pinX: targetX - appDisplayRef.current.offsetLeft,
				pinY: targetY - appDisplayRef.current.offsetTop,
			};
		}

		function onAppDragBegin(event) {
			focusApp(appDisplayRef);

			const { pinX, pinY } = getDragTargetPosition(event.pageX, event.pageY);

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

			if (event.clientX === 0 && event.clientY === 0) {
				return;
			}

			let { targetX, targetY } = getDragTargetPosition(event.pageX, event.pageY);

			targetX -= pinXOffset;
			targetY -= pinYOffset;

			if (targetX < 0 || targetY < 0 || targetX > desktopWidth - 10 || targetY > desktopHeight - taskbarHeight - 10) {
				return;
			}

			currentX.current = targetX;
			currentY.current = targetY;

			appDisplayRef.current.style.left = `${targetX}px`;
			appDisplayRef.current.style.top = `${targetY}px`;
		}

		useImperativeHandle(
			ref,
			() => ({
				appearence: { width, height, icon, title },

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
					appDisplayRef.current = null;
					closeApp(ref.current);
					callOnAppCoreOpenStateChangedListeners(false);
					setIsOpened(false);
				},

				minimize(state) {
					appDisplayRef.current.style.display = state == true || appDisplayRef.current.style.display === "none" ? "block" : "none";
					focusApp(appDisplayRef);
				},

				isOpened: isOpened,

				currentX: currentX,
				currentY: currentY,

				render() {
					{
						const { width: parentWidth, height: parentHeight } = parentRef.current.getBoundingClientRect();
						// currentX.current = (parentWidth - width) / 2;
						// currentY.current = (parentHeight - height) / 2;
					}

					return (
						<AppDisplay
							appCoreRef={ref}
							AppRenderer={AppRenderer}
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
							overflowY={overflowY}
							options={options}
							initialOption={initialOption}
						/>
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
	}
);

export default AppCore;
