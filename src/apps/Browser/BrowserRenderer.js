import "./BrowserRenderer.css";
import "./../../components/Button.css";

function BrowserRenderer({ appCoreRef }) {
	return (
		<div className="browser-container">
			<div className="browser-top-container">
				<div className="browser-header-container">
					<div className="bar"></div>
					<a>File</a>
					<a>Edit</a>
					<a>View</a>
					<a>Go</a>
					<a>Favorites</a>
					<a>Tools</a>
					<a>Help</a>
				</div>
				<div className="divisor"></div>
				<div className="browser-address-container">
					<div className="bar"></div>
					<a>Address</a>
					<div className="browser-address-field">
						<a>https://justaurl.com</a>
						<button type="button" className="windows-button" style={{width: "18px"}}>▾</button>
					</div>
				</div>
			</div>
			<div className="browser-bottom-container">
				<div className="browser-content">
				<iframe src="https://cat-bounce.com/" width="100%" height="100%"></iframe>
				</div>
			</div>
		</div>
	);
}

export default BrowserRenderer;