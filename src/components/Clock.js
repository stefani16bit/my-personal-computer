import { useState, useEffect } from "react";

import "./Clock.css";

function Clock() {
	const [currentDate, setCurrentDate] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentDate(new Date());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [currentDate]);

	return (
		<div className="date-time-container">
			<span style={{ fontSize: "11px", color: "black", fontWeight: "bold" }}>{`${currentDate.toLocaleTimeString()}`}</span>
			<span style={{ fontSize: "11px", color: "black", fontWeight: "bold" }}>{`${currentDate.toLocaleDateString()}`}</span>
		</div>
	);
}

export default Clock;
