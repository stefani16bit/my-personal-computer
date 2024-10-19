import "./Button.css";

function Button({ text, width, height }) {
	return (
		<div className="windows-button-container">
			<button className="windows-button" style={{ width: width, height: height }}>
				{text}
			</button>
		</div>
	);
}

export default Button;
