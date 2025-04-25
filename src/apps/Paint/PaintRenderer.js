import { useEffect, useImperativeHandle, useState } from "react";
import "./PaintRenderer.css";
import { useRef } from "react";
import PencilTool from "./Tools/PencilTool";

const CANVAS_RESOLUTION = 4;

function PaintRenderer({ appCoreRef }) {
	const [currentSelectedTool, setCurrentSelectedTool] = useState("pencil");
	const [selectedPixelColor, setSelectedPixelColor] = useState("#000000");
	const [canvasContext2D, setCanvasContext2D] = useState(null);

	const canvasRef = useRef(null);
	const paintRendererRef = useRef(null);

	const tools = {
		pencil: new PencilTool(paintRendererRef),
		//eraser: new EraserTool(canvasRef),
		//can: new CanTool(canvasRef),
		//colorpicker: new ColorPickerTool(canvasRef),
	};

	function paintPixel(x, y) {
		canvasContext2D.fillStyle = selectedPixelColor;
		canvasContext2D.fillRect(x * CANVAS_RESOLUTION, y * CANVAS_RESOLUTION, CANVAS_RESOLUTION, CANVAS_RESOLUTION);
	}

	function erasePixel(x, y) {}

	function setSelectedColor(color) {}

	function pickPixelColor(x, y) {
		return canvasContext2D.getImageData(x, y, 1, 1).data;
	}

	function getPixelFromMousePosition(event) {
		let { left, top, width, height } = canvasRef.current.getBoundingClientRect();

		let x = Math.floor((event.pageX - left) / CANVAS_RESOLUTION);
		let y = Math.floor((event.pageY - top) / CANVAS_RESOLUTION);

		x = Math.floor(Math.min(Math.max(x, 0), width / CANVAS_RESOLUTION));
		y = Math.floor(Math.min(Math.max(y, 0), height / CANVAS_RESOLUTION));

		return [x, y];
	}

	function setCurrentTool(tool) {
		if (!tools[tool]) {
			return;
		}

		setCurrentSelectedTool(tool);
	}

	useImperativeHandle(paintRendererRef, () => ({
		ref: canvasRef,
		appCoreRef: appCoreRef,
		paintPixel: paintPixel,
		erasePixel: erasePixel,
		setSelectedColor: setSelectedColor,
		pickPixelColor: pickPixelColor,
		getPixelFromMousePosition: getPixelFromMousePosition,
		setCurrentTool: setCurrentTool,
	}));

	useEffect(() => {
		if (canvasRef.current) {
			setCanvasContext2D(canvasRef.current.getContext("2d"));

			function onMouse1Click(event) {
				if (!currentSelectedTool in tools) {
					return;
				}

				tools[currentSelectedTool].onMouse1Click(event);
			}

			function onMouse2Click(event) {
				if (!currentSelectedTool in tools) {
					return;
				}

				tools[currentSelectedTool].onMouse2Click(event);
			}

			function onMousePressBegin(event) {
				if (!currentSelectedTool in tools) {
					return;
				}

				tools[currentSelectedTool].onMousePressBegin(event);
			}

			function onMousePressLeave(event) {
				if (!currentSelectedTool in tools) {
					return;
				}

				tools[currentSelectedTool].onMousePressLeave(event);
			}

			function onMouseMove(event) {
				if (!currentSelectedTool in tools) {
					return;
				}

				tools[currentSelectedTool].onMouseMove(event);
			}

			window.addEventListener("click", onMouse1Click);
			window.addEventListener("contextmenu", onMouse2Click);
			window.addEventListener("mousedown", onMousePressBegin);
			window.addEventListener("mouseup", onMousePressLeave);
			window.addEventListener("mousemove", onMouseMove);

			return () => {
				window.removeEventListener("click", onMouse1Click);
				window.removeEventListener("contextmenu", onMouse2Click);
				window.removeEventListener("mousedown", onMousePressBegin);
				window.removeEventListener("mouseup", onMousePressLeave);
				window.removeEventListener("mousemove", onMouseMove);
			};
		}
	});

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
					<button className="paint-pencil-tool" onClick={() => setCurrentTool("pencil")}>
						<img src="./icons/mspaint-pencil.png" style={{ width: "20px", height: "20px" }}></img>
					</button>
					<button className="paint-eraser-tool" onClick={() => setCurrentTool("eraser")}>
						<img src="./icons/mspaint-eraser.png" style={{ width: "20px", height: "20px" }}></img>
					</button>
					<button className="paint-can-tool" onClick={() => setCurrentTool("can")}>
						<img src="./icons/mspaint-can.png" style={{ width: "20px", height: "20px" }}></img>
					</button>
					<button className="paint-colorpicker-tool" onClick={() => setCurrentTool("colorpicker")}>
						<img src="./icons/mspaint-colorpicker.png" style={{ width: "20px", height: "20px" }}></img>
					</button>
				</div>
				<canvas id="paint-canvas" ref={canvasRef}></canvas>
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
