import Tool from "./Tool";

class ColorPickerTool extends Tool {
	constructor(paintRendererRef) {
		super(paintRendererRef);
	}

	onMouse1Click(event) {
		const [x, y] = this.paintRendererRef.current.getPixelFromMousePosition(event);
		const [r, g, b] = this.paintRendererRef.current.pickPixelColor(x, y);
		this.paintRendererRef.current.setSelectedColor(r, g, b);
	}

    onToolActivated() {
		document.body.style.cursor = "url('./icons/mspaint-colorpicker.png'), auto";
	}

	onToolDisabled() {
		document.body.style.cursor = "default";
	}
}

export default ColorPickerTool;
