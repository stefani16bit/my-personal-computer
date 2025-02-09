import { createContext, useContext, useState } from "react";

const AppsManagerContext = createContext();

export const useAppsManager = () => {
	return useContext(AppsManagerContext);
};

export function AppsManagerContextProvider({ children }) {
	let [openedApps, setOpenedApps] = useState([]);
	let [focusedApp, setFocusedApp] = useState(null);

	function openApp(app) {
		setOpenedApps((previousApps) => {
			if (previousApps.includes(app)) {
				return previousApps;
			}

			return [...previousApps, app];
		});
	}

	function closeApp(app) {
		setOpenedApps((previousApps) => previousApps.filter((openedApp) => openedApp !== app));
	}

	function isFocused(app) {
		return focusedApp === app;
	}

	function focusApp(app) {
		setFocusedApp(app);
		focusedApp = app;
	}

	function unfocusApp() {
		setFocusedApp(null);
		focusedApp = null;
	}

	return (
		<AppsManagerContext.Provider value={{ openApp, closeApp, isFocused, focusApp, unfocusApp, openedApps, focusedApp }}>
			{children}
		</AppsManagerContext.Provider>
	);
}
