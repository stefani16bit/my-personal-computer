import Tool from "./Tool";

class CanTool extends Tool {
	constructor(paintRendererRef) {
		super(paintRendererRef);
		this.colorToBeReplaced = null;
		this.visitedPixels = null;
	}

	#floodFill(x, y) {
		if (!this.paintRendererRef?.current) {
			return;
		}

		if (
			x < 0 ||
			y < 0 ||
			x >= this.paintRendererRef.current.CANVAS_WIDTH / this.paintRendererRef.current.CANVAS_RESOLUTION ||
			y >= this.paintRendererRef.current.CANVAS_HEIGHT / this.paintRendererRef.current.CANVAS_RESOLUTION
		) {
			return;
		}

		if (`${x}:${y}` in this.visitedPixels) {
			return;
		}

		const [r, g, b] = this.paintRendererRef.current.pickPixelColor(x, y);
		if (r != this.colorToBeReplaced[0] || g != this.colorToBeReplaced[1] || b != this.colorToBeReplaced[2]) {
			return;
		}

		this.visitedPixels[`${x}:${y}`] = true;

		setTimeout(() => {
			this.#floodFill(x - 1, y);
			this.#floodFill(x + 1, y);
			this.#floodFill(x, y - 1);
			this.#floodFill(x, y + 1);
		}, 200);

		this.paintRendererRef.current.paintPixel(x, y);
	}

	onMouse1Click(event) {
		this.visitedPixels = {};

		const [x, y] = this.paintRendererRef.current.getPixelFromMousePosition(event);
		const [r, g, b] = this.paintRendererRef.current.pickPixelColor(x, y);
		this.colorToBeReplaced = [r, g, b];

		this.#floodFill(x, y);
	}

	onToolActivated() {
		document.body.style.cursor = "url('./icons/mspaint-can.png'), auto";
	}

	onToolDisabled() {
		document.body.style.cursor = "default";
	}
}

export default CanTool;
