import "./IconsDisplay.css";

function IconsDisplay({icon, title, x, y, onIconClicked}) {
    const xPosition = 15 + x * 40;
    const yPosition = 15 + y * (45 + 20 + 10);

	return (
		<div style={{zIndex:"1000", display:"flex", justifyContent:"center", alignItems:"center", position: "absolute", flexDirection:"column", textAlign:"center", width: "40px", height: "65px", left:`${xPosition}px`, top:`${yPosition}px` }} onClick={onIconClicked}>
			<img src = {icon} style={{ width: "40px", height: "45px"}}></img>
			<a style={{fontSize: "10px", color: "white" }}>{title}</a>
		</div>
	);
}

export default IconsDisplay;
