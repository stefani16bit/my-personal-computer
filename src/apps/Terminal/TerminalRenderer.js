import { useState } from "react";

function TerminalRenderer({ appCoreRef }) {
	const [test, setTest] = useState("oi");
	return <div>{test}</div>;
}

export default TerminalRenderer;
