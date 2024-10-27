import { createContext, useContext, useState } from "react";

const AppsManagerContext = createContext();

export const useAppsManager = () => {
	return useContext(AppsManagerContext);
};

export function AppsManagerContextProvider({ children }) {
	const [openedApps, setOpenedApps] = useState([]);
	const [focusedApp, setFocusedApp] = useState(null);

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

	function focusApp(app) {
		setFocusedApp(app);
	}

	function unfocusApp() {
		setFocusedApp(null);
	}

	return <AppsManagerContext.Provider value={{ openApp, closeApp, focusApp, unfocusApp, openedApps, focusedApp }}>{children}</AppsManagerContext.Provider>;
}
