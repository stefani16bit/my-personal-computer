import { useEffect, useState } from "react";

function TxtRenderer({ appCoreRef }) {
	const [test, setTest] = useState(parseInt(localStorage.getItem("j") || 0));

	useEffect(() => {
		localStorage.setItem("j", test);
	}, [test])

	return <div>
		<h2>
			EU AMO A MINHA MULHER<span>{test}</span>
		</h2>

		<button onClick={() => setTest(test + 1)}>Clique aqui</button>
	</div>;
}

export default TxtRenderer;
