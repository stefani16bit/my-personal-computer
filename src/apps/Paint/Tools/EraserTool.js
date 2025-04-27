import Tool from "./Tool";

class EraserTool extends Tool {
	constructor(paintRendererRef) {
		super(paintRendererRef);
		this.isErasing = false;
	}

	onMousePressBegin(event) {
		this.isErasing = true;
	}

	onMousePressLeave(event) {
		this.isErasing = false;
	}

	onMouseMove(event) {
		if (!this.isErasing) {
			return;
		}

		const [x, y] = this.paintRendererRef.current.getPixelFromMousePosition(event);
        this.paintRendererRef.current.erasePixel(x, y);
	}

    onToolActivated() {
		document.body.style.cursor = "url('./icons/mspaint-eraser.png'), auto";
	}

	onToolDisabled() {
		document.body.style.cursor = "default";
	}
}

export default EraserTool;
