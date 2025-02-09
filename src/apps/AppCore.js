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
		const { openApp, closeApp, focusApp, isFocused } = useAppsManager();

		const [isOpened, setIsOpened] = useState(false);

		let [canClose, setCanClose] = useState(true);
		let [canMove, setCanMove] = useState(true);

		const currentX = useRef(0);
		const currentY = useRef(0);

		const appDisplayRef = useRef(null);
		const appRendererRef = useRef(null);

		let pinXOffset = 0;
		let pinYOffset = 0;

		const onAppCoreOpenStateChangedListeners = [];
		const onAppCoreFocusStateChangedListeners = [];

		/**
		 * OPEN STATE LISTENERS
		 */
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

		/**
		 * FOUCS STATE LISTENERS
		 */
		function addOnAppCoreFocusStateChangedListener(listener) {
			onAppCoreFocusStateChangedListeners.push(listener);
		}

		function removeOnAppCoreFocusStateChangedListener(listenerToRemove) {
			const index = onAppCoreFocusStateChangedListeners.indexOf(listenerToRemove);
			if (index > -1) {
				onAppCoreFocusStateChangedListeners.splice(index, 1);
			}
		}

		function callOnAppCoreFocusStateChangedListeners(isFocused) {
			onAppCoreFocusStateChangedListeners.forEach((listener) => listener(isFocused));
		}

		function onAppClick() {
			focusApp(appDisplayRef);
		}

		function getDragTargetPosition(screenX, screenY) {
			let { x: appX, y: appY, left: appLeft, top: appTop } = appDisplayRef.current.getBoundingClientRect();
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
			if (!canMove) {
				return;
			}

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
			if (!canMove) {
				return;
			}

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

				onAppCoreFocusStateChanged(callback) {
					addOnAppCoreFocusStateChangedListener(callback);
					return () => {
						removeOnAppCoreFocusStateChangedListener(callback);
					};
				},

				isFocused() {
					return isFocused(appDisplayRef);
				},

				open() {
					focusApp(appDisplayRef);
					openApp(ref.current);
					callOnAppCoreOpenStateChangedListeners(true);
					callOnAppCoreFocusStateChangedListeners(true);
					setIsOpened(true);

					requestAnimationFrame(() => {
						ref.current.minimize(true);
					});
				},

				close() {
					if (!canClose) {
						return;
					}

					appDisplayRef.current = null;
					closeApp(ref.current);
					callOnAppCoreOpenStateChangedListeners(false);
					callOnAppCoreFocusStateChangedListeners(false);
					setIsOpened(false);
				},

				minimize(state) {
					if (!canClose) {
						return;
					}

					if (!appDisplayRef.current) {
						return;
					}

					appDisplayRef.current.style.display = state == true || appDisplayRef.current.style.display === "none" ? "block" : "none";
					focusApp(appDisplayRef);
				},

				setCanCloseApp(canCloseApp) {
					setCanClose(canCloseApp);
					canClose = canCloseApp;
				},

				setCanMoveApp(canMoveApp) {
					setCanMove(canMoveApp);
					canMove = canMoveApp;
				},

				setAppRendererRef(ref) {
					appRendererRef.current = ref;
				},

				getAppRendererRef() {
					return appRendererRef;
				},

				isOpened: isOpened,

				canClose: canClose,
				canMove: canMove,

				currentX: currentX,
				currentY: currentY,

				appDisplayRef: appDisplayRef,

				render() {
					{
						currentX.current = (desktopWidth - width) / 2;
						currentY.current = (desktopHeight - height) / 2;
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
