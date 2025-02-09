import { Helmet } from "react-helmet";
import { useEffect } from "react";
import PopUp from "../../components/PopUp";
import "./DoomRenderer.css";
import { useState } from "react";
import { usePopUpsManager } from "../../context/PopUpsManagerContext";
import { useRef } from "react";
import { useAppsManager } from "../../context/AppsManagerContext";

const CLOSE_TIMEOUT = 5;

function DoomRenderer({ appCoreRef }) {
	const { getPopUpFromId, openPopUp, closePopUp } = usePopUpsManager();
	const { focusedApp } = useAppsManager();

	const appRendererRef = useRef(null);
	const popUpRef = useRef(null);

	const [popUpLoaded, setPopUpLoaded] = useState(null);

	useEffect(() => {
		let intervalIdToClear;
		let removeOnAppCoreFocusStateChangedListener;

		window.doom_app_core = appCoreRef;

		if (appCoreRef?.current != undefined) {
			appCoreRef.current.setAppRendererRef(appRendererRef);

			removeOnAppCoreFocusStateChangedListener = appCoreRef.current.onAppCoreFocusStateChanged(() => {
				// setIsAppFocused(appCoreRef.current.isFocused());
			});

			openPopUp(
				"doom",
				<PopUp
					timeToFill={CLOSE_TIMEOUT}
					popUpLoaded={(ref) => {
						setPopUpLoaded(ref);
					}}
				/>
			);

			appCoreRef.current.setCanCloseApp(false);
			appCoreRef.current.setCanMoveApp(false);

			intervalIdToClear = setInterval(() => {
				closePopUp("doom");
				appCoreRef.current.setCanCloseApp(true);
				appCoreRef.current.setCanMoveApp(true);
			}, CLOSE_TIMEOUT * 1000);
		}

		return () => {
			window.doom_app_core = null;

			if (intervalIdToClear) {
				clearInterval(intervalIdToClear);
			}

			if (removeOnAppCoreFocusStateChangedListener) {
				removeOnAppCoreFocusStateChangedListener();
			}

			closePopUp("doom");

			appCoreRef?.current.setCanCloseApp(true);
			appCoreRef?.current.setCanMoveApp(true);
		};
	}, []);

	return (
		<div id="DOOM" className="dosbox-default app-doom-renderer-container" ref={appRendererRef}>
			{getPopUpFromId("doom") != undefined && (
				<div
					className="dosbox-container loading-doom"
					style={{ cursor: "not-allowed" }}
					onClick={() => {
						const sound = new Audio("icons/no.mp3");
						sound.play();
						sound.remove();
						sound.currentTime = 0.6;
					}}
				/>
			)}

			{(focusedApp || popUpLoaded) &&
				(() => {
					if (!popUpLoaded) {
						return;
					}

					if (!popUpLoaded || !popUpLoaded.current) {
						return;
					}

					popUpLoaded.current.style.zIndex = focusedApp?.current == appCoreRef?.current?.appDisplayRef?.current ? 10005 : 9995;
				})()}

			<Helmet>
				<script type="text/javascript">
					{`
                    var dosbox_DOOM = new Dosbox({
                        id: "DOOM",
                        onload: function (dosbox) {
                            dosbox_DOOM.run("https://thedoggybrad.github.io/doom_on_js-dos/DOOM-@evilution.zip", "./DOOM/DOOM.EXE");
                        },
                        onrun: function (dosbox, app) {
                        },
                    });

                    window.doom_app_core.current.onAppCoreOpenStateChanged((isOpened) => {
                        if (!isOpened) {
                            try { dosbox_DOOM.module.abort(); } catch (e) { }
                        }
                    });
                    
                    dosbox_DOOM.ui.start[0].click();
                    `}
				</script>
			</Helmet>
		</div>
	);
}

export default DoomRenderer;
