import { useEffect, useState } from "react";

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
				<a>interests:</a>
			</div>
			<div>
			programming, computer arch, crts, retro tech, astrophysics, antrophology, gaming, music, art, old anime, mecha, sushi, hack n' slash, horror movies, sci-fi, aliens, energy drinks 

			</div>
		</div>
	);
}

export default TxtRenderer;
