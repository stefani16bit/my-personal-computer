class Tool {
	constructor(paintRendererRef) {
		this.paintRendererRef = paintRendererRef;
	}

	onMouse1Click(event) {}
	onMouse2Click(event) {}
	onMousePressBegin(event) {}
	onMousePressLeave(event) {}
	onMouseMove(event) {}
	onToolActivated() {}
	onToolDisabled() {}
}

export default Tool;
