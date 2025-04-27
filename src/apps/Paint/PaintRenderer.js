import { useEffect, useImperativeHandle, useState } from "react";
import "./PaintRenderer.css";
import { useRef } from "react";
import PencilTool from "./Tools/PencilTool";
import EraserTool from "./Tools/EraserTool";
import ColorPickerTool from "./Tools/ColorPickerTool";
import CanTool from "./Tools/CanTool";

const CANVAS_RESOLUTION = 10;

const CANVAS_WIDTH = 370;
const CANVAS_HEIGHT = 400;

function PaintRenderer({ appCoreRef }) {
	const [currentSelectedTool, setCurrentSelectedTool] = useState("none");
	const [selectedPixelColor, setSelectedPixelColor] = useState("#000000");
	const [canvasContext2D, setCanvasContext2D] = useState(null);

	const canvasRef = useRef(null);
	const paintRendererRef = useRef(null);

	const tools = {
		pencil: new PencilTool(paintRendererRef),
		eraser: new EraserTool(paintRendererRef),
		can: new CanTool(paintRendererRef),
		colorPicker: new ColorPickerTool(paintRendererRef),
	};

	function paintPixel(x, y, color) {
		canvasContext2D.fillStyle = color || selectedPixelColor;
		canvasContext2D.fillRect(x * CANVAS_RESOLUTION, y * CANVAS_RESOLUTION, CANVAS_RESOLUTION, CANVAS_RESOLUTION);
	}

	function erasePixel(x, y) {
		canvasContext2D.fillStyle = "#FFFFFF";
		canvasContext2D.fillRect(x * CANVAS_RESOLUTION, y * CANVAS_RESOLUTION, CANVAS_RESOLUTION, CANVAS_RESOLUTION);
	}

	function setSelectedColor(r, g, b) {
		setSelectedPixelColor(rgbToHex(r, g, b));
	}

	function pickPixelColor(x, y) {
		return canvasContext2D.getImageData(x * CANVAS_RESOLUTION, y * CANVAS_RESOLUTION, 1, 1).data;
	}

	function getPixelFromMousePosition(event) {
		let { left, top } = canvasRef.current.getBoundingClientRect();

		let x = Math.floor((event.pageX - left) / CANVAS_RESOLUTION);
		let y = Math.floor((event.pageY - top) / CANVAS_RESOLUTION);

		x = Math.floor(Math.min(Math.max(x, 0), CANVAS_WIDTH / CANVAS_RESOLUTION));
		y = Math.floor(Math.min(Math.max(y, 0), CANVAS_HEIGHT / CANVAS_RESOLUTION));

		return [x, y];
	}

	function setCurrentTool(tool) {
		if (currentSelectedTool in tools) {
			tools[currentSelectedTool].onToolDisabled();
		}

		setCurrentSelectedTool(tool);

		if (!tools[tool]) {
			return;
		}

		tools[tool].onToolActivated();
	}

	function rgbToHex(r, g, b) {
		return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
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
		rgbToHex: rgbToHex,
		CANVAS_RESOLUTION: CANVAS_RESOLUTION,
		CANVAS_WIDTH: CANVAS_WIDTH,
		CANVAS_HEIGHT: CANVAS_HEIGHT,
	}));

	useEffect(() => {
		if (canvasRef.current) {
			function onMouse1Click(event) {
				if (!(currentSelectedTool in tools)) {
					return;
				}

				tools[currentSelectedTool].onMouse1Click(event);
			}

			function onMouse2Click(event) {
				if (!(currentSelectedTool in tools)) {
					return;
				}

				tools[currentSelectedTool].onMouse2Click(event);
			}

			function onMousePressBegin(event) {
				if (!(currentSelectedTool in tools)) {
					return;
				}

				tools[currentSelectedTool].onMousePressBegin(event);
			}

			function onMousePressLeave(event) {
				if (!(currentSelectedTool in tools)) {
					return;
				}

				tools[currentSelectedTool].onMousePressLeave(event);
			}

			function onMouseMove(event) {
				if (!(currentSelectedTool in tools)) {
					return;
				}

				tools[currentSelectedTool].onMouseMove(event);
			}

			function onWindowResized() {}

			const currentRef = canvasRef.current;
			currentRef.addEventListener("click", onMouse1Click);
			currentRef.addEventListener("contextmenu", onMouse2Click);
			currentRef.addEventListener("mousedown", onMousePressBegin);
			currentRef.addEventListener("mouseup", onMousePressLeave);
			currentRef.addEventListener("mousemove", onMouseMove);

			window.addEventListener("resize", onWindowResized);
			onWindowResized();

			return () => {
				currentRef.removeEventListener("click", onMouse1Click);
				currentRef.removeEventListener("contextmenu", onMouse2Click);
				currentRef.removeEventListener("mousedown", onMousePressBegin);
				currentRef.removeEventListener("mouseup", onMousePressLeave);
				currentRef.removeEventListener("mousemove", onMouseMove);

				window.removeEventListener("resize", onWindowResized);
			};
		}
	});

	useEffect(() => {
		const canvasContext2D = canvasRef.current.getContext("2d");
		setCanvasContext2D(canvasContext2D);

		canvasContext2D.fillStyle = "#FFFFFF";
		canvasContext2D.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	}, []);

	useEffect(() => {
		return () => {
			if (canvasRef.current !== null) {
				return;
			}

			setCurrentTool("none");
		};
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
					<button className="paint-colorpicker-tool" onClick={() => setCurrentTool("colorPicker")}>
						<img src="./icons/mspaint-colorpicker.png" style={{ width: "20px", height: "20px" }}></img>
					</button>
				</div>
				<div className="html-paint-canvas-container">
					<canvas id="paint-canvas" ref={canvasRef} width={`${CANVAS_WIDTH}px`} height={`${CANVAS_HEIGHT}px`}></canvas>
				</div>
			</div>
			<div className="divisor-container">
				<div className="divisor"></div>
			</div>
			<div className="paint-color-container">
				<div className="paint-color-selected-container">
					<button className="paint-color-selected" style={{ backgroundColor: selectedPixelColor }}></button>
				</div>
				<div className="paint-pallette-container">
					<button className="white-paint" onClick={() => setSelectedColor(255, 255, 255)}></button>
					<button className="black-paint" onClick={() => setSelectedColor(0, 0, 0)}></button>
					<button className="gray-paint" onClick={() => setSelectedColor(180, 180, 180)}></button>
					<button className="brown-paint" onClick={() => setSelectedColor(150, 75, 0)}></button>
					<button className="red-paint" onClick={() => setSelectedColor(255, 0, 0)}></button>
					<button className="pink-paint" onClick={() => setSelectedColor(255, 192, 203)}></button>
					<button className="orange-paint" onClick={() => setSelectedColor(250, 156, 28)}></button>
					<button className="yellow-paint" onClick={() => setSelectedColor(255, 255, 0)}></button>
					<button className="blue-paint" onClick={() => setSelectedColor(0, 0, 255)}></button>
					<button className="green-paint" onClick={() => setSelectedColor(0, 255, 0)}></button>
				</div>
			</div>
		</div>
	);
}

export default PaintRenderer;
