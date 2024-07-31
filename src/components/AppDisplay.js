import "./AppDisplay.css";

function AppDisplay({ title, icon, width, height, backgroundColor, topBarColor, titleColor }) {
	return (
		<div className="app-interface-container" style={{ height: height, width: width, position:"absolute", backgroundColor: backgroundColor, }}>
			<div className="app-interface-top-bar-container" style={{ backgroundColor: topBarColor, width: "100%", height: "30px" }}>
				<div className="app-interface-top-bar-left-icons-container">
					<img src={icon} className="app-interface-top-bar-icon" />
					<div className="app-interface-top-bar-title" style={{color:titleColor}}>{title}</div>
				</div>
				<div className="app-interface-right-icons-container">
					<img src="icons/minimize.png" className="app-interface-top-bar-min-icon" />
					<img src="icons/Exit.png" className="app-interface-top-bar-close-icon" />
				</div>
			</div>
			<div className="app-interface-content-container" style={{width:"100%", height:`${height - 30}px`}}></div>
		</div>
	);
}
export default AppDisplay;
