import { Helmet } from "react-helmet";
import "./DoomRenderer.css";
import { useRef } from "react";
import { useEffect } from "react";

function DoomRenderer({ appCoreRef }) {
	const containerRef = useRef(null);

	useEffect(() => {
		const shadowRoot = containerRef.current.shadowRoot || containerRef.current.attachShadow({ mode: "open" });
		while (shadowRoot.firstChild) {
			shadowRoot.removeChild(shadowRoot.firstChild);
		}

		// Create scoped style element
		const container = document.createElement("div");
		container.style = "width: 100% !important; height: 100% !important; margin: 0; padding: 0; left: 0px !important; top: 0px !important;";

		const style = document.createElement("style");
		style.textContent = `
			canvas {
				width: 100% !important;
				height: 100% !important;
			}
		`;

		window.appCoreRef_DoomRenderer = appCoreRef;

		requestAnimationFrame(() => {
			const div = document.createElement("div");
			div.id = "DOOM";

			container.appendChild(div);

			// Load CSS inside Shadow DOM
			const link = document.createElement("link");
			link.rel = "stylesheet";
			link.href = "https://v8.js-dos.com/latest/js-dos.css";

			div.appendChild(link);

			// Load JS inside Shadow DOM
			const script = document.createElement("script");
			script.textContent = `
				if (window.dos) {
					try { dos.stop(); } catch (_) {}
				}

				window.dos = undefined;
				window.appCoreRef_DoomRenderer.current.onAppCoreOpenStateChanged((isOpened) => {
					if (isOpened) {
						return;
					} 

					try { dos.stop(); } catch (_) {}

					// Cleanup
					delete window.dos;
				});

				window.dos = Dos(document.getElementById("DOOM-CONTAINER").shadowRoot.querySelector("#DOOM"), {
					autoStart: true,
					kiosk: true,
					noNetworking: true,
					noCloud: true,
					url: "https://cdn.dos.zone/custom/dos/doom.jsdos",
				});
			`;

			div.appendChild(script);
		});

		shadowRoot.appendChild(style);
		shadowRoot.appendChild(container);

		return () => {
			window.appCoreRef_DoomRenderer = null;
		};
	}, []);

	return (
		<div id="DOOM-CONTAINER" className="dosbox-default app-doom-renderer-container" ref={containerRef}>
			{/* <style scoped>
				<script type="text/javascript">
					{`
					// Dos(document.getElementById("DOOM"), {
					// 	autoStart: true,
					// 	kiosk: true,
					// 	noNetworking: true,
					// 	noCloud: true,
					// 	url: "https://cdn.dos.zone/original/2X/9/9ed7eb9c2c441f56656692ed4dc7ab28f58503ce.jsdos",
					// });
                    `}
				</script>
			</style> */}
		</div>
	);
}

export default DoomRenderer;
