import "./App.css";

function App() {
	return (
		<div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
			<div
				className="computer-crt-container"
				style={{
					width: "1000px",
					height: "770px",
					minHeight: "770px",
					backgroundColor: "gray",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					borderRadius: "5px",
					boxShadow: "inset 20px 0 1px 0px rgba(85, 85, 85, 0.5)",
				}}
			>
				<div className="computer-screen-container">
					<div
						className="computer-screen"
						style={{
							width: "800px",
							height: "600px",
							display: "flex",
							borderRadius: "2px",
							border: "25px solid #8f8f8f",
						}}
					>
						<img className="computer-screen-background" src="icons/bg.png" style={{ width: "100%", height: "100%", overflow: "hidden" }} />
						<div className="shadow"></div>
					</div>
				</div>
				<div className="computer-button-container">
					<div className="computer-button-light"></div>
					<button className="computer-button"></button>
				</div>
			</div>
			<div
				className="computer-stand"
				style={{
					display: "flex",
					height: "50px",
					minHeight: "50px",
					width: "500px",
					borderRadius: "150px 150px 0 0",
					backgroundColor: "gray",
					boxShadow: "inset 0px 10px 1px 6px rgba(85, 85, 85, 0.5)",
				}}
			></div>
			<div
				className="computer-case"
				style={{
					display: "flex",
					height: "200px",
					width: "1000px",
					backgroundColor: "gray",
					marginTop: "5px",
					borderRadius: "5px",
					boxShadow: "inset 20px 0 1px 0px rgba(85, 85, 85, 0.5)",
				}}
			>
				<div className="computer-diskhat-container" style={{ height: "100px", width: "100%", position: "absolute" }}>
					<div
						className="computer-diskhat"
						style={{
							display: "flex",
							height: "100px",
							width: "300px",
							backgroundColor: "#9c9c9c",
							borderRadius: "5px",
							margin: "40px",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "column",
						}}
					>
						<div
							className="computer-diskhat-input-container"
							style={{ height: "100px", width: "300px", position: "absolute", display: "flex", justifyContent: "center", alignItems: "center" }}
						>
							<div
								className="computer-diskhat-input"
								style={{
									display: "flex",
									height: "20px",
									width: "250px",
									backgroundColor: "#555555",
									borderRadius: "5px",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<div
									className="computer-diskhat-input-2"
									style={{
										display: "flex",
										height: "40px",
										width: "80px",
										backgroundColor: "#555555",
										borderRadius: "5px",
									}}
								></div>
							</div>
						</div>
					</div>

					<div className="computer-diskhat-button-container" style={{ height: "100px", width: "300px", position: "absolute" }}>
						<div
							className="computer-diskhat-button"
							style={{
								display: "flex",
								height: "10px",
								width: "40px",
								backgroundColor: "#555555",
								borderRadius: "2px",
								position: "absolute",
								left: "250px",
								top: "80px",
							}}
						></div>
					</div>
				</div>
			</div>
			<div className="computer-case-button"></div>
		</div>
	);
}

export default App;
