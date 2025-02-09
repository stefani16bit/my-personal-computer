import { createContext, useContext, useState } from "react";

const PopUpsManagerContext = createContext();

export const usePopUpsManager = () => {
	return useContext(PopUpsManagerContext);
};

export function PopUpsManagerContextProvider({ children }) {
	let [openedPopUps, setOpenedPopUps] = useState([]);

	function getPopUpFromId(id) {
		return openedPopUps.find((popUp) => {
			return popUp[0] === id;
		});
	}

	function openPopUp(id, popUp) {
		setOpenedPopUps((previousPopUps) => {
			const alreadyOpenedPopUp = getPopUpFromId(id);
			if (alreadyOpenedPopUp) {
				return previousPopUps;
			}

			openedPopUps = [...previousPopUps, [id, popUp]];
			return openedPopUps;
		});
	}

	function closePopUp(id) {
		setOpenedPopUps((previousPopUps) => {
			const alreadyOpenedPopUp = getPopUpFromId(id);
			if (!alreadyOpenedPopUp) {
				return previousPopUps;
			}

			openedPopUps = previousPopUps.filter((popUp) => popUp[0] !== id);
			return openedPopUps;
		});
	}

	return <PopUpsManagerContext.Provider value={{ getPopUpFromId, openPopUp, closePopUp, openedPopUps: openedPopUps }}>{children}</PopUpsManagerContext.Provider>;
}
