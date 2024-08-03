import "./TaskBarAppDisplay.css";

function TaskBarAppDisplay({ appRef }) {
	function handleAppClick() {
		appRef?.minimize();
	}

	return (
		<div className="task-bar-app-display" onClick={handleAppClick}>
			<div className="task-bar-app-icon-container">
				<img src={appRef?.appearence?.icon} style={{width:"20px", height:"20px"}}></img>
			</div>

			<div className="task-bar-app-title-container">
				<a className="task-bar-app-title">{appRef?.appearence.title}</a>
			</div>
		</div>
	);
}

export default TaskBarAppDisplay;
