import "./IconDisplay.css";

function IconDisplay({ icon, title, href, x, y, onIconClicked }) {
	const xPosition = 15 + x * 50;
	const yPosition = 15 + y * (45 + 20 + 10);

	return (
		<a href={href} target="_blank">
			<div
				className="icon-display-container"
				style={{
					zIndex: "1000",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					position: "absolute",
					flexDirection: "column",
					textAlign: "center",
					width: "50px",
					height: "50px",
					left: `${xPosition}px`,
					top: `${yPosition}px`,
				}}
				onClick={onIconClicked}
			>
				<img src={icon} style={{ width: "40px", height: "45px" }}></img>
				<a style={{ fontSize: "10px", color: "white", fontFamily: "monospace" }}>{title}</a>
			</div>
		</a>
	);
}

export default IconDisplay;
