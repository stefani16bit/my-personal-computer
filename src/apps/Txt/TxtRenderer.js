import "./TxtRenderer.css";

function TxtRenderer({ appCoreRef }) {
	return (
		<div className="app-txt-renderer-container">
			This file is just in case you want to know a little bit more about me.
			<div>
				<br />
			</div>
			<a>
				My name is Stefani, I'm a brazillian girl, currently on my last year of Computer Science. At the moment, I work remotely as a full-stack
				developer at Thoughtworks.{" "}
			</a>
			<div className="app-txt-renderer-selfie">
				<a>I have a huge love for retro tech, including old computers, CRTs and videogames. I even own a sleeper pc. That's why I decided to create this page.</a>
			</div>
			<div>
				<br />
			</div>
			<div>
				I'm a very calm, rational, lonely and simple person, always trying to make the right things. Sometimes I can be tough and skeptical, but this is a trait of my resilience. I have a lot of intrapersonal and interpersonal intelligence, which for some reason made me become a woman with a schizoid personality, despite this, I have good relationships.
				<div>
					<br />
				</div>
				On my free time, I really like reading cientific books and playing video games, my favorite games are usually hack n' slash genre, like Devil May Cry 3 and Doom 2016 (btw I have a huge interest in programming games). I also love chess and cats.
			</div>
		</div>
	);
}

export default TxtRenderer;
