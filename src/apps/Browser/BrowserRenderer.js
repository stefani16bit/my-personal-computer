import "./BrowserRenderer.css";

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
				<div className="browser-address-container">
					<div className="bar"></div>
					<a>Address</a>
					<div className="browser-address-field">
						<a>https://github.com/stefani16bit</a>
						<button>v</button>
					</div>
				</div>
			</div>
			<div className="browser-bottom-container">
				<div className="browser-content">alguma coisa</div>
			</div>
		</div>
	);
}

export default BrowserRenderer;