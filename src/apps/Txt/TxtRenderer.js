
import "./TxtRenderer.css";

function TxtRenderer({ appCoreRef }) {
	return (
		<div className="app-txt-renderer-container">
			<h1>Hello!</h1>
			<a>My name is Stefani, nice to meet you. I'm a 22 year old software developer, currently on my last year of Computer Science. </a>

			<div className="app-txt-renderer-selfie">
				<a>
					I have a huge love for retro tech, including old computers, CRTs and games.
				</a>
				<img src="icons/selfie.jpg" style={{ width: "140px", height: "147px" }}></img>
			</div>

			<div>
				<br/>
			</div>
			<div>
				I'm a very calm and lonely person, always trying to make the right things. Sometimes I can be tough, but this is a trait of my resilience.

			</div>
		</div>
	);
}

export default TxtRenderer;
