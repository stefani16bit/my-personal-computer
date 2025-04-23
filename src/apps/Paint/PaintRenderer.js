import "./PaintRenderer.css";

function PaintRenderer({ appCoreRef }) {
	return (
		<div className="paint-container">
			<div className="paint-topbar-container">
				<div className="paint-topbar">
					<a>File</a>
					<a>Edit</a>
					<a>View</a>
					<a>Go</a>
					<a>Favorites</a>
					<a>Tools</a>
					<a>Help</a>
				</div>
			</div>
			<div className="paint-canvas-container">
				<div className="paint-tools-container">
					<button></button>
					<button></button>
					<button></button>
					<button></button>
				</div>
				<div className="paint-canvas"></div>
			</div>
			<div className="divisor-container">
				<div className="divisor"></div>
			</div>
			<div className="paint-pallette-container">
				<button className="white-paint"></button>
				<button className="black-paint"></button>
                <button className="gray-paint"></button>
                <button className="brown-paint"></button>
                <button className="red-paint"></button>
                <button className="pink-paint"></button>
                <button className="orange-paint"></button>
                <button className="yellow-paint"></button>
                <button className="blue-paint"></button>
                <button className="green-paint"></button>
			</div>
		</div>
	);
}

export default PaintRenderer;
